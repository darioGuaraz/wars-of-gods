//------------------login-------------------------------------

// Se agrega un event listener al botón o enlace con el ID "tutorial-toggle" para que cuando se haga clic, se ejecute la función.
document.getElementById("tutorial-toggle").addEventListener("click", () => {
  // Se selecciona el contenido del tutorial (elemento con ID "tutorial-content").
  const content = document.getElementById("tutorial-content");

  // Alterna la visibilidad del contenido: si está oculto (display: none), lo muestra (display: block);
  // si está visible (display: block), lo oculta (display: none).
  content.style.display = content.style.display === "none" ? "block" : "none";
});

// Se agrega un event listener al botón con el ID "login-btn" para manejar el clic cuando el usuario intenta iniciar sesión.
document.getElementById("login-btn").addEventListener("click", () => {
  // Se obtiene el valor del campo de texto de nombre de usuario.
  const username = document.getElementById("username").value;

  // Se verifica si el nombre de usuario no está vacío (después de eliminar espacios en blanco al inicio y final).
  if (username.trim() !== "") {
    // Se obtiene el nombre de usuario previamente guardado en el localStorage.
    const previous = localStorage.getItem("username");

    // Si el nombre de usuario ingresado es diferente al previamente guardado, se guarda el nuevo nombre en el localStorage.
    if (previous !== username) {
      localStorage.setItem("username", username);
    }

    // Se redirige al usuario a la página principal después de iniciar sesión.
    window.location.href = "./public/main.html";
  } else {
    // Si el nombre de usuario está vacío, se muestra un mensaje de alerta.
    alert("Por favor ingresa un nombre de usuario.");
  }
});
