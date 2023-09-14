const blogContainer = document.querySelector(".blog-specific-page-container");

async function getBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    if (!postId) {
    
        console.error("Missing post ID in URL");
        return;
    }

    const apiBase = `https://public-api.wordpress.com/wp/v2/sites/semester69.wordpress.com/posts/${postId}?_embed`;

    try {
        const response = await fetch(apiBase);
        if (!response.ok) {

            console.error("Error fetching blog post:", response.status);
            return;
        }

        const post = await response.json();

    
        const title = document.createElement("h1");
        title.innerText = post.title.rendered;
        title.style.fontSize ="24px";
        title.style.fontStyle ="Semi Bold";
        title.style.paddingLeft = "0rem";
        blogContainer.appendChild(title);


        

        if (post._embedded && post._embedded["wp:featuredmedia"]) {
            const featuredImage = post._embedded["wp:featuredmedia"][0];
            const img = document.createElement("img");
            img.src = featuredImage.source_url;
            img.alt = featuredImage.alt_text;
            img.style.minWidth =" 200px";
            img.style.height = "248px";
            img.style.objectFit ="cover";
            img.style.display ="flex";
            blogContainer.appendChild(img);
        }

        const content = document.createElement("div");
        content.innerHTML = post.content.rendered;
        blogContainer.appendChild(content);

    } catch (error) {
        console.error("Error fetching and rendering blog post:", error);

    }
}

getBlogPost();