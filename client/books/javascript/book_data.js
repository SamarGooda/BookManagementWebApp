const review_views = document.getElementById("review_details");
const save = document.getElementById("save");
const review = document.getElementById("review");
const check = document.getElementById("check");
const shelfSelector = document.getElementById("sel1");
const book_id = window.location.href.substring(
  window.location.href.lastIndexOf("/") + 1
);
const BASE_URL = "http://localhost:5000";

function getBook_detail() {
  axios
    .get(BASE_URL + `/books/data/${book_id}`)
    .then(function (response) {
      let book_detail = response.data;
      showBook(book_detail);
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
function showBook(book_detail) {
  document.getElementById("bookTitle").innerHTML = book_detail.title;
  document.getElementById("bookAuthor").innerHTML =
    book_detail.author.first_name + " " + book_detail.author.last_name;
  document.getElementById("bookCategory").innerHTML = book_detail.category.name;
  document.getElementById("authorImg").src = book_detail.image;

  showRate();

  for (i = 0; i < book_detail.reviews.length; i++) {
    review_views.innerHTML +=
      `<p>${
      book_detail.reviews[i].user.first_name +
      " " +
      book_detail.reviews[i].user.last_name
      }` +
      ":  " +
      `${book_detail.reviews[i].review}</p>`;
  }
}

function showRate() {
  axios.get(BASE_URL + `/books/avg/${book_id}`).then(function (response) {
    let book_rate = response.data;

    let div = "";
    let count = book_rate.avg_rate;
    for (i = 0; i < 5; i++) {
      if (i < count) {
        div += `<div class="fa fa-star checked"></div>`;
      } else {
        div += `<div class="fa fa-star"></div>`;
      }
    }
    check.innerHTML = div;
    check.innerHTML += `   (${book_rate.count} ratings)`;
  });
}
// ============================
// shelf related functions
$(document).ready(async function () {
  fetch("http://localhost:5000/shelves/data/" + book_id)
    .then((dataWrappedByPromise) => dataWrappedByPromise.json())
    .then((data) => {
      setCurrentBookShelf('sel1', data.shelf)
    })
    .catch(err => alert("Couldn't get current shelf :("))
  function setCurrentBookShelf(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
  }
  addToShelfEvent = (e) => {
    const url = "http://localhost:5000/shelves/data";
    const newState = e.target.value;
    const data = {
      book: book_id,
      shelf: newState
    }
    fetch(url, {
      method: "post",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json", // sent request
        Accept: "application/json", // expected data sent back
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res || res.status !== 200) alert('Something went wrong, your book might not be on the recently selected shelf :(');
      })
      .catch((error) => {
        alert('Something went wrong, your book might not be on the recently selected shelf :(');
      });
  }

  shelfSelector.addEventListener('change', addToShelfEvent);

});
// ============================

function save_review() {
  axios
    .post(BASE_URL + `/reviews`, {
      r: review.value,
      b: book_id,
      u: "5ebb4044f6abe97a8d533749",
    })
    .then(function (response) {
      let review_detail = response.data;
      review.value = "";

      getBook_detail();
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 404) {
          window.location.replace("/errors/404");
        } else {
          alert("Something went wrong, your review didn't reach us :(");
        }
      }
    });
}

function save_rate() {
  const star5 = document.getElementById("star5");
  const star4 = document.getElementById("star4");
  const star3 = document.getElementById("star3");
  const star2 = document.getElementById("star2");
  const star1 = document.getElementById("star1");
  var selectedValue = "";
  if (star1.checked) {
    selectedValue = star1.value;
  } else if (star2.checked) {
    selectedValue = star2.value;
  } else if (star3.checked) {
    selectedValue = star3.value;
  } else if (star4.checked) {
    selectedValue = star4.value;
  } else if (star5.checked) {
    selectedValue = star5.value;
  }
  axios
    .post(BASE_URL + `/rates`, {
      r: selectedValue,
      b: book_id,
      u: "5eb9f701f223ca27acaec0ec",
    })
    .then(function (response) {
      let rate_detail = response.data;
      //review.value = ""
    })
    .catch(function (error) {
      if (error.response) {
        if (error.response.status == 404) {
          window.location.replace("/errors/404");
        } else {
          console.error("error:", error);
        }
      }
    });
}

console.log(
  window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
);
save.addEventListener("click", save_review);
getBook_detail();

// `<p>${book_detail.title}<br>
//                            ${book_detail.author.first_name}<br>
//                            ${book_detail.category.first_name}</p>`

// review.value
