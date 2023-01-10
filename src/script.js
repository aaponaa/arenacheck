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
    const timeString = date.toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' });
    return `${dateString} - ${timeString}`;
}

const parsePlayers = (row) => {
    // Séparons les différentes informations de la ligne en utilisant le caractère '-' comme séparateur
    const parts = row.split('-');
    // TODO recuperer le serveur de l'input
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

function getClassKeyFromSpec(data, spec) {
    for (const key in data) {
        if ( data[key].specs.includes(spec)) {
            return key;
        }
    }
    return null;
}

