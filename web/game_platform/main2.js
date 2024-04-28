/*
Welkom bij versie 1.0 van de game.
als u hier bent gekomen na aanleiding van tekst onderaan het selectiescherm heb ik het niet goed weg gehaald. (en ben ik waarschijnlijk de tutorial vergeten)
Een groot deel hiervan wordt verwerkt in de game zelf, maar ik heb de uitleg een lage prioriteit gegeven.

De game is een tbrpg-roguelike. De combat werkt op een soortgelijke manier als bij pokémon. Je kan verschillende aanvallen en abilities selecteren. Er zijn 3 classes, Martial combatant, paladin en Sorcerer.
Dit zijn alledrie type proffessies die in veel fantasy-games voorkomen. Een korte samenvatting van allen hieronder:
Martial Combatant - iemand die op militair niveau in het gebruik van wapens is getrained.
Paladin - Iemand die goed getrained is met wapens en daarnaast magische krachten krijgt van de goden.
Sorcerer - Iemand die heel goed kan toveren.

Heel de game werkt met behulp van de pijltjes toetsen, behalve wat debuggfuncties. Om te selecteren als wat je wilt spelen moet je op de pijltjes naar links en rechts drukken, en op naar beneden als je een keuze hebt gemaakt.
Er staan op het moment dat ik dit typ nog geen poppetjes op het veld omdat ik die moet importeren, en er staan wat getallen gekrast over het veld. De getallen zijn voor debugg-doeleinden.

Er staan 2 rode balkjes die aangeven hoeveel health je over hebt, met het balke links die van jouw en het balkje rechts die van de vijand. Het doel is om de vijand te verslaan.
Dominic is bezig met een map, het doel is dat je op de willekeurig-gegenereerde map vijanden tegenkomt en je zoveel mogelijk secties van de map moet uitmoor-.. halen.
Op dit moment zijn er maar 3 vijanden, als je tegen een andere wilt vechten druk dan op een getal van 1 t/m 6 (of 7).
Linksonder zit een menuutje waar meerdere dingen staan. In het doosje rechts ervan staat uitleg wat alles doet.
Je kan selecteren wat je wilt doen door op pijltjes naar boven en naar beneden te klikken en op het pijlte naar rechts als je de actie hebt gevonden.

Als er Wauw staat heb je gewonnen en als er Jammer Joh staat heb je verloren. Dit zijn twee outputs die we later zullen gebruiken.

Het doel is dus dat je zoveel mogelijk rooms weet te halen. Dominics deel van de game en die van mij zijn nog niet gelinked, dus de enige manier om van kamer te veranderen is om via de console Room te veranderen, dit veranderd ook de moeilijkheidsgraad.
Het gaat erg snel want dat is lekker makkelijk voor mij om te progammeren, als je op de muis klikt zul je op het scherm zien dat 1 van de variabelen heel snel gaat en de andere kommagetallen genereert.
De bovenste geeft aan op welk 'level' je zit. In de game zul je als je dood gaat helemaal terug moeten gaan om te kijken hoeveel levels je kan halen voordat dat gebeurt.
Er staan geen strikte regels op, maar ga er vanuit dat een redelijke speler t/m 20 zou kunnen komen.
*/

//afbeeldingen
let tib;
let tib1;
let tib2;
let tes;
let dom;
let pit;
let pit1;
let pit2;
let bar;
let bar1;
let bar2;
let nat;
let nat1;
let nat2;
let gel;
let gel1;
let gel2;
let ex;
let ex1;
let ex2;
let fig;
let fig1;
let fig2;
let sor;
let sor1;
let sor2;
let sor3;
let pal;
let pal1;
let pal2;
let darma;
let darma2;
let darma3;
let darma4;
let achtergrond;
let achtergrond2;
let eazy;
let medi;
let boss;
function preload (){
tib = loadImage('tibo.png');
tib1 = loadImage('tibo1.png');
tib2 = loadImage('tibo2.png');
tes = loadImage('test.png');
eazy = loadImage('easy.png');
medi = loadImage('medium.png');
boss = loadImage('boss.png');
dom = loadImage('dominic.png');
pit = loadImage('Piet.png');
pit1 = loadImage('Piet1.png');
pit2 = loadImage('Piet2.png');
bar = loadImage('bart.png');
bar1 = loadImage('bart1.png');
bar2 = loadImage('bart2.png');
nat = loadImage('nat.png');
nat1 = loadImage('nat1.png');
nat2 = loadImage('nat2.png');
ex = loadImage('Ex.png');
ex1 = loadImage('Ex1.png');
ex2 = loadImage('Ex2.png');
gel = loadImage('Gello.png');
gel1 = loadImage('Gello1.png');
gel2 = loadImage('Gello2.png');
fig = loadImage('fighter.png');
fig1 = loadImage('fighter1.png');
fig2 = loadImage('fighter2.png');
sor = loadImage('sorcerer.png');
sor1 = loadImage('sorcerer1.png');
sor2 = loadImage('sorcerer2.png');
sor3 = loadImage('sorcerer3.png');
pal = loadImage('paladin.png');
pal1 = loadImage('paladin1.png');
pal2 = loadImage('paladin2.png');
darma = loadImage('Darmagus.png');
darma2 = loadImage('Darmagus2.png');
darma3 = loadImage('Darmagus3.png');
darma4 = loadImage('Darmagus4.png');
achtergrond = loadImage('grondachter.png');
achtergrond2 = loadImage ('grondachter2.png');
}

var gif = 0;
//variabele posities
var grotegloeienegenadewatisdiegeertwildersdieikophetjeugdjournaalhebgezientocheenraregast = 0;
var Sp = 0;
var Pos1 = 0;
var Pos2 = 0;
//Xpositie, Ypositie, Breedte, Hoogte van het menu
var Mn = [20, 550, 180, 145];
//stats van speler
var Atk = 9;
var Satk = 9;
var Def = 0;
var Sdef = 0;
var HP = 30;
var CHP = -4;
var HP1 = 300;
var atk1 = false;
var wpn = 4;
//stats van de relevante enemy
var EAtk = 8;
var ESatk = 8;
var EDef = 8;
var ESDef = 8;
var EHP = 80;
var ECHP = -4;
var EHP1 = 300;

