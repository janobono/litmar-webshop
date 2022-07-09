package sk.janobono;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import sk.janobono.config.ConfigProperties;

@SpringBootApplication(scanBasePackages = {"sk.janobono"})
@EnableConfigurationProperties(ConfigProperties.class)
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
