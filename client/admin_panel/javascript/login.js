const emailAddressInput = document.getElementById("email_address");
const passwordInput = document.getElementById("password");
const rememberMeInput = document.getElementById("remember");
const loginBtn = document.getElementById("login");

const BASE_URL = "http://localhost:5000";

function onLoginBtnClick() {
  let email = emailAddressInput.value;
  let password = passwordInput.value;

  axios.post(BASE_URL + "/admin/login", { email, password }).then((res) => {
    console.log("response: ", res);
  });
}

loginBtn.addEventListener("click", onLoginBtnClick);
