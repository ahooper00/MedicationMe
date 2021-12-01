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
    // getAllMedications();
    document.location.replace("/profile");
  } else {
    alert("Failed to add schedule");
  }
};

// async function getAllMedications() {
//   const response = await fetch("/api/medication/");
//   if (response.ok) {
//     const data = await response.json();
//     console.log(data);
//     document.location.replace("/profile");
//     // clear the current table content
//     // replace it with the data from the fetch
//   } else {
//     alert("Failed to add schedule");
//   }
// };

document
  .querySelector(".new-schedule")
  .addEventListener("submit", newMedSchedule);

noBackground();
