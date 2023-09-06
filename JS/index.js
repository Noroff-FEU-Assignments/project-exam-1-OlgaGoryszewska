const apiBase = "https://semester69.wordpress.com/";
const postsBase = "/wp-json/wp/v2/posts";
const fullPostsUrl =`${apiBase}${postsBase}`;

function fetchLatestsPosts(){
    fetch (fullPostsUrl)
    .then((response) =>{ if (!response.ok){ throw new Error('not fetching!');

return response.jason();
})

}


