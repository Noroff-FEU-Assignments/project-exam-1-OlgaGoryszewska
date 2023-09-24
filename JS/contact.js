form.addEventListener("submit", function (e) {
    let isValid = true;

    if (nameInput.value.length <= 5) {
        nameError.textContent = "Name must be more than 5 characters.";
        nameError.style.color = "red"; // Set the text color to red
        isValid = false;
    } else {
        nameError.textContent = "";
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(emailInput.value)) {
        emailError.textContent = "Enter a valid email address.";
        emailError.style.color = "red"; // Set the text color to red
        isValid = false;
    } else {
        emailError.textContent = "";
    }

    if (subjectInput.value.length <= 15) {
        subjectError.textContent = "Subject must be more than 15 characters.";
        subjectError.style.color = "red"; // Set the text color to red
        isValid = false;
    } else {
        subjectError.textContent = "";
    }

    if (messageInput.value.length <= 25) {
        messageError.textContent = "Message must be more than 25 characters.";
        messageError.style.color = "red"; // Set the text color to red
        isValid = false;
    } else {
        messageError.textContent = "";
    }

    if (!isValid) {
        e.preventDefault(); // Prevent form submission if there are errors
    }
});