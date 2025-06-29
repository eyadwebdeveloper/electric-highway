
setTimeout(() => {
  document.getElementById('loading').classList.add('hide');
  setTimeout(() => {
      document.getElementById('loading').style.display = 'none';
  }, 300);
}, 2500);


const showPasswordCheckbox = document.getElementById('cbx');
const passwordInput = document.getElementById('password'); // Get the password input direc
showPasswordCheckbox.addEventListener('change', () => {
    // Toggle the type of the password input based on the checkbox state
    passwordInput.type = showPasswordCheckbox.checked ? 'text' : 'password';
});

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
  import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";


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
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
              displayName: name
            }).then(() => {
              console.log('Profile updated successfully');
              window.location.href = './Dashboard.html';
            }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.error(errorCode);
              console.error(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode);
          console.error(errorMessage);
          showToast('error', errorMessage);

        });
  });

  const provider = new GoogleAuthProvider();
const googleButton = document.getElementById('google');
googleButton.addEventListener('click', () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    window.location.href = './dashboard.html';
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})