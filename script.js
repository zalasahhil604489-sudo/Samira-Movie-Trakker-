// Samira's Screen Club
// Simple JavaScript for navigation, themes, search, and movie actions.

const movies = [
    { id: 1, title: "Midnight in Marrakech", year: 2024, genre: "Travel", status: "Watched", poster: "poster-1" },
    { id: 2, title: "The Secret Garden Café", year: 2023, genre: "Comedy", status: "Watchlist", poster: "poster-2" },
    { id: 3, title: "Letters to the Moon", year: 2022, genre: "Fantasy", status: "Watched", poster: "poster-3" },
    { id: 4, title: "Neon City 2099", year: 2025, genre: "Sci-Fi", status: "Watchlist", poster: "poster-4" },
    { id: 5, title: "The Last Puzzle", year: 2021, genre: "Mystery", status: "Watched", poster: "poster-5" },
    { id: 6, title: "Summer at Blue Bay", year: 2024, genre: "Feel-good", status: "Watchlist", poster: "poster-6" }
];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");

// Show a page when a navigation button is clicked.
function showView(viewId) {
    views.forEach(view => view.classList.remove("active"));
    document.getElementById(viewId).classList.add("active");

    navButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.view === viewId);
    });
}

navButtons.forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.view));
});

// Home page buttons.
document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showView(button.dataset.go));
});

// Light and dark theme buttons.
document.getElementById("lightBtn").addEventListener("click", () => {
    document.body.classList.remove("dark");
});

document.getElementById("darkBtn").addEventListener("click", () => {
    document.body.classList.add("dark");
});

// Build one movie card with an action button.
function createMovieCard(movie) {
    const buttonText = movie.status === "Watchlist" ? "Mark as watched" : "Add to watchlist";

    return `
        <article class="movie-card">
            <div class="movie-poster ${movie.poster}">
                <span>${movie.title}</span>
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">${movie.year} · ${movie.genre}</div>
                <span class="movie-status">${movie.status}</span>
                <button class="movie-action" type="button" data-movie-id="${movie.id}">
                    ${buttonText}
                </button>
            </div>
        </article>
    `;
}

// Put movie cards into a page.
function displayMovies(movieList, containerId) {
    const container = document.getElementById(containerId);

    if (movieList.length === 0) {
        container.innerHTML = '<p class="empty-message">No movies found.</p>';
        return;
    }

    container.innerHTML = movieList.map(createMovieCard).join("");
}

// Refresh the movie lists and the numbers on the home page.
function updateMovieViews() {
    const watchlist = movies.filter(movie => movie.status === "Watchlist");
    const watched = movies.filter(movie => movie.status === "Watched");

    displayMovies(movies, "homeMovies");
    displayMovies(movies, "allMovies");
    displayMovies(watchlist, "watchlistMovies");
    displayMovies(watched, "watchedMovies");

    document.getElementById("totalCount").textContent = movies.length;
    document.getElementById("watchlistCount").textContent = watchlist.length;
    document.getElementById("watchedCount").textContent = watched.length;
    document.getElementById("resultCount").textContent = movies.length + " movies";
}

// Handle movie action buttons.
document.addEventListener("click", event => {
    const button = event.target.closest(".movie-action");
    if (!button) return;

    const movieId = Number(button.dataset.movieId);
    const movie = movies.find(item => item.id === movieId);

    movie.status = movie.status === "Watchlist" ? "Watched" : "Watchlist";
    updateMovieViews();
});

// Search movies by title.
document.getElementById("searchInput").addEventListener("input", event => {
    const searchText = event.target.value.toLowerCase();
    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchText)
    );

    displayMovies(results, "allMovies");
    document.getElementById("resultCount").textContent = results.length + " movies";
});

// Start on the Home page.
updateMovieViews();
showView("home");
