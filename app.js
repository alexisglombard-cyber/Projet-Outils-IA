"use strict";

let tasks = [];
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-title");
const list = document.querySelector("#task-list");
const message = document.querySelector("#message");

function saveTasks() {
  // La sauvegarde sera ajoutée au sprint 2.
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
      const nextTitle = window.prompt("Modifier la tÃ¢che :", task.title);
      if (nextTitle === null) return;
      if (!nextTitle.trim() || nextTitle.trim().length > 120) {
        message.textContent = "Le titre doit contenir entre 1 et 120 caractÃ¨res.";
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
  document.querySelector("#count").textContent = `${tasks.filter(task => task.done).length} / ${tasks.length} terminÃ©es`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title || title.length > 120) {
    message.textContent = "Le titre doit contenir entre 1 et 120 caractÃ¨res.";
    input.focus();
    return;
  }
  tasks.push({ id: crypto.randomUUID(), title, done: false });
  saveTasks();
  renderTasks();
  form.reset();
  input.focus();
  message.textContent = "TÃ¢che ajoutÃ©e.";
});

renderTasks();

