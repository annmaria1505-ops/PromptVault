
// Select all prompt cards
const promptCards = document.querySelectorAll(".prompt-card");

// Select the search input
const searchInput = document.getElementById("searchInput");

// Select all category cards
const categoryCards = document.querySelectorAll(".category-card");

// Select the View All button
const showAllBtn = document.getElementById("showAllBtn");

// Store the currently selected category
let activeCategory = "all";


// Function to filter prompts
function filterPrompts() {

    // Get the text entered in the search box
    const searchText = searchInput.value.toLowerCase();

    // Check every prompt card
    promptCards.forEach(function(card) {

        // Get the category of the current prompt
        const category = card.dataset.category;

        // Get all the text inside the prompt card
        const cardText = card.innerText.toLowerCase();

        // Check whether the category matches
        const categoryMatch =
            activeCategory === "all" || category === activeCategory;

        // Check whether the search text matches
        const searchMatch = cardText.includes(searchText);

        // Display the card if both conditions are true
        if (categoryMatch && searchMatch) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}


// Search functionality
searchInput.addEventListener("input", filterPrompts);


// Category filtering
categoryCards.forEach(function(categoryCard) {

    categoryCard.addEventListener("click", function() {

        // Get the selected category
        activeCategory = categoryCard.dataset.filter;

        // Filter the prompts
        filterPrompts();

        // Scroll to the prompt collection
        document.getElementById("prompts").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// View All functionality
showAllBtn.addEventListener("click", function() {

    // Reset the selected category
    activeCategory = "all";

    // Clear the search box
    searchInput.value = "";

    // Display all prompts
    filterPrompts();

});

// Select all Copy buttons
const copyButtons = document.querySelectorAll(".copy-btn");

// Add click functionality to each button
copyButtons.forEach(function(button) {

    button.addEventListener("click", async function() {

        // Find the prompt card containing this button
        const card = button.closest(".prompt-card");

        // Get the prompt text
        const promptText = card.querySelector(".prompt-text").innerText;

        try {

            // Copy the prompt to the clipboard
            await navigator.clipboard.writeText(promptText);

            // Change button text
            button.innerText = "Copied!";

            // Change it back after 2 seconds
            setTimeout(function() {
                button.innerText = "Copy Prompt";
            }, 2000);

        } catch (error) {

            alert("Unable to copy. Please try again.");

        }

    });

});
