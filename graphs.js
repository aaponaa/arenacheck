const winGraph = (tableau) =>{
    const ctx = document.getElementById('winChart');

    const win = countBarchart(tableau.map(row => row.Victory))

    const data = {
    labels: Object.keys(win),
    datasets: [{
        label: 'Score',
        data: Object.values(win),
        backgroundColor: [
            'rgb(217,0,0)',
            'rgb(0, 120, 255)',
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
    
    const mmr = tableau.map(row => row.MMR);
    const date = tableau.map(row => row.Timestamp)

    const data = {
        // TODO Make a timestamp converter to use it as label for linechart MMR 
        labels: date,
        datasets: [{
            label: 'Ta Putain de MMR au fil des games',
            data: mmr,
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

const timedmgGraph = (tableau) =>{
    const ctx = document.getElementById('timedmgChart');
    
    const DUR = tableau.map(row => row.Duration);
    const DMG = tableau.map(row => row.Damage);    

    const data = {
        labels: "Scatter Dataset",
        datasets: [{
            label: 'Ta Putain de MMR Vs sa MMR de Batard',
            data: makeXY(DUR, DMG),
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



const mostspecGraph = (tableau) =>{
    const ctx = document.getElementById('mostspecGraph');
    
    const enmy = tableau.map(row => row.EnemyComposition);
    
    let temp = makePlayers(enmy);
    let players = [];

    for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < temp[i].length; j++){
            players.push(temp[i][j].classe);
        }
    }
    players = countBarchart(players);

    const data = {
        labels: Object.keys(players),
        datasets: [{
            label: 'Les Classe qui te cassent les couilles',
            data: Object.values(players),
            borderWidth: 1
        }]
        };
        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
            }
        }
        );
}



