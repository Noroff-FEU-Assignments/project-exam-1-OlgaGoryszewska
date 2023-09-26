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
    

    // Looping through each container and adding the latest post to it
    postContainers.forEach((container, index) => {
      if (index < posts.length) {
        const post = posts[index];
        const postElement = document.createElement('div');
        postElement.classList.add('card-container');
        


      
        if (post._embedded && post._embedded['wp:featuredmedia']) {
          const featuredMedia = post._embedded['wp:featuredmedia'][0];
          if (featuredMedia.source_url) {
            const img = document.createElement('img');
            img.src = featuredMedia.source_url;
            img.alt = featuredMedia.alt_text || '';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.display = 'flex';
            img.style.paddingTop ="0.7rem";
            postElement.appendChild(img);
          }
        }

        postElement.innerHTML += `
          <p>${truncateText(post.content.rendered, 5)}</p>`;

        container.appendChild(postElement);
      }
    });
  } catch (error) {
    console.error('Error rendering posts:', error);
  }
}


renderPosts();

// Carousel
const slider = document.querySelector(".slider");
const rail = slider.querySelector(".slider-rail");
const previous = slider.querySelector("button.left-btn");
const next = slider.querySelector("button.right-btn");

function nextPage () {
  rail.style.transform = "translateX(-100%)"
}

function previousPage() {
  rail.style.transform = "translateX(0)"
}

next.addEventListener("click", nextPage)
previous.addEventListener("click", previousPage)