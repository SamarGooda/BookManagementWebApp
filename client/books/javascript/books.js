const eventItem = document.getElementById("items");

const BASE_URL = "http://localhost:5000";

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
      if (error.response) {
        if (error.response.status == 404) {
          console.log("error:", 404);
          window.location.replace("/errors/404");
        } else {
          console.log("error:", error);
        }
      }
    });
}
function showBooks(books) {
  eventItem.innerHTML = "";

  for (i = 0; i < books.length; i++) {
    let div = `<div class="col-sm-3">
        <div class="card">
        <div class="card-body"><img class="card-img-top" src=${
          books[i].image
        }  style="width:100%" ><br>
        <a href="${BASE_URL}/books/${books[i]._id}"> ${books[i].title}</a><br>
        <a href="${BASE_URL}/authors/${books[i].author._id}">${
      books[i].author.first_name + " " + books[i].author.last_name
    } </a></div></div></div>`;
    items.innerHTML += div;
  }
}

getAllBooks();
