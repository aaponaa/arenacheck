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

const splitString = (str) => {
    const parts = str.split('-');
    const classes = [];
    const specs = [];
    const names = [];
  
    for (let i = 0; i < parts.length; i += 3) {
      classes.push(parts[i]);
      specs.push(parts[i + 1]);
      names.push(parts[i + 2]);
    }  
    return [classes, specs, names];
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
}
