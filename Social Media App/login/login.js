let isLoginPage = true;

const switchButton = document.getElementById("switchButton");
const loginButton = document.getElementById("loginButton");

const emailField = document.getElementById("userInput");
const passwordField = document.getElementById("passwordInput");
const error = document.querySelector("#error");

switchButton.addEventListener("click", function () {
  const headerTitleElement = document.getElementById("headerTitle");
  const forgotPasswordButton = document.getElementById("forgotPassword");

  if (isLoginPage) {
    // switch to create account page

    headerTitleElement.innerHTML = "Create new account";
    forgotPasswordButton.style.display = "none";
    loginButton.value = "Sign up";
    this.value = "Switch to login page";
  } else {
    // switch to login page

    headerTitleElement.innerHTML = "Login";
    forgotPasswordButton.style.display = "inline";
    loginButton.value = "Login";
    this.value = "Switch to create account page";
  }

  isLoginPage = !isLoginPage;
});

const validatePassword = (value) => {
  return value === "pistol";
};

const validateEmail = (value, regex) => {
  return !!value.match(regex); // !! forteaza o valoare sa fie booleana
};

loginButton.addEventListener("click", async function (event) {
  event.preventDefault();

  const emailValue = emailField.value;
  const passwordValue = passwordField.value;
  const regexEmailPattern = /\D{4,}\@\D{4,}\.\D{2,}/g;

  if (emailValue === "" || passwordValue === "") {
    error.style.display = "block";
    error.innerHTML = "All fields are required and must have a value";
    error.style.color = "red";
  } else {
    if (
      validatePassword(passwordValue) &&
      validateEmail(emailValue, regexEmailPattern)
    ) {
      error.style.display = "none";

      try {
      if (isLoginPage) {
       const data = await login(emailValue, passwordValue);
       window.open('../index.html', '_self');
       console.log(data);
      } else {       
       const data = await createAccount(emailValue, passwordValue);
       if(data.error){
        error.style.display = "block";
        error.style.color = "red";
        console.log(error);
        error.innerHTML = data.error;
       }       
      }
    } catch (error) {
        error.style.display = "block";
        error.style.color = "red";
        console.log(error);
        error.innerHTML = error.error;
    }
      clearLoginInputs();
    } else {
      alert("Try again");
      error.style.display = "block";
      error.style.color = "red";
      error.innerHTML = "Incorrect email or password";
      clearLoginInputs();
    }
  }
});

function clearLoginInputs() {
  emailField.value = "";
  passwordField.value = "";
}

async function login(email, password) {
    const loginUrl = "https://reqres.in/api/login";
    let loginData = {
      email: email,
      password: password,
    };

    const loginConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    };
    const response = await fetch(loginUrl, loginConfig);
    return response.json();
}

async function createAccount(email, password) {
    const createAccountUrl = "https://reqres.in/api/register";
    let registerData = {
        email: email,
        password: password
    }

    const createAccountConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(registerData),
    };
  const response = await fetch(createAccountUrl, createAccountConfig);
  return response.json();
}