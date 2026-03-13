const API_KEY = 'fc020559303c0ff62e47b2188804df6c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

async function fetchMovies(url) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  const data = await res.json();
  return data.results;
}

// Render hero
async function loadHero() {
  const movies = await fetchMovies(`${BASE_URL}/movie/popular`);
  const heroMovie = movies[0];
  document.getElementById('hero-bg').src = IMG_URL + heroMovie.backdrop_path;
  document.getElementById('hero-badge').textContent = heroMovie.title;
  document.getElementById('hero-title').textContent = heroMovie.title;
  document.getElementById('hero-overview').textContent = heroMovie.overview;
  document.getElementById('hero-watch').onclick = () => openModal(heroMovie.id);
}

// Render rows
async function loadMovies() {
  const movies = await fetchMovies(`${BASE_URL}/movie/popular`);
  const row = document.getElementById('movies-row');
  row.innerHTML = '';
  movies.forEach(movie => {
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
}

window.onload = () => {
  loadHero();
  loadMovies();
};
