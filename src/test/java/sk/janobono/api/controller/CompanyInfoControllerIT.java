package sk.janobono.api.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import sk.janobono.BaseIntegrationTest;
import sk.janobono.api.service.CompanyInfoApiService;
import sk.janobono.api.service.so.CompanyInfoSO;

import static org.assertj.core.api.Assertions.assertThat;

class CompanyInfoControllerIT extends BaseIntegrationTest {

    @Autowired
    public CompanyInfoApiService companyInfoApiService;

    @Test
    public void getCompanyInfo() throws Exception {
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get("/api/company-info")).andReturn();
        assertThat(mvcResult.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        CompanyInfoSO companyInfoSO = mapFromJson(mvcResult.getResponse().getContentAsString(), CompanyInfoSO.class);
        CompanyInfoSO companyInfoSO1 = companyInfoApiService.getCompanyInfo();
        assertThat(companyInfoSO.logo()).isEqualTo(companyInfoSO1.logo());
    }
}
