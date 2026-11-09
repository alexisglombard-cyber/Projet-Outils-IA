"use strict";

let tasks = [];
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-title");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");

function saveTasks() {
  try {
    localStorage.setItem("taskflow.tasks", JSON.stringify(tasks));
  } catch {
    message.textContent = "Sauvegarde indisponible : les changements restent dans cet onglet.";
  }
}

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem("taskflow.tasks") || "[]");
    if (!Array.isArray(saved) || !saved.every(task =>
      task && typeof task.id === "string" && typeof task.title === "string" &&
      task.title.trim().length > 0 && task.title.length <= 120 && typeof task.done === "boolean"
    ) || new Set(saved.map(task => task.id)).size !== saved.length) {
      throw new Error("Données invalides");
    }
    tasks = saved;
  } catch {
    message.textContent = "Impossible de lire les tâches sauvegardées. La liste démarre vide.";
  }
}

function renderTasks() {
  list.replaceChildren();
  for (const task of tasks) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveTasks();
      renderTasks();
    });
    const title = document.createElement("span");
    // textContent affiche les titres comme du texte, jamais comme du HTML.
    title.textContent = task.title;
    if (task.done) item.classList.add("done");
    label.append(checkbox, title);
    const actions = document.createElement("div");
    actions.className = "actions";
    const edit = document.createElement("button");
    edit.textContent = "Modifier";
    edit.addEventListener("click", () => {
      const nextTitle = window.prompt("Modifier la tâche :", task.title);
      if (nextTitle === null) return;
      if (!nextTitle.trim() || nextTitle.trim().length > 120) {
        message.textContent = "Le titre doit contenir entre 1 et 120 caractères.";
        return;
      }
      task.title = nextTitle.trim();
      saveTasks();
      renderTasks();
    });
    const remove = document.createElement("button");
    remove.textContent = "Supprimer";
    remove.className = "danger";
    remove.addEventListener("click", () => {
      tasks = tasks.filter(candidate => candidate.id !== task.id);
      saveTasks();
      renderTasks();
    });
    actions.append(edit, remove);
    item.append(label, actions);
    list.append(item);
  }
  document.querySelector("#empty").hidden = tasks.length > 0;
  document.querySelector("#count").textContent = `${tasks.filter(task => task.done).length} / ${tasks.length} terminées`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title || title.length > 120) {
    message.textContent = "Le titre doit contenir entre 1 et 120 caractères.";
    input.focus();
    return;
  }
  tasks.push({ id: crypto.randomUUID(), title, done: false });
  saveTasks();
  renderTasks();
  form.reset();
  input.focus();
  message.textContent = "Tâche ajoutée.";
});

loadTasks();
renderTasks();
