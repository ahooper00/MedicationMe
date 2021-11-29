const newMedSchedule = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#medname");
  const time = document.querySelector("#time");
  const fromDate = document.querySelector("#fromDate");
  const toDate = document.querySelector("#toDate");
  const dosage = document.querySelector("#dosage");
  const comments = document.querySelector("#instructions");

  const response = await fetch("/api/medication", {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
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
    document.location.replace("/");
  } else {
    alert("Failed to add schedule");
  }
};

const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout").addEventListener("click", logout);

document
  .querySelector(".new-schedule")
  .addEventListener("submit", newMedSchedule);
