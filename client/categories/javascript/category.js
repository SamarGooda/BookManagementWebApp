const booksContainer = document.getElementById("booksContainer");
const categoryTitle = document.getElementById("categoryTitle");

const BASE_URL = "http://localhost:5000";

const categoryId = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1
);

function getCategoryData() {
  axios
    .get(BASE_URL + "/categories/data/" + categoryId)
    .then(function (response) {
      let category = response.data;
      showCategoryData(category);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showCategoryData(category) {
  categoryTitle.innerHTML = "Categories / " + category.name;
}

function getCategoryBooks() {
  axios
    .get(BASE_URL + "/categories/data/" + categoryId + "/books")
    .then(function (response) {
      let books = response.data;
      showCategoryBooks(books);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showCategoryBooks(books) {
  let html = "";
  books.forEach((book) => {
    html += `<div class="card">
                <img src="${book.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="/books/${book._id}" target="_blank">
                       ${book.title}
                    </a>
                  </h5>
                </div>
              </div>`;
  });
  booksContainer.innerHTML = html;
}

getCategoryData();
getCategoryBooks();
