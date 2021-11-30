const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value.trim();

  console.log(email);
  console.log(password);
  
  if (email && password) {
    //post to API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
      console.log(await response.json())
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
