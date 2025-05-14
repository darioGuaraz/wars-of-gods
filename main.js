// Almacena las cartas disponibles y la carta seleccionada por el jugador
let cardsData = [];
let selectedCard = null;

// Espera a que el DOM se haya cargado completamente y luego inicializa la aplicación
document.addEventListener("DOMContentLoaded", initApp);

// Función principal para inicializar la aplicación
async function initApp() {
  try {
    // Carga las cartas desde el archivo JSON
    cardsData = await fetchCards("../src/data/cards.json");

    // Renderiza las cartas en la interfaz
    renderCards(cardsData);

    // Muestra el mensaje de bienvenida al usuario
    greetUser();
  } catch (error) {
    // Si ocurre un error, lo muestra en la consola
    console.error("Error cargando las cartas:", error);
  }
}

// Función para cargar las cartas desde una URL (usando fetch)
async function fetchCards(url) {
  const res = await fetch(url); // Realiza la petición fetch para obtener las cartas
  return res.json(); // Devuelve el JSON de la respuesta
}

// Función para renderizar todas las cartas disponibles en el contenedor
function renderCards(cards) {
  const container = document.getElementById("cardsAvaiable"); // Contenedor de las cartas
  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas cartas

  // Itera sobre cada carta y la muestra en el contenedor
  cards.forEach((card) => {
    const cardElement = createCardElement(card); // Crea el elemento HTML de la carta
    cardElement.addEventListener("click", () => handleCardSelection(card)); // Añade el evento al hacer clic
    container.appendChild(cardElement); // Añade la carta al contenedor
  });
}

// Función para crear el HTML de una carta
function createCardElement(card) {
  const cardDiv = document.createElement("div"); // Crea un div para la carta
  cardDiv.className = "card"; // Asigna la clase 'card' al div
  cardDiv.innerHTML = `
    <img src="${card.img}" alt="${card.nombre}"> <!-- Imagen de la carta -->
    <h3>${card.nombre}</h3> <!-- Nombre de la carta -->
    <p>${card.descripcion}</p> <!-- Descripción de la carta -->
  `;
  return cardDiv; // Devuelve el elemento de la carta creado
}

// Función que maneja la selección de una carta cuando el usuario hace clic en ella
function handleCardSelection(card) {
  selectedCard = card; // Asigna la carta seleccionada a la variable global 'selectedCard'
  renderSelectedCard(card); // Renderiza la carta seleccionada

  // Desplaza la página automáticamente al contenedorSelector donde se muestra la carta seleccionada
  const selectedContainer = document.querySelector(".selectedCards"); // Obtiene el contenedor
  selectedContainer.scrollIntoView({
    behavior: "smooth", // Desplazamiento suave
    block: "start", // Alineación al inicio del contenedor
  });
}

// Función para mostrar la carta seleccionada en la interfaz con el botón de batalla
function renderSelectedCard(card) {
  const selectedContainer = document.querySelector(".selectedCards"); // Contenedor donde se muestra la carta seleccionada
  selectedContainer.innerHTML = `
    <div class="contenedorSelector">
      <h3>Tu selección:</h3>
      <div class="card-con-boton">
        ${
          createCardElement(card).outerHTML
        } <!-- Inserta el HTML de la carta seleccionada -->
        <button id="battleBtn">Batalla</button> <!-- Botón para iniciar la batalla -->
      </div>
    </div>
  `;

  // Añade el evento al botón de batalla
  document.getElementById("battleBtn").addEventListener("click", () => {
    // Selecciona una carta del enemigo aleatoriamente
    const cpuCard = cardsData[Math.floor(Math.random() * cardsData.length)];
    showBattleResult(selectedCard, cpuCard); // Muestra el resultado de la batalla
  });
}

// Función para mostrar un mensaje de bienvenida con el nombre del usuario
function greetUser() {
  const username = localStorage.getItem("username") || "guerrero"; // Obtiene el nombre del usuario del localStorage o usa un valor predeterminado
  const mensajeUsuario = document.getElementById("saludo"); // Elemento HTML donde se muestra el saludo
  mensajeUsuario.textContent = `los dioses te esperan ${username}, selecciona uno de ellos y enfrentate al enemigo`; // Muestra el mensaje
}

// Función para mostrar el resultado de la batalla entre el jugador y el enemigo
function showBattleResult(playerCard, cpuCard) {
  const selectedContainer = document.querySelector(".selectedCards"); // Contenedor donde se muestra el resultado
  const username = localStorage.getItem("username") || "Jugador"; // Nombre del usuario

  // Normaliza los nombres de las cartas para facilitar la comparación
  const playerName = normalizeName(playerCard.nombre);
  const cpuName = normalizeName(cpuCard.nombre);

  // Reglas del juego: qué carta le gana a cuál
  const winningRules = {
    fuegod: ["hyperfilo", "godesponja", "papergod"],
    diosaaqua: ["rocker", "fuegod", "hyperfilo"],
    diosaire: ["diosaaqua", "fuegod", "rocker"],
    rocker: ["fuegod", "hyperfilo", "godesponja"],
    hyperfilo: ["diosaire", "papergod", "godesponja"],
    papergod: ["diosaire", "diosaaqua", "rocker"],
    godesponja: ["papergod", "diosaire", "diosaaqua"],
  };

  // Variable que almacenará el resultado de la batalla
  let resultado;

  // Comparación entre las cartas del jugador y del CPU
  if (playerName === cpuName) {
    resultado = `⚔️ Empate ⚔️`; // Si las cartas son iguales, es un empate
  } else if (winningRules[playerName]?.includes(cpuName)) {
    resultado = `¡${username} ganó! 😎`; // Si el jugador gana, muestra un mensaje de victoria
  } else {
    resultado = `Perdiste ${username}.. 😒`; // Si el jugador pierde, muestra un mensaje de derrota
  }

  // Renderiza el resultado de la batalla en la interfaz
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

// Función para normalizar los nombres de las cartas (convierte a minúsculas y elimina espacios)
function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, ""); // Convierte a minúsculas y quita los espacios
}
