package sk.janobono.common.exception;

import java.text.MessageFormat;
import java.util.ResourceBundle;

public enum ApplicationExceptionCode {
    UNKNOWN,
    INVALID_CAPTCHA,
    INVALID_CREDENTIALS,
    USER_IS_DISABLED,
    USER_NOT_FOUND,
    USER_USERNAME_IS_USED,
    USER_EMAIL_IS_USED,
    GDPR;

    public String value(Object... arguments) {
        return MessageFormat.format(
                ResourceBundle.getBundle(ApplicationExceptionCode.class.getName()).getString(name()), arguments
        );
    }

    public ApplicationException exception(Object... arguments) {
        return exception(null, arguments);
    }

    public ApplicationException exception(Throwable cause, Object... arguments) {
        return new ApplicationException(value(arguments), cause, this);
    }
}
