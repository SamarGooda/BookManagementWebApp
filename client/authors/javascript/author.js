const booksContainer = document.getElementById("booksContainer");

const BASE_URL = "http://localhost:5000";

const authorId = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1
);

function getAuthorData() {
  axios
    .get(BASE_URL + "/authors/data/" + authorId)
    .then(function (response) {
      let author = response.data;
      showAuthorData(author);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function getFormattedDate(dateStr) {
  const d = new Date(dateStr);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  return `${da}-${mo}-${ye}`;
}

function showAuthorData(author) {
  document.getElementById("authorImg").src = author.image;
  document.getElementById("authorTitle").innerText =
    author.first_name + " " + author.last_name;
  document.getElementById("authorBirthDay").innerHTML =
    `<span class="label">Date of birth:</span>   ` +
    getFormattedDate(author.date_of_birth);
}

function getAuthorBooks() {
  axios
    .get(BASE_URL + "/authors/data/" + authorId + "/books")
    .then(function (response) {
      let books = response.data;
      showAuthorBooks(books);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showAuthorBooks(books) {
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

getAuthorData();
getAuthorBooks();
