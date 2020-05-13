const addAuthorBtn = document.getElementById("add_author_btn");
const refreshAuthorsBtn = document.getElementById("refresh_authors_btn");

const authorsTable = document.getElementById("authorstable");

// const BASE_URL = "http://localhost:5000";

// --------------------------------------------------------------------

function getFormattedDate(dateStr) {
  const d = new Date(dateStr);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
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

// --------------------------------------------------------------------

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

// --------------------------------------------------------------------

addAuthorBtn.addEventListener("click", onAddAuthorBtnClicked);
refreshAuthorsBtn.addEventListener("click", onRefreshAuthorsBtnClicked);
