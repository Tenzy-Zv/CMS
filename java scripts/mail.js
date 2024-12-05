const firebaseConfig = {
    apiKey: "AIzaSyBCMIo2BJy4DeDhKnja8j-DFpzDKerUTzk",
    authDomain: "canteen-management-syste-9353a.firebaseapp.com",
    databaseURL: "https://canteen-management-syste-9353a-default-rtdb.firebaseio.com",
    projectId: "canteen-management-syste-9353a",
    storageBucket: "canteen-management-syste-9353a.firebasestorage.app",
    messagingSenderId: "39822857450",
    appId: "1:39822857450:web:3c923546074ad80b4fb393",
    measurementId: "G-4G1R5NQBMD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the contact form in the database
var contactFormDB = firebase.database().ref('contactForm');

// Event listener for form submission
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form function
function submitForm(e) {
    e.preventDefault();

    // Get form values
    var emailInput = getElementVal('emailInput');
    var passwordInput = getElementVal('passwordInput');

    console.log(emailInput, passwordInput);

    // Save data to Firebase
    contactFormDB.push({
        email: emailInput,
        password: passwordInput
    }).then(() => {
        console.log("Data saved to Firebase");
    }).catch((error) => {
        console.error("Error saving data:", error);
    });
}

// Function to get values from the input fields
const getElementVal = (id) => {
    return document.getElementById(id).value;
};
