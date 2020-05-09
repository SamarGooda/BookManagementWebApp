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
    // var div = document.createElement('div');
    // div.id = 'card';
    // div.className = 'card';

    // let div = `<div class="event-item" ><img class="img-responsive" src=${books[i].image} >
    // <h5><a href=${books[i].title}>title</a></h5>
    // <h5><a href=${books[i].author.first_name}>name</a></h5></div>`
    // items.innerHTML += div

    let div = `<div class="col-sm-3">
        <div class="card">
        <div class="card-body"><img class="card-img-top" src=${books[i].image}  style="width:100%" ><br>
        <a href=localhost:5000/books/${books[i]._id}  class="btn " > ${books[i].title}</a><br>
        <a href=${books[i].author.first_name} class="btn " >${books[i].author.first_name} </a></div></div></div>`;
    items.innerHTML += div;
  }
}

getAllBooks();
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
console.info(
  "fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

// ${books[i].category}
// ${books[i].title}
