//Classse les plus rencontrées :
const winGraph = (tableau) =>{
    const ctx = document.getElementById('winChart');

    const win = countBarchart(tableau.map(row => row.Victory))

    const data = {
        labels: ['Victoires','Défaites'],
        datasets: [{
            label: "to delete",
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
            options: {}
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
                    },
                }
            }
        }
        );
}

//Dommages en fonction de la durée de la partie :
const timedmgGraph = (tableau) =>{
    const ctx = document.getElementById('timedmgChart');
    
    const duree = tableau.map(row => row.Duration);
    const dommages = tableau.map(row => row.Damage);
    const victory = tableau.map(row => Boolean(row.Victory));

    //const win = tableau.map(row => getClasseColors()["true"]);

    const data = {
        labels: ["Victoire","Défaite"],
        datasets: [{
            label: ['Tes putains de Dmg vs le temps que tu kill ou tu die'],
            data: makeXY(duree, dommages),
            pointBackgroundColor: function(context) {return victory[context.dataIndex] ? '#00FF00' : '#FF0000';}
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
                            text:'Durée de la partie en seconde'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'bottom',
                        title:{
                            display: 'true',
                            text:'Dommages'
                        }
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
    
    const classeColors = Object.keys(players).map(classe => getClasseColors()[classe]);

    const data = {
        labels: Object.keys(players),
        datasets: [{
            label: "to delete",
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
                }
            }
        }
        );
}


//Classe Team les plus jouées :
const mostspecTeamGraph = (tableau) =>{
    const ctx = document.getElementById('mostspecTeamChart');

    const team = tableau.map(row => row.TeamComposition);

    let temp = makePlayers(team);
    let players = [];

    for (let i = 0; i < temp.length; i++){
        for (let j = 0; j < temp[i].length; j++){
            players.push(temp[i][j].classe);
        }
    }

    players = countBarchart(players);
    
    const classeColors = Object.keys(players).map(classe => getClasseColors()[classe]);

    const data = {
        labels: Object.keys(players),
        datasets: [{
            label: "to delete",
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
                }
            }
        }
        );
}
