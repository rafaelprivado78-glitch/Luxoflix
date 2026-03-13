const searchInput = document.getElementById('search-input');
let debounceTimer;

searchInput.addEventListener('input', e => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const query = searchInput.value.trim();
    if (!query) return loadMovies();

    try {
      const res = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${API_KEY}`, accept: "application/json" },
      });
      const data = await res.json();

      const row = document.getElementById('movies-row');
      row.innerHTML = "";
      data.results.forEach(movie => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <div class="card-img-wrap">
            <img src="${movie.poster_path ? IMG_URL + movie.poster_path : 'assets/images/no-image.jpg'}" loading="lazy"/>
          </div>
          <div class="card-title">${movie.title}</div>
        `;
        card.onclick = () => openModal(movie.id);
        row.appendChild(card);
      });
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  }, 300);
});
