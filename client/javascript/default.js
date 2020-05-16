$(document).ready(async function () {
    const userDetails = await checkLogin();

    if (userDetails) {
        const loginNav = document.getElementById('navbarDropdownMenuLink-4');
        const logOutBtn = document.getElementsByClassName('log_out_btn')[0];
        loginNav.innerHTML += userDetails.name
        logOutBtn.addEventListener('click', logoutEvent)
        const url = "http://localhost:5000/data/table";
        fetch(url)
            .then((dataWrappedByPromise) => dataWrappedByPromise.json())
            .then((data) => {
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
    }
    else window.location.href = "/";
    document.getElementById('homeNav').classList.add("active");

    // ================================================================
    // add to shelf functions
    const shelfSelectors = document.getElementsByClassName("sel1");

    addToShelfEvent = (e) => {
        console.log(e)
    }
    for (i in shelfSelectors.length) {
        // selector.addEventListener('change', addToShelfEvent);
        console.log(shelfSelectors[i])

    }
    // document.querySelectorAll('.edit').forEach(function(button) {
    //     // Now do something with my button
    // });

});

async function checkLogin() {
    var obj;
    const url = "http://localhost:5000/users/current_user";
    await fetch(url)
        .then((dataWrappedByPromise) => dataWrappedByPromise.json())
        .then((res) => {
            obj = res;
        })
        .catch(err => console.error(err));
    return obj;
}

function logoutEvent() {
    document.cookie = "user_token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}