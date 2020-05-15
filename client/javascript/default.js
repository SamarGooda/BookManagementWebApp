$(document).ready(async function () {
  const url = "http://localhost:5000/data/table";
  fetch(url)
    .then((dataWrappedByPromise) => dataWrappedByPromise.json())
    .then((data) => {
      console.log(data);
      $("#main_table").DataTable({
        data: data,
        columns: [
          { data: "cover" },
          { data: "name" },
          { data: "author" },
          { data: "avg_rate" },
          { data: "rating" },
          { data: "shelve" },
        ],
      });
    });
});
