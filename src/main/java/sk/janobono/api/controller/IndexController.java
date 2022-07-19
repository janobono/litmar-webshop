package sk.janobono.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(
            method = {RequestMethod.OPTIONS, RequestMethod.GET},
            path = {"{_:^(?!index\\.html|api).*$}"}
    )
    public String index() {
        return "forward:/index.html";
    }
}
