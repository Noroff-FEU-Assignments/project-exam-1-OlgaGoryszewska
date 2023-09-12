const apiBase = "https://public-api.wordpress.com/wp/v2/sites/semester69.wordpress.com/posts?_embed";

async function getProducts() {
    const response = await fetch(apiBase);
    const products = await response.json();
    return products;
}

function createProductHTML(product) {
    const container = document.querySelector(".container");
    const productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.id = product.id;

    const title = document.createElement("h2");
    title.innerText = product.title.rendered;
    productContainer.appendChild(title);

    const productImage = product._embedded["wp:featuredmedia"][0];
    const img = document.createElement("img");
    img.src = productImage.source_url;
    img.alt = productImage.alt_text;
    productContainer.appendChild(img);
    



    if(product.images && Array.isArray(product.images)){

    for (let i = 0; i < product.images.length; i++) {
        const imgData = product.images[i];
        const img = document.createElement("img");
        img.src = imgData.src;
        img.alt = imgData.alt;
        productContainer.appendChild(img);
    }
}

    container.appendChild(productContainer);

    return productContainer;
}

function redirectToProductDetailPage(productId) {
    window.location.href = `blog-specific-page.html?id=${productId}`;
}

async function createProductsHTML() {
    const products = await getProducts();
    const container = document.querySelector(".container");

    for (const product of products) {
        const productContainer = createProductHTML(product);
        container.appendChild(productContainer);

        productContainer.addEventListener("click", () => {
            redirectToProductDetailPage(product.id);
        });
    }
}

async function main() {
    await createProductsHTML();
}

main();