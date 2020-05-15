const categoriesContainer = document.getElementById("categoriesContainer");
const BASE_URL = "http://localhost:5000";

function getAllCategories() {
  axios
    .get(BASE_URL + "/categories/data")
    .then(function (response) {
      let categories = response.data;
      showCategories(categories);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showCategories(categories) {
  let html = "";
  categories.forEach((category) => {
    html += `<div class="card">
                <div class="card-body">
                  <h5 class="card-title">
                    <a href="/categories/${category._id}">
                       ${category.name}
                    </a>
                  </h5>
                </div>
              </div>`;
  });
  categoriesContainer.innerHTML = html;
}

getAllCategories();
