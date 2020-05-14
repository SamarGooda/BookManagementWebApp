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
          <label for="title">Title</label>
          <input type="text" class="form-control" name="title", id="title" placeholder="The great book">
          </div>`;
  html += `<div class="form-group">
          <label for="i">Select image</label>
          <input type="file" accept="image/*" class="form-control" name="image", id="image">
          </div>`;

  // <select id="cars" name="cars">
  //   <option value="volvo">Volvo</option>
  //   <option value="saab">Saab</option>
  //   <option value="fiat">Fiat</option>
  //   <option value="audi">Audi</option>
  // </select>;
  html += `<select id="cars" name="cars">
</select>`;

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

addBookBtn.addEventListener("click", onAddBookBtnClicked);
refreshBooksBtn.addEventListener("click", onRefreshBooksBtnClicked);
