console.log("app.js is running ✔");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

const form = document.getElementById("bookingForm");
const serviceSelect = document.getElementById("service");
const priceDisplay = document.getElementById("price");

function enableNotification() {
    if ("Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}
enableNotification();

function showBrowserNotification(booking) {
    if (Notification.permission === "granted") {
        new Notification("New Booking 🚗", {
            body: `${booking.name} booked ${booking.service}`,
        });
    }
}
serviceSelect.addEventListener("change", function () {
    if (!this.value) {
        priceDisplay.innerText = "";
        return;
    }

    let price = getPrice(this.value);
    priceDisplay.innerText = "Estimated Price: ₦" + price;

    if (this.value === "Crack Repair") {
        alert("If the crack is large, full windscreen replacement is recommended.");
    }
});

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let booking = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        service: serviceSelect.value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        status: "Pending"
    };

    try {
        await addDoc(collection(db, "bookings"), booking);

        let message = `🚗 New Booking Request
Name: ${booking.name}
Phone: ${booking.phone}
Service: ${booking.service}
Date: ${booking.date}
Time: ${booking.time}`;

        window.open(
            "https://wa.me/2348126724711?text=" + encodeURIComponent(message),
            "_blank"
        );

        showBrowserNotification(booking);

        alert("Booking submitted successfully!");

        form.reset();
        priceDisplay.innerText = "";

    } catch (error) {
        console.error("Firebase error:", error);
        alert("Error saving booking");
    }
});
