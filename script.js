const forms = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const statusEl = document.getElementById("formStatus");
const toggleBtn = document.getElementById("togglePassword");
const submitBtn = form.querySelector(".btn");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const menuBtn = document.getElementById("menuBtn"),
  nav = document.getElementById("nav");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });
}
document
  .querySelectorAll(".faq-item button")
  .forEach((btn) =>
    btn.addEventListener("click", () =>
      btn.parentElement.classList.toggle("open"),
    ),
  );
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("formMsg").textContent =
      "Thank you! Your message has been submitted.";
    form.reset();
  });
}

function setError(input, errorEl, message) {
  errorEl.textContent = message;
  input.closest(".field").classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    setError(emailInput, emailError, "Email is required.");
    return false;
  }
  if (!emailPattern.test(value)) {
    setError(emailInput, emailError, "Enter a valid email address.");
    return false;
  }
  setError(emailInput, emailError, "");
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    setError(passwordInput, passwordError, "Password is required.");
    return false;
  }
  if (value.length < 6) {
    setError(
      passwordInput,
      passwordError,
      "Password must be at least 6 characters.",
    );
    return false;
  }
  setError(passwordInput, passwordError, "");
  return true;
}

emailInput.addEventListener("blur", validateEmail);
passwordInput.addEventListener("blur", validatePassword);
emailInput.addEventListener(
  "input",
  () => emailError.textContent && validateEmail(),
);
passwordInput.addEventListener(
  "input",
  () => passwordError.textContent && validatePassword(),
);

toggleBtn.addEventListener("click", () => {
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  toggleBtn.textContent = show ? "Hide" : "Show";
  toggleBtn.setAttribute(
    "aria-label",
    show ? "Hide password" : "Show password",
  );
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusEl.textContent = "";

  const emailOk = validateEmail();
  const passwordOk = validatePassword();
  if (!emailOk || !passwordOk) return;

  submitBtn.disabled = true;
  statusEl.textContent = "Logging in...";

  try {
    // TODO: add your API call here, e.g.
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: emailInput.value.trim(), password: passwordInput.value })
    // });
    // if (!res.ok) throw new Error("Invalid email or password");

    await new Promise((resolve) => setTimeout(resolve, 800)); // demo delay
    statusEl.textContent = "Login successful.";
  } catch (err) {
    statusEl.textContent = err.message || "Login failed. Please try again.";
  } finally {
    submitBtn.disabled = false;
  }
});
