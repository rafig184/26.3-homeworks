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
        const result = await getMovie(DOM.searchInput.value);
        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            const movies = element.Title;
            const poster = element.Poster;
            const id = element.imdbID;
            drawMovies(movies, poster, id);
        }

        DOM.searchInput.value = ""
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

function drawMoviesWithPlot(title, poster, plot) {
    const div = document.createElement("div")
    div.classList.add("contentDivWithPlot")
    const firstdiv = document.createElement("div");
    const img = getImg(poster);
    const secondDiv = document.createElement("div")
    const h4 = document.createElement("h4");
    h4.innerText = title;
    const p = document.createElement("p");
    p.innerText = plot;
    const backButton = document.createElement("button")
    backButton.classList.add("btn", "btn-secondary")
    backButton.innerText = "Back to page"
    backButton.addEventListener("click", function() {
        div.innerHTML = ""
        div.classList.remove("contentDivWithPlot")
    })


    firstdiv.append(img);
    secondDiv.append(h4, p)
    div.append(firstdiv, secondDiv, backButton)
    DOM.content.append(div);
}

async function getMovieDescription(movieDiv) {
    try {
        showLoader();
        const result = await getMovieId(movieDiv.currentTarget.id);
        const movies = result.Title;
        const poster = result.Poster;
        const plot = result.Plot;

        drawMoviesWithPlot(movies, poster, plot);

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
