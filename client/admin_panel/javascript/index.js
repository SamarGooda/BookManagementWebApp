const addAuthorBtn = document.getElementById("add_author_btn");
const refreshAuthorsBtn = document.getElementById("refresh_authors_btn");
const authorsTable = document.getElementById("authorstable");
const adminEmailLabel = document.getElementById("adminEmail");
const logoutBtn = document.getElementById("logoutbtn");

const BASE_URL = "http://localhost:5000";

// --------------------------------------------------------------------

function onRefreshAuthorsBtnClicked(e) {
  getAllAuthors();
}

function onAddAuthorBtnClicked(e) {
  console.log("id", e.target.id);
}

function onAuthorDeleteBtnClicked(e) {
  let author_id = e.target.id.replace("btn_delete_", "");
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
function showAuthors(authors) {
  let html = "";
  for (i = 0; i < authors.length; i++) {
    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${authors[i].first_name}</td>
    <td>${authors[i].last_name}</td>
    <td>${authors[i].date_of_birth}</td>
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
// --------------------------------------------------------------------

function getAllBooks() {}
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

// --------------------------------------------------------------------
$(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
  switch (e.currentTarget.id) {
    case "books-tab":
      getAllBooks();
      break;
    case "authors-tab":
      getAllAuthors();
      break;
    case "categories-tab":
      getAllCategories();
      break;
    default:
      break;
  }
});

addAuthorBtn.addEventListener("click", onAddAuthorBtnClicked);
refreshAuthorsBtn.addEventListener("click", onRefreshAuthorsBtnClicked);
logoutBtn.addEventListener("click", onLogoutBtnClicked);

// --------------------------------------------------------------------

showAdminData();
