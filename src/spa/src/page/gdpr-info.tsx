import React from 'react';
import { useGlobalState } from '../context/global-state-context-provider';
import { LWSpinner } from '../component/ui/lw-spinner';

const GdprInfoPage: React.FC = () => {
    const globalState = useGlobalState();

    return (
        <div className="flex flex-col">
            <div>
                <h1 className="m-4">Informácia o spracovaní osobných údajov v súlade s nariadením GDPR</h1>
                <p className="text-justify mx-4 mb-4">
                    Podľa ust. § 19 zákona č.18/2018 Z. z. o ochrane osobných údajov, a čl.13 Nariadenia
                    Európskeho
                    parlamentu a rady (EÚ) 2016/679.
                </p>
                <p className="text-justify mx-4 mb-4">
                    1. Účelom tejto informačnej povinnosti je informovať dotknuté osoby o zákonom stanovených
                    informáciách, ktoré je povinný prevádzkovateľ poskytnúť dotknutej osobe pri každom
                    spracúvaní
                    osobných údajov o tejto osobe.
                </p>
                <p className="text-justify mx-4 mb-4">
                    2. Účelom tejto informačnej povinnosti, je preukázať, že spracúvanie osobných údajov
                    prevádzkovateľom sa vykonáva v súlade s aktuálne platnou právnou úpravou.
                </p>
                <p className="mx-4 mb-4">
                    Identifikačné údaje a kontaktné údaje prevádzkovateľa :
                </p>

                <h4 className="m-4">Prevádzkovateľ</h4>
                {globalState.companyInfo ?
                    <>
                        <p className="mx-4">
                            {globalState.companyInfo.firm}
                        </p>
                        <p className="mx-4">
                            {globalState.companyInfo.street}
                        </p>
                        <p className="mx-4">
                            {globalState.companyInfo.city}
                        </p>
                        <p className="mx-4">
                            {globalState.companyInfo.state}
                        </p>
                        <p className="mx-4">
                            {'IČO: ' + globalState.companyInfo.businessId}
                        </p>
                        <p className="mx-4">
                            {'DIČ: ' + globalState.companyInfo.taxId}
                        </p>
                    </>
                    :
                    <div className="flex flex-1 justify-center items-center">
                        <LWSpinner/>
                    </div>
                }
                <p className="mx-4 mt-4">
                    (ďalej v texte dokumentácie len ako <span className="italic">„prevádzkovateľ“</span>)
                </p>

                <h2 className="m-4">Účel spracúvania osobných údajov, na ktorý sú osobné údaje určené</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        poskytnutie informácií, ktoré žiada dotknutá osoba na jej emailovú adresu, prípadne
                        telefonicky,
                    </li>
                    <li>
                        alebo dodanie tovaru alebo služieb,
                    </li>
                    <li>
                        alebo organizovanie školenia,
                    </li>
                    <li>
                        alebo organizovanie podujatia pre obchodných, servisných, alebo montážnych partnerov a s
                        tým
                        súvisiace vybavenie ubytovania v hoteloch,
                    </li>
                    <li>
                        prípadne vopred oznámené fotografovanie firemného podujatia za účelom propagácie firmy.
                    </li>
                </ul>

                <h2 className="m-4">Rozsah spracovania osobných údajov</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Osobné údaje budú spracovávané v rozsahu, v akom boli poskytnuté v súvislosti so
                        zaslaním
                        informácií požadovaných od dotknutej osoby, alebo v súvislosti s dodaním tovaru alebo
                        služieb:
                        meno, priezvisko, e-mail, telefón, adresa, prípadne firma a pozícia.
                    </li>
                    <li>
                        V prípade organizovania firemných podujatí a zároveň v prípade vopred oznámeného
                        fotografovania, môžu byť vyhotovené a zverejnené fotografie zobrazujúce príslušné
                        podujatie.
                        Nebudú zverejnené žiadne fotografie, ktoré by pôsobili ponižujúco, alebo by zobrazovali
                        nevhodné detaily dotknutých osôb.
                    </li>
                </ul>

                <h2 className="m-4">Právny základ spracúvania osobných údajov</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Zmluvný vzťah, alebo predzmluvný vzťah.
                    </li>
                    <li>
                        Plnenie povinností vyplývajúcich z platných právnych predpisov Slovenskej republiky
                        alebo
                        nariadení EÚ, ktoré sú priamo vykonateľné a uplatniteľné aj v Slovenskej republike alebo
                        sprostredkovateľom v rámci zmluvných vzťahov v súlade s Nariadením Európskeho parlamentu
                        a
                        Rady (EÚ) 2016/679 a zákonom č.18/2018 Z. z. o ochrane osobných údajov.
                    </li>
                </ul>

                <h2 className="m-4">Jedná sa o tieto právne predpisy</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Zákon č. 431/2002 Z. z. o účtovníctve v znení neskorších predpisov.
                    </li>
                    <li>
                        Zákon č. 222/2004 Z. z. o dani z pridanej hodnoty v znení neskorších predpisov.
                    </li>
                    <li>
                        Zákon č.18/2018 Z. z. o ochrane osobných údajov a o zmene a doplnení niektorých zákonov.
                    </li>
                    <li>
                        Zákon č. 40/1964 Zb. Občiansky zákonník v znení neskorších predpisov.
                    </li>
                    <li>
                        Zákon č. 513/1991 Zb. Obchodný zákonník v znení neskorších predpisov.
                    </li>
                    <li>
                        V prípade fotografovania firemných podujatí sa jedná o oprávnený záujem v zmysle Zákona
                        č.18/2018 Z. z. §13 ods.(1) písm. f).
                    </li>
                </ul>

                <h2 className="m-4">Identifikácia príjemcu alebo kategórie príjemcu</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Osobné údaje nebudú poskytované ďalším príjemcom okrem Immergas.
                    </li>
                    <li>
                        V prípade vopred oznámeného fotografovania firemných podujatí, môžu byť fotky zverejnené
                        v
                        zmysle uvedeného rozsahu.
                    </li>
                </ul>

                <h2 className="m-4">Doba uchovávania / kritérium jej určenia</h2>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Prevádzkovateľ sa zaručuje, že osobné údaje poskytnuté dotknutou osobou na účely
                        stanovené v
                        tejto informačnej povinnosti bude spracúvať po dobu predzmluvného alebo zmluvného
                        vzťahu.
                    </li>
                    <li>
                        V prípade zákonných požiadaviek (napríklad súvisiacich s účtovaním) budú údaje
                        uchovávané po
                        dobu požadovanú príslušnými právnymi predpismi.
                    </li>
                    <li>
                        V prípade, že osobné údaje už zjavne nebudú potrebné ku spracovaniu, nebudú sa ďalej
                        spracovávať.
                    </li>
                </ul>

                <h2 className="m-4">Poučenie o právach dotknutých osôb</h2>
                <p className="text-justify mx-4 mb-4">
                    Prevádzkovateľ týmto dáva dotknutým osobám na vedomie a zároveň vyhlasuje, že dotknutým
                    osobám
                    priznáva tieto práva:
                </p>

                <h3 className="m-4">a. Právo na prístup</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo získať od prevádzkovateľa potvrdenie o tom, či sa spracúvajú
                        osobné
                        údaje, ktoré sa jej týkajú. Informácie podľa § 21 ods. 1 a 2 zákona č. 18/2018 o ochrane
                        osobných údajov a o zmene a doplnení niektorých zákonov (ďalej len „zákon 18/2018“) je
                        prevádzkovateľ povinný poskytnúť dotknutej osobe spôsobom podľa jej požiadavky.
                    </li>
                </ul>

                <h3 className="m-4">b. Právo na opravu</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo na to, aby prevádzkovateľ bez zbytočného odkladu opravil
                        nesprávne
                        osobné údaje, ktoré sa jej týkajú. So zreteľom na účel spracúvania osobných údajov má
                        dotknutá osoba právo na doplnenie neúplných osobných údajov.
                    </li>
                </ul>

                <h3 className="m-4">c. Právo na výmaz (právo byť zabudnutý)</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo na to, aby prevádzkovateľ bez zbytočného odkladu vymazal osobné
                        údaje, ktoré sa jej týkajú, ak účel ich spracúvania skončil alebo je splnená niektorá z
                        podmienok v § 23 ods. 2 zákona 18/2018 alebo ak je spracúvanie potrebné kvôli dôvodom v
                        § 23
                        ods. 4 zákona 18/2018.
                    </li>
                </ul>

                <h3 className="m-4">d. Právo na obmedzenie spracúvania</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo na to, aby prevádzkovateľ obmedzil spracúvanie osobných údajov,
                        ak
                        ide o prípady podľa § 24 ods. 1 zákona 18/2018.
                    </li>
                </ul>

                <h3 className="m-4">e. Právo namietať spracúvanie osobných údajov</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo namietať spracúvanie jej osobných údajov z dôvodu týkajúceho sa
                        jej
                        konkrétnej situácie vykonávané podľa § 13 ods. 1 písm. e) alebo písm. f) vrátane
                        profilovania založeného na týchto ustanoveniach. Prevádzkovateľ nesmie ďalej spracúvať
                        osobné údaje, ak nepreukáže nevyhnutné oprávnené záujmy na spracúvanie osobných údajov,
                        ktoré prevažujú nad právami alebo záujmami dotknutej osoby, alebo dôvody na uplatnenie
                        právneho nároku.
                    </li>
                </ul>

                <h3 className="m-4">f. Právo na prenosnosť</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo získať osobné údaje, ktoré sa jej týkajú a ktoré poskytla
                        prevádzkovateľovi, v štruktúrovanom, bežne používanom a strojovo čitateľnom formáte a má
                        právo preniesť tieto osobné údaje ďalšiemu prevádzkovateľovi, ak je to technicky možné a
                        ak
                        sa osobné údaje spracúvajú podľa § 13 ods. 1 písm. a), § 16 ods. 2 písm. a) alebo § 13
                        ods.
                        1 písm. b) zákona 18/2018 a spracúvanie osobných údajov sa vykonáva automatizovanými
                        prostriedkami. 18/2018 a spracúvanie osobných údajov sa vykonáva automatizovanými
                        prostriedkami.
                    </li>
                </ul>

                <h3 className="m-4">g. Právo podať návrh na začatie konania na úrad – v prípade nedodržania zákonom
                    stanovených
                    povinností zo strany prevádzkovateľa
                </h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Dotknutá osoba má právo podať návrh na začatie konania podľa § 100 zákona 18/2018 na
                        Úrad na
                        ochranu osobných údajov, ak je priamo dotknutá na svojich právach ustanovených zákonom
                        18/2018.
                    </li>
                </ul>

                <h3 className="m-4">h. Právo na neúčinnosť automatizovaného individuálneho rozhodovania vrátane
                    profilovania</h3>
                <h4 className="m-4">i. Právo podať sťažnosť dozornému orgánu</h4>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        pri spracúvaní osobných údajov na účel vymedzený v tejto informačnej povinnosti si však
                        môže
                        dotknutá osoba uplatniť len tie práva, ktoré jej vymedzený účel a právny základ na
                        podklade
                        ktorého k spracúvaniu osobných údajov o dotknutej osobe dochádza umožňujú. O týchto
                        právach
                        vždy rozhodne prevádzkovateľ po odkonzultovaní so zodpovednou osobou.
                    </li>
                </ul>

                <h3 className="m-4">Poučenie o forme požiadavky na poskytnutie osobných údajov od dotknutých
                    osôb</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Môže byť použitá forma kontaktného formulára cez web, alebo písomne, alebo telefonicky
                        prípadne osobne.
                    </li>
                </ul>

                <h3 className="m-4">Informácie o existencii automatizovaného individuálneho rozhodovania vrátane
                    profilovania</h3>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        Prevádzkovateľ vyhlasuje, že pri spracovaní poskytnutých osobných údajov nedochádza k
                        automatizovanému individuálnemu rozhodovaniu ani profilovaniu.
                    </li>
                </ul>

                <h3 className="m-4">Následky neposkytnutia osobných údajov</h3>
                <p className="mx-4">
                    Ak dotknutá osoba neposkytne osobné údaje, nebude môcť byť naplnený požadovaný účel:
                </p>
                <ul className="text-justify ml-8 mr-4">
                    <li>
                        nebude môcť dostať odpoveď na jej otázky emailovou poštou, prípadne telefonickým
                        kontaktovaním,
                    </li>
                    <li>
                        prípadne nebude môcť byť uskutočnené dodanie tovaru alebo služieb,
                    </li>
                    <li>
                        prípadne dotknuté osoby nebudú uverejnené na fotografiách.
                    </li>
                </ul>

                <h3 className="m-4">Prenos údajov do tretích krajín</h3>
                <ul className="text-justify ml-8 mr-4 mb-4">
                    <li>
                        Osobné údaje nebudú postupované do krajín mimo EU.
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default GdprInfoPage;
