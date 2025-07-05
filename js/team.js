// js/team.js

export const myTeam = {
  name: "Time Genérico FC",
  money: 500000,
  season: 1,
  round: 1,
  players: [],
};

export function generateTeamPlayers() {
  const positions = ["GOL", "ZAG", "MEI", "ATA"];

  for (let i = 0; i < 16; i++) {
    const position = positions[Math.floor(i / 4)];
    myTeam.players.push({
      name: `Jogador ${i + 1}`,
      position,
      skill: Math.floor(Math.random() * 40) + 60,
      stamina: 100,
      status: "reserva",
    });
  }

  // define titulares iniciais
  myTeam.players.slice(0, 11).forEach(p => p.status = "titular");
}

export function getTitulares() {
  return myTeam.players.filter(p => p.status === "titular");
}

export function getReservas() {
  return myTeam.players.filter(p => p.status === "reserva");
}
