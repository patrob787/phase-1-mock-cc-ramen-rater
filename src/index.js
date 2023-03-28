//Variables resource
let ramenMenu = document.getElementById('ramen-menu');
let ramenDetail = document.getElementById('ramen-detail');
let dataObj = {}


//fetch images and renders them to menu div
fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(data => {
    renderImages(data);
    dataObj = data;
    console.log(dataObj)
})

function renderImages(array) {
    let featuredRamen = array[0];
    
    let img = ramenDetail.querySelector('img');
    let name = ramenDetail.querySelector('h2');
    let restaurant = ramenDetail.querySelector('h3');
    let ratingDisplay = document.querySelector('#rating-display');
    let commentDisplay = document.querySelector('#comment-display');

    img.src = featuredRamen.image
    name.innerText = featuredRamen.name
    restaurant.innerText = featuredRamen.restaurant
    ratingDisplay.innerText = featuredRamen.rating
    commentDisplay.innerText = featuredRamen.comment
    
    array.forEach((item) => {
        let ramenObj = {};
        ramenObj = item

        //console.log(ramenObj)
    
        let img = document.createElement('img')
        img.src = ramenObj.image
        //console.log(img);


        img.addEventListener('click', (e) => {
            //console.log(e.target)
            
            let img = ramenDetail.querySelector('img');
            let name = ramenDetail.querySelector('h2');
            let restaurant = ramenDetail.querySelector('h3');
            let ratingDisplay = document.querySelector('#rating-display');
            let commentDisplay = document.querySelector('#comment-display');

            // let deleteButton = document.createElement('button')
            // deleteButton.innerText = "Delete This Ramen";
            // document.appendChild(deleteButton)

            img.src = ramenObj.image
            name.innerText = ramenObj.name
            restaurant.innerText = ramenObj.restaurant
            ratingDisplay.innerText = ramenObj.rating
            commentDisplay.innerText = ramenObj.comment
            
            //handleDetails(e.target);
        })
        
        ramenMenu.append(img);
        })
}

//Puts Ramen Details into Detail Div
// function handleDetails(target) {
//     console.log(target)

//     let img = ramenDetail.querySelector('img');
//     let name = ramenDetail.querySelector('h2');
//     let restaurant = ramenDetail.querySelector('h3');
//     let ratingDisplay = document.querySelector('#rating-display');
//     let commentDisplay = document.querySelector('#comment-display');

//     img.src = ramenObj.src
//     name.innerText = ramenObj.name
//     restaurant.innerText = ramenObj.restaurant
//     ratingDisplay.innerText = ramenObj.rating
//     commentDisplay.innerText = ramenObj.comment
// };

//Handles Form
form = document.querySelector('#new-ramen');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);

    let commentArea = form.querySelector('textarea')

    let name = e.target.name.value;
    let restaurant = e.target.restaurant.value;
    let imageURL = e.target.image.value;
    let rating = e.target.rating.value;
    let comment = commentArea.value

    let newRamenObj = {
        "name": name,
        "restaurant": restaurant,
        "image": imageURL,
        "rating": rating,
        "comment": comment
    }

    renderImages([newRamenObj]);
})

