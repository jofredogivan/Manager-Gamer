import { teams } from './times.js'; // lista completa de times com série
import { playerNames } from './players.js'; // lista de nomes para gerar jogadores

// ----- CRIAR JOGADORES ----- 
teams.forEach(team => {
    for (let i = 0; i < 11; i++) {
        const name = playerNames[Math.floor(Math.random() * playerNames.length)];
        team.players.push({
            name: name,
            skill: Math.floor(Math.random() * 100) + 1,
            goals: 0,
            age: Math.floor(Math.random() * 15) + 18
        });
    }
});

// ----- DOM ELEMENTS -----
const teamsList = document.getElementById("teams-list");
const playersList = document.getElementById("players-list");
const leagueTableBody = document.querySelector("#league-table tbody");

const playMatchButton = document.getElementById("play-match");
const trainPlayersButton = document.getElementById("train-players");
const transferButton = document.getElementById("transfer-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");

const btnTeams = document.getElementById("btn-teams");
const btnPlayers = document.getElementById("btn-players");
const btnLeague = document.getElementById("btn-league");
const btnCharts = document.getElementById("btn-charts");

const teamsSection = document.getElementById("teams-section");
const playersSection = document.getElementById("players-section");
const leagueSection = document.getElementById("league-section");
const chartsSection = document.getElementById("charts-section");

// ----- TELA INICIAL -----
const welcomeScreen = document.getElementById("welcome-screen");
const startGameButton = document.getElementById("start-game");
const selectTeam = document.getElementById("select-team");

const serieCTeams = teams.filter(team => team.serie === 'C');
serieCTeams.forEach((team, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = team.name;
    selectTeam.appendChild(option);
});

let playerTeam;
startGameButton.addEventListener("click", () => {
    const selectedIndex = selectTeam.value;
    if (selectedIndex === "") return alert("Escolha um time para iniciar!");
    playerTeam = serieCTeams[selectedIndex];
    playerTeam.isPlayerTeam = true;

    welcomeScreen.style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.getElementById("menu").style.display = "flex";
    document.querySelector("main").style.display = "block";

    renderTeams();
    renderLeague();
    updateChart();
});

// ----- FUNÇÕES DE RENDER -----
function renderTeams() {
    teamsList.innerHTML = "";
    teams.forEach((team, index) => {
        const li = document.createElement("li");
        li.textContent = `${team.name} - ${team.points} pts`;
        li.style.color = team.color;
        li.onclick = () => renderPlayers(index);
        teamsList.appendChild(li);
    });
}

function renderPlayers(teamIndex) {
    playersList.innerHTML = "";
    teams[teamIndex].players.forEach(player => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="player-card">
            ${player.name} | Skill: ${player.skill} | Gols: ${player.goals} | Idade: ${player.age}
            <div class="skill-bar"><span style="width:${player.skill}%"></span></div>
        </div>`;
        li.style.color = teams[teamIndex].color;
        playersList.appendChild(li);
    });
}

function renderLeague() {
    leagueTableBody.innerHTML = "";
    const sorted = [...teams].sort((a, b) => b.points - a.points);
    sorted.forEach((team, i) => {
        const row = document.createElement("tr");
        row.style.color = team.color;
        row.innerHTML = `<td>${i + 1}</td><td>${team.name}</td><td>${team.points}</td>
        <td>${team.games}</td><td>${team.wins}</td><td>${team.draws}</td><td>${team.losses}</td>
        <td>${team.goalsFor}</td><td>${team.goalsAgainst}</td>`;
        leagueTableBody.appendChild(row);
    });
}

// ----- PARTIDAS SIMPLIFICADAS -----
function playMatch() {
    for (let i = 0; i < teams.length; i += 2) {
        const t1 = teams[i];
        const t2 = teams[i + 1];
        let s1 = Math.floor(t1.players.reduce((a, p) => a + p.skill / 10, 0) + Math.random() * 5);
        let s2 = Math.floor(t2.players.reduce((a, p) => a + p.skill / 10, 0) + Math.random() * 5);

        t1.goalsFor += s1; t1.goalsAgainst += s2;
        t2.goalsFor += s2; t2.goalsAgainst += s1;
        t1.games++; t2.games++;

        if (s1 > s2) { t1.points += 3; t1.wins++; t2.losses++; }
        else if (s2 > s1) { t2.points += 3; t2.wins++; t1.losses++; }
        else { t1.points++; t2.points++; t1.draws++; t2.draws++; }

        for (let g = 0; g < s1; g++) { t1.players[Math.floor(Math.random() * 11)].goals++; }
        for (let g = 0; g < s2; g++) { t2.players[Math.floor(Math.random() * 11)].goals++; }

        t1.history.push(t1.points); t2.history.push(t2.points);
    }
    updateChart();
    renderTeams();
    renderLeague();
}

// ----- TREINAMENTO -----
function trainPlayers() {
    teams.forEach(t => t.players.forEach(p => {
        p.skill += Math.floor(Math.random() * 5);
        if (p.skill > 100) p.skill = 100;
    }));
    alert("Jogadores treinados!");
}

// ----- TRANSFERÊNCIAS -----
function transferPlayers() {
    let t1 = teams[Math.floor(Math.random() * teams.length)];
    let t2 = teams[Math.floor(Math.random() * teams.length)];
    if (t1 === t2) return alert("Mesmo time!");
    let idx = Math.floor(Math.random() * t1.players.length);
    let p = t1.players.splice(idx, 1)[0];
    t2.players.push(p);
    alert(`Transferência: ${p.name} de ${t1.name} para ${t2.name}`);
}

// ----- SALVAR / CARREGAR -----
function saveGame() {
    localStorage.setItem("managerGameBR", JSON.stringify(teams));
    alert("Jogo salvo!");
}

function loadGame() {
    let d = localStorage.getItem("managerGameBR");
    if (d) {
        teams.splice(0, teams.length, ...JSON.parse(d));
        renderTeams();
        renderLeague();
        updateChart();
        alert("Jogo carregado!");
    } else alert("Nenhum jogo salvo!");
}

// ----- GRÁFICOS -----
const ctx = document.getElementById('pointsChart').getContext('2d');
let pointsChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: teams.map(team => ({
            label: team.name,
            data: [],
            borderColor: team.color,
            fill: false
        }))
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top' } }
    }
});

function updateChart() {
    pointsChart.data.labels = Array.from({ length: teams[0].history.length }, (_, i) => `Semana ${i + 1}`);
    pointsChart.data.datasets.forEach((ds, i) => ds.data = teams[i].history);
    pointsChart.update();
}

// ----- MENU -----
btnTeams.onclick = () => { teamsSection.style.display = "block"; playersSection.style.display = "none"; leagueSection.style.display = "none"; chartsSection.style.display = "none"; }
btnPlayers.onclick = () => { teamsSection.style.display = "none"; playersSection.style.display = "block"; leagueSection.style.display = "none"; chartsSection.style.display = "none"; }
btnLeague.onclick = () => { teamsSection.style.display = "none"; playersSection.style.display = "none"; leagueSection.style.display = "block"; chartsSection.style.display = "none"; }
btnCharts.onclick = () => { teamsSection.style.display = "none"; playersSection.style.display = "none"; leagueSection.style.display = "none"; chartsSection.style.display = "block"; }

// ----- EVENTOS -----
playMatchButton.addEventListener("click", playMatch);
trainPlayersButton.addEventListener("click", trainPlayers);
transferButton.addEventListener("click", transferPlayers);
saveButton.addEventListener("click", saveGame);
loadButton.addEventListener("click", loadGame);