//stat van het wapen dat de speler op dit moment heeft
var wpn = 2;
//een test-variable om te kijken of het mogelijk is om muziek in het spel te stopen, ja
var audio = new Audio('nein.mp3');
//inputs, de triggers staan bij de functions die toevallig ook inputs heten
var RER = false;
var FER = false;
var REL = false;
var FEL = false;
var REU = false;
var FEU = false;
var RED = false;
var FED = false;
//meerdere anti-loop variabelen
var Cnt = 0;
var Cnt1 = 0;
var Cnt2 = 0;
//timer
var Cnt3 = 0;
//variabele om te controleren of je raakt
var res = 0;
//wordt gebruikt in de formule die kijkt of je raakt als een willekeurig getal tussen de 1 en de 100
var rand = 0;
//outputs
var spc1 = false;
var spc2 = false;
var spc3 = false;
var spc4 = false;
//zorgt ervoor dat je jezelf kan healen
var hl = 0;
//zorgt ervoor dat je jezelf kan buffen
var atb = 0;
var deb = 0;
//door dit kun je wegrennen als een watje
var flee = 0;
var Eat = false;
//cooldown abilities
var Cl1 = 0;
var Cl2 = 0;
var Cl3 = 0;
var Cl4 = 0;
//hiermee kun je een character kiezen
var Character = 0;
var Enemy = 0;
//hoofdmenu
var Men = 0;
var AB = 0;
//aantal potions
var pt = 2;
var potion = false;
//zorgt voor een koel berichtje over waarmee wordt aangevallen
var tx = false;
var tx1 = ""
var tx2 = ""
var txt = 0;
//houdt bij hoeveel kamers je hebt gehaald
var Room = 0;
//maakt de vijanden moeilijker, de formule hiervoor staat direct na de if
var R = 0;
//speciale variabelen oor vijanden
var lc1 = -3;
var lc2 = -3;
var sts = -1;
var plot = 0;
//variabelen die ik niet heb gemaakt
var easy = [0, 1, 2, 3];
var med = [9, 10];
var bos = [20, 21];
var levl = [1,2,3,4,6,7,8,9,11,12,13,14];
var playerPosX = 2;
var playerPosY = 2;
var move = 0;
var punten = 1;
var selectMap = 0;
var encounter = 0;
var veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
             [0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
             [0, 0, 2, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
var dd = 2;

//met deze functie worden de ariabelen gedeclareerd waardoor je ook een andere character zou kunnen kiezen.
var Chr = function (Attack, SpecialAttack, Defense, SpecialDefense, MaxHealth){
Atk = Attack;
Satk = SpecialAttack;
Def = Defense;
Sdef = SpecialDefense;
HP = MaxHealth;
if (CHP == -4){
    CHP = MaxHealth;
}
}
var Enm = function (Eattack, EspecialAttack, Edefense, EspecialDefense, EmaxHealth){
    EAtk = Eattack;
ESatk = EspecialAttack;
EDef = Edefense;
ESDef = EspecialDefense;
EHP = EmaxHealth;
if (ECHP == -4){
    ECHP = EmaxHealth;
}
}
//Darmagus-functie
var Dar = function(){
    if (Eat == true && Cnt < 1 && FER == false){
        sts = 1;
        
        Cnt = Cnt + 1;
    }
    if (Cnt > 0 && Eat == true){
        Cl1 = Cl1 - 1;
        Cl2 = Cl2 - 1;
        Cl3 = Cl3 - 1;
        Cl4 = Cl4 - 1;
        Cnt = 0;
        Eat = false;
    }
}
//input detectors
var Inputs = function(){
    //rising edge
    if (keyCode === 39){
        if (keyIsPressed){
            RER = true;
        }
        else {
            FER = true;
            RER = false;
            keyCode = 0;
        }
    }
    if (keyCode === 37){
        if (keyIsPressed){
            REL = true;
        }
        else {
            FEL = true;
            REL = false;
            keyCode = 0;
        }
    }
    if (keyCode === 38){
        if (keyIsPressed){
            REU = true;
        }
        else {
            FEU = true;
            REU = false;
            keyCode = 0;
        }
    }
    if (keyCode === 40){
        if (keyIsPressed){
            RED = true;
        }
        else {
            FED = true;
            RED = false;
            keyCode = 0;
        }
    }
}
//nog meer input detectors
var Inputs2 = function(){
    if (keyIsPressed){
        RER = false;
    }
    if (FER === true) {
        FER = false;
    }
    if (FEL === true) {
        FEL = false;
    }
    if (FEU === true) {
        FEU = false;
    }
    if (FED === true) {
        FED = false;
    }
}
//als dit wordt geactiveerd val je aan en 9 van de 10 keer doe je damage op basis van jouw bdmg, atb, atk, wpn en de vijands DEF
//de kans dat je raakt wordt waarschijnlijk nog aangepast
//de acc bepaalt precies hoevaak je raakt (procent kans om te raken)
var Attack = function(bdmg, acc){
    //zorgt ervoor dat de text wordt weergeven
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 0 && potion == false){
        tx1 = "Je valt aan.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99)
        {
            tx2 = "Je raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Je mist.."
        }
    }}
    //de cijfertjes die alles uitrekenen
    while (Cnt1 < 1 && atk1 == true && RER == true && tx == false){
        rect(200, 100, 100, 100);
    rand = random(0, 100);
    res = acc + rand;
    txt = 0;
    //kijkt of je raakt
    if (res > 99){
        bdmg = bdmg + atb;
        ECHP = ECHP - ((((Atk * 3) + (Atk * wpn)) / (EDef)) * bdmg);
        bdmg = bdmg - atb;
        atb = 0;
        }
    else if (res < 100){
    }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && atk1 == true){
        Pos1 = 0;
        Cnt = 0;
        atk1 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        Cnt = 0;
        atk1 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (atk1 = true){
        atk1 = false;
    }
}
//net zoals een normale attack, maar de input zit ergens anders en er zit een cooldown op
var SAttack = function(bdmg, acc, sp){
    //anti-loop
    while (Cnt1 < 1 && sp == true && RER == true){
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        bdmg = bdmg + atb;
        ECHP = ECHP - ((((Atk * 3) + (Atk * wpn)) / (EDef)) * bdmg);
        bdmg = bdmg - atb;
        Cl2 = 3;
        atb = 0;
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && sp == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (sp == true){
        txt = 1;
        spc1 = false;
        spc2 = false;
        spc3 = false;;
    }
}
var SAttack2 = function(bdmg, acc, sp){
    //anti-loop
    while (Cnt1 < 1 && sp == true && RER == true){
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        bdmg = bdmg + atb;
        ECHP = ECHP - ((((Atk * 3) + (Atk * wpn)) / (EDef)) * bdmg);
        bdmg = bdmg - atb;
        Cl1 = 2;
        atb = 0;
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && sp == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        tx1 = 1;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (sp == true){
        txt = 2;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
    }
}
var SAttack3 = function(bdmg, acc, sp){
    //anti-loop
    while (Cnt1 < 1 && sp == true && RER == true){
        console.log("Attacked!");
        txt = 12;
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        ECHP = ECHP - ((((Satk * 3) + (Satk * wpn)) / (EDef)) * bdmg);
        Cl1 = 6;
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && sp == true && Cnt3 > 2){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true && Cnt3 > 2){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (sp == true && Cnt3 > 2){
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
    }
}
var SAttack3_5 = function(bdmg, acc, sp){
    //anti-loop
    while (Cnt1 < 1 && sp == true && RER == true){
    txt = 14;
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        bdmg = bdmg + atb;
        ECHP = ECHP - ((((Atk * 3) + (Atk * wpn)) / (EDef)) * bdmg);
        bdmg = bdmg - atb;
        Cl3 = 2;
        atb = 0;
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && sp == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        txt = 14;
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (sp == true){
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
    }
}
//dankzij dit valt de vijand aan
var EnemyAttack = function(bdmg, acc){  
    if (Eat == true && Cnt < 1 && FER == false){
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        CHP = CHP - ((EAtk / Def) * bdmg);
        }
        //anti-loop
    Cnt = Cnt + 1;
    //nog meer reset maar dan zodat het ook werkt als hij mist
    }
    if (Cnt > 0 && Eat == true){
        Cl1 = Cl1 - 1;
        Cl2 = Cl2 - 1;
        Cl3 = Cl3 - 1;
        Cl4 = Cl4 - 1;
        Cnt = 0;
        Eat = false;
    }
}
var EnemySAttack = function(bdmg, acc){  
    while (Eat == true && Cnt < 1 && FER == false){
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        CHP = CHP - ((ESatk / Sdef) * bdmg);
        }
        //anti-loop
    Cnt = Cnt + 1;
    //nog meer reset maar dan zodat het ook werkt als hij mist
    }
    if (Cnt > 0 && Eat == true){
        Cl1 = Cl1 - 1;
        Cl2 = Cl2 - 1;
        Cl3 = Cl3 - 1;
        Cl4 = Cl4 - 1;
        Cnt = 0;
        Eat = false;
    }
}
var EnemyHeal = function(heal){
    //detecteert dat je wilt healen
    if (Eat == true && Cnt < 1 && FER == false && ECHP > 0){
        hl = heal;
        ECHP = ECHP + hl;
        Cnt = Cnt + 1
    }
    //anti-loop
    if (Cnt > 0 && Eat == true && Cnt3 > 148){
        lc2 = lc2 - 1;
        Cl1 = Cl1 - 1;
        Cl2 = Cl2 - 1;
        Cl3 = Cl3 - 1;
        Cl4 = Cl4 - 1;
        Cnt = 0;
        Eat = false;
}}
//hierdoor verschijnen er geen negatieve getallen naast de abilities
var CooldownGrens = function(){
    if (Cl1 < 0){
        Cl1 = 0;
    }
    if (Cl2 < 0){
        Cl2 = 0;
    }
    if (Cl3 < 0){
        Cl3 = 0;
    }
    if (Cl4 < 0){
        Cl4 = 0;
    }
}
//een attack die andere variabelen gebruikt en meestal een cooldown heeft
var Laser = function(bdmg, acc){
    //anti-loop
    while (Cnt1 < 1 && spc3 == true && RER == true){
        txt = 27;
    rand = random(0, 100);
    res = acc + rand;
        Cl3 = 4;
    //kijkt of je raakt
    if (res > 99){
        ECHP = ECHP - ((Satk * 5) / ESDef * bdmg);
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && spc3 == true){
        Pos1 = 0;
        Cnt = 0;
        spc3 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        Cnt = 0;
        spc3 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (spc3 = true){
        spc3 = false;
    }
}
var Laser2 = function(bdmg, acc){
    //anti-loop
    while (Cnt1 < 1 && spc4 == true && RER == true){
    txt = 15;
    rand = random(0, 100);
    res = acc + rand;
        Cl4 = 3;
    //kijkt of je raakt
    if (res > 99){
        ECHP = ECHP - ((Satk * 5) / ESDef * bdmg);
        }
        //anti-loop
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && spc4 == true){
        Pos1 = 0;
        Cnt = 0;
        spc4 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        Cnt = 0;
        spc4 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (spc4 == true){
        spc4 = false;
    }
}
var CLaser = function(bdmg, acc){
    //anti-loop
    while (Cnt1 < 1 && spc1 == true && RER == true){
    rand = random(0, 100);
    res = acc + rand;
    //kijkt of je raakt
    if (res > 99){
        ECHP = ECHP - ((Satk * 5) / ESDef * bdmg);
        }
        //anti-loop
        txt = 25;
        Cnt = Cnt + 1;
    //zet je terug in het normale menu nadat je hebt aangevallen   
    if (FER == true && Cnt > 0 && spc1 == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        Cnt1 = 0;
        }
    //nog meer reset maar dan zodat het ook werkt als je mist    
    Cnt1 = Cnt1 + 1;
    }
    if (Cnt1 > 0 && FER == true){
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        Cnt1 = 0;
    }
    //laatste reset voordat je uit de function wordt gegooid
    if (spc1 == true){
        spc1 = false;
    }
}
// als dit wordt geactiveerd krijg je een deel van je hp terug
var Heal = function(heal, sp){
    //detecteert dat je wilt healen
    if (spc1 == true && FER == true && hl == 0){
        console.log("Healed!");
        hl = heal;
        CHP = CHP + hl;
    }
    //anti-loop
    if (FER == true && sp == true){
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
        hl = 0;
        Pos1 = 0;
}}
var Heal2 = function(heal, sp){
    //detecteert dat je wilt healen
    if (sp == true && FER == true && hl == 0 && Cl4 < 1){
        hl = heal;
        CHP = CHP + hl;
        Cl4 = 4;
    }
    //anti-loop
    if (FER == true && sp == true){
        txt = 31;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
        hl = 0;
        Pos1 = 0;
}}
var Heal3 = function(heal, sp){
    //detecteert dat je wilt healen
    if (sp == true && FER == true && hl == 0){
        txt = 13;
        hl = heal;
        CHP = CHP + hl;
        Cl2 = 6;
    }
    //anti-loop
    if (FER == true && sp == true){
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
        hl = 0;
        Pos1 = 0;
}}
var Shield = function(){
    Sdef = Sdef + deb;
    Def = Def + deb;
    if (Cl2 == 4){
        deb = 6;
    }
    if (Cl2 < 2){
        deb = 0;
    }
    if (spc2 == true && RER == true){
        Cl2 = 5;
    }
    //anti-loop
    if (FER == true && spc2 == true){
        txt = 26;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
        Pos1 = 0;
}}
var Potns = function(){
    if (potion == true && pt > 0){
        Cnt2 = Cnt2 + 1;
        if (Cnt3 > 77){
        CHP = HP;
        }}
        if (Cnt3 > 0 && Cnt3 < 81 && potion == true && pt > 0){
            tx1 = "Je drinkt een potion."
            tx2 = ""
        }
    if (potion == true && Cnt3 > 78){
        pt = pt - 1;
        potion = false;
        Eat = true;
    }
    else if (FER == true && potion == true && pt < 1 )
        {
            potion = false;
        }
    if (pt < 0){
        pt = 0;
    }
}
// als dit wordt geactiveerd versterk je je volgende aanval
var Buff = function (bb, sp){
    // de RER en FER zorgen ervoor dat de function niet kan loopen en dat je niet meteen een tweede input geeft om aan te vallen, dat komt doordat FER altijd na RER komt en omdat beide maar voor 1 frame/tick/watdanook relevant zijn
    if (sp == true && RER == true && Cnt == 0){
        atb = Atk/9 * bb + atb;
        Cnt = Cnt + 1;
        Cl3 = 3;
    }
    //anti-loop
    if (FER == true && sp == true){
        txt = 101;
        Pos1 = 0;
        Cnt = 0;
        spc1 = false;
        spc2 = false;
        spc3 = false;
        spc4 = false;
}
}
var menu = function (){
    //tekent het basismenu
    var btM = function (Mn0, Mn1, Mn2, Mn3){
    fill(245, 245, 245);
    stroke(0, 0, 0);
    rect(Mn[0], Mn[1], Mn[2] - 30, Mn[3]);
    textSize(20);
    fill(10, 10, 10);
    text("Attack", Mn[0] + 20, Mn[1] + 25);
    text("Special", Mn[0] + 20, Mn[1] + 60);
    text(pt, Mn[0] + 130, Mn[1] + 95);
    text("Potion", Mn[0] + 20, Mn[1] + 95);
    text("Nadenkhoek", Mn[0] + 20, Mn[1] + 130);
    fill(250, 250, 250);
    stroke(0, 0, 0);
    strokeWeight(1);}  
    //tekent het special-menu
    var spcM = function (Mn0, Mn1, Mn2, Mn3){
    fill(245, 245, 245);
    stroke(0, 0, 0);
    rect(Mn[0], Mn[1], Mn[2] + 10, Mn[3]);
    textSize(20);
    fill(10, 10, 10);
         if (Character == 0){
    text("Focused Strike", Mn[0] + 20, Mn[1] + 25);
    text("Reckless Attack", Mn[0] + 20, Mn[1] + 60);
    text("Ready", Mn[0] + 20, Mn[1] + 95);
    text("Second Wind", Mn[0] + 20, Mn[1] + 130);
         }
         if (Character == 1){
    text("Drain", Mn[0] + 20, Mn[1] + 25);
    text("Heal", Mn[0] + 20, Mn[1] + 60);
    text("Smite", Mn[0] + 20, Mn[1] + 95);
    text("Wrath", Mn[0] + 20, Mn[1] + 130);
         }
         if (Character == 2){
    text("Firebolt", Mn[0] + 20, Mn[1] + 25);
    text("Shield", Mn[0] + 20, Mn[1] + 60);
    text("Ice Spike", Mn[0] + 20, Mn[1] + 95);
    text("Missile", Mn[0] + 20, Mn[1] + 130);
         }
    fill(10, 10, 100);
    if (Character < 2 && Cl1 > 0){
    text(Cl1, Mn[0] + 170, Mn[1] + 25);}
         if (Cl2 > 0){
    text(Cl2, Mn[0] + 170, Mn[1] + 60);}
         if (Cl3 > 0){
    text(Cl3, Mn[0] + 170, Mn[1] + 95);}
         if (Cl4 > 0){
    text(Cl4, Mn[0] + 170, Mn[1] + 130);}
    fill(250, 250, 250);
    stroke(0, 0, 0);
    strokeWeight(1);}
     //tekent het pijltje en registreert waar het pijltje zich bevindt
    var arrow = function (tX, tY){
    triangle(tX, tY, tX + 8, tY - 4, tX, tY - 8);
        if (keyCode === 37){
         Pos1 = 0;
     }
     if (keyCode === 40 && keyIsPressed) {
            Sp = 1;
        }
        else if (keyCode === 38 && keyIsPressed) {
            Sp = -1;
        }
        else {
            Pos1 += Sp;
            Sp = 0;
        }
        //terug naar battlemenu
    
        //grenzen battlemenu
    if (Pos1 == 4) {
        Pos1 = 3;
    }
    if (Pos1 < 0) {
        Pos1 = 0;
    }
         //grenzen specialmenu
    if (Pos1 == 19 && keyIsPressed == false){
        Pos1 = 20;
    }
    if (Pos1 == 24) {
        Pos1 = 23;
    }
        
    tY = Mn[1] + 21 + Pos1 * 35;
    }
    
//battlemenu
    strokeWeight(1);
    btM(20, 195, 100, 145);
    arrow(Mn[0] + 7, Mn[1] + 21 + Pos1 * 35);
//positiescanner
    if (Pos1 > 8 && Pos1 < 18){
        atkM(40, 175, 80, 145);
        arrow(Mn[0] + 7, Mn[1] + 21 + Pos1 * 35 - 350);
    }      
    if (Pos1 > 18 && Pos1 < 28){
        spcM(40, 175, 80, 145);
        arrow(Mn[0] + 7, Mn[1] + 21 + Pos1 * 35 - 700);
    }
var output = function(){
    //outputs battlemenu
    if (keyCode === 39 && keyIsPressed && Pos1 < 9) {
        fill(100, 100, 100);
        if (Pos1 === 0) {
            atk1 = true;
        }                   
        if (Pos1 === 1) {
            Pos1 = 19;
        }
        if (Pos1 === 2) {
            ellipse (100, 150, 20, 20);
            potion = true;
        }
        if (Pos1 === 3) {
            ellipse (150, 150, 20, 20);
            flee = flee + 10;
        }
    }
    //outputs speciaal menu
     if (keyCode === 39 && keyIsPressed && Pos1 > 19 && Pos1 < 29){
        fill(200, 0, 100);
        if (Pos1 === 20 && Cl1 < 1) {
            ellipse (100, 100, 20, 20);
            spc1 = true;
        }                   
        if (Pos1 === 21 && Cl2 < 1) {
            ellipse (150, 100, 20, 20);
            spc2 = true;
        }
        if (Pos1 === 22 && Cl3 < 1) {
            ellipse (100, 150, 20, 20);
            spc3 = true;
        }
        if (Pos1 === 23) {
            ellipse (150, 150, 20, 20);  
            spc4 = true;
        }}}
  output();  

}
var combat = function(){
    //zorgt ervoor dat je kan zien hoeveel hp je nog over hebt
    var EHPbalk = function(){
    EHP1 = 300 * (ECHP / EHP);
    if (ECHP < 1){
        EHP1 = 0;
    }
    if (ECHP > EHP) {
        ECHP = EHP;
    }
    fill(0, 0, 0);
    rect(940, 675, 300, 15);
    fill(255, 0, 0);
    strokeWeight(1);
    rect(940, 675, EHP1, 15);
    }
    var HPbalk = function(){
    HP1 = 300 * (CHP / HP);
    if (CHP < 1){
        HP1 = 0;
    }
    if (CHP > HP) {
        CHP = HP;
    }
    fill(0, 0, 0);
    rect(220, 680, 300, 15);
    fill(255, 0, 0);
    strokeWeight(1);
    rect(220, 680, HP1, 15);
    }
    HPbalk();
    EHPbalk();
}
var gameover = function(){
    if (CHP < 1 && Cnt3 > 148){
        Men = 3;
    }
    if (ECHP < 1){
        if ((Enemy == 9 || Enemy == 10) && Cnt3 == 148){
            pt = pt + 1;
        }
        if ((Enemy == 20) && Cnt3 == 148){
            pt = pt + 2;
        }
        veld0[playerPosY][playerPosX] = 1;
        Cl1 = 0;
        Cl2 = 0;
        Cl3 = 0;
        Cl4 = 0;
        fill(255, 255, 255);
        textSize(40);
        strokeWeight(5);
        strokeWeight(1);
        if (Cnt3 > 148){
        Enemy = 0;
        encounter = 0;
        Men = 4;
        Cnt3 = 0;
        }
    }
    noStroke();
    textSize(20);
}
var MainMenu = function(){
    selection = function(){
        if (keyIsPressed && keyCode === 39 && AB < 1){
            Pos2 = Pos2 + 1;
            AB = 1;
        }
        if (keyIsPressed && keyCode === 37 && AB < 1){
            Pos2 = Pos2 - 1;
            AB = 1;
        }
        
        if (keyIsPressed == false){
            AB = 0;
        }
        if (Pos2 > 2){
            Pos2 = 2;
        }
        if (Pos2 < 0){
            Pos2 = 0;
        }
        Character = Pos2;
        if (keyIsPressed && keyCode === 40){
            ECHP = 200;
            Men = 4;
        }
    }
    selection();
    
    fill(0, 0, 140);
    if (Pos2 == 0) {
        strokeWeight(20);
        stroke(255, 150, 50);
    }
    rect(50, 170, 350, 500);
    if (Pos2 == 0) {
        strokeWeight(1);
        stroke(0, 0, 0);
    }
    if (Pos2 == 1) {
        strokeWeight(20);
        stroke(255, 150, 50);
    }
    rect(450, 170, 350, 500);
    if (Pos2 == 1) {
        strokeWeight(1);
        stroke(0, 0, 0);
    }
    if (Pos2 == 2) {
        strokeWeight(20);
        stroke(255, 150, 50);
    }
    rect(850, 170, 350, 500);
    if (Pos2 == 2) {
        strokeWeight(1);
        stroke(0, 0, 0);
    }
    fill(200, 50, 50);
    rect(40, 40, 1170, 100);
    fill(255, 255, 255);
    textSize(50);
    text("Welkom bij DungeonKruiper. Kies een class", 130, 105);
    textSize(50);
    text('Martial', 100, 310);
    text('Combatant', 120, 390);
    text('Paladin', 560, 350);
    text('Sorcerer', 880, 350);
    textSize(25);
    text('+ Gaat niet snel dood', 70, 490);
    text('+ Verschillende aanvallen', 70, 530);
    text('- Kan geen magie gebruiken', 70, 570);
    text('+ Kan zichzelf goed healen', 470, 490);
    text('+ Kan magie gebruiken', 470, 530);
    text('- Doet niet veel damage', 470, 570);
    text('+ Doet veel damage', 870, 490);
    text('+ Kan zichzelf verdedigen', 870, 530);
    text('- Kan alleen magie gebruken', 870, 570);
}
var Text = function(){
    fill(255, 255, 255);
    strokeWeight(1);
    stroke(0, 0, 0);
    rect(220, 580, 400, 80);
    fill(0, 0, 0);
    text(tx1, 230, 611);
    text(tx2, 230, 641);
    if (tx == false && atk1 == false){
        if (Character == 0){
            if (Pos1 == 0){
                tx1 = "Normale aanval, 80% kans om te raken."
                tx2 = ""
            }
            if (Pos1 == 1){
                tx1 = "Selecteer dit om jouw speciale aanvallen"
                tx2 = "weer te geven."
            }
            if (Pos1 == 2){
                tx1 = "Gebruik een potion om tot volledige"
                tx2 = "health te healen."
            }
            
            if (Pos1 == 20){
                tx1 = "Een aanval die weinig damage doet maar"
                tx2 = "altijd raakt."
            }
            if (Pos1 == 21){
                tx1 = "Een aanval die veel damage doet maar"
                tx2 = "slechts 60% kans heeft om te raken."
            }
            if (Pos1 == 22){
                tx1 = "Hiermee doet jouw volgende aanval die"
                tx2 = "raakt extra damage."
            }
            if (Pos1 == 23){
                tx1 = "Hiermee krijg je een deel van de health"
                tx2 = "die je verloren hebt terug."
            }
        }
        if (Character == 1){
            if (Pos1 == 0){
                tx1 = "Normale aanval, 80% kans om te raken."
                tx2 = ""
            }
            if (Pos1 == 1){
                tx1 = "Selecteer dit om jouw speciale aanvallen"
                tx2 = "weer te geven."
            }
            if (Pos1 == 2){
                tx1 = "Gebruik een potion om tot volledige"
                tx2 = "health te healen."
            }
            
            if (Pos1 == 20){
                tx1 = "Een aanval die weinig damage doet maar"
                tx2 = "waarmee je een beetje terug healt."
            }
            if (Pos1 == 21){
                tx1 = "Hiermee heal je voor een redelijk"
                tx2 = "aantal health."
            }
            if (Pos1 == 22){
                tx1 = "Normale aanval die veel damage doet en"
                tx2 = "90% van de tijd raakt."
            }
            if (Pos1 == 23){
                tx1 = "Een speciale aanval die redelijk wat"
                tx2 = "damage doet en 95% van de tijd raakt."
            }
        }
        if (Character == 2){
            if (Pos1 == 0){
                tx1 = "Normale aanval, 80% kans om te raken."
                tx2 = ""
            }
            if (Pos1 == 1){
                tx1 = "Selecteer dit om jouw speciale aanvallen"
                tx2 = "weer te geven."
            }
            if (Pos1 == 2){
                tx1 = "Gebruik een potion om tot volledige"
                tx2 = "health te healen."
            }
            
            if (Pos1 == 20){
                tx1 = "Een speciale aanval die 85% van de tijd"
                tx2 = "raakt en niet op hoeft te laden."
            }
            if (Pos1 == 21){
                tx1 = "Hiermee verhoog je voor 3 beurten jouw"
                tx2 = "defense en special defense."
            }
            if (Pos1 == 23){
                tx1 = "Speciale aanval die iets minder damage"
                tx2 = "doet maar altijd raakt."
            }
            if (Pos1 == 22){
                tx1 = "Een speciale aanval die redelijk wat"
                tx2 = "damage doet en 90% van de tijd raakt."
            }
        }
    }
}
var CharacterSelect = function(){
    //martial combatant
    if (Character == 0){
    Chr(6, 2.5, 7, 4, 45);
    if (gif > -1 && gif < 16){
    image(fig, 115, 370, 160, 160);}
    if (gif > 15 && gif < 31){
    image(fig1, 115, 370, 160, 160);}
    if (gif > 30 && gif < 46){
    image(fig2, 115, 370, 160, 160);}
    if (gif > 45 && gif < 61){
    image(fig1, 115, 370, 160, 160);}
    Buff(3, spc3);
    Attack(3, 80);
    SAttack(6, 60, spc2);
    SAttack2(2.6, 100, spc1);
    Heal2(HP/3, spc4)
    //text voor specials
    //luister ik ben niet dom ik snap wel dat deze if-functie geen nut heeft maar hierdoor kan ik dit gedeelte inklappen in brackets.
    if (2 > 1){
    //reckless text
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 1){
        tx1 = "Je gebruikt reckless attack.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99){
        tx2 = "Het raakt!!"}
        if (res < 100){
        tx2 = "Het mist."}
    }}  
    //focused strike text    
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 2){
        tx1 = "Je gebruikt focused strike.."
        tx2 = ""
        if (Cnt3 > 21){
        tx2 = "Wat uiteraard raakt!"
    }}
    //Offensive Stance text
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 101){
        tx1 = "Je gebruikt Ready"
        if (Cnt3 > 21){
        tx2 = "Jouw volgende aanval doet extra damage."}}}
    
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 31){
        tx1 = "Je gebruikt Second Wind."
        if (Cnt3 > 21){
        tx2 = "Er is een deel van jouw health gehealed."}}}
        //paladin
    if (Character == 1){
    Chr(4, 4, 5, 5, 35);
    if (gif > -1 && gif < 16){
    image(pal, 115, 370, 160, 160);}
    if (gif > 15 && gif < 31){
    image(pal1, 115, 370, 160, 160);}
    if (gif > 30 && gif < 46){
    image(pal2, 115, 370, 160, 160);}
    if (gif > 45 && gif < 61){
    image(pal1, 115, 370, 160, 160);}
    Attack(4, 80);
    Heal3(HP/3, spc2);
    Heal(Satk/3 + HP/6, spc1);
    SAttack3(3, 100, spc1);
    SAttack3_5(6, 90, spc3);
    Laser2(4, 95);
    //text voor specials
        if (Cnt3 > 0 && Cnt3 < 81 && txt == 12){
        tx1 = "Je gebruikt Drain.."
        tx2 = ""
            if (Cnt3 > 21){
        tx2 = "Er is een klein deel health gerestored."
            }
    }  
        if (Cnt3 > 0 && Cnt3 < 81 && txt == 13){
        tx1 = "Je gebruikt Heal.."
        tx2 = ""
            if (Cnt3 > 21){
        tx2 = "Er is een deel health gerestored."
    }}
        if (Cnt3 > 0 && Cnt3 < 81 && txt == 14){
        tx1 = "Je gebruikt Smite.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99){
        tx2 = "Je raakt!"}
        if (res < 100){
        tx2 = "Je mist."}
    }}
        if (Cnt3 > 0 && Cnt3 < 81 && txt == 15){
        tx1 = "Je gebruikt Wrath.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99){
        tx2 = "Het raakt!"}
        if (res < 100){
        tx2 = "Het mist."}
    }}
    }
    
        //spellcaster
    if (Character == 2){
    if (gif > -1 && gif < 11){
    image(sor, 115, 370, 160, 160);}
    if (gif > 10 && gif < 21){
    image(sor1, 115, 370, 160, 160);}
    if (gif > 20 && gif < 31){
    image(sor2, 115, 370, 160, 160);}
    if (gif > 30 && gif < 41){
    image(sor3, 115, 370, 160, 160);}
    if (gif > 40 && gif < 51){
    image(sor2, 115, 370, 160, 160);}
    if (gif > 50 && gif < 61){
    image(sor1, 115, 370, 160, 160);}
    Chr(5.5, 9, 4, 6, 45);
    Attack(1.4, 60);
    CLaser(2.8, 85);
    Shield();
    Laser(5, 90);
    Laser2(3, 100);
            //text
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 25){
        tx1 = "Je gebruikt Firebolt.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99){
        tx2 = "Je raakt!"}
        if (res < 100){
        tx2 = "Je mist."}
    }}
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 26){
        tx1 = "Je gebruikt Shield."
        if (Cnt3 > 21){
        tx2 = "Defense en SDefense omhoog."}}
    if (Cnt3 > 0 && Cnt3 < 81 && txt == 27){
        tx1 = "Je gebruikt Ice Spike.."
        tx2 = ""
        if (Cnt3 > 21){
        if (res > 99){
        tx2 = "Je raakt!"}
        if (res < 100){
        tx2 = "Je mist."}
    }}
            if (Cnt3 > 0 && Cnt3 < 81 && txt == 15){
        tx1 = "Je gebruikt Missile.."
        if (Cnt3 > 21){
        tx2 = "Je raakt."}}
    }
}
//in deze functie wordt op basis van de variabele enm bepaald waar je tegen vecht.
var EnemySelect = function(){
    //dit is om te de-buggen, hiermee kan ik wat vijanden uittesten oomdat ik makkelijk kan veranderen van vijand. Dit komt niet in de game tenzij ik vergeet het eruit te halen
    //alle enemies
    //Voor dit deel ga ik maar bij 1 enemy uitleggen wat alles doet, bij de andere enemies is het bijna hetzelfde maar dan zijn er dingen als variabelen wat aangepast
    //Gello
    if (Enemy == 0){
    //sprite
    if (Cnt3 < -1){
        tx1 = "Je bent Gello tegengekomen!"
        tx2 = ""
    }
    if (gif > -1 && gif < 16){
    image(gel, 1020, 370);}
    if (gif > 15 && gif < 31){
    image(gel1, 1020, 370);}
    if (gif > 30 && gif < 46){
    image(gel2, 1020, 370);}
    if (gif > 45 && gif < 61){
    image(gel1, 1020, 370);}
    //de stats
    Enm(6 * R, 6 * R, 5 * R, 5 * R, 70);
        //aanvallen
    if (ECHP < 1){
        tx1 = "Gello is verslagen!"
        tx2 = ""
    }
    else if (ECHP > 10 || rand > 50){
        EnemyAttack(3 * R, 80);
        //text
        if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Gello valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Het raakt!"
        }
        else if (res < 99)
        {
            tx2 = "Het mist.."
        }}
    }
        } else{
            EnemyHeal(13);
        }
        if (ECHP < 24 && rand < 51 && Cnt3 > 80 && Cnt3 < 160){
            tx1 = "Gello healt zichzelf."
            tx2 = ""
        }
    }
    if (Enemy == 1){
        //sprite
    if (Cnt3 < -1){
    tx1 = "Je bent Ex tegengekomen!"
        tx2 = ""}
    if (gif > -1 && gif < 16){
    image(ex, 1020, 370);}
    if (gif > 15 && gif < 31){
    image(ex1, 1020, 370);}
    if (gif > 30 && gif < 46){
    image(ex2, 1020, 370);}
    if (gif > 45 && gif < 61){
    image(ex1, 1020, 370);}
    Enm(6 * R, 6 * R, 4 * R, 4 * R, 70);
        if (Def > Sdef){
        EnemySAttack(3 * R, 98);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Ex gebruikt arcane blast.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Ze raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Ze mist.."
        }}
    }
        }
        else{
            EnemyAttack(3 * R, 90);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Ex valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Ze raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Ze mist.."
        }}
    }
        }
    }
    if (Enemy == 20){
        if (Cnt3 < -1){
        tx1 = "Je bent Darmagus tegengekomen!"
        tx2 = "Success..."}
        if (gif > -1 && gif < 16){
        image(darma, 1020, 370, 160, 160);}
        if (gif > 15 && gif < 31){
        image(darma2, 1020, 370, 160, 160);}
        if (gif > 30 && gif < 46){
        image(darma3, 1020, 370, 160, 160);}
        if (gif > 45 && gif < 61){
        image(darma4, 1020, 370, 160, 160);}
    if (lc1 == -3){
        lc1 = 1;
    }
    if (lc2 == -3){
        lc2 = 2;
    }
    if (sts == -1){
        sts = 0;
    }
    if (sts == 1){
    Enm(4 * R, 4 * R, 6.5 * R, 6.5 * R, 110);
    }
    if (sts == 0){
    Enm(6.5 * R, 6.5 * R, 4 * R, 4 * R, 110);
    }
        if (EHP1 < 175 && sts == 0){
            
            if (Cnt3 > 80 && Cnt3 < 160){
                tx1 = "Darmagus gebruikt stance change."
                tx2 = ""
                if (Cnt3 > 101){
            tx2 = "Zijn Attack en Defense zijn omgedraait." }}
            if (Cnt3 > 148) {
                Dar();
            }
            
        }else if (HP1 > 150 && sts == 0){
              EnemyAttack(8 * R, 100);
                if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Darmagus valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
            tx2 = "Hij raakt."
        }}
        }else if (EHP1 < 90 && sts == 1 && lc2 > 0){
            if (Cnt3 > 149) {
            EnemyHeal(EHP/4);
            lc2 = lc2 - 1;
            }
                    if (Cnt3 > 80 && Cnt3 < 160){
                tx1 = "Darmagus healt zichzelf."
                tx2 = ""
                    }
        
        } else if(CHP > -10){
        EnemyAttack(5 * R, 95);
                        if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Darmagus valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Hij raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Hij mist.."
        }}
    }
        }
    }
    if (Enemy == 2){
    if (Cnt3 < -1){
    tx1 = "Je bent Piet tegengekomen!"
        tx2 = ""}
        //sprite
    if (gif > -1 && gif < 11){
    image(pit, 1020, 370);}
    if (gif > 10 && gif < 21){
    image(pit1, 1020, 370);}
    if (gif > 20 && gif < 31){
    image(pit2, 1020, 370);}
    if (gif > 30 && gif < 41){
    image(pit, 1020, 370);}
    if (gif > 40 && gif < 51){
    image(pit1, 1020, 370);}
    if (gif > 50 && gif < 61){
    image(pit2, 1020, 370);}
    Enm(5 * R, 5 * R, 5 * R, 5 * R, 70);
        if (Def > Sdef){
        EnemySAttack(3 * R, 80);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Piet valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Hij raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Hij mist.."
        }}
    }
        }
        else{
            EnemyAttack(5 * R, 80);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Piet valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Hij raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Hij mist.."
        }}
    }
        }
    }
    if (Enemy == 3){
         if (gif > -1 && gif < 16){
    image(tib, 1020, 370);}
    if (gif > 15 && gif < 31){
    image(tib1, 1020, 370);}
    if (gif > 30 && gif < 46){
    image(tib2, 1020, 370);}
    if (gif > 45 && gif < 61){
    image(tib1, 1020, 370);}
        if (Cnt3 < -1){
        tx1 = "Je bent Tibo tegengekomen!"
        tx2 = ""
    }
    Enm(8 * R, 8 * R, 3 * R, 3 * R, 70);
        
        if (ECHP < 1){
        tx1 = "Tibo is verslagen!"
        tx2 = ""
    }
     else if (rand > 20){
        EnemyAttack(3 * R, 80);
        //text
        if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Tibo valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Het raakt!"
        }
        else if (res < 99)
        {
            tx2 = "Het mist.."
        }}
    }
        }
        else{
        EnemyAttack(5 * R, 80);
        //text
        if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Tibo gebruikt power punch.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Het raakt!"
        }
        else if (res < 99)
        {
            tx2 = "Het mist.."
        }}
    }
        } 
    }
    if (Enemy == 9){
    if (Cnt3 < -1){
    tx1 = "Je bent Nat tegengekomen.."
    tx2 = ""}
    //de stats
     if (gif > -1 && gif < 16){
    image(nat, 1020, 370);}
    if (gif > 15 && gif < 31){
    image(nat1, 1020, 370);}
    if (gif > 30 && gif < 46){
    image(nat2, 1020, 370);}
    if (gif > 45 && gif < 61){
    image(nat1, 1020, 370);}
    Enm(9 * R, 9 * R, 7 * R, 4 * R, 60);
        //aanvallen
    if (ECHP < 1){
        tx1 = "Nat is verslagen!"
        tx2 = ""
    }
    else if(HP1 > 100){
        EnemySAttack(4 * R, 80);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Nat gebruikt fireball.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Hij raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Hij mist.."
        }}
    }
        } else{
            EnemySAttack(3 * R, 100);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Nat gebruikt burning hands.."
        tx2 = ""
        if (Cnt3 > 101){
        
            tx2 = "Hij raakt!"
        }
    }
        }
    }
    if (Enemy == 10){
    if (Cnt3 < -1){
    tx1 = "Je bent Bart tegengekomen.."
    tx2 = ""}
    //de stats
    if (gif > -1 && gif < 16){
    image(bar, 1020, 370);}
    if (gif > 15 && gif < 31){
    image(bar1, 1020, 370);}
    if (gif > 30 && gif < 46){
    image(bar2, 1020, 370);}
    if (gif > 45 && gif < 61){
    image(bar1, 1020, 370);}
    Enm(9 * R, 9 * R, 6 * R, 6 * R, 70);
        //aanvallen
    if (ECHP < 1){
        tx1 = "Bart is verslagen!"
        tx2 = ""
    }
        
    else if(HP1 > 100 || EHP1 > 100){
        EnemyAttack(4 * R, 80);
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Bart valt aan.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Bart raakt!"
        }
    else if (res < 99)
        {
            tx2 = "Bart mist.."
        }}
    }
        } else{
            if (Cnt3 > 158){
            EnemyHeal(15);}
            if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Bart healt zichzelf.."
        tx2 = ""
        if (Cnt3 > 148){
            tx2 = "Wie dit leest is stom"
        }
    }
        }
    }
    if (Enemy == 21){
        Enm(1 * R * plot, 1 * R * plot, 10 * R, 10 * R, 110);
        text(plot, 500, 500);
        image(dom, 1020, 370);
        if (Cnt3 < -1){
            tx1 = "Je bent Dominiek tegengekomen."
            tx2 = "Hij ziet er niet blij uit..."
        }
        if (plot < (1 + (EHP1/40))){
            if (Cnt3 > 79 && Cnt3 < 151){
                tx1 = "Dominiek gebruikt Plot."
                tx2 = "Zijn aanvallen zijn sterker geworden!"
            }
            if (Cnt3 == 150){
                Cl1 = Cl1 - 1;
                Cl2 = Cl2 - 1;
                Cl3 = Cl3 - 1;
                Cl4 = Cl4 - 1;
                plot = plot + 1;
            }
        }
        else{
            if (Cnt3 < 150){
                if (Cnt3 > 80 && Cnt3 < 160){
        tx1 = "Dominiek slaat zijn slag en.."
        tx2 = ""
        if (Cnt3 > 101){
        if (res > 99)
        {
            tx2 = "Hij raakt!"
        }
        else if (res < 99)
        {
            tx2 = "Hij mist.."
        }}
    }
        EnemySAttack(6 * R * plot, 50);}
    }}
}
function setup() {
  createCanvas(1280, 720);
  console.log("setup klaar");
}
var veld = function () {
  if (punten == 1) {
    playerPosX = 1
    playerPosY = 1
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 1, 1, 1, 3, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 2) {
    playerPosX = 2
    playerPosY = 1
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 0, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 4, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 3) {
    playerPosX = 1
    playerPosY = 4
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
             [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
             [0, 1, 1, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 0, 0, 0],
             [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
             [0, 0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 4) {
    playerPosX = 1
    playerPosY = 4

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 2, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 2, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 1, 1, 1, 2, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
}
  if (punten == 6) {
    playerPosX = 1
    playerPosY = 1
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0],
             [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
             [0, 0, 1, 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 0, 1, 0],
             [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 7) {
    playerPosX = 2
    playerPosY = 1
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 3, 0, 0, 0, 3, 0, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
             [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 4, 0, 0, 0, 0],
             [0, 0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 2, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 8) {
    playerPosX = 1
    playerPosY = 1
    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
             [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
             [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
             [0, 1, 0, 3, 0, 1, 0, 1, 0, 1, 0, 3, 0, 1, 0, 0],
             [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
             [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
             [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 2, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (punten == 9) {
    playerPosX = 8
    playerPosY = 4

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 4, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
}
  if (map == 11) {
    playerPosX = 1
    playerPosY = 1

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             map = 0
}
  if (punten == 12) {
    playerPosX = 1
    playerPosY = 1

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
             [0, 2, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
}
  if (punten == 13) {
    playerPosX = 7
    playerPosY = 7

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0],
             [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
             [0, 1, 0, 1, 4, 1, 0, 1, 1, 0, 1, 1, 3, 0, 1, 0],
             [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
             [0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 1, 0, 2, 0, 1, 0],
             [0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
             [0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
}
  if (punten == 14) {
    playerPosX = 1
    playerPosY = 1

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 3, 0],
             [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0],
             [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
             [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
             punten = 0
}
}
var bossfight = function() {
  if (Room == 4 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 6, 6, 1, 6, 6, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 1, 1, 1, 1, 1, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 1, 1, 5, 1, 1, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 6, 6, 6, 2, 6, 6, 6, 0, 0, 0, 0],
             [0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0]]
             punten = 0
  }
  if (Room == 9 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 0, 0, 0, 7, 7, 7, 6, 6, 6, 7, 7, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 6, 6, 1, 6, 6, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 1, 1, 1, 1, 1, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 1, 1, 1, 1, 1, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 1, 1, 1, 1, 1, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 1, 1, 1, 1, 1, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 1, 1, 5, 1, 1, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 6, 6, 6, 2, 6, 6, 6, 7, 0, 0, 0],
             [0, 0, 0, 0, 7, 7, 7, 6, 6, 6, 7, 7, 7, 0, 0, 0]]
             punten = 0
  }
  if (Room == 14 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 0, 0, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 6, 6, 1, 6, 6, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 1, 1, 5, 1, 1, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 6, 6, 6, 2, 6, 6, 6, 7, 6, 0, 0],
             [0, 0, 0, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 0, 0]]
             punten = 0
  }
  if (Room == 19 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 0, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 6, 6, 1, 6, 6, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 1, 1, 5, 1, 1, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 6, 6, 6, 2, 6, 6, 6, 7, 6, 7, 0],
             [0, 0, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 7, 0]]
             punten = 0
  }
  if (Room == 24 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 6, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 6, 6, 1, 6, 6, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 1, 1, 1, 1, 1, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 1, 1, 5, 1, 1, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 6, 6, 6, 2, 6, 6, 6, 7, 6, 7, 6],
             [0, 6, 7, 6, 7, 7, 7, 6, 6, 6, 7, 7, 7, 6, 7, 6]]
             punten = 0
  }
  if (Room == 29 && punten > 0) {
    playerPosX = 8
    playerPosY = 1

    veld0 = [[0, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6],
             [0, 6, 6, 6, 7, 6, 6, 6, 1, 6, 6, 6, 7, 6, 6, 6],
             [0, 6, 7, 6, 6, 6, 7, 1, 1, 1, 7, 6, 6, 6, 7, 6],
             [0, 6, 6, 6, 7, 6, 6, 1, 1, 1, 6, 6, 7, 6, 6, 6],
             [0, 6, 7, 6, 6, 6, 7, 1, 1, 1, 7, 6, 6, 6, 7, 6],
             [0, 6, 6, 6, 7, 6, 6, 1, 1, 1, 6, 6, 7, 6, 6, 6],
             [0, 6, 7, 6, 6, 6, 7, 1, 5, 1, 7, 6, 6, 6, 7, 6],
             [0, 6, 6, 6, 7, 6, 6, 6, 2, 6, 6, 6, 7, 6, 6, 6],
             [0, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6, 6, 6, 7, 6]]
             punten = 0
  }
}
var bewegen = function(){
   // minder snel bewegen
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW)
      move = move + 1.5;

    if (keyCode === LEFT_ARROW)
      move = move + 1.5;

    if (keyCode === UP_ARROW)
      move = move + 1.5;

    if (keyCode === DOWN_ARROW)
      move = move + 1.5;
  }

  // bewegen normaal veld
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX + 1] === 1) {
      playerPosX = playerPosX + 1;
      move = 0
    }
    if (keyCode === LEFT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX - 1] === 1) {
      playerPosX = playerPosX - 1;
      move = 0
    }
    if (keyCode === DOWN_ARROW && move > 10 &&
      veld0[playerPosY + 1][playerPosX] === 1) {
      playerPosY = playerPosY + 1;
      move = 0
    }
    if (keyCode === UP_ARROW && move > 10 &&
      veld0[playerPosY - 1][playerPosX] === 1) {
      playerPosY = playerPosY - 1;
      move = 0
    }
  }

  // bewegen uitgang
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX + 1] === 2) {
      playerPosX = playerPosX + 1;
      move = 0
      Room = Room + 1;
      punten = random(levl);
    }
    if (keyCode === LEFT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX - 1] === 2) {
      playerPosX = playerPosX - 1;
      move = 0
      Room = Room + 1;
      punten = random(levl);
    }
    if (keyCode === DOWN_ARROW && move > 10 &&
      veld0[playerPosY + 1][playerPosX] === 2) {
      playerPosY = playerPosY + 1;
      move = 0
      Room = Room + 1;
      punten = random(levl);
    }
    if (keyCode === UP_ARROW && move > 10 &&
      veld0[playerPosY - 1][playerPosX] === 2) {
      playerPosY = playerPosY - 1;
      move = 0
      Room = Room + 1;
      punten = random(levl);
    }
  }
  // bewegen door vijand
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX + 1] === 3) {
      playerPosX = playerPosX + 1;
      move = 0
      Cnt3 = -61
      encounter = 1
    }
    if (keyCode === LEFT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX - 1] === 3) {
      playerPosX = playerPosX - 1;
      move = 0;
      Cnt3 = -61
      encounter = 1
    }
    if (keyCode === DOWN_ARROW && move > 10 &&
      veld0[playerPosY + 1][playerPosX] === 3) {
      playerPosY = playerPosY + 1;
      move = 0
      Cnt3 = -61
      encounter = 1
    }
    if (keyCode === UP_ARROW && move > 10 &&
      veld0[playerPosY - 1][playerPosX] === 3) {
      playerPosY = playerPosY - 1;
      move = 0
      Cnt3 = -61
      encounter = 1
    }
  }

   if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX + 1] === 4) {
      playerPosX = playerPosX + 1;
      move = 0
      Cnt3 = -61
      encounter = 2
    }
    if (keyCode === LEFT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX - 1] === 4) {
      playerPosX = playerPosX - 1;
      move = 0;
      Cnt3 = -61
      encounter = 2
    }
    if (keyCode === DOWN_ARROW && move > 10 &&
      veld0[playerPosY + 1][playerPosX] === 4) {
      playerPosY = playerPosY + 1;
      move = 0
      Cnt3 = -61
      encounter = 2
    }
    if (keyCode === UP_ARROW && move > 10 &&
      veld0[playerPosY - 1][playerPosX] === 4) {
      playerPosY = playerPosY - 1;
      move = 0
      Cnt3 = -61
      encounter = 2
    }
  }
     if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX + 1] === 5) {
      playerPosX = playerPosX + 1;
      move = 0
      Cnt3 = -61
      encounter = -45
    }
    if (keyCode === LEFT_ARROW && move > 10 &&
      veld0[playerPosY][playerPosX - 1] === 5) {
      playerPosX = playerPosX - 1;
      move = 0;
      Cnt3 = -61
      encounter = -45
    }
    if (keyCode === DOWN_ARROW && move > 10 &&
      veld0[playerPosY + 1][playerPosX] === 5) {
      playerPosY = playerPosY + 1;
      move = 0
      Cnt3 = -61
      encounter = -45
    }
    if (keyCode === UP_ARROW && move > 10 &&
      veld0[playerPosY - 1][playerPosX] === 5) {
      playerPosY = playerPosY - 1;
      move = 0
      Cnt3 = -61
      encounter = -45
    }
  }
  }
