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

function showBattleResult(playerCard, cpuCard) {
  const selectedContainer = document.querySelector(".selectedCards");
  const username = localStorage.getItem("username") || "Jugador";

  // Normalizamos los nombres
  const playerName = normalizeName(playerCard.nombre);
  const cpuName = normalizeName(cpuCard.nombre);

  // Reglas con nombres normalizados
  const winningRules = {
    fuegod: ["hyperfilo", "godesponja", "papergod"],
    diosaaqua: ["rocker", "fuegod", "hyperfilo"],
    diosaire: ["diosaaqua", "fuegod", "rocker"],
    rocker: ["fuegod", "hyperfilo", "godesponja"],
    hyperfilo: ["diosaire", "papergod", "godesponja"],
    papergod: ["diosaire", "diosaaqua", "rocker"],
    godesponja: ["papergod", "diosaire", "diosaaqua"],
  };

  let resultado;

  if (playerName === cpuName) {
    resultado = `⚔️ Empate ⚔️`;
  } else if (winningRules[playerName]?.includes(cpuName)) {
    resultado = `¡${username} ganó! 😎`;
  } else {
    resultado = `Perdiste ${username}.. 😒`;
  }

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

function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}
