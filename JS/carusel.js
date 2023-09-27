'use strict';

const apiBase = 'https://public-api.wordpress.com/wp/v2/sites/semester69.wordpress.com/posts?_embed&per_page=10';

async function getPosts() {
  try {
    const response = await fetch(apiBase);
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function renderPosts() {
    try {
      const posts = await getPosts();
  
      const postContainers = document.querySelectorAll('.card-mobile-view');
  
      // Loop through each container and render the corresponding post
      postContainers.forEach((container, index) => {
        if (posts[index] && posts[index]._embedded && posts[index]._embedded['wp:featuredmedia']) {
          const featuredMedia = posts[index]._embedded['wp:featuredmedia'][0];
  
          if (featuredMedia.source_url) {
            // Set the background image for the container
            container.style.backgroundImage = `url(${featuredMedia.source_url})`;
            
            // Set the background size to 'cover'
            container.style.backgroundSize = 'cover';
  
            // Create an anchor element for linking to the specific blog page
            const linkElement = document.createElement('a');
            linkElement.href = `blog-specific-page.html?id=${posts[index].id}`; // Pass the individual ID as a query parameter
            linkElement.classList.add('blog-link');
  
            // Append the anchor element to the container
            container.appendChild(linkElement);
  
            // Create an h1 element for the title
            const titleElement = document.createElement('h1');
            titleElement.textContent = posts[index].title.rendered;
            titleElement.classList.add('horizontal-scrolling-post-title');
  
            // Append the title to the anchor element
            linkElement.appendChild(titleElement);
          }
        }
      });
  
      // Add event listeners to the card containers for clicking
      const cardContainers = document.querySelectorAll('.card-mobile-view');
      cardContainers.forEach((container) => {
        container.addEventListener('click', () => {
          // Get the blog post ID from the data attribute or query parameter
          const postId = container.getAttribute('data-post-id');
          if (postId) {
            // Navigate to the blog-specific page with the ID parameter
            window.location.href = `blog-specific-page.html?id=${postId}`;
          }
        });
      });
    } catch (error) {
      console.error('Error rendering posts:', error);
    }
  }
  
  renderPosts();
  