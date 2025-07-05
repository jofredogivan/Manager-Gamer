// js/team.js

export const myTeam = {
  name: "",
  season: 1,
  round: 1,
  money: 50000,
  reputation: 20,
  players: [],
  formation: "4-4-2",
  mentality: "balanced"
};

export function generateTeamPlayers() {
  const positions = ["GOL", "ZAG", "LAT", "MEI", "ATA"];
  const playerNames = [
    "Lucas", "Pedro", "João", "Carlos", "Mateus",
    "André", "Vitor", "Rafael", "Gustavo", "Thiago",
    "Felipe", "Eduardo", "Daniel", "Henrique", "Bruno"
  ];

  myTeam.players = [];
  for (let i = 0; i < 11; i++) {
    myTeam.players.push({
      name: playerNames[i],
      position: positions[i % positions.length],
      skill: Math.floor(Math.random() * 40 + 60),
      stamina: 100,
      status: "Titular"
    });
  }
  for (let i = 11; i < 18; i++) {
    myTeam.players.push({
      name: playerNames[i % playerNames.length] + " Jr",
      position: positions[i % positions.length],
      skill: Math.floor(Math.random() * 40 + 50),
      stamina: 100,
      status: "Reserva"
    });
  }
}

export function getTitulares() {
  return myTeam.players.filter(p => p.status === "Titular");
}
