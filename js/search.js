const searchInput = document.getElementById('search-input');
let debounceTimer;

searchInput.addEventListener('input', e => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    const query = e.target.value;
    if (!query) return fetchPopular();

    try {
      const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${API_KEY}`, accept: 'application/json' }
      });
      const data = await res.json();
      window.movies = data.results;
      renderCards(window.movies);
    } catch (err) {
      console.error(err);
    }
  }, 300);
});
