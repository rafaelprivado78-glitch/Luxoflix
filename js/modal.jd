const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));

async function openModal(movieId) {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?append_to_response=videos`, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });
  const movie = await res.json();
  
  document.getElementById('modal-title').textContent = movie.title;
  document.getElementById('modal-overview').textContent = movie.overview;
  document.getElementById('modal-poster').src = movie.poster_path ? IMG_URL + movie.poster_path : 'assets/images/no-image.jpg';
  document.getElementById('modal-genres').textContent = movie.genres.map(g => g.name).join(', ');

  const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  document.getElementById('modal-media').innerHTML = trailer ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>` : '';

  modalOverlay.classList.add('open');
}
