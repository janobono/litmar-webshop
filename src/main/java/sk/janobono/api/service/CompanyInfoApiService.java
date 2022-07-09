package sk.janobono.api.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import sk.janobono.api.service.so.CompanyInfoSO;
import sk.janobono.api.service.so.OpeningInfoSO;
import sk.janobono.api.service.so.WelcomeInfoSO;
import sk.janobono.dal.domain.ApplicationProperty;
import sk.janobono.dal.repository.ApplicationPropertyRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyInfoApiService {

    private enum CompanyInfoPropertyKey {
        COMPANY_INFO_LOGO,
        COMPANY_INFO_TITLE,
        COMPANY_INFO_FIRM,
        COMPANY_INFO_STREET,
        COMPANY_INFO_CITY,
        COMPANY_INFO_STATE,
        COMPANY_INFO_PHONE,
        COMPANY_INFO_MAIL,
        COMPANY_INFO_COMPANY_INFO,
        COMPANY_INFO_BUSINESS_ID,
        COMPANY_INFO_TAX_ID,
        COMPANY_INFO_VAG_REG_NO,
        COMPANY_INFO_MAP,
        COMPANY_INFO_OPENING_INFO_COUNT,
        COMPANY_INFO_OPENING_INFO_,
        COMPANY_INFO_WELCOME_TEXT,
        COMPANY_INFO_WELCOME_INFO_COUNT,
        COMPANY_INFO_WELCOME_INFO_
    }

    private static final Logger LOGGER = LoggerFactory.getLogger(CompanyInfoApiService.class);

    private final ApplicationPropertyRepository applicationPropertyRepository;

    public CompanyInfoApiService(ApplicationPropertyRepository applicationPropertyRepository) {
        this.applicationPropertyRepository = applicationPropertyRepository;
    }

    public CompanyInfoSO getCompanyInfo() {
        LOGGER.debug("getCompanyInfo()");
        List<ApplicationProperty> properties = applicationPropertyRepository.getApplicationPropertiesByGroup("COMPANY_INFO_%");
        return new CompanyInfoSO(
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_LOGO),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_TITLE),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_FIRM),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_STREET),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_CITY),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_STATE),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_PHONE),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_MAIL),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_COMPANY_INFO),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_BUSINESS_ID),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_TAX_ID),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_VAG_REG_NO),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_MAP),
                getOpeningInfo(properties),
                getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_WELCOME_TEXT),
                getWelcomeInfo(properties)
        );
    }

    private String getValue(List<ApplicationProperty> properties, CompanyInfoPropertyKey key) {
        return getValue(properties, key.name());
    }

    private String getValue(List<ApplicationProperty> properties, String key) {
        return properties.stream()
                .filter(p -> p.getKey().equals(key))
                .findFirst().orElseThrow().getValue();
    }

    private List<OpeningInfoSO> getOpeningInfo(List<ApplicationProperty> properties) {
        int count = Integer.parseInt(getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_OPENING_INFO_COUNT));
        List<OpeningInfoSO> result = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            String day = getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_OPENING_INFO_.name() + i + "_DAY");
            String from = getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_OPENING_INFO_.name() + i + "_FROM");
            String to = getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_OPENING_INFO_.name() + i + "_TO");
            result.add(new OpeningInfoSO(day, from, to));
        }
        return result;
    }

    private List<WelcomeInfoSO> getWelcomeInfo(List<ApplicationProperty> properties) {
        int count = Integer.parseInt(getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_WELCOME_INFO_COUNT));
        List<WelcomeInfoSO> result = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            String text = getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_WELCOME_INFO_.name() + i + "_TEXT");
            String image = getValue(properties, CompanyInfoPropertyKey.COMPANY_INFO_WELCOME_INFO_.name() + i + "_IMAGE");
            result.add(new WelcomeInfoSO(text, image));
        }
        return result;
    }
}
