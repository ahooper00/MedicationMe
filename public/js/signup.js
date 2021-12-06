const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#firstname").value.trim();
  const lastName = document.querySelector("#lastname").value.trim();
  const gender = document.querySelector("#gender").value.trim();
  const dateOfBirth = document.querySelector("#dob").value.trim();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (firstName && lastName && gender && dob && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(
        "Please ensure all details are entered and password is 8 characters long."
      );
    }
  }
};

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
