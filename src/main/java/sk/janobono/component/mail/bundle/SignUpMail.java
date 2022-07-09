package sk.janobono.component.mail.bundle;

import java.text.MessageFormat;
import java.util.ResourceBundle;

public enum SignUpMail {

    SUBJECT,
    TITLE,
    MESSAGE,
    LINK;

    public String value(Object... arguments) {
        return MessageFormat.format(
                ResourceBundle.getBundle(SignUpMail.class.getName()).getString(name()), arguments
        );
    }
}
