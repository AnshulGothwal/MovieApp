// carousal script
let photo = [
  "https://images7.alphacoders.com/124/thumb-1920-1249146.jpg",
  "https://cdn.wallpapersafari.com/17/67/h2Xpum.jpg",
"https://images4.alphacoders.com/139/thumb-1920-1390815.jpg",
];

const carousal = document.querySelector(".hero-section");
let currentslide = 0;

function initCarousal() {
    photo.forEach((imageUrl, index) => {
        const slide = document.createElement("div");
        slide.className = "carousal-slide";

        if (index === 0) {
            slide.classList.add("active");
        }

        const img = document.createElement("img");
        img.src = imageUrl;
        img.className = "photo";

        slide.appendChild(img);
        carousal.appendChild(slide);
    });
}

function updateCarousal() {
    const slides = document.querySelectorAll(".carousal-slide");

    slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === currentslide);
    });
}

function autoNext() {
    currentslide = (currentslide + 1) % photo.length;
    updateCarousal();
}

function changeSlide(direction) {
    currentslide = (currentslide + direction + photo.length) % photo.length;
    updateCarousal();
}

initCarousal();
setInterval(autoNext, 2000);
// movies and series
const moviesContainer = document.getElementById("movies");
const webContainer = document.getElementById("web");
const searchInput = document.getElementById("search");
const animeContainer = document.getElementById("anime");

const movieGenreFilter = document.getElementById("movieGenreFilter");
const movieSortFilter = document.getElementById("movieSortFilter");

const seriesGenreFilter = document.getElementById("seriesGenreFilter");
const seriesSortFilter = document.getElementById("seriesSortFilter");

const animeGenreFilter = document.getElementById("animeGenreFilter");
const animeSortFilter = document.getElementById("animeSortFilter")

let allMovies = [];
let allSeries = [];
let allAnime = [];

function createCard(item){
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${item.poster}" alt="${item.title}">
        <div class="card-content">
            <h2>${item.title}</h2>
            <p>Year: ${item.year}</p>
            <p>Rating: ${item.rating}</p>
        </div>
    `;

    return card;
}

// Display Movies
function displayMovies(data){
    moviesContainer.innerHTML = "";
    data.forEach(movie => moviesContainer.appendChild(createCard(movie)));
}

// Display Series
function displaySeries(data){
    webContainer.innerHTML = "";
    data.forEach(series => webContainer.appendChild(createCard(series)));
}

// Display Anime
function displayAnime(data){
    animeContainer.innerHTML="";
    data.forEach(anime => animeContainer.appendChild(createCard(anime)));
}

// Fetch 
async function fetchData() {
    try {
        const response = await fetch("./db.json");

        console.log(response.status);

        const data = await response.json();

        console.log(data);

        allMovies = data.movies;
        allSeries = data.series;
        allAnime = data.anime;

        applyMovieFilters();
        applySeriesFilters();
        applyAnimeFilters();

    } catch (err) {
        console.error(err);
    }
}
fetchData();

// ================= MOVIE FILTER =================

function applyMovieFilters(){

    let filteredMovies = [...allMovies];

    const searchValue = searchInput.value.toLowerCase();

    filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchValue)
    );

    if(movieGenreFilter.value !== "All Genres"){
        filteredMovies = filteredMovies.filter(movie =>
            movie.Category === movieGenreFilter.value
        );
    }

    if(movieSortFilter.value === "Most Popular"){
        filteredMovies.sort((a,b)=>b.rating-a.rating);
    }
    
    if(movieSortFilter.value === "High rated"){
        filteredMovies.sort((a,b)=>b.rating-a.rating);
    }

    if(movieSortFilter.value === "Newest"){
        filteredMovies.sort((a,b)=>b.year-a.year);
    }

    if(movieSortFilter.value === "Oldest"){
        filteredMovies.sort((a,b)=>a.year-b.year);
    }
    displayMovies(filteredMovies);
}

// ================= SERIES FILTER =================

function applySeriesFilters(){

    let filteredSeries = [...allSeries];

    const searchValue = searchInput.value.toLowerCase();

    filteredSeries = filteredSeries.filter(series =>
        series.title.toLowerCase().includes(searchValue)
    );

    if(seriesGenreFilter.value !== "All Genres"){
        filteredSeries = filteredSeries.filter(series =>
            series.Category === seriesGenreFilter.value
        );
    }

    if(seriesSortFilter.value === "High rated"){
        filteredSeries.sort((a,b)=>b.rating-a.rating);
    }

    if(seriesSortFilter.value === "Most Popular"){
        filteredSeries.sort((a,b)=>b.year-a.year);
    }

    if(seriesSortFilter.value === "Newest"){
        filteredSeries.sort((a,b)=>b.year-a.year);
    }
    if(seriesSortFilter.value === "Oldest"){
        filteredSeries.sort((a,b)=>a.year-b.year);
    }


    displaySeries(filteredSeries);
}

// ================ ANIME FILTER==============

function applyAnimeFilters(){

    let filteredAnime = [...allAnime];

    const searchValue = searchInput.value.toLowerCase();

    filteredAnime = filteredAnime.filter(anime =>
        anime.title.toLowerCase().includes(searchValue)
    );

    if(animeGenreFilter.value !== "All Genres"){
        filteredAnime = filteredAnime.filter(anime =>
            anime.Category === animeGenreFilter.value
        );
    }

    if(animeSortFilter.value === "High rated"){
        filteredAnime.sort((a,b)=>b.rating-a.rating);
    }

    if(animeSortFilter.value === "Most Popular"){
        filteredAnime.sort((a,b)=>b.year-a.year);
    }

    if(animeSortFilter.value === "Newest"){
        filteredAnime.sort((a,b)=>b.year-a.year);
    }
    if(animeSortFilter.value === "Oldest"){
        filteredAnime.sort((a,b)=>a.year-b.year);
    }
    displayAnime(filteredAnime);
}


// ================= EVENTS =================

searchInput.addEventListener("input", () => {
    applyMovieFilters();
    applySeriesFilters();
    applyAnimeFilters();
});

movieGenreFilter.addEventListener("change", applyMovieFilters);
movieSortFilter.addEventListener("change", applyMovieFilters);

seriesGenreFilter.addEventListener("change", applySeriesFilters);
seriesSortFilter.addEventListener("change", applySeriesFilters);

animeGenreFilter.addEventListener("change", applyAnimeFilters);
animeSortFilter.addEventListener("change", applyAnimeFilters);

// ===================TOGGLE ==========================
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if(document.body.classList.contains("dark-theme")){
        themeBtn.textContent = "☀️";
    }else{
        themeBtn.textContent = "🌙";
    }
});