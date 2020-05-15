const cardContainer = document.getElementById("cardContainer");

const BASE_URL = "http://localhost:5000";

function getAllAuthors() {
  axios
    .get(BASE_URL + "/authors/data")
    .then(function (response) {
      let authors = response.data;
      showAuthors(authors);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showAuthors(authors) {
  let html = "";
  authors.forEach((author) => {
    html += `<div class="card">
                <img src="${author.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="${author._id}">
                       ${author.first_name + " " + author.last_name}
                    </a>
                  </h5>
                </div>
              </div>`;
  });
  cardContainer.innerHTML = html;
}

getAllAuthors();
