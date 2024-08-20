// Import the functions you need from the SDKs you need
/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";*/

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3SFXHb2_wcdWKTlOKzcIGEQHyHlT_rVE",
  authDomain: "stadium-project-e5e1a.firebaseapp.com",
  databaseURL: "https://stadium-project-e5e1a-default-rtdb.firebaseio.com",
  projectId: "stadium-project-e5e1a",
  storageBucket: "stadium-project-e5e1a.appspot.com",
  messagingSenderId: "899161626359",
  appId: "1:899161626359:web:6454ddac1109ae678965f2"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);

// reference your database
var contactFormDB = firebase.database().ref("signup");

document.getElementById("createAccount").addEventListener("createAcount", submitForm);

function submitForm(e) {
  e.preventDefault();

  var firstName = getElementVal("name");
  var lastName = getElementVal("lastName");
  var identifier = getElementVal("identifier");
  var password = getElementVal("password");
  var role = getElementVal("role");


  saveMessages(name, lastName, identifier, password, role);

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("contactForm").reset();
}

const saveMessages = (name, lastName, identifier, password, role) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    name: name,
    lastName: lastName,
    identifier: identifier,
    password: password,
    role: role,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  // Add your login logic here

  if (role === 'admin') {
    document.getElementById('adminLink').style.display = 'block';
    showPage('local-list-page');
  } else {
    window.location.href = 'stadium.html';
  }
});

