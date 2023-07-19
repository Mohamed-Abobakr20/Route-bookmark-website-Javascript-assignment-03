let bookmarks, siteName, siteURL, submit;
bookmarks = [];
siteName = document.getElementById("siteName");
siteURL = document.getElementById("siteURL");
submit = document.getElementById("submit");

// caling check method
checkLocalStorage();

// add products to the table
submit.addEventListener("click", () => {
    if ((siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid"))) {
        const bookmark = {
            name: siteName.value,
            url: siteURL.value,
        }
        clearDate();
        bookmarks.push(bookmark);
        updateData();
    } else {
        document.getElementById("exampleModal").style.display = "block";
    }

})

siteName.addEventListener("input", (e) => {
    if (e.target.value.length < 3) {
        inputClasses(siteName, "is-invalid", "is-valid");
    } else {
        inputClasses(siteName, "is-valid", "is-invalid");
    }
})

siteURL.addEventListener("input", (e) => {
    if (isValidURL(e.target.value)) {
        inputClasses(siteURL, "is-valid", "is-invalid");

    } else {
        inputClasses(siteURL, "is-invalid", "is-valid");
    }
})

// clear inputs
function clearDate() {
    siteName.value = "";
    siteURL.value = "";
    siteName.classList.remove("is-valid", "is-invalid");
    siteURL.classList.remove("is-valid", "is-invalid");
}


// display products
function displyProducts(bookmarks) {
    let pr = "";

    for (let i = 0; i < bookmarks.length; i++) {
        pr += rowTable(i);
    }

    document.querySelector("tbody").innerHTML = pr;
}

// check local storage
function checkLocalStorage() {
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        displyProducts(bookmarks);
    }
}

// delete product function
function deleteProduct(i) {
    bookmarks.splice(i, 1);
    updateData();
}


// update table and local storage data
function updateData() {
    displyProducts(bookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// close function for warning empty fields
function closeButton() {
    document.getElementById("exampleModal").style.display = "none";
}

// creating row table
function rowTable(i) {
    return `<tr>
<td scope="row">${i+1}</td>
<td>${bookmarks[i].name}</td>
<td>
                        <a href="${bookmarks[i].url}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye me-2"></i>Visit</a>
                    </td>
                    <td>
                        <button class="btn btn-delete" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button>
                    </td>
</tr>`;
}

function isValidURL(url) {
    const pattern = new RegExp(
        '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
    );
    return pattern.test(url);
}

function inputClasses(inputName, addClass, removeClass) {
    inputName.classList.add(addClass);
    inputName.classList.remove(removeClass);
}