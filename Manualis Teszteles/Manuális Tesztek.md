# Manuális Tesztek

1. Alkalmazás indítása, bejelentkezés
    - 1.1 Teszt: Indítás
        
        Utasítás: 
        
        Az alkalmazás indítása után, egy böngészőablakban lépjen a  [http://localhost:4200](http://localhost:4200/) honlapra
        
        - Elvárt eredmény
            
            A [http://localhost:4200](http://localhost:4200/) honlap egyből a Spotify bejelentkező oldalára irányít.
            
    - 1.2 Teszt: Bejelentkezés
        
        Utasítás: A Spotify honlapján jelentkezzen be a következő adatokkal:
        
        - username/email:  IET Enjoyer / ietenjoyer@gmail.com
        - password: IEThazi2023
        - Elvárt eredmény
            
            A helyes adatok megadásával, a felhasználót a böngésző a [http://localhost:4200/songs](http://localhost:4200/songs) oldalra továbbítja
            
2. Dalok szinkronizáltsága
    - 2.1 Teszt: Listázás
        
        Utasítás: A sikeres bejelentkezést követően, figyelje meg a [http://localhost:4200/songs](http://localhost:4200/songs) oldalt
        
        - Elvárt eredmény
            
            A felhasználó látja kedvelt zeneszámait, ezeknek helyes mennyiségét
            
    - 2.2 Teszt: Frissítés
        
        Utasítás: Nisson egy új böngészőoldalt, navigáljon a [https://accounts.spotify.com/en/login](https://accounts.spotify.com/en/login) oldalra, ismét bejelentkezve, módosítsa kedvelt számainak mennyiségé, majd frissítse a Genrefy oldalt
        
        - Elvárt eredmény
            
            A Genrefy oldalt frissítve a módosított kedvelt zenék listája jelenik meg
            
3. Filterek alkalmazása és szűrés
    - 3.1 Teszt: megjelenés, navigálás
        
        Utasítás: Kattintson a filters gombra
        
        ![Untitled](/ManualisTesztek/Untitled.png)
        
        - Elvárt eredmény
            
            A böngésző átirányul a [http://localhost:4200/filters](http://localhost:4200/filters) oldalra és megjelennek a felhasználó kedvelt műfajai (maximum 9 kedvelt műfaj)
            
    - 3.2 Teszt: Filterek használata
        
        Utasítás: Kattintson a különböző műfajokra, kombinálja ezeket
        
        ![Untitled](/ManualisTesztek/Untitled1.png)
        
        - Elvárt eredmény
            
            Látható, hogy változik az aktivált műfajfiltereknek megfeleő dalok száma
            
    - 3.3 Teszt: Clear all
        
        Utasítás: Több műfajt kiválasztása után kattintson a “Clear all” gombra
        
        ![Untitled](/ManualisTesztek/Untitled%202.png)
        
        - Elvárt eredmény
            
             egyszerre törlődik az eddig kikelölt összes műfajfilter
            
    - 3.4 Teszt: Filteres listázás
        
        Utasítás: Alkalmazzon filtereket, majd kattintson a “Show result” gombra
        
        ![Untitled](/ManualisTesztek/Untitled%203.png)
        
        - Elvárt eredmény
            
            A böngésző visszatér a [http://localhost:4200/songs](http://localhost:4200/songs) oldalra, és a szűrésünknek megfelelő mennyiségű dalt látjuk
            
    - 3.5 Teszt: Filteres listázás 0 dalra
        
        Utasítás: Alkalmazzon annyi filtereket hogy ne legyen megfelelő dal, majd kattintson a “Show result” gombra
        
        ![Untitled](/ManualisTesztek/Untitled%203.png)
        
        - Elvárt eredmény
            
            A böngésző visszatér a [http://localhost:4200/songs](http://localhost:4200/songs) oldalra, és összes kedvelt dalunkat látjuk, visszatérve a filterekhez a filterek kitörlődtek
            
4. Műsorlista készítése
    - 4.1 Teszt: Save playlist
        
        Utasítás: A [http://localhost:4200/songs](http://localhost:4200/songs) oldalról, nyomhatjuk meg a felső menüben lévő “Save playlist” gombot.
        
        ![Untitled](/ManualisTesztek/Untitled%204.png)
        
        - Elvárt eredmény
            
            A gomb megnyomása után megjelenik egy felugró ablak, ahol meg tudjuk adni az elmenteni kívánt műsorlista nevét.
            
    - 4.2 Teszt: Mentés
        
        Utasítás: Írjunk be egy nevet(ez akár egyezhet egy már meglévő lista nevével is), majd véglegesítsük a listamentést a beírt névvel a “Save” gombra kattintva
        
        ![Untitled](/ManualisTesztek/Untitled%205.png)
        
        - Elvárt eredmény
            
            A Spotify fiókunkon már hallgatható is a lista
            
    - 4.3 Teszt: Cancel
        
        Utasítás: Lépjünk ki a lejátszási lista névadó ablakból, a “Cancel” gombra kattintva, vagy az kis-ablakból való kikattintással
        
        ![Untitled](/ManualisTesztek/Untitled%206.png)
        
        - Elvárt eredmény
            
            Visszatérünk a listázott dalokhoz, nem mentődik a lejátszási lista
            
5. Ui 
    - 5.1 Teszt: Ablakméretezés, böngészőfüggetlenség
        
        Utasítás: Módosítsuk az ablak méretét, vagy próbáljuk ki másik böngészőben
        
        - Elvárt eredmény
            
            Az elvárt megjelenés megjelenik az alkalmazás funkciói továbbra is működnek
            
6. Szélső értékek
    - 6.1 Teszt: Offline működés
        
        Utasítás: Az alkalmazása betöltése után szüntesse meg a hálózatelérést, próbáljon szűrni majd lejátszási listát menteni
        
        - Elvárt eredmény
            1. A betöltött zenéket az oldal frissítése nélkül offline is böngészhetjük, szűrhetjük de az alkalmazás internet nélkül nem tudja frissíteni a zene listáját, menteni a lejátszási listákat
    - 6.2 Teszt: Stresszteszt
        
        Utasítás: Jelentkezzen be az előre egyeztetett Spotify felhasználóval melynek sok kedvelt zenéje van
        
        - Elvárt eredmény
            1. Látható, hogy nagyobb kedvelt zenelistáknál az alkalmazás lassabb lesz