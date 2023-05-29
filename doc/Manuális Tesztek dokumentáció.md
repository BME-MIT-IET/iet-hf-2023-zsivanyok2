# Manuális Tesztek

Determinisztikusság tesztelés:

1. Alkalmazás indítása, bejelentkezés
    1. A [http://localhost:4200](http://localhost:4200/) honlap egyből a Spotify bejelentkező oldalára irányít.
    2. Itt a helyes adatok megadásával, a a felhasználót a böngésző a [http://localhost:4200/songs](http://localhost:4200/songs) oldalra továbbítódik
        - username/email:  IET Enjoyer / ietenjoyer@gmail.com
        - password: IEThazi2023
2. Dalok szinkronizáltsága
    1. A sikeres bejelentkezést követően, a felhasználó látja kedvelt zeneszámait, ennek helyes mennyiségét
    2. Egy új böngészőoldalon a [https://accounts.spotify.com/en/login](https://accounts.spotify.com/en/login) oldalon ismét bejelentkezve, kedvelt zeneszámainak számát módosítva, majd a Genrefy oldalre frissítve a módosított zenelista jelenik meg
3. filterek alkalmazása és szűrés
    1. A lila “Filters” gombra kattintva megjelennek a felhasználó top 9 műfajai
    2. A különböző műfajokra a kattintva, látható, hogy hány dal felel meg az adott szűrésnek
    3. A “Clear all” gombra kattintva egyszerre törlődik az összes filter
    4. A filterek alkalmazása után a “Show result” gombra kattintva visszatérünk a [http://localhost:4200/songs](http://localhost:4200/songs) oldalra, itt mindig a szűrésnek megfelelő mennyiségű dalt látunk
    5. Ha a felhasználó olyan filterkombinációt készített, melyre 0 zene feleltethető meg, a “Show result” gombra kattintva az összes számot fogja látni, és törlődik az összes aktivált filter
4. Műsorlista készítése
    1. A [http://localhost:4200/songs](http://localhost:4200/songs) oldalról, bármikor megnyomhatjuk a felső menüben lévő “Save playlist” gombot. A gomb megnyomása után egy felugró ablakon tudjuk megadni az elmenteni kívánt műsorlista nevét.
    2. A műsorlistanévadó ablakban bármilyen nevet adhatunk a listánknak, akkor is ha létezik már azonos névvel lista
    3.  Véglegesíteni listamentést a megadott névvel a “Save” gombbal tehetjük meg, ez után a Spotify fiókunkon már hallgatható is a lista
    4. A műsorlistanévadó ablakból kilépést a “Cancel” gombbal, vagy egy a kis ablakon kívüli kattintással tehetjük meg
5. Ui 
    1. Az alkalmazás különböző ablakméreteknél is működik 
6. Szélső értékek
    1. Az alkalmazás internet nélkül nem tudja frissíteni a zene listáját, menteni a lejátszási listákat
    2. A betöltött zenéket az oldal frissítése nélkül offline is böngészhetjük
    3. Nagyobb zenelistáknál az alkalmazás lassú lehet memóriaigény miatt

## Zárógondolatok

Kezdetben nehéz volt belefogni a feladatba, kissé unalmasnak és repetatívnak láttam a témakört. Utólag ezt teljesen újraértékeltem.

Talán kezdetben azért gondoltam így mert elég megfoghatatlan volt a manuális tesztelés. Több forrásból is próbáltam megbizonyosodni, hogy hogyan kellene ezt pontosan milyen formában kellene megvalósítani, dokumentálni. Több módját is találtam a feladat megvalósítására, külön dokumentáló programtól, szimpla használati utasításhoz hasonlítható dokumentumig. Végül egy köztes megoldás mellett döntöttem, ahol a tesztelő saját tapasztalatait ellenőrizheti az elvárt eredmény függvényében. Ezeket a tapasztalatokat a mellékelt exeltáblában vezetheti és a programot az adott teszteknek megfeleltnek vagy nem megfeleltnek nyilváníthatja. A funkcionális tesztek mellett a teszt kitér a felhasználói élmény felmérésére is. Ezekre a kérdésekre a tesztelő, 1-5ig pontozhatja a program felhasználásával kapcsolatos élményeit. 

A tesztelés eredményeit egy másik munkafüzetben összesítettem, így a független tesztelővel elég az exeltábla csak egy munkafüzetét megosztani. Ezzel a környezet könnyen bővíthető, ha több tesztelőt is szeretnénk.

Munkám a közös gyűléseken való részvételből, a feladatról való kutatásból, a programunkkal való ismerkedésből, funkcióinak dokumentálásából, ezen funkcióknak megfelelő tesztek írásából, majd a dokumentáló-eredményösszesítő exel létrehozása volt.