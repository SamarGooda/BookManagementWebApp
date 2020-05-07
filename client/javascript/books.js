const table = document.getElementById("main")

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
     html = ""
     for(i=0 ; i < books.length; i++ )
     {
       html += `<tr> 
             <td>${books[i].title}<td>
             <td>${books[i].image}<td>
             <td>${books[i].author}<td>
             <td>${books[i].category}<td>
             <td>"sddff"</td>
       
       </tr>`
     }
  
     table.innerHTML = html

   }

getAllBooks();
console.log("books new");

