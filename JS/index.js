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

const slider = document.querySelector(".slider");
const rail = slider.querySelector(".slider-rail");
const slideWidth = rail.offsetWidth; // Get the width of a single slide
let currentPage = 0;

function updateButtonState() {
  const next = slider.querySelector("button.right-btn");
  const previous = slider.querySelector("button.left-btn");
  
  // Enable or disable the "Next" button based on the current page
  next.disabled = currentPage === rail.children.length - 1;
  
  // Enable or disable the "Previous" button based on the current page
  previous.disabled = currentPage === 0;
}

function nextPage() {
  if (currentPage < rail.children.length - 1) {
    currentPage++;
    const translateXValue = -currentPage * slideWidth;
    rail.style.transform = `translateX(${translateXValue}px)`;
    updateButtonState();
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    const translateXValue = -currentPage * slideWidth;
    rail.style.transform = `translateX(${translateXValue}px)`;
    updateButtonState();
  }
}

const next = slider.querySelector("button.right-btn");
const previous = slider.querySelector("button.left-btn");

next.addEventListener("click", nextPage);
previous.addEventListener("click", previousPage);

// Initial button state setup
updateButtonState();