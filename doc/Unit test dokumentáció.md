# Unit test dokumentáció

![A code coverage-be nem kerültek bele a getter és setter metódusok egyszerűségükből fakadóan.](Unit%20test%20dokumenta%CC%81cio%CC%81%20212f9b569a2b4c7bab980f3d7fa18dda/Untitled.png)

A code coverage-be nem kerültek bele a getter és setter metódusok egyszerűségükből fakadóan.

1. LoginService:
    - should create:
        
        A 'should create' teszt alapvetően ellenőrzi, hogy az Angular Dependency Injection rendszere sikeresen létre tud-e hozni egy LoginService példányt. Ez a teszt minta a többi Angular teszthez hasonlóan alapvető “sanity checket”-et végez, hogy lássuk, minden rendben van-e.
        
        A teszt a következő lépésekből áll:
        
        1. Előkészítés: Az Angular TestBed segítségével beállítjuk a szükséges függőségeket. Ebben az esetben a LoginService-t és valószínűleg a HttpClientTestingModule-ot is beállítjuk, ami lehetővé teszi számunkra, hogy a teszt környezetben HTTP kéréseket hajtsunk végre.
        2. Példány létrehozása: A TestBed **`inject()`** függvényét használva egy példányt hozunk létre a LoginService-ből. Ezt a service változóban tároljuk.
        3. Ellenőrzés: Végül ellenőrizzük, hogy a service változóban található-e egy LoginService példány. Az **`toBeTruthy()`** függvényt használva ellenőrizzük, hogy a service nem **`null`** és nem **`undefined`**.
        
        A 'should create' teszt kritikus annak biztosításában, hogy a LoginService helyesen van-e konfigurálva, és hogy a szükséges függőségek, mint például a HttpClient, rendelkezésre állnak-e. Ha ez a teszt sikeres, akkor biztosak lehetünk abban, hogy a LoginService példányosítható, és készen áll a további tesztek elvégzésére.
        
    - should fetch profile with correct token:
        
        Ebben a tesztben az **`LoginService`** szolgáltatás **`fetchProfile`** metódusát teszteljük, amely a Spotify API-t használva lekéri a felhasználó profilját. A teszt lépései a következők:
        
        1. Létrehozunk egy hamis választ (**`mockResponse`**), amelyet a **`fetch`** hívás során vissza szeretnénk adni, továbbá egy hamis token-t (**`mockToken`**), amit a metódus paramétereként fogunk átadni.
        2. Beállítjuk a **`fetch`** hívást, hogy a hamis választ adjon vissza a **`mockToken`** használatával.
        3. Meghívjuk a **`fetchProfile`** metódust a **`mockToken`**nel, és elvárjuk, hogy a visszaadott profil megegyezzen a hamis válasszal.
        4. Ellenőrizzük, hogy a **`fetch`** hívás a megfelelő paraméterekkel történt-e, beleértve a token-t a fejlécben.
        
        A teszt célja, hogy biztosítsa a **`fetchProfile`** metódus helyes működését, valamint hogy a **`fetch`** hívás a megfelelő paraméterekkel történik.
        
    - getAccessToken should fetch access token:
        
        Ez a teszt a LoginService getAccessToken metódusát vizsgálja. Az getAccessToken metódus feladata, hogy lekérje az hozzáférési tokent a Spotify API-tól.
        
        Először létrehozzuk a tesztelendő paramétereket (clientId és code), valamint a mockolt hozzáférési tokent és választ, amit a fetch függvény hívásakor várunk.
        
        Mockoljuk a window.fetch függvényt, hogy a teszt során az valóban csak a mockolt választ adjon vissza.
        
        Mockoljuk a localStorage.getItem függvényt is, hogy a teszt során a 'verifier' kulcshoz tartozó érték is definiált legyen.
        
        Ezután meghívjuk a getAccessToken metódust a megadott paraméterekkel, és megvárjuk, míg befejeződik (async-await segítségével).
        
        A teszt végén ellenőrizzük, hogy a fetch függvény a várt paraméterekkel lett-e meghívva, és hogy a getAccessToken metódus a várt hozzáférési tokent adja-e vissza.
        
