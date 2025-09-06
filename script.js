// script.js

let currentTeam = null;
let leagueTable = [];

document.addEventListener("DOMContentLoaded", () => {
    const teamSelect = document.getElementById("team-select");
    const startButton = document.getElementById("start-game");

    // Preenche dropdown só com times da Série C
    const serieCTeams = window.teams.filter(team => team.serie === "C");

    serieCTeams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.name;
        option.textContent = team.name;
        teamSelect.appendChild(option);
    });

    startButton.addEventListener("click", () => {
        const selectedTeamName = teamSelect.value;

        if (!selectedTeamName) {
            alert("Selecione um time da Série C para começar!");
            return;
        }

        currentTeam = window.teams.find(t => t.name === selectedTeamName);

        if (!currentTeam) {
            alert("Erro: time não encontrado!");
            return;
        }

        // Gera elenco inicial com nomes aleatórios
        currentTeam.players = generatePlayers();

        // Inicializa a tabela da liga
        leagueTable = [...window.teams].map((team, index) => ({
            position: index + 1,
            name: team.name,
            points: 0,
            jogos: 0,
            vitorias: 0,
            empates: 0,
            derrotas: 0,
            golsPro: 0,
            golsContra: 0
        }));

        // Esconde tela inicial e mostra jogo
        document.getElementById("start-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";

        renderTeam();
        renderLeagueTable();
    });
});

// Gera jogadores fictícios com atributos
function generatePlayers() {
    const generated = [];
    for (let i = 0; i < 11; i++) {
        const name = window.playerNames[Math.floor(Math.random() * window.playerNames.length)];
        generated.push({
            name,
            attack: Math.floor(Math.random() * 100),
            defense: Math.floor(Math.random() * 100),
            stamina: Math.floor(Math.random() * 100),
            goals: 0
        });
    }
    return generated;
}

// Renderiza elenco do time
function renderTeam() {
    const playersList = document.getElementById("players-list");
    playersList.innerHTML = "";

    currentTeam.players.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - Atk: ${player.attack}, Def: ${player.defense}, Res: ${player.stamina}`;
        playersList.appendChild(li);
    });
}

// Renderiza tabela da liga
function renderLeagueTable() {
    const tbody = document.querySelector("#league-table tbody");
    tbody.innerHTML = "";

    leagueTable.forEach((team, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.points}</td>
            <td>${team.jogos}</td>
            <td>${team.vitorias}</td>
            <td>${team.empates}</td>
            <td>${team.derrotas}</td>
            <td>${team.golsPro}</td>
            <td>${team.golsContra}</td>
        `;
        tbody.appendChild(tr);
    });
}
