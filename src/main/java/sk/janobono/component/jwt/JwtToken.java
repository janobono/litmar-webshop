package sk.janobono.component.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Component;
import sk.janobono.api.service.so.UserSO;
import sk.janobono.common.Authority;
import sk.janobono.config.ConfigProperties;

import java.security.KeyFactory;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Component
public class JwtToken {

    private static final String ID = "id";
    private static final String TITLE_BEFORE = "titleBefore";
    private static final String FIRST_NAME = "firstName";
    private static final String MID_NAME = "midName";
    private static final String LAST_NAME = "lastName";
    private static final String TITLE_AFTER = "titleAfter";
    private static final String EMAIL = "email";
    private static final String GDPR = "gdpr";
    private static final String CONFIRMED = "confirmed";
    private static final String ENABLED = "enabled";
    private static final String AUTHORITIES = "authorities";

    private final Algorithm algorithm;
    private final Long expiration;
    private final String issuer;

    public JwtToken(ConfigProperties configProperties) {
        this.algorithm = Algorithm.RSA256(
                getPublicKey(configProperties.jwtPublicKey()), getPrivateKey(configProperties.jwtPrivateKey())
        );
        this.expiration = TimeUnit.SECONDS.toMillis(configProperties.jwtExpiration());
        this.issuer = configProperties.issuer();
    }

    private RSAPublicKey getPublicKey(String base64PublicKey) {
        try {
            byte[] decoded = Base64.getDecoder().decode(base64PublicKey);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decoded);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private RSAPrivateKey getPrivateKey(String base64PrivateKey) {
        try {
            byte[] decoded = Base64.getDecoder().decode(base64PrivateKey);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Long expiresAt(Long issuedAt) {
        return issuedAt + expiration;
    }

    public String generateToken(UserSO user, Long issuedAt) {
        try {
            JWTCreator.Builder jwtBuilder = JWT.create()
                    .withIssuer(issuer)
                    .withIssuedAt(new Date(issuedAt))
                    .withExpiresAt(new Date(expiresAt(issuedAt)));
            // id
            jwtBuilder.withClaim(ID, user.id().toString());
            // username
            jwtBuilder.withSubject(user.username());
            // titleBefore
            jwtBuilder.withClaim(TITLE_BEFORE, user.titleBefore());
            // firstName
            jwtBuilder.withClaim(FIRST_NAME, user.firstName());
            // midName
            jwtBuilder.withClaim(MID_NAME, user.midName());
            // lastName
            jwtBuilder.withClaim(LAST_NAME, user.lastName());
            // titleAfter
            jwtBuilder.withClaim(TITLE_AFTER, user.titleAfter());
            // email
            jwtBuilder.withClaim(EMAIL, user.email());
            // gdpr
            jwtBuilder.withClaim(GDPR, user.gdpr());
            // confirmed
            jwtBuilder.withClaim(CONFIRMED, user.confirmed());
            // enabled
            jwtBuilder.withClaim(ENABLED, user.enabled());
            // authorities
            jwtBuilder.withArrayClaim(AUTHORITIES,
                    user.authorities().stream().map(Authority::toString).toArray(String[]::new)
            );
            return jwtBuilder.sign(algorithm);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private DecodedJWT decodeToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
        return verifier.verify(token);
    }

    public UserSO parseToken(String token) {
        DecodedJWT jwt = decodeToken(token);
        // id
        UUID id = UUID.fromString(jwt.getClaims().get(ID).asString());
        // username
        String username = jwt.getSubject();
        // titleBefore
        String titleBefore = jwt.getClaims().containsKey(TITLE_BEFORE) ? jwt.getClaims().get(TITLE_BEFORE).asString() : null;
        // firstName
        String firstName = jwt.getClaims().get(FIRST_NAME).asString();
        // midName
        String midName = jwt.getClaims().containsKey(MID_NAME) ? jwt.getClaims().get(MID_NAME).asString() : null;
        // lastName
        String lastName = jwt.getClaims().get(LAST_NAME).asString();
        // titleAfter
        String titleAfter = jwt.getClaims().containsKey(TITLE_AFTER) ? jwt.getClaims().get(TITLE_AFTER).asString() : null;
        // email
        String email = jwt.getClaims().get(EMAIL).asString();
        // gdpr
        Boolean gdpr = jwt.getClaims().get(GDPR).asBoolean();
        // confirmed
        Boolean confirmed = jwt.getClaims().get(CONFIRMED).asBoolean();
        // enabled
        Boolean enabled = jwt.getClaims().get(ENABLED).asBoolean();
        // authorities
        String[] authorities = jwt.getClaims().get(AUTHORITIES).asArray(String.class);

        return new UserSO(
                id,
                username,
                titleBefore,
                firstName,
                midName,
                lastName,
                titleAfter,
                email,
                gdpr,
                confirmed,
                enabled,
                Arrays.stream(authorities).map(Authority::byValue).collect(Collectors.toList())
        );
    }
}
