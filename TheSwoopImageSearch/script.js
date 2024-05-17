
const accessKey = ""; // to store API key

//we now have to import all the important elements from the css file that the user will be inputting so that we can give a response back using them through JS
const formEl = document.querySelector("form"); // to restore our form
const inputEl = document.getElementById("search-input"); // to store our unput
const searchResults = document.querySelector(".search-results"); // to store our images in the boxed containers
const showMore = document.getElementById("show-more-button"); // to store the value of the show more button


let inputData = ""; // will store all the keywords that the user types in our html box in the website
let page = 1; // default page num

async function searchImages(){ // async function because we are using resposne and fetch which require async
    inputData = inputEl.value; // will hold our values from the input section
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // dynmaic URL based on the page num which changes, data, and we use the input data and accessKey to use the website 


    const response = await fetch(url); // we use a fetch meathod based on the dynamic url 
    const data = await response.json(); // after getting all the query we need to convert it to be in a json format, all to be stored in our data variable

    const results = data.results; // from that data we get the results and store it in the results var

     if(page===1){ // we need to check to make if the user has typed nothing and we still are on page 1 we just display the OG website format
        searchResults.innerHTML = "";
    }

    results.map((result) => { // within the results variable we have a lot of data so we need to map them to their respective places 
        const imageWrapper = document.createElement('div'); // our container
        imageWrapper.classList.add("search-result"); // our class name
        const image = document.createElement('img'); // creating our image
        image.src = result.urls.small; // creating the src atribute based on the results
        image.alt = result.alt_description; // creating the alt atribute based on the results
        const imageLink = document.createElement('a'); // creating an ancor tag that contains href, target, and textContent
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
        
        // after getting the results we need to push them into the a container like the one above 
        // we base it off the one we created in our HTML file and here we simply create a dublicate

        // now that we have mapped everything we need, we have to append them onto our website 
        imageWrapper.appendChild(image); 
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page ++; // after reciving our results we increment the pg number 
    if(page > 1){ // if there is more than one page of search results that pop up then we show the "Show More" button
        showMore.style.display = "block";
    }
}

// now we have to call our functions 
// since the search box is a form el we use dot method and call the function whenever the submite tag is clicked by the user
formEl.addEventListener("submit", (event) =>{ // we target the specific event, when the user clickes search or enter
    event.preventDefault();
    page = 1; // set the pg num to be at default one
    searchImages(); // call the search image search funciton
});

showMore.addEventListener("click", (evet) =>{ // now we need to call the same function again to display the rest of the results when the show more button is clicked
   
    searchImages();
});

