// js/clubes.js

export const clubesSerieA = [
  "Flamengo", "Palmeiras", "São Paulo", "Grêmio",
  "Internacional", "Corinthians", "Athletico-PR", "Atlético-MG",
  "Bahia", "Cruzeiro", "Botafogo", "Fortaleza",
  "Cuiabá", "Vasco", "Bragantino", "Goiás",
  "Santos", "América-MG", "Coritiba", "Chapecoense"
];

export const clubesSerieB = [
  "Sport", "Ceará", "Juventude", "Ponte Preta",
  "Avaí", "CRB", "Tombense", "Vila Nova",
  "Mirassol", "Ituano", "Sampaio Corrêa", "Londrina",
  "Novorizontino", "CSA", "Paysandu", "Botafogo-SP",
  "Operário", "Amazonas", "Guarani", "ABC"
];

export const clubesSerieC = [
  "Figueirense", "Ypiranga", "Remo", "Altos",
  "Volta Redonda", "Náutico", "Caxias", "CSA",
  "São Bernardo", "Aparecidense", "Floresta", "Manaus",
  "São José-RS", "Pouso Alegre", "Confiança", "América-RN",
  "Ferroviário", "Brusque", "Botafogo-PB", "Campinense"
];

export function sortearTimeRebaixado() {
  const ultimosColocados = clubesSerieA.slice(-4).concat(clubesSerieB.slice(-4));
  const index = Math.floor(Math.random() * ultimosColocados.length);
  return ultimosColocados[index];
}
