//sprawdź wektormaker
var tablica_gry_PLAYER = [], tablica_gry_KOMPUTER = [], przypadek = 0, tablica_ruchoma = [], moge_czy_nie = false, tablica_uzytych = [], klikniety = 10 // tablica [[x: , y: , wolny : (true/false/protected)]]  protected to specjalnie wprowadzona wartośc oznaczająca że nie ma tam statku jednak nie można też tam go wstawić
const tablica_id_containerow = ["ships_container", 'gamer_container', 'gamer_container_pc']
//IA stuff
var tablica_trafien = [], poziom = 5 //ustawiam na 5 bo nigdy nie będzie 5)
//ia stuff OP
//EE stuff 
var kod = ''
var tablica_trafien_pc_OPAI = [], tablica_pozyji_statku = []
// window.onload = setInterval(() => {
//     var audio = new Audio('./audio/Sonar ping.mp3');
//     audio.volume = 0.03;
//     audio.onload = function () {
//         console.log("DZIAŁA AUDIO ")
//     }
//     audio.play();
// }, 6000);
window.addEventListener('DOMContentLoaded', restartor_creator) // ładuje przy ładowniu strony bo jestem prędkością i nie będę na jakieś body czekał
function restartor_creator() {
    tablica_trafien = []
    tablica_gry_PLAYER = [], tablica_gry_KOMPUTER = [], przypadek = 0, tablica_ruchoma = [], moge_czy_nie = false, tablica_uzytych = [], klikniety = 10
    window.addEventListener('contextmenu', (e) => {                      //  
        e.preventDefault();                                             //  Wyłączam domyślne context menu
    }, false)                                                           //  ^
    while (document.body.firstChild) {                                            //czyszczę divy
        document.body.removeChild(document.body.firstChild);                                //czyszczę div
    }
    //tworzę wszyskie containery                                                             //czyszczę div
    create_containers();
    game_player_bord_creator("gamer_container_pc", tablica_gry_KOMPUTER);
    //buduje statki 
    lista_statkow_creator();
    //#######CZĘŚĆ DLA KOMPA################
    //tworzę planszę dla kompa
    game_player_bord_creator("gamer_container", tablica_gry_PLAYER);
    // //rysuje 4 maszta
    set_pc_ship_position_CZTEROMASZTOWIEC(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    // // //rysuje rysuje i generuje 3 maszty
    set_pc_ship_position_TROJMASZT(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    set_pc_ship_position_TROJMASZT(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    // // // //rysuje i generuje dwumaszty 
    set_pc_ship_position_DWUMASZT(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    set_pc_ship_position_DWUMASZT(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    set_pc_ship_position_DWUMASZT(tablica_gry_KOMPUTER, false, null, 'gamer_container_pc')
    // // rysuje jedynki 
    set_pc_ship_position_JEDNOMASZT(tablica_gry_KOMPUTER, false, 'gamer_container_pc')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_KOMPUTER, false, 'gamer_container_pc')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_KOMPUTER, false, 'gamer_container_pc')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_KOMPUTER, false, 'gamer_container_pc')
    przeciaganie_Statkow_uzytkownika();
    defould_selected_ship();
    //tworze butona losowania 
    var tworzenie_przycisku = document.createElement("button")
    tworzenie_przycisku.appendChild(document.createTextNode("AUTOMATYCZNE LOSOWANIE"))
    // tworzenie_przycisku.classList.add() TODO dodaj mu klase jak nie będziesz tak leniwy żeby tego nie robić
    tworzenie_przycisku.id = 'auto_rand'
    document.getElementById('button_section').appendChild(tworzenie_przycisku)
    document.getElementById('auto_rand').addEventListener('click', automatic_random_for_player);
    //tworze buttona wyciszenia dźwięku sonara
    // var mute = document.createElement("button")
    // tworzenie_przycisku.classList.add() TODO dodaj mu klase jak nie będziesz tak leniwy żeby tego nie robić
    // mute.addEventListener('click', function () {
    // })
    // document.getElementById('button_section').appendChild(tworzenie_przycisku)

}
//tworzy container - FUNCKJA SPRAWDZONA 
function container_and_radar_creator_for_pc() {
    var pc_cont = document.createElement('div')          //tworzę diva który będzie screenem
    pc_cont.classList.add('screen')
    document.body.appendChild(pc_cont)                   //appenduje 
    //tworzę schamt sonrau 
    for (i = 0; i < 5; i++) {
        pc_cont.appendChild(document.createElement('li'))
    }
    var creation = document.createElement('div')
    creation.classList.add('games_container')
    creation.id = tablica_id_containerow[2];
    pc_cont.appendChild(creation)
    document.getElementById('radar_container').appendChild(pc_cont)

}
//tworzy container - FUNCKJA SPRAWDZONA 
function container_and_radar_creator_for_player() {
    var pc_cont = document.createElement('div')          //tworzę diva który będzie screenem
    pc_cont.classList.add('screen')
    // document.body.appendChild(pc_cont)                   //appenduje 
    //tworzę schamt sonrau 
    for (i = 0; i < 5; i++) {
        pc_cont.appendChild(document.createElement('li'))
    }
    var creation = document.createElement('div')
    creation.classList.add('games_container')

    creation.id = tablica_id_containerow[1];
    pc_cont.appendChild(creation)
    document.getElementById('radar_container').appendChild(pc_cont)
}
//tworzy container - FUNCKJA SPRAWDZONA 
function create_containers() {
    var buttondiv = document.createElement('div')     //tworzę diva który będzie screenem
    buttondiv.id = 'button_section'                     //dodaję mu id containera gry
    document.body.appendChild(buttondiv)                 //appenduje 
    //tworzę sonar dla 
    var pc_cont = document.createElement('div');
    pc_cont.id = tablica_id_containerow[0]
    document.body.appendChild(pc_cont)
    //tworze container sonarów 
    var container = document.createElement('div')
    container.id = "radar_container"
    document.body.appendChild(container)
    container_and_radar_creator_for_player()
    container_and_radar_creator_for_pc()
}
// - FUNCKJA SPRAWDZONA 
function automatic_random_for_player() {
    if (tablica_ruchoma.length != 0) {
        for (i = 0; i < tablica_ruchoma.length; i++) {
            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "none"
        }
    }
    document.getElementById('ships_container').innerHTML = ""//czyszcze diva
    tablica_uzytych = [];
    document.getElementById('gamer_container').removeEventListener('mousemove', shipmover);          //poozwalam na zmienianie pozycji diva
    document.getElementById('gamer_container').removeEventListener('mousedown', ship_rotator)
    set_pc_ship_position_CZTEROMASZTOWIEC(tablica_gry_PLAYER, false, null, 'gamer_container')
    // //rysuje rysuje i generuje 3 maszty
    set_pc_ship_position_TROJMASZT(tablica_gry_PLAYER, false, null, 'gamer_container')
    set_pc_ship_position_TROJMASZT(tablica_gry_PLAYER, false, null, 'gamer_container')
    // // //rysuje i generuje dwumaszty 
    set_pc_ship_position_DWUMASZT(tablica_gry_PLAYER, false, null, 'gamer_container')
    set_pc_ship_position_DWUMASZT(tablica_gry_PLAYER, false, null, 'gamer_container')
    set_pc_ship_position_DWUMASZT(tablica_gry_PLAYER, false, null, 'gamer_container')
    // // rysuje jedynki 
    set_pc_ship_position_JEDNOMASZT(tablica_gry_PLAYER, false, 'gamer_container')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_PLAYER, false, 'gamer_container')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_PLAYER, false, 'gamer_container')
    set_pc_ship_position_JEDNOMASZT(tablica_gry_PLAYER, false, 'gamer_container')
    if (tablica_uzytych.length == 0) {
        document.body.removeChild(document.getElementById('ships_container'))
        endgame();
    }
    document.getElementById('button_section').removeChild(document.getElementById('auto_rand'))
}
//############_WYBIERANIE_STATKÓW_################
//funkcja ładująca- FUNCKJA SPRAWDZONA 
function defould_selected_ship() { //ustawia defoultowo pozycje dla 4 maszta
    selector = '#ships_container div:nth-child(' + klikniety + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
    document.querySelector(selector).style.background = "green";            //nadaję mu kolor aktywnego
    color_mover_maker(10, tablica_uzytych[klikniety - 1], przypadek)
    document.getElementById('gamer_container').addEventListener('mousemove', shipmover);          //poozwalam na zmienianie pozycji diva
    document.getElementById('gamer_container').addEventListener('mousedown', ship_rotator)
}
//funkcja do "łapania statków użytkowika" DODAJ PLAYERA GDY SIE SKOŃCZY - FUNCKJA SPRAWDZONA 
function przeciaganie_Statkow_uzytkownika() {
    document.querySelector("#ships_container").addEventListener("click", function (element) {         //pickuje element z containera na divy 
        if (klikniety != 0) {                                                                         //umożliwiam zmiane statku 
            document.querySelector(selector).style.background = "green";                              //nadaję mu kolor biernego
            document.querySelector(selector).style.background = "blue";                               //nadaję mu kolor aktywnego
            if (tablica_ruchoma.length != 0) {
                for (i = 0; i < tablica_ruchoma.length; i++) {
                    document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "none"
                }
            }
        }
        klikniety = (Array.prototype.indexOf.call(this.children, element.target) + 1)
        if (klikniety != 0) {
            //pobieram którym jest indexem i dodaję 1 bo łapie od 1 nie 0
            selector = '#ships_container div:nth-child(' + klikniety + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            //Usuwam zdarzenei
            document.querySelector(selector).style.background = "green";                                  //nadaję mu kolor aktywnego
            przypadek = 0; // uwtawiam automatyczny przypadek na deoult 0 // TODO
            document.getElementById('gamer_container').addEventListener('mousemove', shipmover);          //poozwalam na zmienianie pozycji diva
            document.getElementById('gamer_container').addEventListener('mousedown', ship_rotator)        //włączam obracanie 
        }
    });
}
//Funkcja do obracania statków i umieszczanai ich na mapie- FUNCKJA SPRAWDZONA 
function ship_rotator(e) {
    if (e.which == 3) {                                                                                     //rotacja na ppm
        przypadek++;                                                                                        //rotacja na ppm
        if (przypadek >= 4) {                                                                               //rotacja na ppm
            przypadek = 0;                                                                                  //rotacja na ppm
        }
        color_mover_maker(tablica_ruchoma[0] - 1, tablica_ruchoma.length, przypadek)
    } else if (e.which == 1) {
        switch (przypadek) {                                                                                  //naprawiam swją porąbaną amboicje chęci zrobienia 4 stron bo zamiast jak człowiek zgodnie z ruchem zegara mi odwaliło i zrobiłem pł - poł - zachód - wschód
            case 0:
                przypadek = 1;
                break;
            case 1:
                przypadek = 2;
                break;
            case 2:
                przypadek = 0
                break;
            case 3:
                przypadek = 3;
                break;
        }
        if (klikniety != 0) {
            selected_ship_switcher(tablica_uzytych[klikniety])
            tablica_ruchoma = []
            if (document.getElementById('auto_rand') != null) {

            }
            if (tablica_uzytych.length == 0) {
                document.body.removeChild(document.getElementById('ships_container'))
                endgame();
            }
            if (tablica_uzytych.length == 9 && document.getElementById('auto_rand') != null) {
                document.getElementById('button_section').removeChild(document.getElementById('auto_rand'))
            }
        }
    }
}
//funkcja do rysowania statków manualnie - działa dobrze musisz spróbowac zrobić działanie na zasadzie możliwości zmiany statków 
function selected_ship_switcher() {
    var returned = false;
    if (moge_czy_nie) {
        switch (tablica_uzytych[klikniety - 1]) {
            case 1:
                if (jednomaszt_case_maker(tablica_gry_PLAYER, tablica_ruchoma[0] - 1, true, 'gamer_container')) {
                    returned = false;
                } else {
                    returned = true;
                }
                break;
            case 2:
                if (dwumaszt_case_maker(przypadek, tablica_gry_PLAYER, tablica_ruchoma[0] - 1, true, 'gamer_container')) {
                    returned = false;
                } else {
                    returned = true;
                }
                break;
            case 3:
                if (trojmaszt_case_maker(przypadek, tablica_gry_PLAYER, tablica_ruchoma[0] - 1, true, 'gamer_container')) {
                    returned = false;
                } else {
                    returned = true;
                }
                break;
            case 4:

                if (czwormaszt_case_maker(przypadek, tablica_gry_PLAYER, tablica_ruchoma[0] - 1, true, 'gamer_container')) {
                    returned = false;
                } else {
                    returned = true;
                }
                break;
        }
    } else {
        alert("Coś się zepsuło nie było mnie słychać ")
        przypadek = 0;
        if (tablica_ruchoma.length != 0) {
            for (i = 0; i < tablica_ruchoma.length; i++) {
                document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "none"
            }
        }
        tablica_ruchoma = []
    }
    if (returned) {
        window.removeEventListener('mousemove', shipmover);
        window.removeEventListener('mousedown', ship_rotator)
        selector = '#ships_container div:nth-child(' + klikniety + ')'
        document.querySelector(selector).remove();    //sprawdzam czy nie kliknięto na pusty fragment diva     
        document.getElementById('gamer_container').removeEventListener('mousemove', shipmover)
        tablica_uzytych.splice(klikniety - 1, 1) //usuwam index z tablicy żeby nie można było go wybrać jeszcze raz
        klikniety = 0;
        returned = false;
        if (document.getElementById('auto_rand') != null) {
            document.getElementById('auto_rand').removeEventListener('click', automatic_random_for_player)
        }

    }
}
//w sumie to samo co funkcja do wywoływania statków ale potrzebowałem eventa
function shipmover(event) {
    color_mover_maker(Array.prototype.indexOf.call(this.children, event.target), tablica_uzytych[klikniety - 1], przypadek)
}
//Funkcja od robienia śmiesznego poruszania się statków 
//FUNCKJA ZMIENIANA PO [2]
function color_mover_maker(pozycja_elementu, dlugosc_statku, pozycja) {
    if (tablica_ruchoma.length != 0) {
        for (i = 0; i < tablica_ruchoma.length; i++) {
            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "none"
        }
    }
    ///fukkcja odpowiedzialna za pozycjonowanie statku na mapie w sensie graficznym podczas przepieszczania myszką
    //TODO 1 zmieniaona na nowo funkcja z usueaniem 
    switch (dlugosc_statku) {
        case 4:
            switch (pozycja) {
                case 0: //idzie w dół
                    //NIE MA CHILDA 0 więc pozycja elementu musi być nanoszona o 1 większa niż index tablicy
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 10] != undefined && tablica_gry_PLAYER[pozycja_elementu + 10] == true && tablica_gry_PLAYER[pozycja_elementu + 20] != undefined && tablica_gry_PLAYER[pozycja_elementu + 20] == true && tablica_gry_PLAYER[pozycja_elementu + 30] != undefined && tablica_gry_PLAYER[pozycja_elementu + 30] == true) {
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 11), (pozycja_elementu + 21), (pozycja_elementu + 31)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break
                case 2:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 10] != undefined && tablica_gry_PLAYER[pozycja_elementu - 20] != undefined && tablica_gry_PLAYER[pozycja_elementu - 30] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 10] == true && tablica_gry_PLAYER[pozycja_elementu - 20] == true && tablica_gry_PLAYER[pozycja_elementu - 30] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu - 9), (pozycja_elementu + -19), (pozycja_elementu - 29)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 1:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu + 1] != undefined && tablica_gry_PLAYER[pozycja_elementu + 2] != undefined && tablica_gry_PLAYER[pozycja_elementu + 3] != undefined && pozycja_elementu % 10 != 7 && pozycja_elementu % 10 != 8 && pozycja_elementu % 10 != 9 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 1] == true && tablica_gry_PLAYER[pozycja_elementu + 2] == true && tablica_gry_PLAYER[pozycja_elementu + 3] == true) { // sprawdzam czy 4 kolejne komórki są wolne    
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 2), (pozycja_elementu + 3), (pozycja_elementu + 4)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 3:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 1] != undefined && tablica_gry_PLAYER[pozycja_elementu - 2] != undefined && tablica_gry_PLAYER[pozycja_elementu - 3] != undefined && pozycja_elementu % 10 != 0 && pozycja_elementu % 10 != 1 && pozycja_elementu % 10 != 2 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 1] == true && tablica_gry_PLAYER[pozycja_elementu - 2] == true && tablica_gry_PLAYER[pozycja_elementu - 3] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu), (pozycja_elementu - 1), (pozycja_elementu - 2)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
            }
            break;
        case 3:
            switch (pozycja) {
                case 0: //idzie w dół
                    //NIE MA CHILDA 0 więc pozycja elementu musi być nanoszona o 1 większa niż index tablicy
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 10] != undefined && tablica_gry_PLAYER[pozycja_elementu + 10] == true && tablica_gry_PLAYER[pozycja_elementu + 20] != undefined && tablica_gry_PLAYER[pozycja_elementu + 20] == true) {
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 11), (pozycja_elementu + 21)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break
                case 2:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 10] != undefined && tablica_gry_PLAYER[pozycja_elementu - 20] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 10] == true && tablica_gry_PLAYER[pozycja_elementu - 20] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu - 9), (pozycja_elementu + -19)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 1:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu + 1] != undefined && tablica_gry_PLAYER[pozycja_elementu + 2] != undefined && pozycja_elementu % 10 != 8 && pozycja_elementu % 10 != 9 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 1] == true && tablica_gry_PLAYER[pozycja_elementu + 2] == true) { // sprawdzam czy 4 kolejne komórki są wolne    
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 2), (pozycja_elementu + 3)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 3:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 1] != undefined && tablica_gry_PLAYER[pozycja_elementu - 2] != undefined && pozycja_elementu % 10 != 0 && pozycja_elementu % 10 != 1 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 1] == true && tablica_gry_PLAYER[pozycja_elementu - 2] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu), (pozycja_elementu - 1)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
            }
            break;
        case 2:
            switch (pozycja) {
                case 0: //idzie w dół
                    //NIE MA CHILDA 0 więc pozycja elementu musi być nanoszona o 1 większa niż index tablicy
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 10] != undefined && tablica_gry_PLAYER[pozycja_elementu + 10] == true) {
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 11)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break
                case 2:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 10] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 10] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu - 9)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 1:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu + 1] != undefined && pozycja_elementu % 10 != 9 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu + 1] == true) { // sprawdzam czy 4 kolejne komórki są wolne    
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu + 2)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
                case 3:
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu - 1] != undefined && pozycja_elementu % 10 != 0 && tablica_gry_PLAYER[pozycja_elementu] == true && tablica_gry_PLAYER[pozycja_elementu - 1] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                        tablica_ruchoma = [pozycja_elementu + 1, (pozycja_elementu)]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break;
            }
            break;
        case 1:
            switch (pozycja) {
                case 0: //idzie w dół
                case 1:
                case 2:
                case 3:
                    //NIE MA CHILDA 0 więc pozycja elementu musi być nanoszona o 1 większa niż index tablicy
                    if (tablica_gry_PLAYER[pozycja_elementu] != undefined && tablica_gry_PLAYER[pozycja_elementu] == true) {
                        tablica_ruchoma = [pozycja_elementu + 1]
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "green"
                            moge_czy_nie = true;
                        }
                    } else if (tablica_ruchoma.length != 0) {
                        for (i = 0; i < tablica_ruchoma.length; i++) {
                            document.querySelector('#gamer_container div:nth-child(' + (tablica_ruchoma[i]) + ')').style.background = "red"
                            moge_czy_nie = false;
                        }
                    }
                    break
            }
            break;
    }
}
// RYSYUJE STATKI 
function lista_statkow_creator() { // kreauje statki z boku 
    // 6 divów  [5/6/7] - 2 maszowce 8/9 - trój maszty 10 - czwórka
    const ship_start_container = document.getElementById("ships_container")
    for (i = 0; i < 10; i++) {
        var statek = document.createElement("div");
        switch (i) {
            case 4:
            case 5:
            case 6:// 2 maszty
                var straight_line = document.createElement("div")
                statek.classList.add('ship')
                statek.style.width = "40px"
                straight_line.classList.add('vertical_line');
                statek.appendChild(straight_line);
                ship_start_container.appendChild(statek)
                tablica_uzytych[i] = 2
                break;
            case 7:
            case 8: // 3 maszty 
                for (j = 0; j < 2; j++) {
                    var straight_line = document.createElement("div")
                    straight_line.classList.add('vertical_line');
                    statek.appendChild(straight_line);
                }
                statek.classList.add('ship')
                statek.style.width = "60px"
                ship_start_container.appendChild(statek)
                tablica_uzytych[i] = 3
                break;
            case 9:
                for (j = 0; j < 3; j++) {
                    var straight_line = document.createElement("div")
                    straight_line.classList.add('vertical_line');
                    statek.appendChild(straight_line);
                }
                statek.classList.add('ship')
                statek.style.width = "80px"
                ship_start_container.appendChild(statek)
                tablica_uzytych[i] = 4
                break;
            default:
                statek.classList.add('jedynka')
                ship_start_container.appendChild(statek)
                tablica_uzytych[i] = 1
                break;
        }
    }
}
//_#####################_KONIEC SEKCJI FUNKCJI WYBIERANIA STAKTÓW_############################
// tworzenie plansz
function game_player_bord_creator(id_containera, tablica_uzytkowa) { //sprawdź pod koniec kodyu czy potrzebne TODO
    const bord_id = document.getElementById(id_containera);
    for (i = 0; i < 10; i++) {
        var pole = document.createElement("div");
        for (j = 0; j < 10; j++) {
            var pole = document.createElement("div");
            pole.style.top = i * 27 + "px";
            pole.style.left = j * 27 + "px"
            tablica_uzytkowa.push(true)   //tworzę tablice 
            bord_id.appendChild(pole)
        }
        bord_id.appendChild(pole)
    }
}
// funkcje RYSOWANIA STATKÓW WYWAL OPCJE Z RYSOWANIEM TODO 
//TODO PRZED ODDANIEM ODKOMENTUJ
function rysownik(tablica, plansza, wspolrzedne) {
    // if (plansza != 'gamer_container_pc') {
    wspolrzedne++;
    document.querySelector('#' + plansza + ' ' + 'div:nth-child(' + wspolrzedne + ')').style.background = "#2cfa1f"
    // }
}
// NAJWAŻNIEJSZE PRZY DEBUGU WYWAL RYSOWANIE NIEBIESKICH BORDERÓW - rysuje i tworzy granice wokół statków 
//FUNCKJA ZMIENIANA 
function protector(maszty, first_x, pozycja, tablica) { // pozycja : do góry 0, w dół 1, w prawo 2, w lewo 3 
    console.log("o kurwa o boże jestem w protectorze")
    switch (pozycja) {
        case 0: // nie ruszaj działą dobrze TODO posprzątaj IDZIE OD x0 W góre  
            console.log("warunek 1")
            for (i = 0; i < maszty; i++) {
                if (tablica[first_x - i * 10 + 1] != undefined && first_x % 10 != 9) {
                    tablica[first_x - i * 10 + 1] = "protected";                                        //tworzy prawą pionową granice dla statków w pionie
                    //tworzy prawą pionową granice dla statków w pionie
                }
                if (tablica[first_x - i * 10 - 1] != undefined && first_x % 10 != 0) {                     //tworzy lewą pionową granice dla statków w pionie
                    tablica[first_x - i * 10 - 1] = "protected";                                        //tworzy lewą pionową granice dla statków w pionie
                    //tworzy lewą pionową granice dla statków w pionie
                }
                if (tablica[first_x - 10 * maszty] != undefined) {                                         //Tworzę granicę górną środkową 
                    tablica[first_x - 10 * maszty] = "protected";                                       //Tworzę granicę górną środkową
                    //Tworzę granicę górną środkową
                }
                if (tablica[first_x + 1 - 10 * maszty] != undefined && (first_x + 1 - 10 * maszty) % 10 != 0) {  //Tworzę prawą górną granice zależną
                    tablica[first_x + 1 - 10 * maszty] = "protected";                                         //Tworzę prawą górną granice zależną
                }
                if (tablica[first_x - 1 - 10 * maszty] != undefined && (first_x - 1 - 10 * maszty) % 10 != 9) {  //Tworzę prawą górną granice zależną
                    tablica[first_x - 1 - 10 * maszty] = "protected";                                         //Tworzę prawą górną granice zależną
                }
                if (tablica[first_x + 10] != undefined) {                                                  //Tworzę granicę dolną środkową 
                    tablica[first_x + 10] = "protected";                                                //Tworzę granicę dolną środkową
                    //Tworzę granicę dolną środkową
                }
                if (tablica[first_x + 11] != undefined && (first_x + 11) % 10 != 0) {                       //Tworzę prawą dolną granice zależną
                    tablica[first_x + 11] = "protected";                                                 //Tworzę prawą dolną granice zależną
                }
                if (tablica[first_x + 9] != undefined && (first_x + 9) % 10 != 9) {                              //Tworzę lewą dolną granice zależną
                    tablica[first_x + 9] = "protected";                                                       //Tworzę lewą dolną granice zależną
                }
            }
            //sprawdzam czy nie będzie mi rozwalało granic  
            break;                                                                                                      //sprawdzam czy nie będzie mi rozwalało granic  
        case 1: //nie ruszaj działa dobrze TODO posprzątaj IDZIE OD x0 w dół
            console.log("warunek 2")
            for (i = 0; i < maszty; i++) {
                if (tablica[first_x + i * 10 - 1] != undefined && first_x % 10 != 0) {                 //tworzy granice po lewej stronie 
                    tablica[first_x + i * 10 - 1] = "protected";                                    //tworzy granice po lewej stronie    
                    //tworzy granice po lewej stronie  
                }
                if (tablica[first_x + i * 10 + 1] != undefined && first_x % 10 != 9) {                 //tworzy granice po prawej stronie 
                    tablica[first_x + i * 10 + 1] = "protected";                                    //tworzy granice po prawej stronie 
                    //tworzy granice po prawej stronie 
                }                                                                                                   //tworzy granice po prawej stronie 
                //#######################################################################################################################################
                if (tablica[first_x + 10 * maszty] != undefined) {                                         //Tworzę granicę dolną środkową 
                    tablica[first_x + 10 * maszty] = "protected";                                       //Tworzę granicę dolną środkową
                    //Tworzę granicę dolną środkową
                }
                if (tablica[first_x + 1 + 10 * maszty] != undefined && (first_x + 1 + 10 * maszty) % 10 != 0) {  //Tworzę prawą dolną granice zależną
                    tablica[first_x + 1 + 10 * maszty] = "protected";                                         //Tworzę prawą dolną granice zależną
                }
                if (tablica[first_x - 1 + 10 * maszty] != undefined && (first_x - 1 + 10 * maszty) % 10 != 9) {  //Tworzę prawą dolną granice zależną
                    tablica[first_x - 1 + 10 * maszty] = "protected";                                         //Tworzę prawą dolną granice zależną
                }
                //########################GÓRNA GRANICA############################################################
                if (tablica[first_x - 10] != undefined) {                                                  //Tworzę granicę górną środkową 
                    tablica[first_x - 10] = "protected";                                                //Tworzę granicę górną środkową
                    //Tworzę granicę górną środkową
                }
                if (tablica[first_x - 11] != undefined && (first_x - 11) % 10 != 9) {                       //Tworzę lewą górną granice zależną
                    tablica[first_x - 11] = "protected";                                                 //Tworzę lewą górną granice zależną
                }
                if (tablica[first_x - 9] != undefined && (first_x - 9) % 10 != 0) {                              //Tworzę prawą górną granice zależną
                    tablica[first_x - 9] = "protected";                                                       //Tworzę prawą górną granice zależną
                }
            }
            break;
        case 2: // idzie w prawo TODO POSTPRZĄTAJ
            console.log("warunek 3")
            for (i = -10; i < -12 + maszty + 2; i++) {
                if (tablica[first_x + i] != undefined && first_x % 10 != 9) {              //Robi granice górną
                    tablica[first_x + i] = "protected";                                 //Robi granice górną
                    //Robi granice górną
                }
            }
            if (tablica[first_x - (10 - maszty)] != undefined && (first_x - (10 - maszty)) % 10 != 0) {  //Robi lewą górną granice wystjącą [zależną od położenia ]
                tablica[first_x - (10 - maszty)] = "protected";                                       //Robi lewą górną granice wystjącą [zależną od położenia ]
                //Robi lewą górną granice wystjącą [zależną od położenia ]
            }
            if (tablica[first_x - 11] != undefined && (first_x - 11) % 10 != 9) { //Robi prawą dolną granice wystjącą [zależną od położenia ]
                tablica[first_x - 11] = "protected";                                     //Robi prawą dolną granice wystjącą [zależną od położenia ]
                //Robi prawą dolną granice wystjącą [zależną od położenia ]
            }
            for (j = 10; j < 10 + maszty; j++) {                                                          //Robi granice dolną niebieską
                if (tablica[first_x + j] != undefined && first_x % 10 != 9) {                //Robi granice dolną niebieską
                    tablica[first_x + j] = "protected";                                   //Robi granice dolną niebieską
                    //Robi granice dolną niebieską
                }                                                                                         //Robi granice dolną niebieską
            }                                                                                             //Robi granice dolną niebieską
            if (tablica[first_x + 9] != undefined && first_x % 10 != 0) {                    //Robi granice dolną niebieską lewą zależną
                tablica[first_x + 9] = "protected";                                       //Robi granice dolną niebieską lewą zależną 
            }
            if (tablica[first_x - 1] != undefined && (first_x - 1) % 10 != 9) {                //Tworzy granice lewa środkowy pkt
                tablica[first_x - 1] = "protected";                                         //Tworzy granice lewą środkowy pkt
                //Tworzy granice lewą środkowy pkt
            }
            if (tablica[first_x + 10 + maszty] != undefined && (first_x + 10 + maszty) % 10 != 0) {      //Robi granice dolną niebieską prawą zależną
                tablica[first_x + 10 + maszty] = "protected";                                         //Robi granice dolną niebieską prawą zależną
                //Robi granice dolną niebieską prawą zależną
            }
            if (tablica[first_x + maszty] != undefined && (first_x + maszty) % 10 != 0) {      //Tworzy granice prawą środkowy pkt
                tablica[first_x + maszty] = "protected";                                    //Tworzy granice prawą środkowy pkt
                //Tworzy granice prawą środkowy pkt
            }                                                                                               //Tworzy granice prawą środkowy pkt
            break;
        case 3: // idzie w lewo TODO POSPRZĄTAJ
            console.log("waunek 4")
            for (i = -10; i < -12 + maszty + 2; i++) {
                if (tablica[first_x - i] != undefined && first_x % 10 != 0) {              //Robi granice dolną
                    tablica[first_x - i] = "protected";                                 //Robi granice dolną
                    //Robi granice dolną
                }
            }
            if (tablica[first_x + 11] != undefined && (first_x + 1) % 10 != 0) {           //Robi prawą dolną granice wystjącą [zależną od położenia ]
                tablica[first_x + 11] = "protected";                                    //Robi prawą dolną granice wystjącą [zależną od położenia ]
                //Robi prawą dolną granice wystjącą [zależną od położenia ]
            }
            if (tablica[first_x + (10 - maszty)] != undefined && (first_x - maszty) % 10 != 9) { //Robi prawą dolną granice wystjącą [zależną od położenia ]
                tablica[first_x + (10 - maszty)] = "protected";                                       //Robi prawą dolną granice wystjącą [zależną od położenia ]
                //Robi prawą dolną granice wystjącą [zależną od położenia ]
            }
            for (j = 10; j < 10 + maszty; j++) {                                                          //Robi granice górną niebieską
                if (tablica[first_x - j] != undefined && first_x % 10 != 0) {                //Robi granice górną niebieską
                    tablica[first_x - j] = "protected";                                   //Robi granice górną niebieską
                    //Robi granice górną niebieską
                }                                                                                         //Robi granice górną niebieską
            }                                                                                             //Robi granice górną niebieską
            if (tablica[first_x - 9] != undefined && (first_x - 9) % 10 != 0) {                    //Robi granice górna prawa niebieską lewą zależną
                tablica[first_x - 9] = "protected";                                       //Robi granice górna prawa niebieską lewą zależną 
            }
            if (tablica[first_x - (10 + maszty)] != undefined && (first_x - (10 + maszty)) % 10 != 9) {  //Robi granice górną niebieską prawą zależną
                tablica[first_x - (10 + maszty)] = "protected";                                       //Robi granice górną niebieską prawą zależną
                //Robi granice górną niebieską prawą zależną
            }
            if (tablica[first_x + 1] != undefined && (first_x + 1) % 10 != 0) {                    //Tworzy granice prawą środkowy pkt
                tablica[first_x + 1] = "protected";                                         //Tworzy granice prawą środkowy pkt
                //Tworzy granice prawą środkowy pkt
            }                                                                                               //Tworzy granice prawą środkowy pkt
            if (tablica[first_x - maszty] != undefined && (first_x - maszty) % 10 != 9) {      //Tworzy granice lewa środkowy pkt
                tablica[first_x - maszty] = "protected";                                         //Tworzy granice lewą środkowy pkt
                //Tworzy granice lewą środkowy pkt
            }
            break;
    }
}
//##########-RYSOWANIE JEDNOMASZTOWCA - ###############
function set_pc_ship_position_JEDNOMASZT(tablica, uzytkownik_czy_pc, plansza) {
    if (uzytkownik_czy_pc) {
        jednomaszt_case_maker(tablica, first_x, true, plansza)
    } else {
        var szukam_miejsca_na_moj_jacht = true;
        while (szukam_miejsca_na_moj_jacht) {
            var first_x = Math.floor(Math.random() * (99 - 0 + 1)) + 0; // losuje liczbe od 0 do 99 odpowiada ona indexowi tablicy komputera 
            szukam_miejsca_na_moj_jacht = jednomaszt_case_maker(tablica, first_x, false, plansza)
        }
    }
}
function jednomaszt_case_maker(tablica, first_x, uzytkownik_czy_pc, plansza) {
    if (tablica[first_x] != undefined && tablica[first_x] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
        tablica[first_x] = false; // nadaje tblicy wartość nie do zajęcia 
        rysownik(tablica_gry_KOMPUTER, plansza, first_x)
        protector(1, first_x, 0, tablica) //w razie czego dodaj plansze w razie awarii
        return false;
    } else if (uzytkownik_czy_pc) {
        alert("W tą pozycję nie możesz dodać okrętu ")
        return true;
    } else {
        return true;
    }
}
//########-KONIEC SEKCJI JEDNOMASZTOWCA-##############
//########-POCZĄTEK SEKCJI 2 MASZTOWCA-###############
function set_pc_ship_position_DWUMASZT(tablica, uzytkownik_czy_pc, przypadek, plansza) {
    if (uzytkownik_czy_pc) {
        czwormaszt_case_maker(przypadek, tablica, first_x, true)
    } else {
        var szukam_miejsca_na_moj_jacht = true;
        while (szukam_miejsca_na_moj_jacht) {
            var horizontal_or_vertial = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            var first_x = Math.floor(Math.random() * (99 - 0 + 1)) + 0; // losuje liczbe od 0 do 99 odpowiada ona indexowi tablicy komputera 
            szukam_miejsca_na_moj_jacht = dwumaszt_case_maker(horizontal_or_vertial, tablica, first_x, uzytkownik_czy_pc, plansza)
        }
    }
}
function dwumaszt_case_maker(przypadek, tablica, first_x, uzytkownik_czy_pc, plansza) {
    switch (przypadek) {
        case 0:
            if (tablica[first_x] != undefined && tablica[first_x - 10] != undefined && tablica[first_x] == true && tablica[first_x - 10] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 2; i++) {
                    tablica[first_x - i * 10] = false; // nadaje tblicy wartość nie do zajęcia 
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x - i * 10)
                }
                protector(2, first_x, 0, tablica, plansza)
                return false;
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 1: // idzie od punktu w dół TODO 
            if (tablica[first_x] != undefined && tablica[first_x + 10] != undefined && tablica[first_x] == true && tablica[first_x + 10] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 2; i++) {
                    tablica[first_x + i * 10] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x + i * 10)
                }
                protector(2, first_x, 1, tablica, plansza);
                return false;
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 2:// idzie w prawo 
            if (tablica[first_x] != undefined && tablica[first_x + 1] != undefined && first_x % 10 != 9 && tablica[first_x] == true && tablica[first_x + 1] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                for (i = 0; i < 2; i++) {
                    tablica[first_x + i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x + i)
                }
                szukam_miejsca_na_moj_jacht = false;
                protector(2, first_x, 2, tablica, plansza);
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 3:
            if (tablica[first_x] != undefined && tablica[first_x - 1] != undefined && first_x % 10 != 0 && tablica[first_x] == true && tablica[first_x - 1] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                for (i = 0; i < 2; i++) {
                    tablica[first_x - i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x - i)
                }
                szukam_miejsca_na_moj_jacht = false;
                protector(2, first_x, 3, tablica, plansza)
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
    }
}
//#######-KONIEC SKECJI 2 MASZTOWCA-#################
//########-POCZĄTEK SEKCJI 3 MASZTOWCA-###############
function set_pc_ship_position_TROJMASZT(tablica, uzytkownik_czy_pc, przypadek, plansza) {
    if (uzytkownik_czy_pc) {
        czwormaszt_case_maker(przypadek, tablica, first_x, true)
    } else {
        var szukam_miejsca_na_moj_jacht = true;
        while (szukam_miejsca_na_moj_jacht) {
            var horizontal_or_vertial = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            var first_x = Math.floor(Math.random() * (99 - 0 + 1)) + 0; // losuje liczbe od 0 do 99 odpowiada ona indexowi tablicy komputera 
            szukam_miejsca_na_moj_jacht = trojmaszt_case_maker(horizontal_or_vertial, tablica, first_x, uzytkownik_czy_pc, plansza)
        }
    }
}
function trojmaszt_case_maker(przypadek, tablica, first_x, uzytkownik_czy_pc, plansza) {
    switch (przypadek) {
        case 0:
            if (tablica[first_x] != undefined && tablica[first_x - 10] != undefined && tablica[first_x - 20] != undefined && tablica[first_x] == true && tablica[first_x - 10] == true && tablica[first_x - 20] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 3; i++) {
                    tablica[first_x - i * 10] = false; // nadaje tblicy wartość nie do zajęcia 
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x - i * 10))
                }
                protector(3, first_x, 0, tablica, plansza)
                return false;
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 1: // idzie od punktu w dół TODO 
            if (tablica[first_x] != undefined && tablica[first_x + 10] != undefined && tablica[first_x + 20] != undefined && tablica[first_x] == true && tablica[first_x + 10] == true && tablica[first_x + 20] == true) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 3; i++) {
                    tablica[first_x + i * 10] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x + i * 10))
                }
                protector(3, first_x, 1, tablica, plansza);
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 2:// idzie w prawo 
            if (tablica[first_x] != undefined && tablica[first_x + 1] != undefined && tablica[first_x + 2] != undefined && first_x % 10 != 8 && first_x % 10 != 9 && tablica[first_x] == true && tablica[first_x + 1] == true && tablica[first_x + 2] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                for (i = 0; i < 3; i++) {
                    tablica[first_x + i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x + i))
                }
                protector(3, first_x, 2, tablica, plansza);
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
        case 3:
            if (tablica[first_x] != undefined && tablica[first_x - 1] != undefined && tablica[first_x - 2] != undefined && first_x % 10 != 0 && first_x % 10 != 1 && tablica[first_x] == true && tablica[first_x - 1] == true && tablica[first_x - 2] == true) { // sprawdzam czy 4 kolejne komórki są wolne
                for (i = 0; i < 3; i++) {
                    tablica[first_x - i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x - i))
                }
                szukam_miejsca_na_moj_jacht = false;
                protector(3, first_x, 3, tablica, plansza)
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu ")
                return true;
            } else {
                return true;
            }
            break;
    }
}
//#######-KONIEC SKECJI 3 MASZTOWCA-#################
//########-POCZĄTEK SEKCJI 4 MASZTOWCA-###############
function set_pc_ship_position_CZTEROMASZTOWIEC(tablica, uzytkownik_czy_pc, przypadek, plansza) { //rysuje 4 masztowiec z borderami działa
    // robie losowanie położenia dla 4 masztowca
    if (uzytkownik_czy_pc) {
        czwormaszt_case_maker(przypadek, tablica, first_x, true)
    } else {
        var szukam_miejsca_na_moj_jacht = true;
        while (szukam_miejsca_na_moj_jacht) {
            var horizontal_or_vertial = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            var first_x = Math.floor(Math.random() * (99 - 0 + 1)) + 0; // losuje liczbe od 0 do 99 odpowiada ona indexowi tablicy komputera 
            szukam_miejsca_na_moj_jacht = czwormaszt_case_maker(horizontal_or_vertial, tablica, first_x, false, plansza)
        }
    }
}
function czwormaszt_case_maker(przypadek, tablica, first_x, uzytkownik_czy_pc, plansza) {
    switch (przypadek) {
        case 0: // idzie od punktu w góre  DZIAŁĄ 
            if (tablica[first_x] != undefined && tablica[first_x - 10] != undefined && tablica[first_x - 20] != undefined && tablica[first_x - 30] != undefined) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 4; i++) {
                    tablica[first_x - i * 10] = false; // nadaje tblicy wartość nie do zajęcia
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x - i * 10))
                }
                protector(4, first_x, 0, tablica, plansza) // tworzę nieruszalny obszar dla 4 masztowca
                return false;
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu 0 ")
                return true;
            } else {
                return true;
            }
            break;
        case 1: // idzie od punktu w dół
            if (tablica[first_x] != undefined && tablica[first_x + 10] != undefined && tablica[first_x + 20] != undefined && tablica[first_x + 30] != undefined) { // sprawdzam czy da się wgle postawić pionowo ten statek
                for (i = 0; i < 4; i++) {
                    tablica[first_x + i * 10] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, (first_x + i * 10))
                }
                protector(4, first_x, 1, tablica, plansza);
                return false;
            } else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu 1")
                return true;
            } else {
                return true;
            }
            break;
        case 2: // idzie od punktu w prawo 
            if (tablica[first_x] != undefined && tablica[first_x + 1] != undefined && tablica[first_x + 2] != undefined && tablica[first_x + 3] != undefined && first_x % 10 != 7 && first_x % 10 != 8 && first_x % 10 != 9) { // sprawdzam czy 4 kolejne komórki są wolne
                for (i = 0; i < 4; i++) {
                    tablica[first_x + i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x + i)
                }
                protector(4, first_x, 2, tablica, plansza);
                return false;
            }
            else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu 2")
                return true;
            } else {
                return true;
            }
            break;
        case 3: // szukam w lewo 
            if (tablica[first_x] != undefined && tablica[first_x - 1] != undefined && tablica[first_x - 2] != undefined && tablica[first_x - 3] != undefined && first_x % 10 != 0 && first_x % 10 != 1 && first_x % 10 != 2) { // sprawdzam czy 4 kolejne komórki są wolne TODO jak 3 4maszt nie działa to wpierdol tu first_x %10 !=3
                for (i = 0; i < 4; i++) {
                    tablica[first_x - i] = false;
                    rysownik(tablica_gry_KOMPUTER, plansza, first_x - i)
                }
                szukam_miejsca_na_moj_jacht = false;
                protector(4, first_x, 3, tablica, plansza);
                return false;
            }
            else if (uzytkownik_czy_pc) {
                alert("W tą pozycję nie możesz dodać okrętu 3")
                return true;
            } else {
                return true;
            }
            break;
    }
}
//#######-KONIEC SKECJI 4 MASZTOWCA-#################
//tworzy buttony końcowej fazy gry + pozwala na jej rozpoczęcie 
function endgame() {
    //button resetu
    var button_reset = document.createElement("button")
    button_reset.appendChild(document.createTextNode("RESTART"))
    document.getElementById('button_section').appendChild(button_reset)
    button_reset.addEventListener('click', restartor_creator)
    //button startu gry

    var button_start = document.createElement("button")
    button_start.appendChild(document.createTextNode("START GRY"))
    button_start.id = "START"
    document.getElementById('button_section').appendChild(button_start)
    button_start.addEventListener('click', leavel, button_start)
    // document.getElementById('button_section').removeChild(button_start)
    // document.getElementById('gamer_container_pc').addEventListener('click', player, button_start)
    // //button pokazujący statki 
    var button_show = document.createElement("button")
    button_show.id = "SHOW"
    button_show.appendChild(document.createTextNode("POKAŻ"))
    document.getElementById('button_section').appendChild(button_show)
    button_show.addEventListener('click', display_ships)
    // })


}
function leavel() {
    document.getElementById('START').removeEventListener('click', leavel)
    //tworze container
    console.log("jesteś")
    var alert_container = document.createElement('div')
    alert_container.classList.add('alert_container_class')
    document.body.appendChild(alert_container)
    //tworze tekst 
    var tytul_napis = document.createElement('h1')
    tytul_napis.appendChild(document.createTextNode("Wybierz Poziom trudności"))
    alert_container.appendChild(tytul_napis)

    //tworze buttona łatwy
    var cansel_button = document.createElement('button')
    cansel_button.appendChild(document.createTextNode("ŁATWY"))
    cansel_button.classList.add('chanel_button')
    alert_container.appendChild(cansel_button);
    cansel_button.addEventListener('click', () => {
        // document.getElementById('SHOW').addEventListener('click', display_ships)
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('button_section').removeChild(document.getElementById('START'))
        poziom = 0
        document.getElementById('gamer_container_pc').addEventListener('click', player)
        document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";
    })
    //tworze button średni
    var cansel_button = document.createElement('button')
    cansel_button.appendChild(document.createTextNode("ŚREDNI"))
    cansel_button.classList.add('chanel_button')
    alert_container.appendChild(cansel_button);
    cansel_button.addEventListener('click', () => {
        // document.getElementById('SHOW').addEventListener('click', display_ships)
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('button_section').removeChild(document.getElementById('START'))
        poziom = 1;
        document.getElementById('gamer_container_pc').addEventListener('click', player)
        document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green"

        console.log(document.querySelector('#radar_container .screen:nth-child(2)'))
    })
    //tworzę button trudny 
    var cansel_button = document.createElement('button')
    cansel_button.appendChild(document.createTextNode("TRUDNY"))
    cansel_button.classList.add('chanel_button')
    alert_container.appendChild(cansel_button);
    cansel_button.addEventListener('click', () => {
        // document.getElementById('SHOW').addEventListener('click', display_ships)
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('button_section').removeChild(document.getElementById('START'))
        poziom = 2
        document.getElementById('gamer_container_pc').addEventListener('click', player)
        document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green"

    })
    //tworzę button uber trundy - 2020 WŁĄCZENIE TRYBU WYMAGA UWIERZYTELNIANIA KODEM
    //TODO dodaj kod
    var cansel_button = document.createElement('button')
    cansel_button.appendChild(document.createTextNode("2020"))
    cansel_button.classList.add('show_button')
    alert_container.appendChild(cansel_button);
    cansel_button.addEventListener('click', () => {
        // document.getElementById('SHOW').addEventListener('click', display_ships)
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('button_section').removeChild(document.getElementById('START'))
        poziom = 3
        code_enter()
        // document.getElementById('gamer_container_pc').addEventListener('click', player)
    })
    //anuluj
    var show_button = document.createElement('button')
    show_button.appendChild(document.createTextNode("JESZCZE NIE"))
    show_button.classList.add('show_button')
    alert_container.appendChild(show_button);
    show_button.addEventListener('click', () => {
        document.getElementById('START').addEventListener('click', leavel)
        alert_container.remove()    //piękny selfdistruct 
    })

    //TODO ogrnij jak wyłączyć możliość klikania poza divem
    console.log("siema")
    document.body.addEventListener('clik', () => {
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('START').addEventListener('click', display_ships)

    })
}
//ODBUGUJ MNIE PLS
function player(element) {
    console.log("POZIOM" + poziom)
    clicked = (Array.prototype.indexOf.call(document.getElementById('gamer_container_pc').children, element.target) + 1)
    if (clicked == 0) {
        console.log("one more")
    } else {
        player_algoritm(clicked);
    }
}
function player_algoritm(clicked) {
    console.log("no ej")
    if (sprawdzacz_wygranej()) {
        console.log("Piłeczka do playera" + poziom)
        document.getElementById('gamer_container_pc').removeEventListener('click', player)
        clicked--;
        console.log(clicked)
        if (tablica_gry_KOMPUTER[clicked] == false) {
            selector = '#gamer_container_pc div:nth-child(' + (clicked + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "red";
            tablica_gry_KOMPUTER[clicked] = 'trafiony'
            console.log(tablica_gry_KOMPUTER[clicked])
            document.getElementById('gamer_container_pc').addEventListener('click', player)

        }
        else if (tablica_gry_KOMPUTER[clicked] == 'shot' || tablica_gry_KOMPUTER[clicked] == 'trafiony') {
            alert("Trafiono ponownie ")
            document.getElementById('gamer_container_pc').addEventListener('click', player)
        } else {
            tablica_gry_KOMPUTER[clicked] = 'shot'
            selector = '#gamer_container_pc div:nth-child(' + (clicked + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "blue";
            document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px red";
            switch (poziom) {
                case 0:     //łatwy
                    console.log("siemka tu przypadek ŁATWY")
                    setTimeout(player_computer_idiot, 1000)
                    break;
                case 1:
                    setTimeout(IA_try_medium, 1000);
                    break;
                case 2:
                    console.log("zaczynam kozaczy")
                    IA_TRY_BOOSTED();
                    break;
            }
        }
    }
}
//komputer idiota
function player_computer_idiot() {
    document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px red";
    if (sprawdzacz_wygranej()) {
        var headshot = (Math.floor(Math.random() * (98 - 0 + 1)) + 0); // losuje liczbe od 0 do 99 odpowiada ona indexowi tablicy komputera 
        headshot++
        console.log(headshot)
        if (tablica_gry_PLAYER[headshot - 1] == false) {
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "red";
            tablica_gry_PLAYER[headshot - 1] = 'trafiony'
            setTimeout(player_computer_idiot, 1000)
        }
        else if (tablica_gry_PLAYER[headshot - 1] == 'shot' || tablica_gry_PLAYER[headshot - 1] == 'trafiony') {
            player_computer_idiot();

        } else {
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "blue";
            tablica_gry_PLAYER[headshot - 1] = 'shot'
            console.log(tablica_gry_PLAYER[headshot - 1])
            document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";
            document.getElementById('gamer_container_pc').addEventListener('click', player)

        }
    }

}
//sprawdzanie wygranej
function sprawdzacz_wygranej() {
    console.log("sprawdzam wygraną")
    document.getElementById('gamer_container_pc').removeEventListener('click', player)
    var sprawdzam = true;
    var sprawdzam_gracza = true
    for (i = 0; i < tablica_gry_PLAYER.length; i++) {
        if (tablica_gry_PLAYER[i] == false) {
            sprawdzam = false;
        }
    }
    for (i = 0; i < tablica_gry_KOMPUTER.length; i++) {
        if (tablica_gry_KOMPUTER[i] == false) {
            sprawdzam_gracza = false;
        }
    }
    if (sprawdzam) {
        alert("WYGRAŁ Komputer")

    }
    if (sprawdzam_gracza) {
        alert("Wygrał Gracz")

    }
    if (!sprawdzam && !sprawdzam_gracza) {
        console.log("nikt nie wygrał")
        return true
    } else {
        console.log("game over")
        return false;
    }
}
//daj warunek ilości wywołania czytaj zdejmij onclicka
//##############-SEKCJA_POKAZYWANIA_STATKÓW-##############
function show_bord_creator() {
    var show_button = document.createElement('button')
    show_button.appendChild(document.createTextNode("POKAŻ STATKI"))
    alert_container.appendChild(show_button);
    show_button.addEventListener('click', display_ships)
}
function display_ships() {
    document.getElementById('SHOW').removeEventListener('click', display_ships)
    //tworze container
    var alert_container = document.createElement('div')
    alert_container.classList.add('alert_container_class')
    document.body.appendChild(alert_container)
    //tworze tekst 
    var tytul_napis = document.createElement('h1')
    tytul_napis.appendChild(document.createTextNode("Czy chcesz pokazać statki"))
    alert_container.appendChild(tytul_napis)
    //tworze podtytuł
    var podtytuł = document.createElement('h3')
    podtytuł.appendChild(document.createTextNode("Uwaga spowoduje to twoją przegraną"))
    alert_container.appendChild(podtytuł)
    //tworze_buttony
    var show_button = document.createElement('button')
    show_button.appendChild(document.createTextNode("POKAŻ PLANSZE"))
    show_button.classList.add('show_button')
    alert_container.appendChild(show_button);
    show_button.addEventListener('click', () => {
        show_ships()
        alert_container.remove()    //piękny selfdistruct 
        document.getElementById('button_section').removeChild(document.getElementById('SHOW'))
        if (document.getElementById('START') != null)
            document.getElementById('button_section').removeChild(document.getElementById('START'))
        document.getElementById('gamer_container_pc').removeEventListener('click', player)

    })
    //tworze buttona chanel
    var cansel_button = document.createElement('button')
    cansel_button.appendChild(document.createTextNode("ANULUJ"))
    cansel_button.classList.add('chanel_button')
    alert_container.appendChild(cansel_button);
    cansel_button.addEventListener('click', () => {
        document.getElementById('SHOW').addEventListener('click', display_ships)
        alert_container.remove()    //piękny selfdistruct 
    })
    console.log("siema")
    document.body.addEventListener('clik', () => {
        console.log("HELLOFESIF{EIFH")  //TODO napraw
        alert_container.remove()    //piękny selfdistruct 
        window.removeEventListener('click', arguments.callee, false);

    })
}
//skrypt pokazujący 
function show_ships() {
    for (i = 0; i < 100; i++) {
        if (tablica_gry_KOMPUTER[i] == false) {
            selector = '#gamer_container_pc div:nth-child(' + (i + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "#2CFA1F";

        } else if (tablica_gry_KOMPUTER[i] == 'shot ' || tablica_gry_KOMPUTER[i] == 'trafiony ') {
            selector = '#gamer_container_pc div:nth-child(' + (i + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "#fdff00";
        }
    }
}
//wektory
//0-góra
//1-dół
//2-prawo
//3-lewo
function IA_try_medium() {
    console.log("IA MEDIOUM")
    console.log(tablica_trafien)
    console.log("Piłeczka u kompa")
    if (tablica_trafien.length > 1) {
        console.log(tablica_trafien)
        console.log("piłeczka u IA")
        console.log(tablica_gry_PLAYER[tablica_trafien[4][1]])
        if (tablica_trafien[0][0] != 0) { //IA W GÓRE
            console.log("jestem tu")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[0][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[0][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "red";
                tablica_trafien[0][0]--;    //odejmuje ilość możliwości 
                tablica_trafien[0][1] += 10;    //dodaje +10 do swagu w góre
                tablica_trafien[2][0] = 0;  //zeruje boki
                tablica_trafien[3][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                setTimeout(IA_try_medium, 1000);
            } else if (tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] == true || tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] == 'protected') {
                setTimeout(() => {
                    console.log("Pudło przypadek 1")
                    tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'shot'
                    selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[0][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                    document.querySelector(selector).style.background = "#0fc0fc";
                    tablica_trafien[0][0] = 0   // blokuje tablice jeszcze raz 
                    document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";
                    document.getElementById('gamer_container_pc').addEventListener('click', player)
                }, 1000);
            } else {
                //gdyby jakimś cudem trafił w pole w które już kiedyś strzeał
                tablica_trafien[0][0] = 0   // blokuje tablice jeszcze raz 
                setTimeout(IA_try_medium, 1000);
            }
        } else if (tablica_trafien[1][0] != 0) {    // IA w dół
            console.log("2")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[1][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[1][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "red";
                tablica_trafien[1][0]--;    //zmienjsza możlowość
                tablica_trafien[1][1] += 10;
                tablica_trafien[2][0] = 0;
                tablica_trafien[3][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                setTimeout(IA_try_medium, 1000);
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])] == 'protected') {
                setTimeout(() => {
                    console.log("Pudło przypadek 2")
                    selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[1][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                    tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[1][1]] = 'shot'
                    document.querySelector(selector).style.background = "#0fc0fc";
                    tablica_trafien[1][0] = 0   // blokuje tablice jeszcze raz 
                    document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";

                    document.getElementById('gamer_container_pc').addEventListener('click', player)
                }, 1000);
            } else {
                tablica_trafien[1][0] = 0
                setTimeout(IA_try_medium, 1000);
            }
        } else if (tablica_trafien[2][0] != 0) { //w prawo 
            console.log("3")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[2][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "red";
                tablica_trafien[2][0]--;
                tablica_trafien[2][1]++;
                tablica_trafien[0][0] = 0;
                tablica_trafien[1][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                setTimeout(IA_try_medium, 1000);
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == 'protected') {
                setTimeout(() => {
                    console.log("Pudło przypadek 3")
                    tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'shot'
                    selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[2][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                    document.querySelector(selector).style.background = "#0fc0fc";
                    tablica_trafien[2][0] = 0   // blokuje tablice jeszcze raz 
                    document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";

                    document.getElementById('gamer_container_pc').addEventListener('click', player)

                }, 1000);
            } else {
                tablica_trafien[2][0] = 0   // blokuje tablice jeszcze raz 
                setTimeout(IA_try_medium, 1000);
            }

        } else if (tablica_trafien[3][0] != 0) { //w lewo 
            console.log("4")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[3][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[3][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "red";
                tablica_trafien[3][0]--;    //zmniejsza możliwość 
                tablica_trafien[3][1]++;    //cofam indexy 
                tablica_trafien[0][0] = 0;
                tablica_trafien[1][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                setTimeout(IA_try_medium, 1000);
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] == 'protected') {
                setTimeout(() => {
                    console.log("Pudło przypadek 4 ")
                    tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] = 'shot'
                    selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[3][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                    document.querySelector(selector).style.background = "#0fc0fc";
                    tablica_trafien[3][0] = 0   // blokuje tablice jeszcze raz 
                    document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";
                    document.getElementById('gamer_container_pc').addEventListener('click', player)
                }, 1000);
            } else {
                tablica_trafien[3][0] = 0   // blokuje tablice jeszcze raz 
                setTimeout(IA_try_medium, 1000);

            }
        } else {
            tablica_trafien = []
            IA_try_medium()
        }
    } else {
        console.log("Piłeczka losuje ")
        var headshot = (Math.floor(Math.random() * (99 - 0 + 1)) + 0) + 1;//losuje randomowy index tablicy 
        if (tablica_gry_PLAYER[headshot - 1] == false) {//nastepuje trafienie
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "red";
            tablica_gry_PLAYER[headshot - 1][2] = 'trafiony';
            wektormaker(headshot)
            console.log(tablica_trafien)
            setTimeout(IA_try_medium, 1000);
        } else if (tablica_gry_PLAYER[headshot - 1] == 'shot' || tablica_gry_PLAYER[headshot - 1] == 'trafiony') {
            console.log("aww sheet here we go again")
            IA_try_medium()

        } else {
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "#0fc0fc";
            tablica_gry_PLAYER[headshot - 1] = 'shot';
            console.log(tablica_gry_PLAYER[headshot - 1][2])
            document.querySelector('#radar_container .screen:nth-child(2)').style.border = "solid 10px green";
            document.getElementById('gamer_container_pc').addEventListener('click', player)

        }
    }
    // document.getElementById('gamer_container_pc').addEventListener('click', player)
}
function wektormaker(strzal) {
    strzal--;
    tablica_trafien = [[0, 0], [0, 0], [0, 0], [0, 0]]   // eliminuje "pusty index "podczas tworzenia możliwości
    for (i = 1; i < 4; i++) {   // idzie w góre 
        if (tablica_gry_PLAYER[strzal - 10 * i] != undefined) {
            tablica_trafien[0] = [i, 10]
        }
    }
    for (i = 1; i < 4; i++) {   //idzie w dół
        if (tablica_gry_PLAYER[strzal + 10 * i] != undefined) {
            tablica_trafien[1] = [i, +10]
        }
    }
    for (i = 1; i < 4; i++) {   //idzie w prawo
        if (tablica_gry_PLAYER[strzal + i] != undefined && (strzal + i) % 10 != 0) {
            tablica_trafien[2] = [i, +1]
        }
    }
    for (i = 1; i < 4; i++) {   //idzie w lewo
        if (tablica_gry_PLAYER[strzal - i] != undefined && (strzal - i) % 10 != 9) {
            tablica_trafien[3] = [i, 1]
        }
    }
    //specjalne
    if (tablica_gry_PLAYER[strzal - 20] == 'trafiony') {
        console.log('war1')
        tablica_trafien[0] = [0, 10]
    }
    if (tablica_gry_PLAYER[strzal + 20] == 'trafiony') {
        console.log('war2')
        tablica_trafien[1] = [0, 10]

    }
    if (tablica_gry_PLAYER[strzal + 2] == 'trafiony' && (strzal + 2) % 10 != 0 || (strzal + 1) % 10 == 0) {
        tablica_trafien[2] = [0, 1]
        console.log('war3')
    }
    if (tablica_gry_PLAYER[strzal - 2] == 'trafiony' && (strzal - 1) % 10 == 9 || (strzal - 1) % 10 == 9) {
        tablica_trafien[3] = [0, 1]
        console.log('war4')

    }
    console.log(tablica_trafien)

    tablica_trafien[4] = ['FIRST', strzal]// dlaczego -1  ?
    console.log(tablica_trafien)

}
//OP ia staff 
//TODO fix me
function IA_TRY_BOOSTED() {
    console.log("kocur kodujący liniki piszący ")
    if (tablica_trafien_pc_OPAI.length == 0) {
        console.log("no ro wio nowa tablica")
        for (i = 0; i < 100; i++) {
            tablica_trafien_pc_OPAI[i] = "shotable"
        }
    }
    if (tablica_trafien.length != 0) {
        if (tablica_trafien[0][0] != 0) { //IA W GÓRE
            console.log("jestem tu")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[0][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[0][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "red";
                tablica_pozyji_statku.push(tablica_trafien[4][1] - tablica_trafien[0][1])       //opcje BOOSTED
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'ship' //OPCJE BOOSTED
                //bloki tablic 
                tablica_trafien[0][0]--;
                tablica_trafien[0][1] += 10;
                tablica_trafien[2][0] = 0;
                tablica_trafien[3][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                IA_TRY_BOOSTED();
            } else if (tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] == true || tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] == 'protected') {
                console.log("Pudło przypadek 1")
                tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'shot'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[0][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] - tablica_trafien[0][1]] = 'unshotable'//opcja BOOSTED
                document.querySelector(selector).style.background = "#0fc0fc";
                tablica_trafien[0][0] = [0]   // blokuje tablice jeszcze raz 
                document.getElementById('gamer_container_pc').addEventListener('click', player)
            } else {
                tablica_trafien[0][0] = [0]   // blokuje tablice jeszcze raz 
                IA_TRY_BOOSTED()
            }
        } else if (tablica_trafien[1][0] != 0) {    // IA w dół
            console.log("2")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])][2] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[1][1]][2] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[1][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                tablica_pozyji_statku.push(tablica_trafien[4][1] + tablica_trafien[0][1])   //bosted opcje 
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] + tablica_trafien[0][1]] = 'ship' //boosted opcje 
                document.querySelector(selector).style.background = "red";
                tablica_trafien[1][0]--;
                tablica_trafien[1][1] += 10;
                tablica_trafien[2][0] = 0;
                tablica_trafien[3][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                //ustawiam boosted opcje 
                IA_TRY_BOOSTED();
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])][2] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[1][1])][2] == 'protected') {
                console.log("Pudło przypadek 2")
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[1][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[1][1]][2] = 'shot'
                document.querySelector(selector).style.background = "#0fc0fc";
                tablica_trafien[1][0] = 0   // blokuje tablice jeszcze raz 
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] + tablica_trafien[0][1]] = 'unshotable'
                document.getElementById('gamer_container_pc').addEventListener('click', player)

            } else {
                tablica_trafien[1][0] = 0   // blokuje tablice jeszcze raz 

                IA_try_medium()
            }
        } else if (tablica_trafien[2][0] != 0) {
            console.log("3")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[2][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                tablica_pozyji_statku.push(tablica_trafien[4][1] + tablica_trafien[2][1])   // opcje dodatkoe
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'ship' //opcje boosted
                document.querySelector(selector).style.background = "red";
                tablica_trafien[2][0]--;    //
                tablica_trafien[2][1]++;    //  opcje tablic 
                tablica_trafien[0][0] = 0;  //
                tablica_trafien[1][0] = 0   //zeruje możliwości pójścia na boki ponieważ nie można już
                IA_TRY_BOOSTED();//wywołuje 1 raz
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] + tablica_trafien[2][1])] == 'protected') {
                console.log("Pudło przypadek 3")
                tablica_gry_PLAYER[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'shot'
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] + tablica_trafien[2][1]] = 'unshotable'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] + tablica_trafien[2][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "#0fc0fc";
                tablica_trafien[2][0] = 0   // blokuje tablice jeszcze raz 
                document.getElementById('gamer_container_pc').addEventListener('click', player)

            } else {
                tablica_trafien[2][0] = 0   // blokuje tablice jeszcze raz 
                IA_TRY_BOOSTED()
            }

        } else if (tablica_trafien[3][0] != 0) {
            console.log("4")
            if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])][2] == false) {
                tablica_gry_PLAYER[tablica_trafien[4][1] - tablica_trafien[3][1]][2] = 'trafiony'
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[3][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                tablica_pozyji_statku.push(tablica_trafien[4][1] - tablica_trafien[3][1])   // opcje dodatkoe
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] - tablica_trafien[3][1]] = 'ship' //opcje boosted
                document.querySelector(selector).style.background = "red";  //ustawiam kolor pola
                tablica_trafien[3][0]--;    //
                tablica_trafien[3][1]++;    //  opcje tablicy
                tablica_trafien[0][0] = 0;   //
                tablica_trafien[1][0] = 0 //zeruje możliwości pójścia na boki ponieważ nie można już
                IA_TRY_BOOSTED();
            } else if (tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] == true || tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] == 'protected') {
                console.log("Pudło przypadek 4 ")
                tablica_gry_PLAYER[(tablica_trafien[4][1] - tablica_trafien[3][1])] = 'shot'
                tablica_trafien_pc_OPAI[tablica_trafien[4][1] - tablica_trafien[3][1]] = 'unshotable' // opcja dodatkowa
                selector = '#gamer_container div:nth-child(' + (tablica_trafien[4][1] - tablica_trafien[3][1] + 1) + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
                document.querySelector(selector).style.background = "#0fc0fc";
                tablica_trafien[3][0] = 0   // blokuje tablice jeszcze raz 
                document.getElementById('gamer_container_pc').addEventListener('click', player)

            } else {
                tablica_trafien[3][0] = 0   // blokuje tablice jeszcze raz 
                IA_TRY_BOOSTED()
            }
        } else {
            //tworze wektor dla tablicy trafionych
            make_border_for_secord()
            tablica_trafien = []
            IA_TRY_BOOSTED()
        }
        //wektr staff 
    } else {    //TODO dodaj opcje tworzenia wektoru w tablicy , odbuguj , sprawdź czy działą itp etc no wiesz co zrobić
        console.log("Piłeczka losuje ")
        var headshot = (Math.floor(Math.random() * (99 - 0 + 1)) + 0) + 1;//losuje randomowy index tablicy 
        if (tablica_gry_PLAYER[headshot - 1] == false) {//nastepuje trafienie
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "red";
            tablica_gry_PLAYER[headshot - 1] = 'trafiony';
            tablica_trafien_pc_OPAI[headshot - 1] = 'ship'
            wektormaker(headshot)
            console.log(tablica_trafien)
            tablica_pozyji_statku.push(headshot - 1)
            IA_TRY_BOOSTED(headshot)
        } else if (tablica_gry_PLAYER[headshot - 1] == 'shot' || tablica_gry_PLAYER[headshot - 1] == 'trafiony' || tablica_trafien_pc_OPAI[headshot - 1] != 'shotable') { //jeśli nie pasuje mu pocja z tablucy 2 
            console.log("aww sheet here we go again")
            IA_TRY_BOOSTED()

        } else {
            selector = '#gamer_container div:nth-child(' + headshot + ')'                       //sprawdzam czy nie kliknięto na pusty fragment diva
            document.querySelector(selector).style.background = "#0fc0fc";
            tablica_gry_PLAYER[headshot - 1] = 'shot';
            tablica_trafien_pc_OPAI[headshot - 1] = 'shot'
            console.log(tablica_gry_PLAYER[headshot - 1])
            document.getElementById('gamer_container_pc').addEventListener('click', player)
        }
    }
}
function make_border_for_secord() {
    tablica_pozyji_statku = tablica_pozyji_statku.sort((a, b) => {     //   
        return a - b;                                                  //   sortuje tablice 
    })
    tablica_pozyji_statku = tablica_pozyji_statku.reverse();
    console.log(tablica_pozyji_statku)                                                          //
    if (tablica_pozyji_statku.length = 1) {
        protector(1, tablica_pozyji_statku[0], tablica_trafien_pc_OPAI);
    } else {
        if ((tablica_pozyji_statku[1] - tablica_pozyji_statku[0]) == 10) {
            console.log("odpalam 1 protecta")
            protector(tablica_pozyji_statku.length, tablica_pozyji_statku[0], 0, tablica_trafien_pc_OPAI)
        } else if ((tablica_pozyji_statku[1] - tablica_pozyji_statku[0]) == -10) {
            protector(tablica_pozyji_statku.length, tablica_pozyji_statku[0], 1, tablica_trafien_pc_OPAI)
            console.log("odpalam 2 protect ")
        } else if ((tablica_pozyji_statku[1] - tablica_pozyji_statku[0]) == 1) {
            protector(tablica_pozyji_statku.length, tablica_pozyji_statku[0], 2, tablica_trafien_pc_OPAI)

        } else if ((tablica_pozyji_statku[1] - tablica_pozyji_statku[0]) == -1) {
            protector(tablica_pozyji_statku.length, tablica_pozyji_statku[0], 3, tablica_trafien_pc_OPAI)
        }
    }
    console.log(tablica_trafien_pc_OPAI)
    tablica_pozyji_statku = []
}



