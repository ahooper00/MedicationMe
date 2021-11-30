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
    getAllMedications();
  } else {
    alert("Failed to add schedule");
  }
};

async function getAllMedications() {
  const response = await fetch("/api/profile");
  if (response.ok) {
    const data = await response.json();

    // clear the current table content
    // replace it with the data from the fetch
  } else {
    alert("Failed to add schedule");
  }
}

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
