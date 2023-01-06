const winGraph = (tableau) =>{

    const ctx = document.getElementById('winChart');

    //tableau = tableau.filter(tableau => tableau.Rated === "true");

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
    
    const MMR = tableau.map(row => row.MMR);
    const DATE = tableau.map(row => row.Timestamp)

    const data = {
        // TODO Make a timestamp converter to use it as label for linechart MMR 
        labels: DATE,
        datasets: [{
            label: 'Ta Putain de MMR au fil des games',
            data: MMR,
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
    const EMMR = tableau.map(row => row.EnemyMMR);    

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