2. LoginComponent:
    - should create:
        
        Ez a teszt azt ellenőrzi, hogy a **`LoginComponent`** komponens megfelelően létrejön-e. Célja, hogy biztosítsa a komponens alapvető működését. Ha a **`LoginComponent`** nem hozható létre, akkor további funkciói (pl. bejelentkezés, felhasználói adatok kezelése stb.) sem működhetnek megfelelően.
        
    - should have a clientId:
        
        Ez a teszt azt ellenőrzi, hogy a **`LoginComponent`** rendelkezik-e **`clientId`**-val. A **`clientId`** az alkalmazás azonosítója a Spotify API felé, amely szükséges a bejelentkezési folyamat során. A teszt célja, hogy biztosítsa a **`LoginComponent`** képes a Spotify API használatára a **`clientId`** segítségével. Ha a **`LoginComponent`**-nek nincs **`clientId`**-ja, akkor a felhasználó nem tud bejelentkezni a Spotify szolgáltatásba.
        
3. SongsComponent:
    - should create:
        
        Ez a teszt azt ellenőrzi, hogy a **`SongsComponent`** komponens megfelelően létrejön-e. A **`SongsComponent`** felelős a felhasználó által kedvelt számok megjelenítéséért és azok lejátszási listába való mentéséért. A teszt célja, hogy biztosítsa a **`SongsComponent`** alapvető működését. Ha a **`SongsComponent`** nem hozható létre, akkor további funkciói (pl. kedvelt számok listázása, lejátszási lista létrehozása stb.) sem működhetnek megfelelően.
        
    - savePlaylist should call SongsService to create playlist and add tracks:
        
        Ez a teszt a **`SongsComponent`** komponens **`savePlaylist`** metódusát teszteli. A **`savePlaylist`** metódus egy adott nevű Spotify lejátszási listát hoz létre a felhasználó által kedvelt számokkal.
        
        A teszt során a következő lépéseket hajtjuk végre:
        
        1. Előkészítjük a teszt környezetet a szükséges függőségek mock-olásával, beleértve a **`SongsService`**t és a **`localStorage`**t.
        2. Beállítjuk a **`localStorage`** és **`SongsService`** mock-okat, hogy visszaadják a teszteléshez szükséges adatokat.
        3. Meghívjuk a **`savePlaylist`** metódust egy teszt lejátszási listanévvel.
        4. Ellenőrizzük, hogy a **`localStorage.getItem`** metódust hívták-e az 'access_token' kulccsal.
        5. Ellenőrizzük, hogy a **`SongsService.createPlaylist`** metódust hívták-e a helyes paraméterekkel.
        6. Ellenőrizzük, hogy a **`SongsService.addTracksToPlaylist`** metódust hívták-e a helyes paraméterekkel.
        
        Ezzel a teszttel biztosítjuk, hogy a **`savePlaylist`** metódus a megfelelő módon hozza létre a lejátszási listát és hozzáadja a számokat.
        
