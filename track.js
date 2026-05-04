import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs
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

window.track = async function () {
    const phoneInput = document.getElementById("phone").value.trim();
    const result = document.getElementById("result");

    result.innerHTML = "<p>Searching...</p>";

    if (!phoneInput) {
        result.innerHTML = "<p>Please enter your phone number.</p>";
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "bookings"));

        result.innerHTML = "";

        let found = false;

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();

            if (data.phone === phoneInput) {
                found = true;

                result.innerHTML += `
          <div class="card">
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p><strong>Status:</strong> ${data.status}</p>
          </div>
        `;
            }
        });

        if (!found) {
            result.innerHTML = "<p>No booking found for this number.</p>";
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        result.innerHTML = "<p>Error retrieving data.</p>";
    }
};