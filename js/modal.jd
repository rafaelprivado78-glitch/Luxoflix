const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalPoster = document.getElementById('modal-poster');
const modalVideo = document.getElementById('modal-video');
const modalOverview = document.getElementById('modal-overview');
const modalGenres = document.querySelector('.modal-genres');

async function openModal(id) {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?append_to_response=videos`, {
      headers: { Authorization: `Bearer ${API_KEY}`, accept: 'application/json' }
    });
    const movie = await res.json();

    modalTitle.textContent = movie.title;
    modalPoster.src = movie.poster_path ? IMG_URL + movie.poster_path : 'assets/images/no-image.jpg';
    modalOverview.textContent = movie.overview;
    modalGenres.textContent = movie.genres.map(g => g.name).join(', ');

    const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    modalVideo.src = trailer ? `https://www.youtube.com/embed/${trailer.key}` : '';

    modalOverlay.classList.add('open');
  } catch (err) {
    console.error(err);
  }
}

document.getElementById('modal-close').addEventListener('click', () => {
  modalOverlay.classList.remove('open');
  modalVideo.src = '';
});
