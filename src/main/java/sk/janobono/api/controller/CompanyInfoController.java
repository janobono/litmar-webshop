package sk.janobono.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sk.janobono.api.service.CompanyInfoApiService;
import sk.janobono.api.service.so.CompanyInfoSO;

@RestController
@RequestMapping(path = "/api/company-info")
public class CompanyInfoController {

    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyInfoController.class);

    private final CompanyInfoApiService companyInfoApiService;

    public CompanyInfoController(CompanyInfoApiService companyInfoApiService) {
        this.companyInfoApiService = companyInfoApiService;
    }

    @GetMapping
    public ResponseEntity<CompanyInfoSO> getCompanyInfo() {
        LOGGER.debug("getCompanyInfo()");
        return new ResponseEntity<>(companyInfoApiService.getCompanyInfo(), HttpStatus.OK);
    }
}
