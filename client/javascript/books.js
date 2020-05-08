const column = document.getElementById("column")

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
    });
}
   function showBooks(books){
    column.innerHTML=""

     for(i=0 ; i < books.length; i++ )
     {

      // var div = document.createElement('div');
      // div.id = 'card';
      // div.className = 'card';
      
      let div = `<div class="card"><p>
        ${books[i].image}<br>
        ${books[i].title}<br>
        ${books[i].author.first_name}<br></p></div>`
       column.innerHTML += div
      
     
     }
   
  

   }

getAllBooks();
console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
console.info("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

// ${books[i].category}