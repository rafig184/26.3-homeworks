const DOM = {
    searchMovieButton: document.querySelector("#searchMovie"),
    clearButton: document.querySelector("#clearButton"),
    contents: document.querySelector("#contents"),
    movieNameInput: document.querySelector("#movieName"),
  };
  
  function init() {
    DOM.searchMovieButton.addEventListener("click", handleSearch);
    DOM.clearButton.addEventListener("click", clearButton);
  }
  init();
  async function handleSearch() {
    try {
      showLoader();
      let result = await getMovieName(DOM.movieNameInput.value);
      for (let index = 0; index < result.length; index++) {
        const element = result[index];
        const movieName = element.Title;
        const movieId = element.imdbID;
        const picture = element.Poster;
        console.log(movieName, movieId, picture);
        drawMovies(movieName, movieId, picture);
      }
    } catch (error) {
      console.log("ERROR");
  
      swal({
        title: "Something went wrong!",
        text: "Movie not found",
        icon: "error",
      });
    } finally {
      DOM.movieNameInput.value = "";
      removeLoader();
    }
  }
  function drawMovies(name, id, picture) {
    const div = document.createElement("div");
    div.classList.add("postDiv");
    div.id = postDiv;
    const img = getImg(picture);
    const movieNameH5 = document.createElement("h5");
    movieNameH5.classList.add("movieNameH5");
    movieNameH5.innerText = name;
    const movieId = document.createElement("p");
    movieId.innerText = `Movie ID ${id}`;
    div.append(img, movieNameH5, movieId);
    DOM.contents.append(div);
  }
  async function getMovieName(title) {
    const result = await fetch(
      `https://www.omdbapi.com/?s=${title}&apikey=bf402164`
    );
    const json = await result.json();
    return json;
  }
  // async function getMovieID(movieId) {
  //   const result = await fetch(
  //     `https://www.omdbapi.com/?i=${movieId}&apikey=bf402164`
  //   );
  //   const json = await result.json();
  //   return json;
  // }
  function clearButton() {
    DOM.movieNameInput.value = "";
    DOM.contents.innerHTML = "";
  }