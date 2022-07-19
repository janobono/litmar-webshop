import React from 'react';

const CookiesInfoPage: React.FC = () => (
    <div className="flex flex-col">
        <h1 className="m-4">Cookies informácia</h1>

        <p className="text-justify mx-4">
            Táto webová stránka používa súbory cookie na zlepšenie zážitku z prehliadania a poskytovanie
            dodatočných funkcií. Žiadne z týchto údajov nemožno a ani nebudú použité na vašu identifikáciu alebo
            kontaktovanie. Kliknutím na položku Povoliť cookies dávate tejto webovej lokalite povolenie na ukladanie
            malých kúskov údajov na vašom zariadení. Ak sa chcete dozvedieť viac o cookies a localStorage, navštívte
            <a className="pl-1"
               href="https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/"
            >Information Commissioner's Office</a>.
        </p>

        <p className="m-4">
            Ak chcete zakázať všetky súbory cookie prostredníctvom prehliadača, kliknite na príslušný odkaz a
            postupujte podľa pokynov:
        </p>

        <div className="ml-8 mr-4 mb-4">
            <ul>
                <li>
                    <a href="https://support.google.com/accounts/answer/61416?hl=sk">chrome</a>
                </li>
                <li>
                    <a href="https://support.mozilla.org/en-GB/kb/enable-and-disable-cookies-website-preferences"
                    >firefox</a>
                </li>
                <li>
                    <a href="https://help.opera.com/en/latest/web-preferences/#cookies">opera</a>
                </li>
                <li>
                    <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac">safari</a>
                </li>
            </ul>
        </div>
    </div>
);

export default CookiesInfoPage;
