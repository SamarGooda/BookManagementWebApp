const adminEmailLabel = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutbtn");

const closeFormBtn = document.getElementById("x");
const submitFormBtn = document.getElementById("submitFormBtn");

let selectedTab = 0; //0 : categories, 1: books, 2: authors

const BASE_URL = "http://localhost:5000";

// --------------------------------------------------------------------

function onCreateNewBook() {}

function onCreateNewCategory() {}

// --------------------------------------------------------------------

function openCreateForm() {
  document.getElementById("light").style.display = "block";
  document.getElementById("fade").style.display = "block";
}

function closeCreateForm() {
  document.getElementById("light").style.display = "none";
  document.getElementById("fade").style.display = "none";
}

function onCreateFormSubmit(e) {
  e.preventDefault();

  closeCreateForm();

  console.log("selectedTab: ", selectedTab);

  switch (selectedTab) {
    case 0:
      onCreateNewCategory();
      break;
    case 1:
      onCreateNewBook();
      break;
    case 2:
      onCreateNewAuthor();
      break;
    default:
      break;
  }
}

// --------------------------------------------------------------------

// --------------------------------------------------------------------

function onLogoutBtnClicked(e) {
  document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.replace("/admin");
}

// --------------------------------------------------------------------

function showAdminData() {
  console.log("getting admin data");

  axios
    .get(BASE_URL + "/admin/data")
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let data = response.data;
      console.log("admin-data:", data);
      adminEmailLabel.textContent = data;
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

// --------------------------------------------------------------------
$(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
  switch (e.currentTarget.id) {
    case "books-tab":
      selectedTab = 1;
      getAllBooks();
      break;
    case "authors-tab":
      selectedTab = 2;
      getAllAuthors();
      break;
    case "categories-tab":
      selectedTab = 0;
      getAllCategories();
      break;
    default:
      break;
  }
});

logoutBtn.addEventListener("click", onLogoutBtnClicked);
closeFormBtn.addEventListener("click", closeCreateForm);
submitFormBtn.addEventListener("click", onCreateFormSubmit);

// --------------------------------------------------------------------

showAdminData();
