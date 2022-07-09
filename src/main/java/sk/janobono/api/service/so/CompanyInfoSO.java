package sk.janobono.api.service.so;

import java.util.List;

public record CompanyInfoSO(
        String logo,
        String title,
        String firm,
        String street,
        String city,
        String state,
        String phone,
        String mail,
        String companyInfo,
        String businessId,
        String taxId,
        String vatRegNo,
        String map,
        List<OpeningInfoSO> openingInfo,
        String welcomeText,
        List<WelcomeInfoSO> welcomeInfo
) {
}
