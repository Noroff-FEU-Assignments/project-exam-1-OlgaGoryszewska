'use strict'


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

function truncateText(text, maxLength) {
  const words = text.split(' ');
  if (words.length <= maxLength) {
    return text;
  }
  const truncatedWords = words.slice(0, maxLength);
  return truncatedWords.join(' ') + '...';
}

async function renderPosts() {
  try {
    const posts = await getPosts();
    const postContainers = document.querySelectorAll('.card');

    // Loop through each container and add the latest post to it
    postContainers.forEach((container, index) => {
      if (index < posts.length) {
        const post = posts[index];
        const postElement = document.createElement('div');
        postElement.classList.add('card-container');

        // Check if a featured image is available in the post
        if (post._embedded && post._embedded['wp:featuredmedia']) {
          const featuredMedia = post._embedded['wp:featuredmedia'][0];
          if (featuredMedia.source_url) {
            const img = document.createElement('img');
            img.src = featuredMedia.source_url;
            img.alt = featuredMedia.alt_text || '';
            img.style.minWidth = '200px';
            img.style.height = '248px';
            img.style.objectFit = 'cover';
            img.style.display = 'flex';
            postElement.appendChild(img);
          }
        }

        postElement.innerHTML += `
          <p>${truncateText(post.content.rendered, 30)}</p>`;

        container.appendChild(postElement);
      }
    });
  } catch (error) {
    console.error('Error rendering posts:', error);
  }
}

// Call the renderPosts function to display the posts
renderPosts();
