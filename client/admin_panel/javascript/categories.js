const addCategoryBtn = document.getElementById("add_category_btn");
const refreshCategoriesBtn = document.getElementById("refresh_categories_btn");

const categoriesTable = document.getElementById("categoriesTable");

function getAllCategories() {
  axios
    .get(BASE_URL + "/categories/data")
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let categories = response.data;
      console.log("categories:", categories);
      showCategories(categories);
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

function showCategories(categories) {
  let html = "";

  for (i = 0; i < categories.length; i++) {
    console.log(`categories [${i}]`, categories[i]);

    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${categories[i].name}</td>
    <td><button class="btn btn-danger" id="btn_delete_${
      categories[i]._id
    }"><i class="fa fa-trash"></i></button></td>
    </tr>`;
  }
  categoriesTable.innerHTML = html;

  for (i = 0; i < authors.length; i++) {
    document
      .getElementById(`btn_delete_${categories[i]._id}`)
      .addEventListener("click", onCategoryDeleteBtnClicked);
  }
}

function onRefreshCategoriesBtnClicked(e) {
  getAllCategories();
}

function onAddCategoryBtnClicked(e) {
  // console.log("id", this.id);
  // let html = "";
  // html += `<div class="form-group">
  //         <label for="fname">First Name</label>
  //         <input type="text" class="form-control" name="f", id="fname" placeholder="John">
  //         </div>`;
  // html += `<div class="form-group">
  //         <label for="lname">Last Name</label>
  //         <input type="text" class="form-control" name="l", id="lname" placeholder="Smith">
  //         </div>`;
  // html += `<div class="form-group">
  //         <label for="dob">Date of birth</label>
  //         <input type="text" class="form-control" name="dob", id="dob" placeholder="1990-01-01">
  //         </div>`;
  // html += `<div class="form-group">
  //         <label for="i">Select image</label>
  //         <input type="file" accept="image/*" class="form-control" name="image", id="i">
  //         </div>`;
  // document.getElementById("form_inputs").innerHTML = html;
  // openCreateForm();
  // console.log($(".nav-tabs .active").id);
}

function onCategoryDeleteBtnClicked(e) {
  console.log("this.id: ", this.id);

  let category_id = this.id.replace("btn_delete_", "");
  console.log("category_id: ", category_id);
  axios
    .delete(BASE_URL + "/categories/data" + category_id)
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      if (response.status == 200) {
        getAllCategories();
      }
    })
    .catch(function (error) {
      console.log("error:", error);
    });
}

getAllCategories();

addCategoryBtn.addEventListener("click", onAddCategoryBtnClicked);
refreshCategoriesBtn.addEventListener("click", onRefreshCategoriesBtnClicked);
