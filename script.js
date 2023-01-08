const getClasseColors = () =>{
    return classeColor = {
        DEATHKNIGHT:"rgb(196, 31, 59)",
        DRUID:"rgb(255, 125, 10)",
        MONK:"rgb(0, 255, 150)",
        EVOKER:"rgb(51, 147, 127)",
        PRIEST:"rgb(255, 255, 255)",
        WARLOCK:"rgb(135, 135, 237)",
        WARRIOR:"rgb(199, 156, 110)",
        HUNTER:"rgb(169, 210, 113)",
        ROGUE:"rgb(255, 245, 105)",
        SHAMAN:"rgb(0, 112, 222)",
        MAGE:"rgb(64, 199, 235)",
        DEMONHUNTER:"rgb(163, 48, 201)",
        PALADIN:"rgb(245, 140, 186)",
    }
}

const makeXY = (xValues, yValues) => {
    const objects = [];
    for (let i = 0; i < xValues.length; i++) {
        objects.push({ x: xValues[i], y: yValues[i] });
    }
    return objects;
}

const makeDate = (timestamp) => {
    const date = new Date(timestamp*1000);
    const dateString = date.toLocaleDateString('fr-FR');
    const timeString = date.toLocaleTimeString('fr-FR');
    return `${dateString} - ${timeString}`;
}

const parsePlayers = (row) => {
    // Séparons les différentes informations de la ligne en utilisant le caractère '-' comme séparateur
    const parts = row.split('-');
    const PLAYERSERV = "Archimonde";

    let classe = '', spec = '', pseudo = '', server = '';

    if (parts.length > 0) {
        classe = parts[0];
    }

    if (parts.length > 1) {
        spec = parts[1];
    }

    if (parts.length > 2) {
        pseudo = parts[2];
    }

    if (parts.length > 3) {
        server = parts[3];
    }else{
        server = PLAYERSERV
    }

    // Renvoyons un objet contenant les informations isolées
    return {
        classe: classe,
        spec: spec,
        pseudo: pseudo,
        server: server
    };
}

const makePlayers = (data) => {
    let temp = [];
    const tab = [];

    for (let i = 0; i < data.length; i++) { 
        const row  = data[i];
        const player = row.split(',')  ;
        for (let i = 0; i < player.length; i++){ 
            temp.push(parsePlayers(player[i]));
        }
        tab.push(temp);
        temp = [];
    }
    return tab;
}

const countBarchart = (array) => {

    // Initialize an object to store the counts
    const counts = {};

    // Iterate through the array and count the occurrences of each element
    for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (counts[element]) {
        counts[element]++;
    } else {
        counts[element] = 1;
    }
    }

    return counts;
}

const parse = (csv) => {
    let tableau;
  
    Papa.parse(csv, {
      header: true,
      transform: function(value, header) {
        if (header === 'Victory') {
          return value === 'true';
        }
        return value;
      },
      complete: function(results) {
        tableau = results.data;
      }
    });
    return tableau;
};

const getData = (testmode=false) =>{
    const csv = document.getElementById("csv").value;

    plotCharts(parse(csv));
}

const exempleData = () =>{
    plotCharts(parse(exempleCSV));
}

const plotCharts = (tableau) =>{
    
    winGraph(tableau);
    mmrGraph(tableau);
    emmrGraph(tableau);
    timedmgGraph(tableau);
    mostspecGraph(tableau);
    mostspecTeamGraph(tableau);
}




