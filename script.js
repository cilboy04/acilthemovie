const API_KEY ="a87a90b0b0df76fb7dcb9a999df2fa8c"

let page = 1;

const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`

const API_IMAGE_URL ="https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function updatePage() {
    getMovies(API_URL())
    currentPage.innerHTML = page
}

function nextPage() {
    if (page >= 1) {
        page += 1;
        getMovies(API_URL())
        updatePage()
    }

}
function prevPage() {
    if(page > 1) {
        page -= 1;
        getMovies(API_URL())
        updatePage()
    }

}

next.addEventListener("click", () => {
    nextPage()
})

prev.addEventListener("click", () => {
    prevPage()
})

function showMovies(movies) {
    moviesElement.innerHTML = ''; // Menghapus konten sebelumnya sebelum menambahkan yang baru
    movies.forEach(movie => {
      const { title, poster_path, overview, popularity, vate_average } = movie;
      const movieCard = document.createElement("div");
      movieCard.classList.add("movie");

      movieCard.innerHTML = `
        <img src="${API_IMAGE_URL + poster_path}" alt="Acil the movie" />
        <div class="detail">
         <h3 class="judul">${title}</h3>
         <p>${overview.substring(0, 250)}...</p>
        </div>
      `;
      moviesElement.appendChild(movieCard);
    });
  }

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value

    if(searchQuery !== '') {
        getMovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

title1.addEventListener("click", () => {
    location.reload()
})

updatePage()

/* <div class="popularity">
<p>${popularity}</p>
</div> */