var drawPlayer = function () {
    if (Character === 0){
        image(fig, playerPosX * 80 + 10, playerPosY * 80 + 10, 60, 60);
    }
    if (Character === 1){
        image(pal, playerPosX * 80 + 10, playerPosY * 80 + 10, 60, 60);
    }
    if (Character === 2){
        image(sor, playerPosX * 80 + 10, playerPosY * 80 + 10, 60, 60);
    }
}
var tekenCel0 = function (kolom, rij) {
  if (veld0[rij][kolom] === 0) {
    fill(10, 10, 10);
  }
  if (veld0[rij][kolom] === 1) {
    fill(230, 230, 230);
  }
  if (veld0[rij][kolom] === 2) {
    fill("gold");
  }
  if (veld0[rij][kolom] === 3) {
    fill(230, 230, 230)
  }
   if (veld0[rij][kolom] === 4) {
    fill(230, 230, 230)
  }
   if (veld0[rij][kolom] === 5) {
    fill(230, 230, 230)
  }
  if (veld0[rij][kolom] === 6) {
    fill("darkred")
  }
   if (veld0[rij][kolom] === 7) {
    fill("purple")
  }
  rect(kolom * 80, rij * 80, 80, 80);
  
  if (veld0[rij][kolom] === 3) {
    image(eazy, kolom * 80 + 10, rij * 80 + 10, 60, 60);
  }
    if (veld0[rij][kolom] === 4) {
    image(medi, kolom * 80 + 10, rij * 80 + 10, 60, 60);
  }
    if (veld0[rij][kolom] === 5) {
    image(boss, kolom * 80 + 10, rij * 80 + 10, 60, 60);
  }

}
var battle = function () {
  if (encounter == 1) {
    Enemy = random(easy);
    ECHP = 200;
    Men = 2;
  }
    if (encounter == 2) {
    Enemy = random(med);
    ECHP = 200;
    Men = 2;}
    if (encounter == -45) {
    Enemy = random(bos);
    ECHP = 200;
    Men = 2;}
}
function draw() {
    background(50, 50, 50);
    if (Men == 0){
        MainMenu();
        textSize(20);
        text("Als je een keuze hebt gemaakt, klik op het pijltje naar beneden.", 10, 700);
    }
    if (Men == 2){
        fill(255, 150, 150);
        gif = gif + 1;
        if (gif > 60){
            gif = 0;
        }
        if(grotegloeienegenadewatisdiegeertwildersdieikophetjeugdjournaalhebgezientocheenraregast == 0){
    image(achtergrond, 0, 0);
        }
        else{
            image(achtergrond2, 0, 0);
        }
    //de stats van de vijanden worden verminvuldigd met deze variabele
    R = 1 + (pow(Room, 1.4))/100;
    Inputs();
    menu();
    combat();
        //alle typen abilities hier
        //Attack, SpecialAttack, Defense, SpecialDefense, MaxHealth
    CharacterSelect();
        
    EnemySelect();
    
    //potions
    Potns();
    CooldownGrens();  
    if (FER == true && (Pos1 == 0 || (Pos1 > 9 && Pos1 < 19))){
        Cnt2 = Cnt2 + 1;
    }
    if (Cnt2 > 0 && FER == false){
        tx = true;
        Cnt2 = 0;
    }
    if (Cnt3 < 151 && tx == true)
        {
            Pos1 = 0;
            Cnt3 = Cnt3 + 1;
        }
    if (Cnt3 == 80 && ECHP > 0){
        Eat = true;
    }
    if (Cnt3 > 150 && ECHP > 0){
        Cnt3 = 0;
        tx = false;
    }
    Inputs2();
    gameover();
    Text();
    noStroke();
    fill(0,0,0);
    if (Cnt3 < -1){
            Pos1 = 3;
            Cnt3 = Cnt3 + 1;
            atk1 = false;
            ECHP = 200;
        }
        if (Pos1 == 3){
            tx = false;
            tx1 = "Dit is puur om te zorgen dat je niet"
            tx2 = "meteen aanvalt als je hier komt."
        }
        
    }
    if (Men == 3){
    fill(230, 230, 230);
    stroke(50, 0, 0);
    strokeWeight(4);
    rect(200, 100, 880, 520);
    strokeWeight(0.5);
    textSize(8);
    stroke(100, 30, 30);
    fill(50, 50, 50);
    text("Je bent dood", 600, 350);
    textSize(0.5);
    text("streeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeepje", 600, 353);
    textSize(20);
    text("Je hebt " + Room + " kamers getrotseerd.", 500, 400);
    text("Klik op de linker muisknop om het opnieuw te proberen", 400, 450);
    if (mouseIsPressed){
gif = 0;
grotegloeienegenadewatisdiegeertwildersdieikophetjeugdjournaalhebgezientocheenraregast = 0;
Sp = 0;
Pos1 = 0;
Pos2 = 0;
Mn = [20, 550, 180, 145];
Atk = 9;
Satk = 9;
Def = 0;
Sdef = 0;
HP = 30;
CHP = -4;
HP1 = 300;
atk1 = false;
wpn = 4;
EAtk = 8;
ESatk = 8;
EDef = 8;
ESDef = 8;
EHP = 80;
ECHP = -4;
EHP1 = 300;
wpn = 2;
audio = new Audio('nein.mp3');
RER = false;
FER = false;
REL = false;
FEL = false;
REU = false;
FEU = false;
RED = false;
FED = false;
Cnt = 0;
Cnt1 = 0;
Cnt2 = 0;
Cnt3 = 0;
res = 0;
rand = 0;
spc1 = false;
spc2 = false;
spc3 = false;
spc4 = false;
hl = 0;
atb = 0;
deb = 0;
flee = 0;
Eat = false;
Cl1 = 0;
Cl2 = 0;
Cl3 = 0;
Cl4 = 0;
Character = 0;
Enemy = 0;
Men = 0;
AB = 0;
pt = 2;
potion = false;
tx = false;
tx1 = ""
tx2 = ""
txt = 0;
Room = 0;
R = 0;
lc1 = -3;
lc2 = -3;
sts = -1;
    }
    }
    if (Men == 4){
          for (var kolom = 0; kolom < 16; kolom = kolom + 1) {
    for (var rij = 0; rij < 9; rij = rij + 1) {
      tekenCel0(kolom, rij);
    }
              
  }

  stroke(0, 0, 0);
  strokeWeight(1);    
  bewegen();
  battle();
  bossfight();
  veld();
  drawPlayer();
  fill(240, 240, 240);
    if (dd == 2 && keyIsPressed == false){
        dd = 0;
    }
    if (dd == 0){
    image(tes, 0, 0, 1280, 720);
    if (keyIsPressed){
        dd = 1;
    }
}
  text("Je bent bij kamer " + (Room + 1), 640, 20);
    }
};