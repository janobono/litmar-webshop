package sk.janobono.dal.domain;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "wci_application_property")
public class ApplicationProperty {

    @Id
    @Column(name = "property_key")
    private String key;

    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "property_value")
    private String value;

    public ApplicationProperty() {
    }

    public ApplicationProperty(String key, String value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ApplicationProperty that = (ApplicationProperty) o;

        return key.equals(that.key);
    }

    @Override
    public int hashCode() {
        return key != null ? key.hashCode() : 0;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "ApplicationProperty{" +
                "key=" + key +
                ", value='" + value + '\'' +
                '}';
    }
}
