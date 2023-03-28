//Global Variable resource
let ramenMenu = document.getElementById('ramen-menu');
let ramenDetail = document.getElementById('ramen-detail');
let ramenComment = document.getElementById('ramen-comments');
let allRamen = {};
let featuredRamen = {};


//Fetches images and renders them to menu div, sets default featured ramen and renders it
fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(data => {
    renderRamen(data);
    featuredRamen = data[0];
    renderRamenDetails(featuredRamen);
    allRamen = data;
})

//The function that renders the images to the menu and sets up event listener
function renderRamen(ramensObj) {
    ramensObj.forEach((ramen) => {
        
        let img = document.createElement('img')
        img.src = ramen.image

        img.addEventListener('click', (e) => {
            renderRamenDetails(ramen);
            featuredRamen = ramen;
            //console.log(featuredRamen)
        })
        
        ramenMenu.append(img);
    })
};

//Function renders all details for the "ramen-details" feature div
function renderRamenDetails(ramenObj) {
    let img = ramenDetail.querySelector('img');
    let name = ramenDetail.querySelector('h2');
    let restaurant = ramenDetail.querySelector('h3');
    let ratingDisplay = document.querySelector('#rating-display');
    let commentDisplay = document.querySelector('#comment-display');

    img.src = ramenObj.image
    name.innerText = ramenObj.name
    restaurant.innerText = ramenObj.restaurant
    ratingDisplay.innerText = ramenObj.rating
    commentDisplay.innerText = ramenObj.comment
};

//Handles Form and adds listener to fetch POST new ramen
form = document.querySelector('#new-ramen');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let commentArea = form.querySelector('#new-comment');

    let newRamenObj = {
        "name": e.target.name.value,
        "restaurant": e.target.restaurant.value,
        "image": e.target.image.value,
        "rating": e.target.rating.value,
        "comment": commentArea.value
    }

    e.target.name.value = "";
    e.target.restaurant.value = "";
    e.target.image.value = "";
    e.target.rating.value = "";
    commentArea.value = "";

    fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newRamenObj)
    }).then(resp => resp.json())
    .then(data => renderRamen([data]));
})

//fetch PATCH - makes changes to rating and comment of featured ramen obj
let updateForm = document.getElementById('edit-ramen');

updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    featuredRamen.rating = e.target.rating.value;
    featuredRamen.comment = e.target["new-comment"].value

    e.target.rating.value = "";
    e.target["new-comment"].value = "";

    fetch(`http://localhost:3000/ramens/${featuredRamen.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(featuredRamen)
    }).then(resp => resp.json())
    .then(data => renderRamenDetails(data))
})

// let deleteButton = document.createElement('button')
// deleteButton.innerText = "Delete This Ramen";
// ramenComment.appendChild(deleteButton)

// deleteButton.addEventListener('click', (e) => {
//     console.log(e);

//     delete featuredRamen;
// })

