const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-btn");
const screenButtons = document.querySelectorAll("[data-screen]");
const toast = document.querySelector("#toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1900);
}

function activateScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.screen === screenId);
  });

  const active = document.getElementById(screenId);
  const scroll = active?.querySelector(".screen-scroll, .messages, .chat-list");
  if (scroll) scroll.scrollTop = 0;
}

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.screen;
    if (target) activateScreen(target);
  });
});

document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.parentElement;
    group.querySelectorAll(".filter-btn").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".mini-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.dataset.screen) showToast("Oportunidade salva para revisar depois.");
  });
});

document.querySelectorAll(".pin").forEach((pin) => {
  pin.addEventListener("click", () => {
    document.querySelectorAll(".pin").forEach((item) => item.classList.remove("active"));
    pin.classList.add("active");
    showToast(`${pin.getAttribute("aria-label")} selecionado no mapa.`);
  });
});

document.querySelector("#send-message").addEventListener("click", () => {
  const input = document.querySelector("#chat-input");
  const text = input.value.trim();
  if (!text) return;
  const bubble = document.createElement("div");
  bubble.className = "bubble me";
  bubble.textContent = text;
  document.querySelector("#messages").appendChild(bubble);
  input.value = "";
  bubble.scrollIntoView({ behavior: "smooth", block: "end" });
});

document.querySelector("#chat-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#send-message").click();
  }
});

document.querySelector("#copy-code").addEventListener("click", async () => {
  const code = "CONECTA-AURORA";
  try {
    await navigator.clipboard.writeText(code);
    showToast("Código copiado: CONECTA-AURORA");
  } catch {
    showToast("Código: CONECTA-AURORA");
  }
});