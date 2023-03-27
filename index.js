const DOM = {
    searchInput: document.querySelector("#searchInput"),
    searchButton: document.querySelector("#searchButton"),
    content: document.querySelector("#content"),
}

function init() {
    DOM.searchButton.addEventListener("click", getMovieHandler)
}
init();

async function getMovieHandler() {
    try {
        showLoader();
        let result = await getMovie(DOM.searchInput.value);
        // if (result === undefined) {
        //     result = await getMovie(window.localStorage.getItem("search"));
        // }
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            const movies = element.Title;
            const poster = element.Poster;
            const id = element.imdbID;
            drawMovies(movies, poster, id);
        }

        // window.localStorage.setItem("search", DOM.searchInput.value);
        // DOM.searchInput.value = ""
    } catch (error) {
        console.log(error);
        DOM.searchInput.value = ""
        swal({
            title: "Something went wrong!",
            text: "Contact admin",
            icon: "error",
        });
    } finally {
        removeLoader();
    }
}


function drawMovies(title, poster, id) {
    const div = document.createElement("div");
    div.classList.add("contentDiv")
    div.addEventListener("click", getMovieDescription)
    div.id = id;
    const img = getImg(poster);
    const h6 = document.createElement("h6");
    h6.innerText = title;
    const movieId = document.createElement("p")
    movieId.innerText = `Movie ID: ${id}`

    div.append(img, h6, movieId);
    DOM.content.append(div);
}

function drawMoviesWithPlot(title, poster, plot, year, runTime, genre, director) {
    const div = document.createElement("div")
    div.classList.add("contentDivWithPlot")
    const firstdiv = document.createElement("div");
    const img = getImg(poster);
    const secondDiv = document.createElement("div")
    secondDiv.classList.add("secondDiv")
    const h4 = document.createElement("h4");
    h4.innerText = title;
    const plots = document.createElement("p");
    plots.innerText = plot;
    const movieYear = document.createElement("p");
    movieYear.innerText = year;
    const time = document.createElement("p");
    time.innerText = runTime;
    const genres = document.createElement("p");
    genres.innerText = genre;
    const directors = document.createElement("p");
    directors.innerText = director;
    const backButtonDiv = document.createElement("div");
    backButtonDiv.classList.add("backButtonDiv")
    const backButton = document.createElement("button");
    backButton.classList.add("btn", "btn-warning")
    backButton.id = "backBtn"
    backButton.innerText = "Back to page"
    backButton.addEventListener("click", function () {
        div.innerHTML = ""
        div.classList.remove("contentDivWithPlot")
        getMovieHandler()
    })

    firstdiv.append(img);
    secondDiv.append(h4, movieYear, time, genres, directors, plots)
    backButtonDiv.append(backButton)
    div.append(firstdiv, secondDiv, backButtonDiv)
    DOM.content.append(div);
}

async function getMovieDescription(movieDiv) {
    try {
        showLoader();
        const result = await getMovieId(movieDiv.currentTarget.id);
        const movies = result.Title;
        const poster = result.Poster;
        const plot = `Plot : ${result.Plot}`;
        const year = result.Year
        const time = `Runtime : ${result.Runtime}`
        const genre = `Genre : ${result.Genre}`
        const director = `Director : ${result.Director}`

        drawMoviesWithPlot(movies, poster, plot, year, time, genre, director);

    } catch (error) {
        console.log(error);
        swal({
            title: "Something went wrong!",
            text: "Contact admin",
            icon: "error",
        });
    } finally {
        removeLoader();
    }
}


async function getMovie(title) {
    const result = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=adc1d2a6`);
    const json = await result.json();
    return json.Search;
}

async function getMovieId(id) {
    const result = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=adc1d2a6`);
    const json = await result.json();
    return json;
}

function showLoader() {
    DOM.content.innerHTML = "";
    const loader = document.createElement("div");
    loader.id = "searchLoader";
    loader.classList.add("spinner-border");
    DOM.content.append(loader);
}

function removeLoader() {
    const loader = document.querySelector("#searchLoader");
    if (loader) {
        loader.remove();
    }
}
