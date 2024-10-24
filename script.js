let editingTree = null;
let trees = [];

const treesList = document.getElementById('trees-list');
const totalPriceElement = document.getElementById('total-price');
const formModal = document.getElementById('form-modal');
const createTreeBtn = document.getElementById('create-tree-btn');
const cancelFormBtn = document.getElementById('cancel-form-btn');
const buttonSubmit = document.getElementById("submit");
const treeForm = document.getElementById("tree-form");

const fetchTrees = async () => {
    const response = await fetch('http://localhost:5050/api/items');
    const fetchedTrees = await response.json();
    trees = fetchedTrees;
    renderItems();
};

createTreeBtn.addEventListener("click", () => {
    formModal.style.display = "flex";
    treeForm.reset();
    editingTree = null;
});

cancelFormBtn.addEventListener("click", () => {
    formModal.style.display = "none";
});

buttonSubmit.addEventListener("click", async (e) => {
    e.preventDefault();
    
    const name = document.getElementById("name").value;
    const height = parseInt(document.getElementById("height").value);
    const manufacturer = document.getElementById("manufacturer").value;
    const price = parseFloat(document.getElementById("price").value);
    const material = document.getElementById("material").value;
    const image = document.getElementById("image").value;

    const newTree = { name, height, manufacturer, price, material, image };

    if (editingTree === null) {
        await fetch('http://localhost:5050/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTree)
        });
    } else {
        trees[editingTree] = newTree;
        editingTree = null;
    }

    fetchTrees();
    formModal.style.display = "none";
});

function renderItems() {
    treesList.innerHTML = '';
    trees.forEach((tree, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'space-x-4', 'bg-gray-200', 'p-4', 'rounded', 'shadow');
        li.innerHTML = `
            <img src="${tree.image}" class="w-24 h-36 rounded object-cover">
            <div>
                <h2 class="text-xl font-bold">${tree.name}</h2>
                <p>Height: <span class="font-semibold">${tree.height}</span> cm</p>
                <p>Manufacturer: <span class="font-semibold">${tree.manufacturer}</span></p>
                <p>Price: $<span class="font-semibold">${tree.price}</span></p>
                <p>Material: <span class="font-semibold">${tree.material}</span></p>
                <button class="edit-button bg-yellow-500 text-white px-4 py-1 rounded mt-2" data-index="${index}">Edit</button>
            </div>
        `;
        li.querySelector('.edit-button').addEventListener('click', () => {
            editingTree = index;
            document.getElementById("name").value = tree.name;
            document.getElementById("height").value = tree.height;
            document.getElementById("manufacturer").value = tree.manufacturer;
            document.getElementById("price").value = tree.price;
            document.getElementById("material").value = tree.material;
            document.getElementById("image").value = tree.image;
            formModal.style.display = "flex";
        });
        treesList.appendChild(li);
    });

    const total = trees.reduce((acc, tree) => acc + tree.price, 0);
    totalPriceElement.textContent = total.toFixed(2);
}

fetchTrees();

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTrees = trees.filter(tree => tree.material.toLowerCase().includes(searchTerm));
    renderFilteredItems(filteredTrees);
});

function renderFilteredItems(filteredTrees) {
    treesList.innerHTML = '';
    filteredTrees.forEach((tree, index) => {
        const li = document.createElement('li');
        li.classList.add('flex', 'items-center', 'space-x-4', 'bg-gray-200', 'p-4', 'rounded', 'shadow');
        li.innerHTML = `
            <img src="${tree.image}" class="w-24 h-36 rounded object-cover">
            <div>
                <h2 class="text-xl font-bold">${tree.name}</h2>
                <p>Height: <span class="font-semibold">${tree.height}</span> cm</p>
                <p>Manufacturer: <span class="font-semibold">${tree.manufacturer}</span></p>
                <p>Price: $<span class="font-semibold">${tree.price}</span></p>
                <p>Material: <span class="font-semibold">${tree.material}</span></p>
                <button class="edit-button bg-yellow-500 text-white px-4 py-1 rounded mt-2" data-index="${index}">Edit</button>
            </div>
        `;
        li.querySelector('.edit-button').addEventListener('click', () => {
            editingTree = index;
            document.getElementById("name").value = tree.name;
            document.getElementById("height").value = tree.height;
            document.getElementById("manufacturer").value = tree.manufacturer;
            document.getElementById("price").value = tree.price;
            document.getElementById("material").value = tree.material;
            document.getElementById("image").value = tree.image;
            formModal.style.display = "flex";
        });
        treesList.appendChild(li);
    });

    const total = filteredTrees.reduce((acc, tree) => acc + tree.price, 0);
    totalPriceElement.textContent = total.toFixed(2);
}

const sortOptions = document.getElementById('sort-options');
const sortBtn = document.getElementById('sort-btn');

sortBtn.addEventListener('click', () => {
    const sortOption = sortOptions.value;
    const sortedTrees = [...trees];

    if (sortOption === "price") {
        sortedTrees.sort((a, b) => a.price - b.price);
    } else if (sortOption === "height") {
        sortedTrees.sort((a, b) => a.height - b.height);
    }

    renderFilteredItems(sortedTrees);
});
