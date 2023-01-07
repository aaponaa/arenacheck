const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const checkOccurrence = (array, element) => {
    let counter = 0;
    for (item of array.flat()) {
        if (typeof item === "string") {
            let newItem = item.toLowerCase();
            if (newItem == element) {
                counter++;
            }
        } else {
            if (item == element) {
                counter++;
            }
        }
    };
    return counter;
};

const makeXY = (xValues, yValues) => {
    const objects = [];
    for (let i = 0; i < xValues.length; i++) {
        objects.push({ x: xValues[i], y: yValues[i] });
    }
    return objects;
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

const getData = () =>{
    let csv = document.getElementById("csv").value;
    let tableau;

    Papa.parse(csv, {
        header: true,
        complete: function (results) {
            tableau = results.data;
        }
    });

    winGraph(tableau);
    mmrGraph(tableau);
    emmrGraph(tableau);
    timedmgGraph(tableau);
    mostspecGraph(tableau);
}
