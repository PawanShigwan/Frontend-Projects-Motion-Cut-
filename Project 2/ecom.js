document.addEventListener('DOMContentLoaded', () => {
    // Change main image based on thumbnail clicked
    document.querySelectorAll('.thumbnail').forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const mainImage = document.getElementById('product-image');
            mainImage.src = this.src; // Change main image to the clicked thumbnail
        });
    });

     // Star rating functionality
     const stars = document.querySelectorAll('.star');
     let ratingValue = 0;
 
     stars.forEach(star => {
         star.addEventListener('click', () => {
             ratingValue = star.getAttribute('data-value');
             stars.forEach(s => {
                 s.classList.remove('filled');
                 if (s.getAttribute('data-value') <= ratingValue) {
                     s.classList.add('filled');
                 }
             });
         });
     });

    // Submit review functionality
    document.getElementById('submit-review').addEventListener('click', () => {
        const name = document.getElementById('review-name').value.trim();
        const text = document.getElementById('review-text').value.trim();
        const fileInput = document.getElementById('review-file');
        const file = fileInput.files[0]; // Get the uploaded file

        if (name && text && ratingValue) {
            const reviewGrid = document.querySelector('.reviews-grid');
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review-card'; // Updated class to match CSS
            reviewDiv.innerHTML = `
                <p><strong>${name}</strong></p>
                <p class="stars">${'⭐'.repeat(ratingValue)}</p>
                <p>${text}</p>
            `;

            // Check if a file is uploaded
            if (file) {
                const fileIcon = document.createElement('span');
                fileIcon.innerHTML = '📄'; // You can use a different icon if you want
                fileIcon.style.cursor = 'pointer';
                fileIcon.title = file.name; // Tooltip for the file name

                // Create a URL for the file and add click event
                const fileUrl = URL.createObjectURL(file);
                fileIcon.addEventListener('click', () => {
                    window.open(fileUrl); // Opens the file in a new tab
                });

                reviewDiv.appendChild(fileIcon); // Append the file icon to the review
            }

            reviewGrid.appendChild(reviewDiv);

            // Clear the form
            document.getElementById('review-name').value = '';
            document.getElementById('review-text').value = '';
            fileInput.value = ''; // Clear file input
            ratingValue = 0;
            stars.forEach(star => star.classList.remove('filled')); // Reset stars
        } else {
            alert("Please fill out all fields and select a rating.");
        }
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Subscribe button functionality
    document.getElementById('subscribe').addEventListener('click', () => {
        const emailInput = document.querySelector('.newsletter input'); // Adjust selector as necessary
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            alert("Thank you for subscribing with " + email + "!");
            emailInput.value = ''; // Clear the input after subscribing
        } else {
            alert("Please enter a valid email address.");
        }
    });

    // Function to validate email format
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return regex.test(email);
    }
});
