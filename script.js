/* =========================================================
   PART 1: MOBILE NAVIGATION TOGGLE
   When the hamburger button is clicked, we add/remove a class
   called "open" on the nav links list. The CSS file already
   has a rule (.nav-links.open) that shows the menu when that
   class is present.
========================================================= */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}

/* =========================================================
   PART 3: CONTACT FORM VALIDATION (contact page only)
   Checks each field when the form is submitted. If something
   is wrong, we show an error message under that field and stop
   the form from submitting. If everything is fine, we show a
   success message instead (no real server is connected, so
   this simulates a submission).
========================================================= */
const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const statusBox = document.getElementById("form-status");

  // A simple pattern to check for something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showError(inputId, message) {
    const errorEl = document.getElementById(inputId + "-error");
    errorEl.textContent = message;
  }

  function clearErrors() {
    showError("name", "");
    showError("email", "");
    showError("subject", "");
    showError("message", "");
    statusBox.textContent = "";
    statusBox.className = "form-status";
  }

  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    clearErrors();

    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError("name", "Please enter your name.");
      isValid = false;
    }

    if (emailInput.value.trim() === "") {
      showError("email", "Please enter your email address.");
      isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
      showError("email", "Please enter a valid email address.");
      isValid = false;
    }

    if (subjectInput.value.trim() === "") {
      showError("subject", "Please enter a subject.");
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      showError("message", "Please enter a message.");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      showError("message", "Message should be at least 10 characters.");
      isValid = false;
    }

    if (isValid) {
    emailjs.send(
    "service_f0be7xh",
    "template_iaqqwgk",
    {
      from_name: nameInput.value,
      from_email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value
    }
  )
  .then(function () {
    statusBox.textContent =
      "Thanks! Your enquiry has been sent successfully.";
    statusBox.className = "form-status success";
    enquiryForm.reset();
  })
  .catch(function () {
    statusBox.textContent =
      "Failed to send the enquiry. Please try again.";
    statusBox.className = "form-status error";
  });

} else {
      statusBox.textContent = "Please fix the errors above and try again.";
      statusBox.className = "form-status error";
    }
  });
}