const exempleCSV = `Timestamp;Map;PlayersNumber;TeamComposition;EnemyComposition;Duration;Victory;KillingBlows;Damage;Healing;Honor;RatingChange;MMR;EnemyMMR;Specialization;isRated
1672955992;1134;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;DRUID-Feral-Fatcatexe-Outland,PRIEST-Shadow-Monsignore-Dethecus;122;false;0;1141976;140468;0;-11;1587;1582;Assassination;true
1672955786;2547;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MONK-Windwalker-Mundatmer-Blackmoore,PRIEST-Holy-Ibanyoubye-Blackmoore;153;false;0;1861797;145797;0;-10;1613;1610;Assassination;true
1672955483;2373;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;DEMONHUNTER-Havoc-Shâdra-Sen'jin,SHAMAN-Restoration-Krockar-Sen'jin;53;false;0;627640;117543;0;-10;1640;1640;Assassination;true
1672955328;1134;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;PRIEST-Discipline-Mæd,WARRIOR-Fury-Destruu-Doomhammer;116;true;0;2139468;171894;0;14;1612;1620;Assassination;true
1672955054;2509;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MONK-Mistweaver-Nâdâ,ROGUE-Subtlety-Moesizelag;106;true;1;1033837;69196;0;14;1585;1589;Assassination;true
1672954771;2373;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;EVOKER-Preservation-Yooshi-ShatteredHand,WARRIOR-Fury-Instacharge-Blackrock;194;true;0;2730303;300645;0;13;1559;1563;Assassination;true
1672954439;2373;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;PRIEST-Shadow-Tolqen-Stormscale,WARLOCK-Demonology-Nitxzi-Stormscale;105;false;0;1290288;195160;0;-10;1585;1583;Assassination;true
1672954228;1134;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;EVOKER-Preservation-Samsungevo-Stormscale,PRIEST-Shadow-Methslinger-Draenor;149;true;0;2686215;246373;0;13;1559;1561;Assassination;true
1672953982;2373;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Jvillá-Outland,WARRIOR-Arms-Samtheplmber-Outland;133;true;1;1697656;122701;0;13;1533;1530;Assassination;true
1672953736;1134;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;PRIEST-Shadow-Exinterp-Blackrock,WARLOCK-Affliction-Forumsurfer-Blackrock;62;true;1;1147865;84763;0;13;1507;1508;Assassination;true
1672953518;617;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MONK-Mistweaver-Jûzô-Illidan,WARLOCK-Affliction-Tôkì-Illidan;102;true;1;1514889;164541;0;12;1481;1478;Assassination;true
1672953320;617;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;DRUID-Feral-Furrykruger-TheMaelstrom,PRIEST-Discipline-Maquivel-Aggra(Português);93;false;0;1277521;107785;0;-12;1507;1506;Assassination;true
1672953127;2509;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MAGE-Fire-Prayforu-Blackmoore,ROGUE-Subtlety-Даркроджер-СвежевательДуш;147;true;1;1356090;191612;0;12;1481;1482;Assassination;true
1672952886;617;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MONK-Mistweaver-Лареная-Ревущийфьорд,WARRIOR-Arms-Чурбанидзе-Ревущийфьорд;69;true;1;1008724;73744;0;11;1455;1456;Assassination;true
1672952718;1552;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;DEMONHUNTER-Havoc-Mandolino-Draenor,DRUID-Restoration-ßatmon-Draenor;133;true;1;2555022;263531;0;11;1429;1427;Assassination;true
1672952497;2547;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;HUNTER-Beast Mastery-Antihørde-Silvermoon,SHAMAN-Restoration-Joekelvrouw-TarrenMill;74;true;1;1009329;109858;0;10;1402;1405;Assassination;true
1672952293;2509;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;PRIEST-Holy-Hÿron-Krasus,ROGUE-Assassination-Laverna-Krasus;182;false;0;2503829;131398;0;-13;1429;1427;Assassination;true
1672952024;1552;4;MONK-Mistweaver-Pôum,ROGUE-Assassination-Alorslazone;MAGE-Arcane-Аркифлаим-ЧерныйШрам,ROGUE-Subtlety-Вуэра-Гордунни;103;false;0;599784;51515;0;-13;1455;1455;Assassination;true
1672075322;1505;4;EVOKER-Preservation-Arazeth-Aegwynn,ROGUE-Assassination-Alorslazone;DEATHKNIGHT-Unholy-Вовчан-Ревущийфьорд,PRIEST-Shadow-Даркхон-Ревущийфьорд;55;false;0;769199;85854;0;-12;1459;1462;Assassination;true
1672075127;1134;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;DRUID-Feral-Noiruflam-Drak'thul,PRIEST-Shadow-Wrsit-Drak'thul;59;false;0;1068556;101223;0;-12;1464;1452;Assassination;true
1672074948;2373;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;PRIEST-Holy-Hurrinañe-ArgentDawn,ROGUE-Assassination-Tuzgár-ArgentDawn;93;false;0;954794;82715;0;-11;1490;1490;Assassination;true
1672074769;2509;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Woodbissy-Rashgarroth,WARRIOR-Arms-Armàndo-Ravencrest;146;true;2;2031547;140201;0;14;1463;1465;Assassination;true
1672074525;2563;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;PRIEST-Shadow-Funkyman-Kazzak,WARLOCK-Destruction-Thrn-Kazzak;118;false;0;1288485;164737;0;-11;1490;1489;Assassination;true
1672074318;572;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;PALADIN-Holy-Browario-BurningLegion,ROGUE-Assassination-Werith-BurningLegion;131;true;2;1945610;55967;0;14;1465;1461;Assassination;true
1672074099;2373;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;DEMONHUNTER-Havoc-Qrol-Outland,PRIEST-Discipline-Miwer-Outland;117;false;0;1236616;121466;0;-9;1483;1538;Assassination;true
1672073895;1505;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Sakhina-Hyjal,MONK-Windwalker-Sabotquipue-Hyjal;100;true;1;1262748;105918;0;14;1455;1462;Assassination;true
1672073702;2509;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;MAGE-Fire-Pentabøøbs,ROGUE-Subtlety-Samuraisepp-Stormscale;141;true;2;1458439;188302;0;13;1428;1433;Assassination;true
1672073428;1672;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;HUNTER-Marksmanship-Freezingtrap-Frostwolf,ROGUE-Subtlety-Thrivà-Blackmoore;82;true;1;578866;63322;0;12;1400;1412;Assassination;true
1672073263;2563;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;MONK-Mistweaver-Mymonk-Ravencrest,WARLOCK-Affliction-Greenspark-Drak'thul;196;false;0;3369823;100579;0;-12;1426;1429;Assassination;true
1672072982;572;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;MAGE-Fire-Nicecody-Blackhand,ROGUE-Subtlety-Nyroo-Ravencrest;88;true;1;1026017;61043;0;11;1400;1400;Assassination;true
1672072810;1504;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;SHAMAN-Restoration-Vénash-Blackmoore,WARRIOR-Fury-Arturo-Blackmoore;64;true;0;1119864;91844;0;11;1374;1373;Assassination;true
1672072642;1672;4;EVOKER-Preservation-Obis-Blackrock,ROGUE-Assassination-Alorslazone;MONK-Mistweaver-Kralmonk-TwistingNether,ROGUE-Assassination-Tapeduck-Skullcrusher;220;false;0;2073858;165992;0;-13;1400;1399;Assassination;true
1672068344;1505;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;EVOKER-Devastation-Jeannedebruj-Ravencrest,MONK-Mistweaver-Amélith-KirinTor;206;false;0;3280330;278475;0;-11;1467;1471;Assassination;true
1672068023;2373;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;MAGE-Arcane-Sintor-Silvermoon,PRIEST-Shadow-Takimori-Vek'nilash;63;false;0;220976;31456;0;-10;1493;1498;Assassination;true
1672067876;2509;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;PRIEST-Discipline-Арестович-ЧерныйШрам,WARRIOR-Fury-Раштаймс-Гордунни;126;false;0;1732259;74928;0;-10;1518;1524;Assassination;true
1672067627;1134;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;PRIEST-Holy-Asmedine-Pozzodell'Eternità,SHAMAN-Enhancement-Resønate-Nemesis;119;true;2;2459075;239445;0;19;1490;1519;Assassination;true
1672067407;572;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Alfadera-Kazzak,WARLOCK-Affliction-Whaman-TwistingNether;319;false;0;5859566;465816;0;-9;1515;1524;Assassination;true
1672066994;2563;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;SHAMAN-Restoration-Iröh-Ravencrest,WARRIOR-Fury-Vysae-GrimBatol;197;true;1;3267971;218859;0;19;1488;1520;Assassination;true
1672066706;1134;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;PRIEST-Discipline-Alxsm-Sanguino,ROGUE-Assassination-Südh-Sanguino;84;false;0;1057208;74078;0;-9;1513;1522;Assassination;true
1672066538;1134;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;PALADIN-Retribution-Morri-Ravencrest,PRIEST-Holy-Altarboy-DunModr;132;false;0;2191116;160907;0;-9;1539;1540;Assassination;true
1672066307;1134;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;EVOKER-Preservation-Raszageth-Ragnaros,ROGUE-Assassination-Stabbyfface-Kazzak;121;true;2;1618178;83566;0;20;1512;1513;Assassination;true
1672066083;1505;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;DEMONHUNTER-Havoc-Äbz-Stormscale,EVOKER-Preservation-Rakirâ-Stormscale;172;true;2;3228846;208806;0;18;1486;1484;Assassination;true
1672065821;1505;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Lîebhabbärin-Blackmoore,WARRIOR-Arms-Bigcyna-Stormscale;160;true;1;2859006;200977;0;15;1460;1455;Assassination;true
1672065558;1672;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;PRIEST-Discipline-Bloodmyst-BronzeDragonflight,PRIEST-Shadow-Athéna-BronzeDragonflight;223;true;2;3790523;206322;0;15;1432;1476;Assassination;true
1672065223;2373;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;DRUID-Balance-Tuft-TwistingNether,PRIEST-Shadow-Meeagz-Kazzak;177;true;2;2219107;209196;0;13;1405;1401;Assassination;true
1672064944;2373;4;DRUID-Restoration-Onlypo,ROGUE-Assassination-Alorslazone;DRUID-Feral-Аривидэрчи-ПиратскаяБухта,PRIEST-Shadow-Перекованный-СвежевательДуш;131;true;1;1954215;293086;0;13;1377;1374;Assassination;true
1672059669;2373;4;EVOKER-Preservation-Prunni-DunMorogh,ROGUE-Assassination-Alorslazone;DRUID-Feral-Livandyra-Blackmoore,HUNTER-Marksmanship-Yanderr-Turalyon;164;false;1;884831;113615;0;-13;1332;1323;Assassination;true
1672059024;1134;4;DRUID-Restoration-Snooplion-Mal'Ganis,ROGUE-Assassination-Alorslazone;HUNTER-Marksmanship-Въай-Гордунни,PALADIN-Retribution-Беноард-Гордунни;86;false;0;641222;84917;0;-16;1322;1287;Assassination;true
1672058847;2373;4;DRUID-Restoration-Snooplion-Mal'Ganis,ROGUE-Assassination-Alorslazone;DEATHKNIGHT-Frost-Rodimus-Arathor,PALADIN-Retribution-Fujszi-Arathor;96;true;2;1536711;180998;0;7;1275;1249;Assassination;true
1671993814;2563;4;MONK-Mistweaver-Nìxu-Draenor,ROGUE-Assassination-Alorslazone;PRIEST-Discipline-Kbdp-Outland,WARRIOR-Fury-Fisfarbror-Outland;122;true;1;1570553;156168;0;12;1369;1371;Assassination;true
1671993606;2563;4;MONK-Mistweaver-Nìxu-Draenor,ROGUE-Assassination-Alorslazone;MAGE-Arcane-Wezylot,ROGUE-Subtlety-Notrmp-Outland;95;true;0;1038267;109005;0;11;1343;1340;Assassination;true
1671993424;1134;4;MONK-Mistweaver-Nìxu-Draenor,ROGUE-Assassination-Alorslazone;DRUID-Restoration-Rayt-Outland,MAGE-Frost-Frøstreroll-Balnazzar;230;true;2;2913204;322375;0;11;1315;1324;Assassination;true
1671993108;2509;4;MONK-Mistweaver-Nìxu-Draenor,ROGUE-Assassination-Alorslazone;DEMONHUNTER-Havoc-Anabbele-Kazzak,PALADIN-Retribution-Selvich-Darksorrow;87;false;1;1096163;284146;0;-11;1332;1396;Assassination;true
1671991094;572;4;ROGUE-Assassination-Alorslazone,WARRIOR-Arms-Xztráza-Azshara;PRIEST-Shadow-Voidmeisterx-Aegwynn,WARLOCK-Affliction-Voidgrim-Blackmoore;45;false;0;760106;76991;0;-11;1224;1406;Assassination;true`;
