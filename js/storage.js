// js/storage.js

export function salvarJogo(estado) {
  localStorage.setItem("savegame", JSON.stringify(estado));
  alert("Progresso salvo com sucesso!");
}

export function carregarJogo() {
  const data = localStorage.getItem("savegame");
  if (data) {
    return JSON.parse(data);
  } else {
    alert("Nenhum jogo salvo encontrado.");
    return null;
  }
}
