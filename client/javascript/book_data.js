
// const image = document.getElementById("image")
const details = document.getElementById("details")
const review_views = document.getElementById("review_details")
const save = document.getElementById("save")
const review = document.getElementById("review")
const book_id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
const BASE_URL = "http://localhost:5000";

function getBook_detail() {
  console.log(window.location.href)
  axios
    .get(BASE_URL + `/books/data/${book_id}`)
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let book_detail = response.data;
      console.log("book:", book_detail);
      showBook(book_detail);
    })

    .catch(function (error) {
      console.log("error:", error)
      if (error.response) {
        if (error.response.status == 404) {
          console.log("error:", 404);
          window.location.replace("/errors/404");
        }
        else {
          console.log("error:", error);
        }
      }
    });
}
function showBook(book_detail) {
  console.log("book_detail:", book_detail.reviews)
  // image.innerHTML = `<p>${book_detail.image}</p><br>`
  details.innerHTML = `<div  class="card-body" style="border: none;">
                          <h4 class="card-title">${book_detail.title}</h4>
                           <a href="#" class="btn " style="color: blue; ">by BookAuthor: ${book_detail.author.first_name}</a><br>
                           <a href="#" class="btn " style="color: blue;">Category Name: ${book_detail.category} </a></div>`
  for (i = 0; i < book_detail.reviews.length ; i++) {                        
  review_views.innerHTML += `<p>${book_detail.reviews[i].user.first_name}`+":"+`${book_detail.reviews[i].review}</p>`                       
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  // review.innerHTML = `<p>${book_detail.title}</p>`
  }

}


function save_review() {
  axios
    .post(BASE_URL + `/reviews`,{r:review.value,b:book_id,u:"5eb9f701f223ca27acaec0ec"})
    .then(function (response) {
      console.log("response: " + JSON.stringify(response));
      let review_detail = response.data;
      console.log("review_detail:", review_detail);
      review.value=""
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 404) {
          console.log("error:", 404);
          window.location.replace("/errors/404");
        }
        else {
          console.log("error:", error);
        }
      }
    })
}


console.log(window.location.href)
console.log(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
save.addEventListener("click", save_review)
getBook_detail()





// `<p>${book_detail.title}<br>
//                            ${book_detail.author.first_name}<br>
//                            ${book_detail.category.first_name}</p>`

// review.value