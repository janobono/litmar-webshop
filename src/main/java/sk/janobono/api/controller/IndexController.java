package sk.janobono.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(
            method = {RequestMethod.OPTIONS, RequestMethod.GET},
            path = {
                    "/",
                    "/cookies-info",
                    "/gdpr-info",
                    "/sign-in",
                    "/sign-up"
            }
    )
    public String index() {
        return "forward:/index.html";
    }
}
