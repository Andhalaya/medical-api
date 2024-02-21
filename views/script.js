document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display all items when the page loads
    fetchAndDisplayItems();

    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchInput = document.getElementById('search');
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            fetchItems(searchTerm)
        } else {
            fetchAndDisplayItems();
        }
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterBy = button.dataset.filter;
            fetchItemsWithFilter(filterBy);

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
                
            // Add active class to the clicked button
            button.classList.add('active');
            
        });
    });
});

function fetchItems(searchTerm) {
    fetch(`https://medical-api-dev-mqpb.2.ie-1.fl0.io/search?search=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response data
            displayItems(data);
            return data;
        })
        .catch(error => {
            console.error('Error fetching items:', error);
        });
}

async function fetchItemsWithFilter(filterBy) {
    try {
        // Fetch items with filter from the server
        const response = await fetch(`https://medical-api-dev-mqpb.2.ie-1.fl0.io/filterBy?filter=${filterBy}`);
        const items = await response.json();
        console.log(items);
        // Display filtered items in the HTML
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items with filter:', error);
    }
}


async function fetchAndDisplayItems() {
    try {
        // Fetch items from the server
        const response = await fetch('https://medical-api-dev-mqpb.2.ie-1.fl0.io/items');
        const items = await response.json();
        console.log(items)
        // Display items in the HTML
        displayItems(items);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

function displayItems(items) {
    // Clear previous results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Loop through each item and create HTML elements
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        itemDiv.innerHTML = `
            <div id="itemName">${item.nombre}</div>
            <div id="itemCode">Codigo: ${item.codigo}</div>
            <div id="itemTags">
                ${item.estupefacientes ? '<span class="itemTag">Estupefacientes</span>' : ''}
                ${item.termolabil ? '<span class="itemTag">Termolabil</span>' : ''}
                ${item['alto riesgo'] ? '<span class="itemTag">Alto Riesgo</span>' : ''}
                ${item.mezclas ? '<span class="itemTag">Mezclas</span>' : ''}
            </div>
            <button>Edit</button>
        `;

        resultsDiv.appendChild(itemDiv);
    });
}

