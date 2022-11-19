const apikey = "295829c7"
const searchBtn = document.getElementById("search-btn")
const searchInputEl = document.getElementById("search-input")
const moviesListContainer = document.getElementById("movies-list")
const watchlistContainer = document.getElementById("watchlist")
const watchlistPlaceholder = `
    <p class="placeholder-text">Your watchlist is looking a little empty...<br />
    <a href="/index.html" class="info-link">
        <img src="/images/icon-add.svg" />
        Let's add some movies!
    </a></p>`

let watchlistIds = JSON.parse(localStorage.getItem("watchlistIds")) || []

searchBtn && searchBtn.addEventListener("click", handleSearch)

document.addEventListener("click", e => {
	e.target.dataset.add && addToWatchlist(e.target.dataset.add)
	e.target.dataset.remove && removeFromWatchlist(e.target.dataset.remove)
})

async function handleSearch() {
	const moviesData = await getSearchData(searchInputEl.value)
	renderMoviesList(moviesData.Search)
}

function addToWatchlist(id) {
	watchlistIds.push(id)
	localStorage.setItem("watchlistIds", JSON.stringify(watchlistIds))
	document.querySelector(`button[data-add="${id}"]`).disabled = true
	document.querySelector(`button[data-add="${id}"] > img`).style.opacity = 0.2
}

function removeFromWatchlist(id) {
	const index = watchlistIds.indexOf(id)
	watchlistIds.splice(index, 1)
	localStorage.setItem("watchlistIds", JSON.stringify(watchlistIds))
	renderWatchlist(watchlistIds)
}

async function getSearchData(searchQuery) {
	const searchResponse = await fetch(
		`https://www.omdbapi.com/?s=${searchQuery}&type=movie&apikey=${apikey}`
	)
	const searchData = await searchResponse.json()
	return searchData
}

async function getMovieData(movieId) {
	const movieResponse = await fetch(
		`https://www.omdbapi.com/?i=${movieId}&apikey=${apikey}`
	)
	const movieData = await movieResponse.json()
	return movieData
}

function getMovieHtml(
	{ Genre, Plot, Poster, Runtime, Title, Year, imdbID, imdbRating },
	addRemove
) {
	return `
        <section class="movie-item">
            <img src="${Poster}" alt="Movie poster, ${Title}" class="movie-poster">
            <div class="movie-info">
                <h2 class="movie-title">
                    ${Title}
                    <small class="movie-year">(${Year})</small>
                </h2>
                <div class="movie-meta">
                    <span class="movie-rating">
                        <img src="/images/icon-star.svg" />
                        ${imdbRating}
                    </span>
                    <span class="movie-runtime">${Runtime}</span>
                    <span class="movie-genre">${Genre}</span>
                    ${getBtnHtml(addRemove, imdbID)}
                </div>
                <p class="movie-plot">${Plot}</p>
            </div>
           
            
            
        </section>
    `
}

function getBtnHtml(type, id) {
	let disabled = ""
	let opacity = ""
	if (type === "add" && watchlistIds.indexOf(id) !== -1) {
		disabled = "disabled"
		opacity = "style='opacity: 0.2'"
	}
	return `
        <button
            class="${type}-btn"
            data-${type}="${id}"
            ${disabled}
        >
            <img src="/images/icon-${type}.svg" ${opacity} />
            ${type === "add" ? "Watchlist" : "Remove"}
        </button>
    `
}

function renderMoviesList(moviesList) {
	moviesListContainer.innerHTML = ""
	moviesList.forEach(async movie => {
		const movieData = await getMovieData(movie.imdbID)
		moviesListContainer.innerHTML += getMovieHtml(movieData, "add")
	})
}

function renderWatchlist(movieIds) {
	if (!movieIds.length) {
		watchlistContainer.innerHTML = watchlistPlaceholder
	} else {
		watchlistContainer.innerHTML = ""
		movieIds.forEach(async movieId => {
			const movieData = await getMovieData(movieId)
			watchlistContainer.innerHTML += getMovieHtml(movieData, "remove")
		})
	}
}

watchlistContainer && renderWatchlist(watchlistIds)
