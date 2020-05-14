const emailAddressInput = document.getElementById("email_address");
const passwordInput = document.getElementById("password");
const rememberMeInput = document.getElementById("remember");
const loginBtn = document.getElementById("login");

const BASE_URL = "http://localhost:5000";

function onLoginBtnClick(e) {
  e.preventDefault();

  let email = emailAddressInput.value;
  let password = passwordInput.value;

  if (!email || !password) {
    alert("Please enter email and password!");
    return;
  }

  axios
    .post(BASE_URL + "/admin/login", { email, password })
    .then(function (response) {
      if (response.status == 201) {
        window.location.replace("/admin");
      }
    })
    .catch(function (error) {
      if (error.response.status == 401) {
        passwordInput.value = "";
        alert("Invalid credentials!");
      }
    });
}

loginBtn.addEventListener("click", onLoginBtnClick);
