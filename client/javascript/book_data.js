// const review = document.getElementById("review")
// const image = document.getElementById("image")
const details = document.getElementById("details")
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
        console.log("error:",error)
        if (error.response){
         if (error.response.status == 404){
            console.log("error:", 404); 
            window.location.replace("/errors/404");   
         }
         else 
         {
            console.log("error:", error);
         }
        }
      });
  }
function showBook(book_detail){
    console.log("book_detail:",book_detail)
    // image.innerHTML = `<p>${book_detail.image}</p><br>`
    details.innerHTML =  `<div  class="card-body" style="border: none;">
                          <h4 class="card-title">${book_detail.title}</h4>
                           <a href="#" class="btn " style="color: blue; ">by BookAuthor: ${book_detail.author.first_name}</a><br>
                           <a href="#" class="btn " style="color: blue;">Category Name: ${book_detail.category} </a></div>`
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    // review.innerHTML = `<p>${book_detail.title}</p>`
    
   }
getBook_detail()


console.log(window.location.href)
console.log(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

// `<p>${book_detail.title}<br>
//                            ${book_detail.author.first_name}<br>
//                            ${book_detail.category.first_name}</p>`