'use strict'


const apiBase = "https://public-api.wordpress.com/wp/v2/sites/semester69.wordpress.com/posts";


 async function fetchPosts(){
    try {
    const response = await fetch(apiBase);
    if (!response.ok){
        throw new Error ('HTTP error! Status: ${response.status}');
    }
    const posts = await response.json();
    return posts;
    } catch(error) {
    console.error("Error fetching latest posts:", error);
    throw error;
    }   
}
fetchPosts()
.then((posts) => {
    console.log("Latest posts:", posts);

})
.catch((error) => {
    console.error("Error in fetchPosts:", error);
});

