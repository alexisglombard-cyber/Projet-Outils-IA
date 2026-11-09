"use strict";

// Démonstration pédagogique : un vrai service doit vérifier les comptes côté serveur.
const ACCOUNT_KEY = "taskflow.account";
const ITERATIONS = 600000;
const authForm = document.querySelector("#auth-form");
const passwordInput = document.querySelector("#password");
const authMessage = document.querySelector("#auth-message");
const registerButton = document.querySelector("#register");
const loginButton = document.querySelector("#login");
let busy = false;

function validPassword(password) {
  return password.length >= 12 && password.length <= 128 &&
    password === password.trim() && /[a-z]/.test(password) &&
    /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9\s]/.test(password);
}

passwordInput.addEventListener("input", () => {
  document.querySelector("#password-feedback").textContent = !passwordInput.value ? "" :
    validPassword(passwordInput.value) ? "Critères de création respectés." : "Tous les critères de création ne sont pas encore respectés.";
});

async function derivePassword(password, salt) {
  const key = await crypto.subtle.importKey(
    "raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: new Uint8Array(salt), iterations: ITERATIONS }, key, 256
  );
  return Array.from(new Uint8Array(bits));
}

function validAccount(account) {
  const bytes = (value, size) => Array.isArray(value) && value.length === size &&
    value.every(byte => Number.isInteger(byte) && byte >= 0 && byte <= 255);
  return account && account.version === 1 && typeof account.username === "string" &&
    account.username.trim().length > 0 && account.username.length <= 40 &&
    bytes(account.salt, 16) && bytes(account.verifier, 32);
}

async function authenticate(create) {
  if (busy || !authForm.reportValidity()) return;
  const username = document.querySelector("#username").value.trim();
  const password = passwordInput.value;
  if (!username) {
    authMessage.textContent = "Le nom ne peut pas être composé d'espaces.";
    return;
  }
  if (create && !validPassword(password)) {
    authMessage.textContent = "Le mot de passe doit respecter tous les critères indiqués.";
    return;
  }
  busy = true;
  registerButton.disabled = loginButton.disabled = true;
  authMessage.textContent = "Vérification en cours…";
  try {
    if (!crypto.subtle) throw new Error("Web Crypto indisponible : ouvrez le site sur localhost ou en HTTPS.");
    const stored = localStorage.getItem(ACCOUNT_KEY);
    if (create) {
      if (stored !== null) throw new Error("Un compte existe déjà dans ce navigateur. Utilisez Se connecter.");
      const salt = Array.from(crypto.getRandomValues(new Uint8Array(16)));
      const verifier = await derivePassword(password, salt);
      // Le mot de passe brut ne quitte jamais cette fonction ni le champ du formulaire.
      localStorage.setItem(ACCOUNT_KEY, JSON.stringify({ version: 1, username, salt, verifier }));
    } else {
      const account = JSON.parse(stored || "null");
      if (!account) throw new Error("Créez d'abord le compte local.");
      if (!validAccount(account)) throw new Error("Le compte local est illisible. Consultez le README pour réinitialiser la démonstration.");
      const candidate = await derivePassword(password, account.salt);
      if (username !== account.username || candidate.some((byte, index) => byte !== account.verifier[index])) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
      }
    }
    document.querySelector("#auth").hidden = true;
    document.querySelector("#workspace").hidden = false;
    document.querySelector("#session-user").textContent = `Bonjour, ${username}`;
    authForm.reset();
    document.querySelector("#password-feedback").textContent = "";
    authMessage.textContent = "";
    input.focus();
  } catch (error) {
    authMessage.textContent = error instanceof SyntaxError ? "Compte local illisible : consultez le README." : error.message;
  } finally {
    passwordInput.value = "";
    busy = false;
    registerButton.disabled = loginButton.disabled = false;
  }
}

authForm.addEventListener("submit", event => {
  event.preventDefault();
  authenticate(false);
});
registerButton.addEventListener("click", () => authenticate(true));
document.querySelector("#logout").addEventListener("click", () => {
  document.querySelector("#workspace").hidden = true;
  document.querySelector("#auth").hidden = false;
  document.querySelector("#session-user").textContent = "";
  authMessage.textContent = "Vous êtes déconnecté.";
  document.querySelector("#username").focus();
});