4. SongsService:
    - should create:
        
        A 'should be created' teszt alapvetően ellenőrzi, hogy az Angular Dependency Injection rendszere sikeresen létre tud-e hozni egy SongsService példányt. Ez a teszt gyakran használt minta Angular tesztekben, és egy nagyon alapvető “sanity check”, hogy lássuk, minden a helyén van-e.
        
        A teszt a következő lépésekből áll:
        
        1. Előkészítés: Az Angular TestBed segítségével beállítjuk a szükséges függőségeket. Ebben az esetben a SongsService-t és a HttpClientTestingModule-ot használjuk, ami lehetővé teszi számunkra, hogy a teszt környezetben HTTP kéréseket hajtsunk végre.
        2. Példány létrehozása: A TestBed **`inject()`** függvényét használva egy példányt hozunk létre a SongsService-ből. Ezt a service változóban tároljuk.
        3. Ellenőrzés: Végül ellenőrizzük, hogy a service változóban található-e egy SongsService példány. Az **`toBeTruthy()`** függvényt használva ellenőrizzük, hogy a service nem **`null`** és nem **`undefined`**.
        
        A 'should create' teszt kritikus annak biztosításában, hogy a SongsService helyesen van-e konfigurálva, és hogy a szükséges függőségek, mint például a HttpClient, rendelkezésre állnak-e. Ha ez a teszt sikeres, akkor biztosak lehetünk abban, hogy a SongsService példányosítható, és készen áll a további tesztek elvégzésére.
        
    - addTracksToPlaylist should make a POST request to add tracks to a playlist:
        
        Ez a teszt a SongsService osztályban található **`addTracksToPlaylist`** funkciót vizsgálja. Az alábbiakban a teszt lépéseit és céljait ismertetjük:
        
        1. Beállítások: A teszteléshez beállítjuk a SongsService-t és az HttpTestingController-t, amely lehetővé teszi a HTTP kérések mockolását.
        2. Kivételkezelés: A teszt végén ellenőrizzük, hogy nincsenek-e függőben lévő kérések.
        3. Teszt: Az **`addTracksToPlaylist`** funkció tesztje során POST kérést hajtunk végre, hogy hozzáadjunk dalokat egy lejátszási listához. Ebben a tesztben egy mockolt hozzáférési tokent, lejátszási lista azonosítót és dal URI-kat használunk.
        4. Ellenőrzés: Ellenőrizzük, hogy a kérés URL-je helyes-e, a kérés módszere POST-e, és hogy a 'Authorization' fejléc a megfelelő hozzáférési tokent tartalmazza-e. Végül a mockolt válasz alapján ellenőrizzük, hogy a funkció visszatér-e a várt értékkel.
        
        A teszt célja, hogy megbizonyosodjunk róla, hogy az **`addTracksToPlaylist`** funkció helyesen kommunikál-e a Spotify API-val, és hogy a megfelelő választ adja-e a HTTP kérésekre. Ezt a tesztet izolált környezetben végzik, tehát nem történik valódi kommunikáció a Spotify API-val, csak a funkció működését szimuláljuk.
        
    - createPlaylist should send POST request to create new playlist:
        
        A teszt '#createPlaylist should send POST request to create new playlist' a SongsService **`createPlaylist`** metódusát vizsgálja, amely egy POST kérést küld a Spotify API-nak, hogy létrehozzon egy új lejátszási listát.
        
        A teszt a következő lépésekből áll:
        
        1. Előkészítés: A teszt beállít egy mock adathalmazt, amely tartalmazza a token adatot, a lejátszási lista nevét és a felhasználói azonosítót, amit a localStorage-ból vesz. A teszt egy mock választ is beállít, amelyet a Spotify API válaszána használ.
        2. Szolgáltatás hívása: A teszt meghívja a **`createPlaylist`** metódust a beállított adatokkal.
        3. Ellenőrzések: A teszt ellenőrzi, hogy a metódus a megfelelő URL-re küldött-e POST kérést a **`HttpTestingController.expectOne()`** segítségével. Azt is ellenőrzi, hogy a kérés törzse (body) megfelelő-e, ami a lejátszási lista neve kell legyen. Végül ellenőrzi, hogy a 'Authorization' header a várakozásnak megfelelően tartalmazza-e a 'Bearer' + token string-et.
        4. Válasz küldése: Miután a kérés a vártak szerint történt, a teszt a **`req.flush(mockResponse)`** segítségével küld egy mock választ, ami a Spotify API válaszát szimulálja.
        
        Ez a teszt segít biztosítani, hogy a **`createPlaylist`** metódus helyesen kommunikál a Spotify API-val, és megfelelően kezeli a választ. Ez egy fontos része a SongsService osztály tesztelésének, mivel ez az egyik fő funkciója, hogy segítsen a felhasználóknak lejátszási listákat létrehozni a Spotify rendszerben.
        
