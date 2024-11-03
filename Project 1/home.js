document.addEventListener('click', function(event) {
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropbtn = document.querySelector('.dropbtn');

    if (!dropdownContent.contains(event.target) && !dropbtn.contains(event.target)) {
        dropdownContent.classList.remove('show');
        dropbtn.classList.remove('active');
    }
});

document.querySelector('.dropbtn').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
    this.classList.toggle('active');  
});

document.querySelectorAll('.dropdown-content a').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.selected-text').textContent = this.textContent;
        document.querySelector('.dropdown-content').classList.remove('show');
        document.querySelector('.dropbtn').classList.remove('active');
    });
});

const searchInput = document.querySelector('.search-input');
const clearButton = document.querySelector('.clear-button');
const loader = document.querySelector('.loader');

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    clearButton.style.display = 'none';
});

searchInput.addEventListener('input', () => {
    clearButton.style.display = searchInput.value ? 'inline' : 'none';
});

// Enable keyboard navigation for dropdown items
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
    link.setAttribute('tabindex', '0');
    link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            document.querySelector('.selected-text').textContent = e.target.textContent;
            document.querySelector('.dropdown-content').classList.remove('show');
            document.querySelector('.dropbtn').classList.remove('active');
        }
    });
});

// Placeholder text animation
const placeholderText = ["Search for jobs...", "Find software roles...", "Explore data analyst positions...", "Look for IT consultancy...", "Network admin opportunities..."];
let placeholderIndex = 0;

function changePlaceholder() {
    searchInput.setAttribute("placeholder", placeholderText[placeholderIndex]);
    placeholderIndex = (placeholderIndex + 1) % placeholderText.length;
}

setInterval(changePlaceholder, 3000);  

// Display loader on search button click
document.querySelector('.search-button').addEventListener('click', () => {
    loader.style.display = 'inline-block';

    // Hide the loader after 2 seconds (simulating search time)
    setTimeout(() => {
        loader.style.display = 'none';
    }, 2000);
});
