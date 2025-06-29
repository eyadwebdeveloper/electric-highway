setTimeout(() => {
    document.getElementById('loading').classList.add('hide');
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 300);
}, 2500);


function showToast(type, subText) {
    // Select the toast element based on the type
    const toast = document.querySelector(`.toast.${type}`);

    if (toast) {
        // Update the sub-text
        const subTextElement = toast.querySelector('.sub-text');
        if (subTextElement) {
            subTextElement.innerText = subText;
        }

        // Show the toast with animation
        toast.classList.add('show');

        // Automatically hide the toast after a certain time
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300); // Wait for the animation to finish before removing
        }, 5000); // Show for 5 seconds
    } else {
        console.error(`Toast of type "${type}" not found.`);
    }
}



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUULg4kvVlIU5waW-li1wBY3-A-gDTT5s",
    authDomain: "teng-1232.firebaseapp.com",
    projectId: "teng-1232",
    storageBucket: "teng-1232.firebasestorage.app",
    messagingSenderId: "616458579681",
    appId: "1:616458579681:web:1dfba097bc939d08c8d1a0",
    measurementId: "G-THPN13PQZM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value;

    // Basic validation to check if the email field is empty
    if (!email) {
        showToast('warning', 'Please enter your email address.');
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            showToast('success', 'A password reset email has been sent. Please check your inbox.');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            // Mapping error codes to user-friendly messages
            const errorMessages = {
                'auth/invalid-email': 'The email address is not valid.',
                'auth/missing-email': 'Please enter your email address.',
                'auth/network-request-failed': 'Network error. Please check your connection.',
                // Add more error codes and messages as needed
            };

            // Alert the user with the corresponding error message
            const userFriendlyMessage = errorMessages[errorCode] || 'An unknown error occurred. Please try again.';
            alert(userFriendlyMessage);
            showToast('error', userFriendlyMessage);

        });
});