5. FiltersComponent:
    - should create:
        
        Ez a teszt azt hivatott ellenőrizni, hogy a **`FiltersComponent`** megfelelően létrejön-e. Általánosságban a "should create" tesztek arra szolgálnak, hogy ellenőrizzék, helyesen inicializálódik-e egy adott osztály vagy komponens. Ezt úgy teszi, hogy meghívja az osztály konstruktorát, és létrehozza a példányt.
        
        Ez a teszt fontos azért, mert ha egy komponens nem jön létre megfelelően, az a teljes alkalmazás hibás működéséhez vezethet.
        
        A teszt lépései a következők:
        
        1. Az előkészítő (beforeEach) blokkban először inicializáljuk a teszt környezetet a **`TestBed.configureTestingModule`** metódussal, ahol meghatározzuk a szükséges modulokat és szolgáltatásokat. Itt a **`FiltersComponent`** szolgáltatást hozzuk létre.
        2. Azután, az előkészítő blokkban létrehozzuk a **`FiltersComponent`** példányt a **`TestBed`** segítségével.
        3. Végül a tesztben (**`it`** blokk) azt ellenőrizzük, hogy a **`FiltersComponent`** példány létezik-e (nem **`null`** vagy **`undefined`**). Ezt az **`expect(component).toBeTruthy();`** sorral tesszük, ami azt jelenti, hogy elvárjuk, hogy a **`component`** értéke igaz legyen, vagyis létező objektum.
        
        Ez a teszt annak ellenőrzésére szolgál, hogy a **`FiltersComponent`** komponens megfelelően létrejön-e, és készen áll-e a további tesztek elvégzésére.
        
    - onGenreToggle should add genre if it is not already selected:
        
        Ez a teszt azt a célt szolgálja, hogy ellenőrizze az onGenreToggle funkció működését, amikor egy műfajt még nem választottak ki. Először definiálunk egy testGenre változót, és beállítjuk a FiltersService filterSongsByGenres metódusát úgy, hogy üres tömböt adjon vissza. Ez azt szimulálja, hogy a műfajt még nem választották ki, és ezért nincsenek ennek a műfajnak megfelelő szűrt dalok.
        
        Ezután meghívjuk az onGenreToggle funkciót a testGenre változóval, ami a felhasználó műfajválasztó tevékenységét szimulálja.
        
        Végül két eredményt ellenőrzünk:
        
        A testGenre mostantól szerepelnie kell a selectedGenres halmazban, ami azt jelenti, hogy a műfajt helyesen választották ki.
        A FiltersService filterSongsByGenres metódusának hívódni kellett, ami azt jelzi, hogy a komponens helyesen próbálta meg szűrni a dalokat a kiválasztott műfajok alapján.
        
    - onGenreToggle should remove genre if it is already selected:
        
        Ez a teszt azt célozza meg, hogy megerősítse az onGenreToggle funkció működését, amikor egy műfaj már ki van választva. Ismét definiálunk egy testGenre változót, és hozzáadjuk a selectedGenres halmazhoz, amely egy előre kiválasztott műfajt szimulál. Ezután beállítjuk a FiltersService filterSongsByGenres metódusát, hogy üres tömböt adjon vissza.
        
        Ezután meghívjuk az onGenreToggle funkciót a testGenre változóval, amely egy felhasználó műfajt eltávolító tevékenységét szimulálja.
        
        Végül két eredményt vizsgálunk:
        
        A testGenre-t most el kell távolítani a selectedGenres halmazból, ami azt jelzi, hogy a műfajt helyesen távolították el.
        A FiltersService filterSongsByGenres metódusának hívódnia kellett, ami azt mutatja, hogy a komponens helyesen próbált meg frissítést végezni a szűrt dalokon a műfaj eltávolítása után.
        
