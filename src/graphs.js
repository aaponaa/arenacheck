//Total des parties :
const winGraph = (tableau) =>{
    const ctx = document.getElementById('winChart');

    const win = countBarchart(tableau.map(row => row.Victory))

    const data = {
        labels: ['Défaites','Victoires'],
        datasets: [{
            data: Object.values(win),
            backgroundColor: [
                '#FF0000',
                '#00FF00',
            ],
            borderColor: ['rgb(0, 0, 0)'],
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
                },
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
        );
}

//Spécialisations les plus jouées :
const specplayedGraph = (tableau) =>{
    const ctx = document.getElementById('specplayedChart');

    const spec = countBarchart(tableau.map(row => row.Specialization));
    const classKeys = tableau.map(row => getClassKeyFromSpec(wowClasses, row.Specialization));
    const classeColors = classKeys.map(classe => wowClasses[classe].color);

    const data = {
        labels: Object.keys(spec),
        datasets: [{
            data: Object.values(spec),
            backgroundColor: classeColors,
            borderColor: ['rgb(0, 0, 0)'],
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
                },
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
        );
}

// MMR au fil des parties :
const mmrGraph = (tableau) =>{
    const ctx = document.getElementById('mmrChart');
    
    const mmr = tableau.map(row => row.MMR).reverse();
    const date = tableau.map(row => row.Timestamp).reverse();
    const datestr = [];

    for (let i = 0; i < date.length; i++){
        datestr.push(makeDate(date[i]));
    }

    const data = {
        labels: datestr,
        datasets: [{
            label: 'Ta Putain de MMR au fil des games',
            data: mmr,
            fill: false,
            borderColor: 'rgb(88, 137, 156)',
            tension: 0.1    
        }]
        };
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }}
        }
        );
}

//MMR comparative :
const emmrGraph = (tableau) =>{
    const ctx = document.getElementById('emmrChart');
    
    const MMR = tableau.map(row => row.MMR);
    const EMMR = tableau.map(row => row.EnemyMMR);    

    const data = {
        labels: "Scatter Dataset",
        datasets: [{
            label: 'Ta Putain de MMR Vs sa MMR de Batard',
            data: makeXY(MMR, EMMR),
            borderColor: 'rgb(88, 137, 156)',
        }]
        };
        new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'MMR de ton équipe'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:"MMR de l'équipe enemie"
                        }
                    }
                },
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
        );
}

//Dommages en fonction de la durée de la partie :
const timedmgGraph = (tableau) =>{
    const ctx = document.getElementById('timedmgChart');

    const victories = tableau.filter(row => row.Victory);
    const defeats = tableau.filter(row => !row.Victory);
    
    const durationVictories = victories.map(row => row.Duration);
    const damageVictories = victories.map(row => row.Damage);
    
    const durationDefeats = defeats.map(row => row.Duration);
    const damageDefeats = defeats.map(row => row.Damage);

    const data = {
        labels: ["Rapport dommages durée"],
        datasets: [
            {label: ['Victoire'],
            data: makeXY(durationVictories, damageVictories),
            pointBackgroundColor:'#00FF00'},
            {label: ['Défaite'],
            data: makeXY(durationDefeats, damageDefeats),
            pointBackgroundColor:'#e60000'}

        ]
        };
        new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'Durée de la partie en seconde'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'Dommages'
                        },
                        
                    },
                }
            }
        }
        );
}

//Dommages en fonction de la durée de la partie :
const timehealGraph = (tableau) =>{
    const ctx = document.getElementById('timehealChart');

    const victories = tableau.filter(row => row.Victory);
    const defeats = tableau.filter(row => !row.Victory);
    
    const durationVictories = victories.map(row => row.Duration);
    const healingVictories = victories.map(row => row.Healing);
    
    const durationDefeats = defeats.map(row => row.Duration);
    const healingDefeats = defeats.map(row => row.Healing);

    const data = {
        labels: ["Rapport dommages durée"],
        datasets: [
            {label: ['Victoire'],
            data: makeXY(durationVictories, healingVictories),
            pointBackgroundColor:'#00FF00'},
            {label: ['Défaite'],
            data: makeXY(durationDefeats, healingDefeats),
            pointBackgroundColor:'#e60000'}

        ]
        };
        new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'Durée de la partie en seconde'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'Dommages'
                        },
                        
                    },
                }
            }
        }
        );
}

//Classe Ennemy les plus rencontrées :
const mostspecGraph = (tableau) =>{
    const ctx = document.getElementById('mostspecChart');

    const enmy = tableau.map(row => row.EnemyComposition);
    
    let temp = makePlayers(enmy);
    let players = [];

    for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < temp[i].length; j++){
            players.push(temp[i][j].classe);
        }
    }

    players = countBarchart(players);

    const classeColors = Object.keys(players).map(classe => wowClasses[classe].color);

    const data = {
        labels: Object.keys(players),
        datasets: [{
            data: Object.values(players),
            backgroundColor:classeColors,
            borderColor: ['rgb(0, 0, 0)'],
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
                },
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
        );
}

//Classe Team les plus jouées :
const mostspecTeamGraph = (tableau) =>{
    const ctx = document.getElementById('mostspecTeamChart');
    
    let joueur = document.getElementById("name").value
    const team = tableau.map(row => row.TeamComposition);

    if(joueur === ''){
        joueur='Alorslazone'
    }

    let temp = makePlayers(team);
    let players = [];

    for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < temp[i].length; j++){
            if(temp[i][j].pseudo !== joueur){
                players.push(temp[i][j].classe);
            }
        }
    }

    players = countBarchart(players);

    const classeColors = Object.keys(players).map(classe => wowClasses[classe].color);

    const data = {
        labels: Object.keys(players),
        datasets: [{
            data: Object.values(players),
            backgroundColor:classeColors,
            borderColor: ['rgb(0, 0, 0)'],
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
                },
                animation: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    enabled: false
                  }
                }
            }
        }
        );
}


/* Appel Graph */

const getData = () =>{
    const csv = document.getElementById("csv").value;
    plotCharts(parse(csv));
}

const exempleData = () =>{
    plotCharts(parse(exempleCSV));
}

const plotCharts = (tableau) =>{
    winGraph(tableau);
    specplayedGraph(tableau);
    mmrGraph(tableau);
    emmrGraph(tableau);
    timedmgGraph(tableau);
    timehealGraph(tableau);
    mostspecGraph(tableau);
    mostspecTeamGraph(tableau);
}