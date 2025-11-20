import products from './products.js';
const productsContainer = document.querySelector(".products-container");
const categoriesContainer = document.querySelector(".categories");
const search = document.querySelector(".search-container input");

renderProducts(products);

search.addEventListener("input", function (e) {
    if (!e.target.value) {
        renderProducts(products);
        return;
    }

    const filterItems = products.filter(({ title }) =>
        title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()
        ));
    renderProducts(filterItems);
})

const categoryList = [];
products.forEach(({ company }, idx) => {
    if (!categoryList.includes(company)) {
        categoryList.push(company);
    }
});

categoryList.forEach(item => categoriesContainer.innerHTML += `<li>${item}</li>`);

categoriesContainer.addEventListener("click", function (e) {
    if (e.target === e.currentTarget) return;
    if (search.value) search.value = null;
    if (e.target.innerText.toLowerCase() === "all") {
        renderProducts(products);
        return;
    };

    const filterItems = products.filter(({ company }) =>
        e.target.innerText.toLowerCase() === company.toLocaleLowerCase()
    );
    renderProducts(filterItems);
});

function renderProducts(products) {
    let cardHTML = "";
    let currentDollerRate = 88.73;
    products.map(({ image, title, price }) => {
        price *= currentDollerRate;
        cardHTML += `<div class="card">
                <img src="${image}" alt="">
                <p class="title">${title}</p>
                <h4 class="price">&#8377; ${price.toFixed(2)}</h4>
            </div>`;
    });
    productsContainer.innerHTML = cardHTML;
}