6. FiltersService:
    - fetchLikedTracksWithGenres should return liked tracks with genres
        
        Ez a teszt a **`fetchLikedTracksWithGenres`** metódus működését vizsgálja a **`FiltersService`** szolgáltatásban. A teszt a következő lépéseket hajtja végre:
        
        1. Előkészíti a tesztelendő funkcióhoz szükséges adatokat, beleértve a teszt-tokeneket, a mock szeretett dalok listáját és a művészek adatait.
        2. Meghívja a **`fetchLikedTracksWithGenres`** függvényt egy teszt-tokennel, és várja a választ.
        3. Amikor a függvény visszatér, a teszt megnézi, hogy a visszaadott szeretett dalok adataihoz műfajok lettek-e hozzáadva.
        
        A teszt célja annak ellenőrzése, hogy a **`fetchLikedTracksWithGenres`** funkció helyesen hajtja-e végre a műfajok hozzárendelését a szeretett dalokhoz. Ha a szeretett dalok listája helyesen van kiegészítve a műfajokkal, akkor a teszt sikeres. Ha a műfajok nem jelennek meg helyesen, vagy nem a várt műfajok jelennek meg, akkor a teszt sikertelen.
        
        Ez a teszt hasznos lehet a **`fetchLikedTracksWithGenres`** függvény hibakeresésében és a jövőbeni fejlesztések ellenőrzésében, hogy a funkció továbbra is a várt módon működik-e.
        
    - fetchArtists should fetch artists from Spotify API
        
        A kód egy egységtesztet reprezentál a **`FiltersService`** osztály **`fetchArtists`** metódusára. Az egységteszt először létrehozza a szükséges tesztkörnyezetet, beleértve a megfelelő tesztelendő szolgáltatások és a mock függőségek inicializálását. Ezután a teszt ellenőrzi, hogy a **`fetchArtists`** metódus helyesen hívja-e meg a **`fetch`** függvényt a megfelelő paraméterekkel, és hogy az eredményül kapott adatok megfelelőek-e.
        
        Ez a teszt ellenőrzi a **`fetchArtists`** metódus helyes működését azzal, hogy meghívja a Spotify API-t a megfelelő művelet végrehajtására, majd ellenőrzi az eredményeket. Ha a teszt sikeresen lefut, akkor azt jelenti, hogy a **`fetchArtists`** metódus helyesen kommunikál a Spotify API-val és megfelelő adatokat kap vissza.
        
        A teszt célja, hogy bizonyítsa a **`FiltersService`** osztály **`fetchArtists`** metódusának helyes működését, és ellenőrizze, hogy a metódus helyesen kommunikál-e a Spotify API-val és megfelelő választ kap-e.
        
    - getTopGenres should return top genres from local storage
        
        A kód egy egységtesztet reprezentál a **`FiltersService`** osztály **`getTopGenres`** metódusára. Az egységteszt először létrehozza a szükséges tesztkörnyezetet, beleértve a megfelelő tesztelendő szolgáltatások és a mock függőségek inicializálását. Ezután a teszt ellenőrzi, hogy a **`getTopGenres`** metódus helyesen kezeli-e a helyi tárolóból érkező adatokat és visszaadja-e a helyes eredményt.
        
        Ez a teszt ellenőrzi a **`getTopGenres`** metódus helyes működését azzal, hogy beállítja a helyi tároló értékét a megfelelő top műfajokra, majd meghívja a metódust. Ezután ellenőrzi, hogy a metódus helyesen visszaadja-e a tárolóból érkező adatokat.
        
        A teszt célja, hogy bizonyítsa a **`FiltersService`** osztály **`getTopGenres`** metódusának helyes működését, és ellenőrizze, hogy a metódus helyesen kezeli-e a helyi tárolóból érkező adatokat és visszaadja-e a helyes eredményt.
        
7. PlaylistNameDialogComponent:
    - should create
        
        A kód egy egységtesztet reprezentál a **`PlaylistNameDialogComponent`** komponensre. Az egységteszt felállítja a szükséges tesztelési környezetet a szükséges modulok importálásával és a megfelelő hamis adatok és függőségek biztosításával. Ezután létrehoz egy példányt a komponensből és ellenőrzi, hogy sikeresen létrejön-e.
        
        Ez a teszt arra törekszik, hogy biztosítsa, hogy a **`PlaylistNameDialogComponent`** komponens hibamentesen létrehozható legyen. Ellenőrzi, hogy a komponens sikeresen példányosítható és hogy a létrehozási folyamat során ne dobjon kivételt.
        

## Záró gondolatok

Amikor fejlesztettem az alkalmazást a szűkös határidőből adódóan nem igazán jutott időm arra, hogy teszteket írjak az egyes funkciókhoz, komponenesekhez. Most visszatekintve, biztos vagyok benne, hogy pár fejlesztés közbeni teszt eset létrehozásával hamarabb rájöttem, volna mi okozta néha a problémát a programban és lehet, hogy megmentett volna jó pár óra fájdalmas debuggolástól. 

Először nem igazán tudtam, hogy álljak neki tesztelni azokat a komponenseket amik hálózati kommunkációt folytatnak. A stub-ok és mock-ok fogalmával már tisztában voltam, de nem igazán tudtam gyakorlatban, hogyan alkalmazhatnám őket ilyen esetekben. Kis kutatómunka után viszont rájöttem, hogy sokkal egyszerűbb feladatról van szó, mint azt gondoltam.

A tesztelés közben, nagyon kellemes meglepetés volt még a Karma tesztkörnyezet, amit most használtam, de ennyi interakció után elmondhatom, hogy kényelmes és jól nyomonkövethető benne minden teszt és annak kimenetele. Szintén könnyítette a munkámat, hogy az Angular úgy ahogy, a fejlesztésben, a tesztelésben is szorosan fogja az ember kezét és szinte adta magát, hogy a különböző komponensek és service-ek önálló tesztosztályok legyenek.

Összeségében úgy gondolom mindenképpen hasznos volt a tesztek írása, mert egy másik nézőpontból tudtam nézni az alkalmazásomat és ebből fakadóan például olyan hibákat is felfedeztem amiket, a tesztek írása nélkül lehet nem fedeztem volna.