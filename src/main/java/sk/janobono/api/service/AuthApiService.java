package sk.janobono.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sk.janobono.api.service.so.*;
import sk.janobono.common.Authority;
import sk.janobono.common.exception.ApplicationExceptionCode;
import sk.janobono.component.Captcha;
import sk.janobono.component.jwt.JwtToken;
import sk.janobono.component.mail.*;
import sk.janobono.component.mail.bundle.ResetPasswordMail;
import sk.janobono.component.mail.bundle.SignUpMail;
import sk.janobono.component.verification.VerificationToken;
import sk.janobono.component.verification.VerificationTokenKey;
import sk.janobono.component.verification.VerificationTokenType;
import sk.janobono.config.ConfigProperties;
import sk.janobono.dal.domain.User;
import sk.janobono.dal.repository.UserRepository;
import sk.janobono.util.RandomString;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class AuthApiService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthApiService.class);

    private ConfigProperties configProperties;

    private PasswordEncoder passwordEncoder;

    private Captcha captcha;

    private JwtToken jwtToken;

    private ApplicationMailSender applicationMailSender;

    private ApplicationMailContentFormatter applicationMailContentFormatter;

    private VerificationToken verificationToken;

    private UserRepository userRepository;

    @Autowired
    public void setConfigProperties(ConfigProperties configProperties) {
        this.configProperties = configProperties;
    }

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void setCaptcha(Captcha captcha) {
        this.captcha = captcha;
    }

    @Autowired
    public void setJwtToken(JwtToken jwtToken) {
        this.jwtToken = jwtToken;
    }

    @Autowired
    public void setApplicationMailSender(ApplicationMailSender applicationMailSender) {
        this.applicationMailSender = applicationMailSender;
    }

    @Autowired
    public void setApplicationMailContentFormatter(ApplicationMailContentFormatter applicationMailContentFormatter) {
        this.applicationMailContentFormatter = applicationMailContentFormatter;
    }

    @Autowired
    public void setVerificationToken(VerificationToken verificationToken) {
        this.verificationToken = verificationToken;
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthenticationResponseSO confirm(ConfirmationRequestSO confirmationRequestSO) {
        LOGGER.debug("confirm({})", confirmationRequestSO);
        Map<String, String> data = verificationToken.parseToken(confirmationRequestSO.token());
        User user = switch (VerificationTokenType.valueOf(data.get(VerificationTokenKey.TYPE.name()))) {
            case SIGN_UP -> signUp(
                    UUID.fromString(data.get(VerificationTokenKey.USER_ID.name()))
            );
            case RESET_PASSWORD -> resetPassword(
                    UUID.fromString(data.get(VerificationTokenKey.USER_ID.name())),
                    data.get(VerificationTokenKey.NEW_PASSWORD.name())
            );
        };
        AuthenticationResponseSO authenticationResponse = createAuthenticationResponse(user);
        LOGGER.info("confirm({}) - {}", confirmationRequestSO, authenticationResponse);
        return authenticationResponse;
    }

    @Transactional
    public AuthenticationResponseSO changeEmail(ChangeEmailRequestSO changeEmailRequestSO) {
        LOGGER.debug("changeEmail({})", changeEmailRequestSO);
        captcha.checkTokenValid(changeEmailRequestSO.captchaText(), changeEmailRequestSO.captchaToken());
        if (userRepository.existsByEmail(changeEmailRequestSO.email().toLowerCase())) {
            throw ApplicationExceptionCode.USER_EMAIL_IS_USED.exception();
        }
        UserSO userSO = (UserSO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userSO.id()).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(userSO.id())
        );
        checkDisabled(user);
        if (!passwordEncoder.matches(changeEmailRequestSO.password(), user.getPassword())) {
            throw ApplicationExceptionCode.INVALID_CREDENTIALS.exception();
        }
        user.setEmail(changeEmailRequestSO.email().toLowerCase());
        user = userRepository.save(user);
        AuthenticationResponseSO authenticationResponse = createAuthenticationResponse(user);
        LOGGER.info("changeEmail({}) - {}", changeEmailRequestSO, authenticationResponse);
        return authenticationResponse;
    }

    @Transactional
    public AuthenticationResponseSO changePassword(ChangePasswordRequestSO changePasswordRequestSO) {
        LOGGER.debug("changePassword({})", changePasswordRequestSO);
        captcha.checkTokenValid(changePasswordRequestSO.captchaText(), changePasswordRequestSO.captchaToken());
        UserSO userSO = (UserSO) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userSO.id()).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(userSO.id())
        );
        checkDisabled(user);
        if (!passwordEncoder.matches(changePasswordRequestSO.oldPassword(), user.getPassword())) {
            throw ApplicationExceptionCode.INVALID_CREDENTIALS.exception();
        }
        user.setPassword(passwordEncoder.encode(changePasswordRequestSO.newPassword()));
        user = userRepository.save(user);
        AuthenticationResponseSO authenticationResponse = createAuthenticationResponse(user);
        LOGGER.info("changePassword({}) - {}", changePasswordRequestSO, authenticationResponse);
        return authenticationResponse;
    }

    public void resetPassword(ResetPasswordRequestSO resetPasswordRequestSO) {
        LOGGER.debug("resetPassword({})", resetPasswordRequestSO);
        captcha.checkTokenValid(resetPasswordRequestSO.captchaText(), resetPasswordRequestSO.captchaToken());
        User user = userRepository.findByEmail(resetPasswordRequestSO.email().toLowerCase()).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(resetPasswordRequestSO.email())
        );
        checkDisabled(user);
        sendResetPasswordMail(resetPasswordRequestSO, user);
    }

    public AuthenticationResponseSO signIn(SignInRequestSO signInRequestSO) {
        LOGGER.debug("signIn({})", signInRequestSO);
        User user = userRepository.findByUsername(signInRequestSO.username().toLowerCase()).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(signInRequestSO.username())
        );
        checkDisabled(user);
        if (!passwordEncoder.matches(signInRequestSO.password(), user.getPassword())) {
            throw ApplicationExceptionCode.INVALID_CREDENTIALS.exception();
        }
        AuthenticationResponseSO authenticationResponse = createAuthenticationResponse(user);
        LOGGER.info("authenticate({}) - {}", signInRequestSO, authenticationResponse);
        return authenticationResponse;
    }

    @Transactional
    public AuthenticationResponseSO signUp(SignUpRequestSO signUpRequestSO) {
        LOGGER.debug("signUp({})", signUpRequestSO);
        captcha.checkTokenValid(signUpRequestSO.captchaText(), signUpRequestSO.captchaToken());
        if (userRepository.existsByUsername(signUpRequestSO.username().toLowerCase())) {
            throw ApplicationExceptionCode.USER_USERNAME_IS_USED.exception();
        }
        if (userRepository.existsByEmail(signUpRequestSO.email().toLowerCase())) {
            throw ApplicationExceptionCode.USER_EMAIL_IS_USED.exception();
        }
        if (!signUpRequestSO.gdpr()) {
            throw ApplicationExceptionCode.GDPR.exception();
        }
        User user = new User();
        user.setUsername(signUpRequestSO.username().toLowerCase());
        user.setPassword(passwordEncoder.encode(signUpRequestSO.password()));
        user.setTitleBefore(signUpRequestSO.titleBefore());
        user.setFirstName(signUpRequestSO.firstName());
        user.setMidName(signUpRequestSO.midName());
        user.setLastName(signUpRequestSO.lastName());
        user.setTitleAfter(signUpRequestSO.titleAfter());
        user.setEmail(signUpRequestSO.email().toLowerCase());
        user.setGdpr(signUpRequestSO.gdpr());
        user.setConfirmed(false);
        user.setEnabled(true);
        user = userRepository.save(user);
        sendSignUpMail(signUpRequestSO, user);
        AuthenticationResponseSO authenticationResponse = createAuthenticationResponse(user);
        LOGGER.info("signUp({}) - {}", signUpRequestSO, authenticationResponse);
        return authenticationResponse;
    }

    private AuthenticationResponseSO createAuthenticationResponse(User user) {
        Long issuedAt = System.currentTimeMillis();
        return new AuthenticationResponseSO(jwtToken.generateToken(UserSO.createUserSO(user), issuedAt));
    }

    private User signUp(UUID userId) {
        LOGGER.debug("signUp({})", userId);
        User user = userRepository.findById(userId).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(userId)
        );
        checkDisabled(user);
        user.setConfirmed(true);
        if (user.getAuthorities().size() == 0) {
            user.getAuthorities().add(Authority.WCI_CUSTOMER);
        }
        return userRepository.save(user);
    }

    private User resetPassword(UUID userId, String newPassword) {
        LOGGER.debug("resetPassword({})", userId);
        User user = userRepository.findById(userId).orElseThrow(
                () -> ApplicationExceptionCode.USER_NOT_FOUND.exception(userId)
        );
        checkDisabled(user);
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    void checkDisabled(User user) {
        LOGGER.debug("checkDisabled({})", user);
        if (!user.getEnabled()) {
            throw ApplicationExceptionCode.USER_IS_DISABLED.exception();
        }
    }

    private void sendResetPasswordMail(ResetPasswordRequestSO resetPasswordRequestSO, User user) {
        LOGGER.debug("sendResetPasswordMail({},{})", resetPasswordRequestSO, user);

        Map<String, String> data = new HashMap<>();
        data.put(VerificationTokenKey.TYPE.name(), VerificationTokenType.RESET_PASSWORD.name());
        data.put(VerificationTokenKey.USER_ID.name(), user.getId().toString());
        data.put(VerificationTokenKey.NEW_PASSWORD.name(),
                RandomString.INSTANCE()
                        .alphaNumeric(2, 5, 3)
                        .generate(10)
        );
        long issuedAt = System.currentTimeMillis();
        String token = verificationToken.generateToken(
                data,
                issuedAt,
                issuedAt + TimeUnit.HOURS.toMillis(configProperties.resetPasswordTokenExpiration())
        );

        applicationMailSender.sendEmail(new Mail(
                configProperties.mail(),
                null,
                List.of(user.getEmail()),
                ResetPasswordMail.SUBJECT.value(),
                applicationMailContentFormatter.format(
                        MailTemplate.BASE,
                        new MailBaseContent(
                                ResetPasswordMail.TITLE.value(),
                                Arrays.asList(
                                        ResetPasswordMail.MESSAGE.value(),
                                        ResetPasswordMail.PASSWORD_MESSAGE.value(data.get(VerificationTokenKey.NEW_PASSWORD.name()))
                                ),
                                new MailLink(
                                        getTokenUrl(configProperties.webUrl(), token),
                                        ResetPasswordMail.LINK.value()
                                )
                        ).getContext()
                ),
                true,
                null
        ));
    }

    private void sendSignUpMail(SignUpRequestSO signUpRequestSO, User user) {
        LOGGER.debug("sendSignUpMail({},{})", signUpRequestSO, user);

        Map<String, String> data = new HashMap<>();
        data.put(VerificationTokenKey.TYPE.name(), VerificationTokenType.SIGN_UP.name());
        data.put(VerificationTokenKey.USER_ID.name(), user.getId().toString());
        long issuedAt = System.currentTimeMillis();
        String token = verificationToken.generateToken(
                data,
                issuedAt,
                issuedAt + TimeUnit.HOURS.toMillis(configProperties.signUpTokenExpiration())
        );

        applicationMailSender.sendEmail(new Mail(
                configProperties.mail(),
                null,
                List.of(user.getEmail()),
                SignUpMail.SUBJECT.value(),
                applicationMailContentFormatter.format(
                        MailTemplate.BASE,
                        new MailBaseContent(
                                SignUpMail.TITLE.value(),
                                Collections.singletonList(SignUpMail.MESSAGE.value()),
                                new MailLink(
                                        getTokenUrl(configProperties.webUrl(), token),
                                        SignUpMail.LINK.value()
                                )
                        ).getContext()
                ),
                true,
                null
        ));
    }

    private String getTokenUrl(String webUrl, String token) {
        try {
            return webUrl + "/confirm/" + URLEncoder.encode(token, StandardCharsets.UTF_8.toString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
