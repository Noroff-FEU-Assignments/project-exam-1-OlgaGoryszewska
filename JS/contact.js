const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");

form.addEventListener("submit", function (e) {
  let isValid = true;

  if (nameInput.value.length <= 5) {
    nameError.textContent = "Name must be more than 5 characters.";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (subjectInput.value.length <= 15) {
    subjectError.textContent = "Subject must be more than 15 characters.";
    isValid = false;
  } else {
    subjectError.textContent = "";
  }

  if (messageInput.value.length <= 25) {
    messageError.textContent = "Message must be more than 25 characters.";
    isValid = false;
  } else {
    messageError.textContent = "";
  }

  if (!isValid) {
    e.preventDefault();
  }
});
