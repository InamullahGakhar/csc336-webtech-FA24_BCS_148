"use strict";

// Task 3: use the existing HTML cards, not a separate product data list.
const N = 48;
const premiumLimit = N * 100;
const productGrid = document.querySelector(".product-grid");
const productCards = Array.from(productGrid.children);
const searchInput = document.getElementById("product-search");
const sortButton = document.getElementById("sort-price");
const noProductsMessage = document.getElementById("no-products");
const categoryFilters = document.querySelectorAll(".filter-input");
let sortAscending = true;

// Task 3: read the price from the card, removing "Rs." and commas.
function getPrice(card) {
  const priceText = card.querySelector(".product-price").textContent;
  return Number(priceText.replace("Rs.", "").replaceAll(",", "").trim());
}

// Task 3: a card must match BOTH the search text and the selected category.
function filterProducts() {
  const searchText = searchInput.value.trim().toLowerCase();
  const selectedCategory = document.querySelector(".filter-input:checked").value;
  let visibleCount = 0;

  productCards.forEach(function (card) {
    const productName = card.querySelector("h2").textContent.toLowerCase();
    const matchesSearch = productName.includes(searchText);
    const matchesCategory = selectedCategory === "all" || card.dataset.category === selectedCategory;

    card.hidden = !(matchesSearch && matchesCategory);
    if (!card.hidden) {
      visibleCount++;
    }
  });

  productGrid.hidden = visibleCount === 0;
  noProductsMessage.hidden = visibleCount !== 0;
}

// Task 3: add a small label only when price is MORE THAN Rs. 4,800.
productCards.forEach(function (card) {
  if (getPrice(card) > premiumLimit) {
    const label = document.createElement("span");
    label.className = "badge premium-label align-self-start mb-2";
    label.textContent = "Premium";
    card.querySelector(".card-body").prepend(label);
  }
});

searchInput.addEventListener("input", filterProducts);
categoryFilters.forEach(function (filter) {
  filter.addEventListener("change", filterProducts);
});

// Task 3: alternate price order and move the SAME card wrapper elements.
sortButton.addEventListener("click", function () {
  productCards.sort(function (firstCard, secondCard) {
    if (sortAscending) {
      return getPrice(firstCard) - getPrice(secondCard);
    }
    return getPrice(secondCard) - getPrice(firstCard);
  });

  productCards.forEach(function (card) {
    productGrid.appendChild(card);
  });

  sortButton.textContent = sortAscending
    ? "Sort by price: low to high"
    : "Sort by price: high to low";
  sortAscending = !sortAscending;
});

// Task 3: account for restored form values, then reveal the working controls.
filterProducts();
document.querySelector(".product-tools").hidden = false;
