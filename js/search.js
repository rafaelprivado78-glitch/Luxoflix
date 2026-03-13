const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (!query) return loadMovies();

  const res = await fetch(`${BASE_URL}/search/movie?query=${query}`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  const data = await res.json();
  const row = document.getElementById('movies-row');
  row.innerHTML = '';
  data.results.forEach(movie => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'assets/images/no-image.jpg'}" />
      </div>
      <div class="card-title">${movie.title}</div>
    `;
    card.onclick = () => openModal(movie.id);
    row.appendChild(card);
  });
});