//######-EASTER-EGG-###############
//funkcja odpowiedzialna za tworzenie containera kodu 
function code_enter() {
    console.log("ej")
    //tworzę container
    var container = document.createElement('div')
    container.classList.add('code_container')
    document.body.appendChild(container)
    //tworzę monitor
    var digit_monit = document.createElement('div')
    digit_monit.classList.add('digit_monit')
    container.appendChild(digit_monit)
    //tworzę klawe
    var klawa = document.createElement('div')
    klawa.classList.add('klawa')
    container.appendChild(klawa)
    //tworze przyciski 
    for (i = 0; i <= 9; i++) {
        var przyciski = document.createElement('div')
        przyciski.appendChild(document.createTextNode(i))
        przyciski.onclick = klawa_to_screeen(i)
        klawa.appendChild(przyciski);
        if (i == 8) {
            var przyciski = document.createElement('div')
            przyciski.appendChild(document.createTextNode('-'))
            przyciski.addEventListener('click', remove)
            klawa.appendChild(przyciski);

        }
        if (i == 9) {
            var przyciski = document.createElement('div')
            przyciski.appendChild(document.createTextNode('+'))
            przyciski.addEventListener('click', submit)
            klawa.appendChild(przyciski);
        }

    }
}
// wykończ EE
function klawa_to_screeen(i) {
    return function () {
        document.querySelector('.digit_monit').innerHTML += i
        kod += i;
    }
}
//50485048
function submit() {
    if (kod == '1') {
        kod = ''
        document.querySelector('.code_container').remove()
        var imagio = document.createElement('img')
        imagio.src = './img/crying_cat.jpg';
        document.body.appendChild(imagio)
        var meme = new Audio('crtmh.mp3');
        meme.volume = 0.03;
        meme.play()
        setTimeout(() => {
            // console.log("no dobra coś robie ")
            imagio.remove()
        }, 240000);

    } else {
        kod = ''
        alert("NIE")
        document.querySelector('.code_container').remove()
    }
}

function remove() {
    document.querySelector('.digit_monit').innerHTML = ''
    kod = ''
}