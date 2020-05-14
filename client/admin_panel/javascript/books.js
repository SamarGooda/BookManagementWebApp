const addBookBtn = document.getElementById("add_book_btn");
const refreshBooksBtn = document.getElementById("refresh_books_btn");
const bookstable = document.getElementById("bookstable");

// --------------------------------------------------------------------

function onRefreshBooksBtnClicked(e) {
  getAllBooks();
}

function onAddBookBtnClicked(e) {
  console.log("id", this.id);
  let html = "";
  html += `<div class="form-group">
          <input type="text" class="form-control" name="title", id="title" placeholder="Book Title">
          </div>`;

  html += `<select class="custom-select" id="categoriesSelection">
          <option id="defCategory" selected>Select Category</option>
          </select><br/>`;

  html += `<select class="custom-select" id="authorsSelection">
          <option selected id="defAuthor">Select Author</option>
          </select>`;

  html += `<div class="custom-file" style="margin-top: 10px;">
          <input type="file" class="custom-file-input" accept="image/*" name="image", id="image">
          <label class="custom-file-label" for="image">Choose file</label>
          </div>`;

  document.getElementById("form_inputs").innerHTML = html;

  $(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
  });

  axios
    .get(BASE_URL + "/categories/data")
    .then(function (response) {
      console.log("response:", response);
      let select = document.getElementById("categoriesSelection");
      console.log("select", select);

      for (i = 0; i < response.data.length; i++) {
        var opt = document.createElement("option");
        opt.id = response.data[i]._id;
        opt.innerHTML = response.data[i].name;
        select.appendChild(opt);
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });

  axios
    .get(BASE_URL + "/authors/data")
    .then(function (response) {
      console.log("response:", response);
      let select = document.getElementById("authorsSelection");
      console.log("select", select);

      for (i = 0; i < response.data.length; i++) {
        var opt = document.createElement("option");
        opt.id = response.data[i]._id;
        opt.innerHTML =
          response.data[i].first_name + " " + response.data[i].last_name;
        select.appendChild(opt);
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });

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

function showBooks(books) {
  let html = "";
  for (i = 0; i < books.length; i++) {
    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${books[i].title}</td>
    <td>${books[i].author.first_name + " " + books[i].author.last_name}</td>
    <td>${books[i].category.name}</td>
    <td><a href="${books[i].image}" target="_blank">show image</a></td>
    <td><button class="btn btn-danger" id="btn_delete_${
      books[i]._id
    }"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  bookstable.innerHTML = html;

  for (i = 0; i < books.length; i++) {
    document
      .getElementById(`btn_delete_${books[i]._id}`)
      .addEventListener("click", onBookDeleteBtnClicked);
  }
}

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

function onCreateNewBook() {
  let categorySelect = document.getElementById("categoriesSelection");
  let authorsSelect = document.getElementById("authorsSelection");

  let bookTitle = document.getElementById("title").value;
  let selectedCategory =
    categorySelect.options[categorySelect.options.selectedIndex].id;
  let selectedAuthor =
    authorsSelect.options[authorsSelect.options.selectedIndex].id;
  let bookImage = document.getElementById("image").files[0];

  console.log(":selectedCategory: ", selectedCategory);
  console.log("selectedAuthor: ", selectedAuthor);

  if (!bookTitle) {
    alert("please select book title");
    return;
  }

  if (selectedCategory === "defCategory") {
    alert("please select book Category");
    return;
  }

  if (selectedAuthor === "defAuthor") {
    alert("please select book Author");
    return;
  }

  if (!bookImage) {
    alert("Please select book image!");
    return;
  }

  var formData = new FormData();
  formData.append("image", bookImage);
  formData.append("title", bookTitle);
  formData.append("author", selectedAuthor);
  formData.append("category", selectedCategory);

  axios
    .post(BASE_URL + "/books/data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      getAllBooks();
    })
    .catch(function (error) {
      console.log("error:", error);
      alert("Could not create Book!");
    });

  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("i").value = "";
}

addBookBtn.addEventListener("click", onAddBookBtnClicked);
refreshBooksBtn.addEventListener("click", onRefreshBooksBtnClicked);
