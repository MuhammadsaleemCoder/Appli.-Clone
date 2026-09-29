const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirmPassword");
const statusEl = document.getElementById("formStatus");
const submitBtn = form.querySelector(".btn");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(input, message) {
  const errorEl = input.closest(".field").querySelector(".error");
  errorEl.textContent = message;
  input.closest(".field").classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
  return !message;
}

function validateName() {
  const value = nameInput.value.trim();
  if (!value) return setError(nameInput, "Full name is required.");
  if (value.length < 3)
    return setError(nameInput, "Name must be at least 3 characters.");
  return setError(nameInput, "");
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) return setError(emailInput, "Email is required.");
  if (!emailPattern.test(value))
    return setError(emailInput, "Enter a valid email address.");
  return setError(emailInput, "");
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) return setError(passwordInput, "Password is required.");
  if (value.length < 6)
    return setError(passwordInput, "Password must be at least 6 characters.");
  return setError(passwordInput, "");
}

function validateConfirm() {
  const value = confirmInput.value;
  if (!value) return setError(confirmInput, "Please confirm your password.");
  if (value !== passwordInput.value)
    return setError(confirmInput, "Passwords do not match.");
  return setError(confirmInput, "");
}

const checks = [
  [nameInput, validateName],
  [emailInput, validateEmail],
  [passwordInput, validatePassword],
  [confirmInput, validateConfirm],
];

checks.forEach(([input, validate]) => {
  const errorEl = input.closest(".field").querySelector(".error");
  input.addEventListener("blur", validate);
  input.addEventListener("input", () => errorEl.textContent && validate());
});

// Re-check confirm password when the main password changes
passwordInput.addEventListener("input", () => {
  if (confirmInput.value) validateConfirm();
});

// Show / Hide buttons (works for both password fields)
document.querySelectorAll(".toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const show = input.type === "password";
    input.type = show ? "text" : "password";
    btn.textContent = show ? "Hide" : "Show";
    btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "";

  const allValid = checks.map(([, validate]) => validate()).every(Boolean);
  if (!allValid) return;

  submitBtn.disabled = true;
  statusEl.textContent = "Creating your account...";

  try {
    // TODO: add your API call here, e.g.
    // const res = await fetch("/api/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: nameInput.value.trim(),
    //     email: emailInput.value.trim(),
    //     password: passwordInput.value
    //   })
    // });
    // if (!res.ok) throw new Error("Registration failed");

    await new Promise((resolve) => setTimeout(resolve, 800)); // demo delay
    statusEl.textContent = "Account created. Redirecting to login...";
    setTimeout(() => (window.location.href = "index.html"), 1200);
  } catch (err) {
    statusEl.textContent =
      err.message || "Registration failed. Please try again.";
    submitBtn.disabled = false;
  }
});
