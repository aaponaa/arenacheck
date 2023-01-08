const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
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

const parse = (csv) =>{
    let tableau;

    Papa.parse(csv, {
        header: true,
        complete: function (results) {
            tableau = results.data;
        }
    });
    return tableau;
}

const getData = (testmode=false) =>{
    const csv = document.getElementById("csv").value;

    plotCharts(parse(csv));
}

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

const getVictoryColor = (data) =>{
    const victoryColor ={
        true:"rgb(0, 108, 231)",
        false:"rgb(198, 0, 0)"
    }

    return Object.values(victoryColor)[data]
}

const plotCharts = (tableau) =>{
    
    winGraph(tableau);
    mmrGraph(tableau);
    emmrGraph(tableau);
    timedmgGraph(tableau);
    mostspecGraph(tableau);

}