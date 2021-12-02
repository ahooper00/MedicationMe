const body = document.querySelector("body");
const db = require("./db");
const PORT = process.env.PORT || 3001;

function noBackground() {
  body.style.background = "none";
}

const getMedSchedule = async () => {
  const response = await fetch("/api/profile/");
  console.log(response);
};

const newMedSchedule = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#medname").value.trim();
  const dailySchedule = document.querySelector("#time").value.trim();
  const fromDate = document.querySelector("#fromDate").value.trim();
  const toDate = document.querySelector("#toDate").value.trim();
  const dosage = document.querySelector("#dosage").value.trim();
  const comments = document.querySelector("#instructions").value.trim();

  const response = await fetch("/api/medication", {
    method: "POST",
    body: JSON.stringify({
      name,
      dailySchedule,
      fromDate,
      toDate,
      dosage,
      comments,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert("Failed to add schedule");
  }
};


document
  .querySelector(".new-schedule")
  .addEventListener("submit", newMedSchedule);

noBackground();

