//------------------login-------------------------------------
document.getElementById("tutorial-toggle").addEventListener("click", () => {
  const content = document.getElementById("tutorial-content");
  content.style.display = content.style.display === "none" ? "block" : "none";
});

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;

  if (username.trim() !== "") {
    const previous = localStorage.getItem("username");
    if (previous !== username) {
      localStorage.setItem("username", username);
    }
    window.location.href = "./public/main.html";
  } else {
    alert("Por favor ingresa un nombre de usuario.");
  }
});
