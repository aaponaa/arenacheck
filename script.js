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

const getData = () =>{
    let csv = document.getElementById("csv").value;
    let tableau;

    Papa.parse(csv, {
    header: true,
    complete: function (results) {
        tableau = results.data;
    }
    });
    
    console.log(tableau);
    let colname = "MMR"
    winGraph(tableau);
    mmrGraph(tableau);

}


    //selectioner une colone 
    /*tableau.map(row => row.Victory)*/
const winGraph = (tableau) =>{

    const ctx = document.getElementById('winChart');

    const occu = [checkOccurrence(tableau.map(row => row.Victory),"true"),checkOccurrence(tableau.map(row => row.Victory),"false")]

    const data = {
    labels: [
        'Wins',
        'Loose',
    ],
    datasets: [{
        label: 'Score',
        data: occu,
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
        labels: [
        ],
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