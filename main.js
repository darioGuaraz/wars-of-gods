//--------------------------------------
let cardsData = [];
let selectedCard = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("../src/data/cards.json");
    cardsData = await res.json();

    const container = document.getElementById("cardsAvaiable");
    const selectedContainer = document.querySelector(".selectedCards");

    // mostrar cards
    cardsData.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `
        <img src="${card.img}" alt="${card.nombre}">
        <h3>${card.nombre}</h3>
        <p>${card.descripcion}</p>
      `;

      cardElement.addEventListener("click", () => {
        selectedCard = card;

        // Mostrar la carta seleccionada
        selectedContainer.innerHTML = `
        <div class="contenedorSelector">
          <h3>Tu selección:</h3>
          <div class="card-con-boton">
            <div class="card">
              <img src="${card.img}" alt="${card.nombre}">
              <h3>${card.nombre}</h3>
              <p>${card.descripcion}</p>
            </div>
            <button id="battleBtn">Batalla</button>
          </div>
        </div>
        `;

        // Reasignar el evento al nuevo botón insertado en el DOM
        const battleBtn = document.getElementById("battleBtn");
        battleBtn.addEventListener("click", () => {
          if (!selectedCard) {
            alert("Seleccioná primero un dios ");
            return;
          }

          const cpuCard =
            cardsData[Math.floor(Math.random() * cardsData.length)];
          showBattleResult(selectedCard, cpuCard);
        });
      });

      container.appendChild(cardElement);
    });
    const username = localStorage.getItem("username") || "guerrero";
    const mensajeUsuario = document.getElementById("saludo");
    mensajeUsuario.textContent = `los dioses te esperan ${username}, selecciona uno de ellos y enfrentate al enemigo`;
  } catch (error) {
    console.error("Error cargando las cartas:", error);
  }
});

const reglasDeBatalla = {
  Fuegod: ["Papergod", "HyperFilo", "God Esponja"],
  "Diosa Aqua": ["Fuegod", "Rocker", "HyperFilo"],
  Diosaire: ["Diosa Aqua", "God Esponja", "HyperFilo"],
  Rocker: ["Fuegod", "Diosaire", "Papergod"],
  HyperFilo: ["Rocker", "Papergod", "Diosa Aqua"],
  Papergod: ["Diosa Aqua", "Diosaire", "God Esponja"],
  "God Esponja": ["Fuegod", "Rocker", "Diosaire"],
};

function showBattleResult(playerCard, cpuCard) {
  const selectedContainer = document.querySelector(".selectedCards");

  // Normalizar los nombres de las cartas
  const playerName = playerCard.nombre.trim();
  const cpuName = cpuCard.nombre.trim();

  // Buscar las reglas
  const ganaContra = reglasDeBatalla[playerName];

  const username = localStorage.getItem("username") || "Jugador";

  let resultado = ""; // ✅ Declarar correctamente la variable

  // Verificación
  if (!ganaContra) {
    resultado = `⚠️ No se encontraron reglas para la carta "${playerName}".`;
  } else if (playerName === cpuName) {
    resultado = `⚔️ Empataste ${username} ⚔️`;
  } else if (ganaContra.includes(cpuName)) {
    resultado = `¡${username} ganó! 💥`;
  } else {
    resultado = `Perdiste ${username}.. 😒`;
  }

  // Renderizar resultado
  selectedContainer.innerHTML = `
    <div class="contenedorSelector">
      <h2>Resultado de la batalla</h2>
      <div class="battle-cards">
        <div class="card player-card">
          <h3>Tu carta:</h3>
          <img src="${playerCard.img}" alt="${playerCard.nombre}">
          <p>${playerCard.nombre}</p>
        </div>
        <div class="card cpu-card">
          <h3>Enemigo:</h3>
          <img src="${cpuCard.img}" alt="${cpuCard.nombre}">
          <p>${cpuCard.nombre}</p>
        </div>
      </div>
      <h3 class="battle-result">${resultado}</h3>
    </div>
  `;
}
