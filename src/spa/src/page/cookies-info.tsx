import React from 'react';
import { SimpleLayout } from '../component/layout';

const CookiesInfoPage: React.FC = () => (
    <SimpleLayout>
        <div className="flex flex-col px-5 md:px-32 pb-4 text-gray-900">
            <h2 className="mt-6 text-center text-xl font-extrabold"
            >Cookies informácia</h2>
            <div className="mt-2 text-justify text-base">
                Táto webová stránka používa súbory cookie na zlepšenie zážitku z prehliadania a poskytovanie
                dodatočných funkcií. Žiadne z týchto údajov nemožno a ani nebudú použité na vašu identifikáciu alebo
                kontaktovanie. Kliknutím na položku Povoliť cookies dávate tejto webovej lokalite povolenie na ukladanie
                malých kúskov údajov na vašom zariadení. Ak sa chcete dozvedieť viac o cookies a localStorage, navštívte
                <a
                    className="text-gray-500 hover:text-gray-800 font-semibold pl-1"
                    href="https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/"
                >Information Commissioner's Office</a>.
            </div>
            <p className="mt-2 text-base py-4">
                Ak chcete zakázať všetky súbory cookie prostredníctvom prehliadača, kliknite na príslušný odkaz a
                postupujte podľa pokynov:
            </p>
            <div className="flex justify-center items-center">
                <ul className="list-disc text-base">
                    <li>
                        <a className="text-gray-500 hover:text-gray-800 font-semibold"
                           href="https://support.google.com/accounts/answer/61416?hl=sk"
                        >chrome</a>
                    </li>
                    <li>
                        <a className="text-gray-500 hover:text-gray-800 font-semibold"
                           href="https://support.mozilla.org/en-GB/kb/enable-and-disable-cookies-website-preferences"
                        >firefox</a>
                    </li>
                    <li>
                        <a className="text-gray-500 hover:text-gray-800 font-semibold"
                           href="https://help.opera.com/en/latest/web-preferences/#cookies"
                        >opera</a>
                    </li>
                    <li>
                        <a className="text-gray-500 hover:text-gray-800 font-semibold"
                           href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                        >safari</a>
                    </li>
                </ul>
            </div>
        </div>
    </SimpleLayout>
);

export default CookiesInfoPage;
