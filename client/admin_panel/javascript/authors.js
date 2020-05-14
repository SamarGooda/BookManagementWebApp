const addAuthorBtn = document.getElementById("add_author_btn");
const refreshAuthorsBtn = document.getElementById("refresh_authors_btn");

const authorsTable = document.getElementById("authorstable");

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
          <input type="text" class="form-control" name="f", id="fname" placeholder="First Name">
          </div>`;
  html += `<div class="form-group">
          <input type="text" class="form-control" name="l", id="lname" placeholder="Last Name">
          </div>`;
  html += `<div class="form-group">
          <input type="text" class="form-control" name="dob", id="dob" placeholder="Birth Date (example: 1990-01-01)">
          </div>`;

  html += `<div class="custom-file">
          <label>Select image</label>
          <input type="file" class="custom-file-input" accept="image/*" name="image", id="i">
          <label class="custom-file-label" for="i">Choose image</label>
          </div>`;

  document.getElementById("form_inputs").innerHTML = html;

  $(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  openCreateForm();

  console.log($(".nav-tabs .active").id);
}

function onAuthorDeleteBtnClicked(e) {
  console.log("this.id: ", this.id);

  let author_id = this.id.replace("btn_delete_", "");
  console.log("author_id: ", author_id);
  axios
    .delete(BASE_URL + "/authors/data" + author_id)
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
    .get(BASE_URL + "/authors/data")
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
  let imageInput = document.getElementById("i");
  let fnamenput = document.getElementById("fname");
  let lnameInput = document.getElementById("lname");
  let dobInput = document.getElementById("dob");

  if (!fnamenput.value) {
    alert("Please enter author first name!");
    return;
  }
  if (!lnameInput.value) {
    alert("Please enter author last name!");
    return;
  }
  if (!dobInput.value) {
    alert("Please enter author first date of birth!");
    return;
  }
  if (!imageInput.files[0]) {
    alert("Please select author image!");
    return;
  }

  var formData = new FormData();
  formData.append("image", imageInput.files[0]);
  formData.append("f", fnamenput.value);
  formData.append("l", lnameInput.value);
  formData.append("dob", dobInput.value);

  axios
    .post(BASE_URL + "/authors/data", formData, {
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
