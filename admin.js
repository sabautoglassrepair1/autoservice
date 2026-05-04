if (localStorage.getItem("admin") !== "true") {
    window.location.href = "login.html";
}
if (localStorage.getItem("admin") !== "true") {
    window.location.href = "login.html";
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDoEHyO9UMSPT6vDlozrugTJ8hgTJrArM8",
    authDomain: "autoservicesystem-8dfc9.firebaseapp.com",
    projectId: "autoservicesystem-8dfc9",
    storageBucket: "autoservicesystem-8dfc9.firebasestorage.app",
    messagingSenderId: "19147826813",
    appId: "1:19147826813:web:df3844b3f91b5bc3407314",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBookings() {
    const container = document.getElementById("bookings");
    container.innerHTML = "<p>Loading bookings...</p>";

    try {
        const querySnapshot = await getDocs(collection(db, "bookings"));

        container.innerHTML = "";

        if (querySnapshot.empty) {
            container.innerHTML = "<p>No bookings found.</p>";
            return;
        }

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <p><strong>Status:</strong> ${data.status}</p>

        <button onclick="updateStatus('${id}')">Mark Completed</button>
        <button onclick="deleteBooking('${id}')">Delete</button>
      `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading bookings:", error);
        container.innerHTML = "<p>Error loading bookings.</p>";
    }
}

window.updateStatus = async function (id) {
    try {
        await updateDoc(doc(db, "bookings", id), {
            status: "Completed"
        });

        alert("Status updated!");
        loadBookings();

    } catch (error) {
        console.error("Error updating status:", error);
        alert("Error updating status");
    }
};

window.deleteBooking = async function (id) {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
        await deleteDoc(doc(db, "bookings", id));

        alert("Booking deleted!");
        loadBookings();

    } catch (error) {
        console.error("Error deleting booking:", error);
        alert("Error deleting booking");
    }
};

loadBookings();