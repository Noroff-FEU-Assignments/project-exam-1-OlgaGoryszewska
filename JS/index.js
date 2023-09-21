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
            img.style.minWidth = '100px';
            img.style.height = '200px';
            img.style.objectFit = 'cover';
            img.style.display = 'flex';
            img.style.paddingTop ="0.7rem";
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


renderPosts();

// Carousel

const slides = document.querySelectorAll('.card');
const sliderWrapper = document.querySelector('.slider-wrapper');

const leftBtn = document.querySelector('#left-btn');
const rightBtn =document.querySelector('#right-btn');


let activeIdxSlide = 0;



function showSlide() {
  sliderWrapper.style.transform = `translateX(-${activeIdxSlide * 50}%)`;
}


leftBtn.addEventListener('click', () => {
  activeIdxSlide--;
  if(activeIdxSlide < 0){
    activeIdxSlide = 0;
  }
  
  showSlide();
  rightBtn.disabled = false;
  

});

rightBtn.addEventListener('click', () => {
  activeIdxSlide++;
  if(activeIdxSlide > sliderWrapper.length - 1){
    activeIdxSlide = sliderWrapper.length - 1;
  }
  showSlide();
  if (activeIdxSlide >= 10 || activeIdxSlide >= posts.length - 1) {
    rightBtn.disabled = true;
  }

});



