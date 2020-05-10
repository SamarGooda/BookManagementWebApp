const addAuthorBtn = document.getElementById("add_author_btn");
const refreshAuthorsBtn = document.getElementById("refresh_authors_btn");
const authorsTable = document.getElementById("authorstable");
const bookstable = document.getElementById("bookstable");
const adminEmailLabel = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutbtn");
const closeFormBtn = document.getElementById("x");
const submitFormBtn = document.getElementById("submitFormBtn");

const BASE_URL = "http://localhost:5000";

let selectedTab = 0; //0 : categories, 1: books, 2: authors

// --------------------------------------------------------------------

function onCreateNewAuthor() {
  var formData = new FormData();
  formData.append("image", document.getElementById("i").files[0]);
  formData.append("f", document.getElementById("fname").value);
  formData.append("l", document.getElementById("lname").value);
  formData.append("dob", document.getElementById("dob").value);

  axios
    .post(BASE_URL + "/authors", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      getAllAuthors();
    })
    .catch(function (error) {
      console.log("error:", error);
      alert("Could not create Author!");
    });

  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("i").value = "";
}

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

function onRefreshAuthorsBtnClicked(e) {
  getAllAuthors();
}

function onAddAuthorBtnClicked(e) {
  console.log("id", this.id);
  let html = "";
  html += `<div class="form-group">
          <label for="fname">First Name</label>
          <input type="text" class="form-control" name="f", id="fname" placeholder="John">
          </div>`;
  html += `<div class="form-group">
          <label for="lname">Last Name</label>
          <input type="text" class="form-control" name="l", id="lname" placeholder="Smith">
          </div>`;
  html += `<div class="form-group">
          <label for="dob">Date of birth</label>
          <input type="text" class="form-control" name="dob", id="dob" placeholder="1990-01-01">
          </div>`;
  html += `<div class="form-group">
          <label for="i">Select image</label>
          <input type="file" accept="image/*" class="form-control" name="image", id="i">
          </div>`;

  document.getElementById("form_inputs").innerHTML = html;

  openCreateForm();

  console.log($(".nav-tabs .active").id);
}

function onAuthorDeleteBtnClicked(e) {
  console.log("this.id: ", this.id);

  let author_id = this.id.replace("btn_delete_", "");
  console.log("author_id: ", author_id);
  axios
    .delete(BASE_URL + "/authors/" + author_id)
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      if (response.status == 200) {
        getAllAuthors();
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function onRefreshBooksBtnClicked(e) {
  getAllAuthors();
}

function onAddBookBtnClicked(e) {
  console.log("id", this.id);
  let html = "";
  html += `<div class="form-group">
          <label for="fname">First Name</label>
          <input type="text" class="form-control" name="f", id="fname" placeholder="John">
          </div>`;
  html += `<div class="form-group">
          <label for="lname">Last Name</label>
          <input type="text" class="form-control" name="l", id="lname" placeholder="Smith">
          </div>`;
  html += `<div class="form-group">
          <label for="dob">Date of birth</label>
          <input type="text" class="form-control" name="dob", id="dob" placeholder="1990-01-01">
          </div>`;
  html += `<div class="form-group">
          <label for="i">Select image</label>
          <input type="file" accept="image/*" class="form-control" name="image", id="i">
          </div>`;

  document.getElementById("form_inputs").innerHTML = html;

  openCreateForm();

  console.log($(".nav-tabs .active").id);
}

function onBookDeleteBtnClicked(e) {
  console.log("this.id: ", this.id);

  let book_id = this.id.replace("btn_delete_", "");
  console.log("book_id: ", book_id);
  axios
    .delete(BASE_URL + "/books/data/" + book_id)
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      if (response.status == 200) {
        getAllBooks();
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

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

function getFormattedDate(dateStr) {
  const d = new Date(dateStr);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
}

// --------------------------------------------------------------------
onBookDeleteBtnClicked;
function showAuthors(authors) {
  let html = "";
  for (i = 0; i < authors.length; i++) {
    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${authors[i].first_name}</td>
    <td>${authors[i].last_name}</td>
    <td>${getFormattedDate(authors[i].date_of_birth)}</td>
    <td><a href="${authors[i].image}" target="_blank">show image</a></td>
    <td><button class="btn btn-danger" id="btn_delete_${
      authors[i]._id
    }"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  authorsTable.innerHTML = html;

  for (i = 0; i < authors.length; i++) {
    document
      .getElementById(`btn_delete_${authors[i]._id}`)
      .addEventListener("click", onAuthorDeleteBtnClicked);
  }
}

function showBooks(books) {
  let html = "";
  for (i = 0; i < books.length; i++) {
    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${books[i].title}</td>
    <td>${books[i].author.first_name + " " + books[i].author.last_name}</td>
    <td>${books[i].category}</td>
    <td><a href="${books[i].image}" target="_blank">show image</a></td>
    <td><button class="btn btn-danger" id="btn_delete_${
      books[i]._id
    }"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  bookstable.innerHTML = html;

  for (i = 0; i < authors.length; i++) {
    document
      .getElementById(`btn_delete_${books[i]._id}`)
      .addEventListener("click", onBookDeleteBtnClicked);
  }
}

function showCategories() {}

// --------------------------------------------------------------------

function getAllAuthors() {
  axios
    .get(BASE_URL + "/authors")
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let authors = response.data;
      console.log("authors:", authors);
      showAuthors(authors);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function getAllCategories() {}

function getAllBooks() {
  axios
    .get(BASE_URL + "/books/data")
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let books = response.data;
      console.log("books:", books);
      showBooks(books);
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

addAuthorBtn.addEventListener("click", onAddAuthorBtnClicked);
refreshAuthorsBtn.addEventListener("click", onRefreshAuthorsBtnClicked);
logoutBtn.addEventListener("click", onLogoutBtnClicked);
closeFormBtn.addEventListener("click", closeCreateForm);
submitFormBtn.addEventListener("click", onCreateFormSubmit);

// --------------------------------------------------------------------

showAdminData();
