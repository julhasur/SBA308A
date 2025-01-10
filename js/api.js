const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY ='live_SqjYFzewkcphQU64FGwd9RwlqADguC6G0Uw2TKlne4jjmx9ugG1xSy4kUR73V88I'; // Use environment variables for better security

// Utility function for API requests
async function fetchFromAPI(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'x-api-key': API_KEY }
    });
    if (!response.ok) throw new Error(`Failed to fetch data from: ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from API: ${endpoint}`, error);
    return [];
  }
}

// Fetch random cat images
export async function fetchRandomCats(limit = 5) {
  return await fetchFromAPI(`/images/search?limit=${limit}`);
}

// Fetch all available cat breeds
export async function fetchAllBreeds() {
  return await fetchFromAPI('/breeds');
}

// Search cats by breed ID
export async function searchCatsByBreed(breed, limit = 1) {
  if (!breed) {
    console.error('Invalid breed ID provided.');
    return [];
  }
  const results = await fetchFromAPI(`/images/search?breed_ids=${breed}&limit=${limit}`);
  if (results.length === 0) {
    console.warn(`No cats found for breed ID: ${breed}`);
  }
  return results;
}

