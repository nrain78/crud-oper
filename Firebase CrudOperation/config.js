// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd5L9J-50EYPWhO1APab-wsyAyBUuZDM8",
  authDomain: "crudoper-e4b78.firebaseapp.com",
  databaseURL: "https://crudoper-e4b78-default-rtdb.firebaseio.com",
  projectId: "crudoper-e4b78",
  storageBucket: "crudoper-e4b78.firebasestorage.app",
  messagingSenderId: "687242443612",
  appId: "1:687242443612:web:c5b3ac60c4ffb977665f99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let firstName, lastName, rollNum;

function readForm() {
  firstName = document.getElementById("firstName").value.trim();
  lastName = document.getElementById("lastName").value.trim();
  rollNum = document.getElementById("rollNum").value.trim();
  console.log(firstName, lastName, rollNum);
}

document.addEventListener("DOMContentLoaded", function () {
  // Create
  document.getElementById("create").onclick = function () {
    readForm();

    if (!firstName || !lastName || !rollNum) {
      alert("Please fill out all fields.");
      return;
    }

    set(ref(database, "Users/" + rollNum), {
      firstName: firstName,
      lastName: lastName,
      rollNum: rollNum,
    })
      .then(() => {
        alert("Data Created!");
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("rollNum").value = "";
      })
      .catch((error) => {
        console.error("Error creating data: ", error);
        alert("Failed to create data. Please try again.");
      });
  };

  // Update
  document.getElementById("update").onclick = function () {
    readForm();

    if (!rollNum) {
      alert("Please provide a Roll Number to update.");
      return;
    }

    update(ref(database, "Users/" + rollNum), {
      firstName: firstName,
      lastName: lastName,
    })
      .then(() => {
        alert("Data Updated!");
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("rollNum").value = "";
      })
      .catch((error) => {
        console.error("Error updating data: ", error);
        alert("Failed to update data. Please try again.");
      });
  };
  // Delete
  // Delete
document.getElementById("delete").onclick = function () {
    readForm();
  
    if (!rollNum) {
      alert("Please provide a Roll Number to delete.");
      return;
    }
  
    const userRef = ref(database, "Users/" + rollNum); // Correct reference for deletion
    remove(userRef) // Pass the userRef to remove()
      .then(() => {
        alert("Data Deleted!");
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("rollNum").value = "";
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
        alert("Failed to delete data. Please try again.");
      });
  };
  
  // Read
  document.getElementById("read").onclick = function () {
    readForm();

    if (!rollNum) {
      alert("Please provide a Roll Number to read.");
      return;
    }

    const userRef = ref(database, "Users/" + rollNum);
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          document.getElementById("firstName").value = data.firstName;
          document.getElementById("lastName").value = data.lastName;
          document.getElementById("rollNum").value = data.rollNum;
          alert("Data Read Successfully!");
        } else {
          alert("No data found for the given Roll Number.");
        }
      },
      (error) => {
        console.error("Error reading data: ", error);
        alert("Failed to read data. Please try again.");
      }
    );
  };
});
