package sk.janobono.component.mail;

public enum MailTemplate {

    BASE("MailBaseTemplate");

    private final String template;

    MailTemplate(String template) {
        this.template = template;
    }

    public String getTemplate() {
        return template;
    }
}
