const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        //post to API endpoint
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email,password}),
            headers: {'Content-Type':'application'},
        }),
    }

    if (response.ok) {
        document.location.replace('/profile');
    } else {
        alert(response.statusText);
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#name").value.trim();
    const gender = document.querySelector("#gender");
    const dob = document.querySelector("#dob");
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
  
    if (name && gender && dob && email && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, gender, dob, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector(".signup-form")
    .addEventListener("submit", signupFormHandler);

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);