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

}

    //selectioner une colone 
    /*tableau.map(row => row.Victory)*/
const winGraph = (tableau) =>{

    const ctx = document.getElementById('winChart');

    const OCCU = [checkOccurrence(tableau.map(row => row.Victory),"true"),checkOccurrence(tableau.map(row => row.Victory),"false")]

    const data = {
    labels: [
        'Wins',
        'Loose',
    ],
    datasets: [{
        label: 'Score',
        data: OCCU,
        backgroundColor: [
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        ]
    }]
    };
    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {}
    }
    );

}

const mmrGraph = (tableau) =>{
    const ctx = document.getElementById('mmrChart');
    
    const data = {
        // TODO Make a timestamp converter to use it as label for linechart MMR 
        labels: " ",
        datasets: [{
            label: 'Ta Putain de MMR',
            data: tableau.map(row => row.MMR),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1    
        }]
        };
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {}
        }
        );
}

const emmrGraph = (tableau) =>{
    const ctx = document.getElementById('emmrChart');
    
    const MMR = tableau.map(row => row.MMR);
    const EMMR = tableau.map(row => row.EnemyMMR)

    

    const data = {
        labels: "Scatter Dataset",
        datasets: [{
            label: 'Ta Putain de MMR Vs sa MMR de Batard',
            data: makeXY(MMR, EMMR),
        }]
        };
        new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    }
                }
            }
        }
        );
}