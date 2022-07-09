package sk.janobono.component.mail.bundle;

import java.text.MessageFormat;
import java.util.ResourceBundle;

public enum ResetPasswordMail {
    SUBJECT,
    TITLE,
    MESSAGE,
    PASSWORD_MESSAGE,
    LINK;

    public String value(Object... arguments) {
        return MessageFormat.format(
                ResourceBundle.getBundle(ResetPasswordMail.class.getName()).getString(name()), arguments
        );
    }
}
