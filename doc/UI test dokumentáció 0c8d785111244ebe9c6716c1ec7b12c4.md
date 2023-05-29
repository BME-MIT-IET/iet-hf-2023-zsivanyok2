# UI test dokumentáció

## UI tesztek

A UI tesztek python nyelven írt Selenium-mal készültek, amivel minden gomb és funkcionalitása tesztelve van az alkalmazáson belül. A tesztek működéséhez az alábbi pip csomagok lettek még felhasználva:

> pip install selenium
pip install beautifulsoup4
pip install requests
> 

illetve:

Google Chrome-on futtatva az alkalmazást, tesztrendszert: chromedrive.exe

nevű fájlt használja fel. 

Mivel csak egy régebbi verziójú chrome-hoz van csak ez a program, így a teszt közben voltak csomagelavulásra figyelmeztetések, de az alkalmazás nem követelt olyan fajta tesztelést, amit zavart volna a régebbi verzió, a UI tesztek kimenetelét nem befolyásolta.

Az alkalmazás “normál” angular (vagyis a fejlesztés közben ng serve parancsot kiadva és localhost-on nlzve)tesztelésnél egyből az adatkezelési feltételek elfogadtatásához dob, a Selenium tesztelő webdriver azonban egy friss ablakot nyit meg egy spotify login képernyővel, így egy újabb oldallal kiegészítve az alaklmazást. Így minden teszt ezen két oldal (login és feltétel-elfogadás) átlépésével kezdődik, amely kezdetben plusz munkának bizonyult, az alap user experience-hez képest, amit az alkalmazás mutatott.

![11 teszt olyan teszt, amelyik minden alkalommal újra elvégzi a belépést, így megadva a teszteknek módnélküliséget, és egymástól függetlenül való tesztelhetőséget. Ezek a függvények tesztelik az alkalmazás különböző funkcióit és ellenőrzik a várt eredményeket.](UI%20test%20dokumenta%CC%81cio%CC%81%200c8d785111244ebe9c6716c1ec7b12c4/teszteredmeny.png)

11 teszt olyan teszt, amelyik minden alkalommal újra elvégzi a belépést, így megadva a teszteknek módnélküliséget, és egymástól függetlenül való tesztelhetőséget. Ezek a függvények tesztelik az alkalmazás különböző funkcióit és ellenőrzik a várt eredményeket.

- Tesztek:
    1. **test_login**:
        
        Ez a függvény teszteli a bejelentkezési funkcionalitást. Kitölti a felhasználónév és jelszó mezőket, majd rákattint a bejelentkezés gombra. Ellenőrzi, hogy a bejelentkezés után a megfelelő oldal betöltődik-e.
        
    2. **test_filter_button**:
        
        Ez a függvény teszteli a szűrő gomb funkcionalitását. Rákattint a szűrő gombra és ellenőrzi, hogy a megfelelő oldal betöltődik-e.
        
    3. **test_list_titles**:
        
        Ez a függvény teszteli a címek listázását. Ellenőrzi, hogy a címek láthatóak-e a megfelelő oldalon.
        
    4. **test_list_artist**:
        
        Ez a függvény teszteli a művészek listázását. Ellenőrzi, hogy a művészek láthatóak-e a megfelelő oldalon.
        
    5. **test_save_playlist_dialog**:
        
        Ez a függvény teszteli a lejátszási lista mentési párbeszédablakát. Ellenőrzi, hogy a párbeszédablak megjelenik-e a megfelelő esemény bekövetkeztekor.
        
    6. **test_save_playlist_cancel**:
        
        Ez a függvény teszteli a lejátszási lista mentésének megszakítását. Ellenőrzi, hogy a megszakítás gombja működik-e és a gomb eltűnik-e a megfelelő esemény bekövetkeztekor.
        
    7. **test_save_playlist_request**:
        
        Ez a függvény teszteli a lejátszási lista mentési gomb működését, megjelenését.
        
    8. **test_filter_selection**:
        
        Ez a függvény teszteli a szűrő kiválasztását. Ellenőrzi, hogy a szűrőelemek kattinthatóak-e és kilistázza a szűrőelemek neveit.
        
    9. **test_filter_selection_clickable**:
        
        Ez a függvény teszteli a kattintható szűrő kiválasztást. Ellenőrzi, hogy a szűrőelemek kattinthatóak-e és ellenőrzi, hogy az elemek kiválasztása működik-e.
        
    10. **test_filter_clear_button**:
        
        Ez a függvény teszteli a szűrő törlés gombját. Ellenőrzi, hogy a törlés gombja működik-e és törli-e az összes szűrőt.
        
    11. **test_filter_show_button**:
        
        Ez a függvény teszteli a szűrő megjelenítés gombját. Ellenőrzi, hogy a megjelenítés gombja működik-e és a megfelelő oldal betöltődik-e a gombra kattintás után.
        

Élménybeszámoló:

Nem folglalkoztam még behatóbban teszteléssel tanulmányaim során, de ez a feladatrész sokkal izgalmasabbnak bizonyult, mint amit a tesztelés témakörétől vártam. Nagyon kézenfekvőnek tűnt a Selenium, mint tesztelőrendszer, annak ellenére, hogy nincs még túl mély tudásom alapvetően pythonban sem. Bár a bejelentkezési képernyőn való túljutás kezdetben nehézséget okozott, mivel az alkalmazás kézi tesztelésénél ez a lépés nem volt meg, és itt hivatalos spotify képernyőn kellett a Seleniumot járatni, nem a saját ismert kódú alkalmazáson. Illetve az alkalmazás elemeinél a material design, és ezenfelül a dinamikusan megjelenő dialógusablak(ok) mind okozott némi nemértést, keresgélést és ezáltal plusz időt, de ennek ellenére mégis azt tudom mondani, egészen könnyen testreszabható tesztelő-tool, amibe érdemes volt magamat beleásni. Ezenkívűl, ami nem volt teljesen egyértelmű számomra, hogy bár a Selenium már nyomna egy gombot, az oldal nyilván nem olyan sebességgel tölti be az egyes elemeit, így minden ilyen műveletre kellett rakni egy figyelmeztetést, hogy várakozzon addig, ameddig nem lesz megnyomható. Ezek persze mind apró, kezdő problémák, de örülök, hogy végül mindegyiken túljutottam. A feladat megoldását átértékelve persze látom, hogy hol lehetne a jövőben fejleszteni egy ilyen tesztet, például mock hálózati kéréseket és válaszokat vizsgálni, jobban osztályokra szeparálni a Selenium kódot, illetve amit csak lehet változókba és függvényekbe szervezni.