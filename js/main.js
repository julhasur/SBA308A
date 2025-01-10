import { fetchRandomCats, searchCatsByBreed, fetchAllBreeds } from './api.js';
import { renderPets } from './ui.js';

const gallery = document.getElementById('pet-gallery');
const loadMoreBtn = document.getElementById('load-more');
const searchInput = document.getElementById('breed-search');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

// Event listener to load more random cats
loadMoreBtn.addEventListener('click', async () => {
  try {
    const cats = await fetchRandomCats(5); // Fetch 5 random cats
    renderPets(cats, gallery);
  } catch (error) {
    console.error('Error loading random cats:', error);
  }
});

// Event listener to search cats by breed
searchButton.addEventListener('click', async () => {
  const breed = searchInput.value.trim();
  if (!breed) {
    alert('Please enter a breed to search.');
    return;
  }

  try {
    // Fetch all breeds and match the breed name to its ID
    const breeds = await fetchAllBreeds();
    const matchingBreed = breeds.find(b => b.name.toLowerCase() === breed.toLowerCase());

    if (!matchingBreed) {
      alert(`No breed found for "${breed}". Please try another.`);
      return;
    }

    // Fetch cats by the matched breed ID
    const cats = await searchCatsByBreed(matchingBreed.id, 5); // Fetch up to 5 cats
    renderPets(cats, searchResults);
  } catch (error) {
    console.error('Error searching cats by breed:', error);
  }
});

// Initialize the page with random cats
(async function init() {
  try {
    const cats = await fetchRandomCats(5); // INCREASE PAY LOAD MORE THEN 5 BUT THIS LOOKS 
    renderPets(cats, gallery);
  } catch (error) {
    console.error('Error initializing page:', error);
  }
})();
