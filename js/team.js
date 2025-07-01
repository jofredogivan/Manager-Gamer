// js/team.js

export let myTeam = null;
export let startingEleven = [];
export let bench = [];

const defaultTeams = [
  {
    name: "Santa Cruz",
    sigla: "STC",
    cor: "#D32F2F",
    escudo: "🟥⚫️⬛",
    pontos: 9,
    jogadores: [
      { nome: "Carlos Silva", pos: "GOL", skill: 65 },
      { nome: "João Santos", pos: "ZAG", skill: 60 },
      { nome: "Marcos Lima", pos: "ZAG", skill: 62 },
      { nome: "Rafael Costa", pos: "LAT", skill: 58 },
      { nome: "Daniel Souza", pos: "LAT", skill: 59 },
      { nome: "Tiago Alves", pos: "VOL", skill: 61 },
      { nome: "Fábio Matos", pos: "MEI", skill: 63 },
      { nome: "Pedro Rocha", pos: "MEI", skill: 64 },
      { nome: "Diego Ribeiro", pos: "ATA", skill: 67 },
      { nome: "Lucas Gomes", pos: "ATA", skill: 66 },
      { nome: "André Luiz", pos: "ATA", skill: 64 },
      { nome: "Bruno Silva", pos: "ZAG", skill: 60 },
      { nome: "Leandro Cunha", pos: "LAT", skill: 58 },
      { nome: "Henrique Dias", pos: "VOL", skill: 61 },
      { nome: "Eduardo Melo", pos: "MEI", skill: 62 },
      { nome: "Guilherme Lopes", pos: "ATA", skill: 65 },
      { nome: "Renan Souza", pos: "ATA", skill: 63 },
      { nome: "Matheus Freitas", pos: "ATA", skill: 64 }
    ]
  }
];

export function getTeams() {
  return defaultTeams;
}

export function chooseTeam(name) {
  const selected = defaultTeams.find(t => t.name === name);
  myTeam = {
    name: selected.name,
    sigla: selected.sigla,
    cor: selected.cor,
    escudo: selected.escudo,
    money: 400000,
    round: 1,
    season: 1,
    players: selected.jogadores.map(j => ({
      name: j.nome,
      skill: j.skill,
      stamina: 100
    }))
  };
  startingEleven = myTeam.players.slice(0, 11);
  bench = myTeam.players.slice(11);
  return myTeam;
}

export function getElenco() {
  return { titulares: startingEleven, reservas: bench };
}
