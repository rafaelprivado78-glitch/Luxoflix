const API_KEY = 'fc020559303c0ff62e47b2188804df6c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const rowPopular = document.getElementById('row-popular');

rowPopular.innerHTML = Array(5).fill('<div class="skeleton-card"></div>').join('');

async function fetchPopular() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular`, {
      headers: { Authorization: `Bearer ${API_KEY}`, accept: 'application/json' }
    });
    const data = await res.json();
    window.movies = data.results;
    renderCards(window.movies);
    setupHero(window.movies[0]);
  } catch (err) {
    console.error(err);
    rowPopular.innerHTML = '<p style="color:#fff;">Não foi possível carregar os filmes.</p>';
  }
}

function renderCards(movies) {
  rowPopular.innerHTML = movies.map(f => `
    <div class="card" onclick="openModal(${f.id})">
      <div class="card-img-wrap">
        <img src="${f.poster_path ? IMG_URL + f.poster_path : 'assets/images/no-image.jpg'}" alt="${f.title}" loading="lazy">
      </div>
      <div class="card-title">${f.title}</div>
    </div>
  `).join('');
}

function setupHero(movie) {
  document.getElementById('hero-title').textContent = movie.title;
  document.getElementById('hero-overview').textContent = movie.overview;
  document.getElementById('hero-bg').src = movie.backdrop_path ? IMG_URL + movie.backdrop_path : '';
}

fetchPopular();
