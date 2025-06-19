const signUpForm = document.getElementById("signUpForm");
const signInForm = document.getElementById("signInForm");
const signUpFormElement = document.getElementById("signUpFormElement");
const signInFormElement = document.getElementById("signInFormElement");
const switchToSignIn = document.getElementById("switchToSignIn");
const switchToSignUp = document.getElementById("switchToSignUp");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

function showSignIn() {
  signUpForm.classList.add("hidden");
  signInForm.classList.remove("hidden");
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
}

function showSignUp() {
  signInForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
  successMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function showSuccess() {
  signInForm.classList.add("hidden");
  signUpForm.classList.add("hidden");
  successMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

switchToSignIn.addEventListener("click", showSignIn);
switchToSignUp.addEventListener("click", showSignUp);

signUpFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("signUpEmail").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    showError("Parol xato");
    return;
  }

  const newUser = {
    firstName,
    lastName,
    email,
    password,
    registeredAt: new Date().toISOString(),
  };

  registeredUsers.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
  signUpFormElement.reset();

  setTimeout(() => {
    showSignIn();
    document.getElementById("signInEmail").value = email;

    const tempMessage = document.createElement("div");
    tempMessage.className =
      "mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center";
    tempMessage.innerHTML = "✅ Muvaffaqiyatli royxatdan otdingiz";
    signInForm.insertBefore(tempMessage, signInForm.firstChild);

    setTimeout(() => {
      tempMessage.remove();
    }, 3000);
  }, 1000);
});

signInFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  const user = registeredUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    signInFormElement.reset();
    showSuccess();

    setTimeout(() => {
      showSignUp();
    }, 5000);
  } else {
    showError("Email yoki parol notogri");
  }
});

window.addEventListener("load", () => {
  console.log("Registered users:", registeredUsers.length);
});
