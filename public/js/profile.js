const body = document.querySelector("body");

function noBackground() {
  body.style.background = "none";
}

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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/medication/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete medication");
    }
  }
};

document
  .querySelector(".new-schedule")
  .addEventListener("submit", newMedSchedule);

document
  .querySelector(".medication-list")
  .addEventListener("click", delButtonHandler);

noBackground();
