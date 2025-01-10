export function renderPets(pets, container) {
  // Clear the container
  container.innerHTML = '';

  // Check if there are any pets to display
  if (!pets || pets.length === 0) {
    container.innerHTML = '<p>No pets found. Try again!</p>';
    return;
  }

  // Loop through the pets and create DOM elements
  pets.forEach(pet => {
    const petDiv = document.createElement('div');
    petDiv.classList.add('pet');

    const petImage = document.createElement('img');
    petImage.src = pet.url || 'https://via.placeholder.com/150?text=No+Image'; // Use placeholder if no image is available
    petImage.alt = pet.breeds?.[0]?.name || 'Pet image';
    petImage.width = 150;
    petImage.height = 150;

    // favorite button
    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add('favorite-btn');
    favoriteButton.textContent = 'Add to Favorites';

    // Add event listener to the favorite button
    favoriteButton.addEventListener('click', () => {
      addToFavorites(pet);
    });

   // APPENING
    petDiv.appendChild(petImage);
    petDiv.appendChild(favoriteButton);

    // Add the pet element to the container
    container.appendChild(petDiv);
  });
}
//ADD FVRT
function addToFavorites(pet) {
  // Implement your logic to save the pet to a favorites list (local storage, backend, etc.)
  alert(`${pet.breeds?.[0]?.name || 'Unknown Pet'} added to favorites!`);
}
