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
    getAllMedications();
  } else {
    alert("Failed to add schedule");
  }
};

async function getAllMedications() {
  const response = await fetch("/api/medication/");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    appendMedication(data);
    // clear the current table content
    // replace it with the data from the fetch
  } else {
    alert("Failed to add schedule");
  }
}

// Data style
// [
//   {
//     id: 1,
//     name: "Paracetamol",
//     dailySchedule: "2 times a day",
//     fromDate: "2021-11-29T00:00:00.000Z",
//     toDate: "2021-12-05T00:00:00.000Z",
//     dosage: "1 tablet",
//     comments: "Pain reliever and fever reducer, with food",
//   },
// ];

const appendMedication = (data) => {
  data.forEach(function (medlog) {
    console.log(medlog);

    let fromDate = medlog.fromDate; //2021-11-29T00:00:00.000Z
    let toDate = medlog.toDate; //2021-12-05T00:00:00.000Z

    console.log(fromDate, toDate);
  });
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

noBackground();
getAllMedications();
