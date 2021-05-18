const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", function () {
  const movieTitle = document.querySelector(".input-keyword");
  const movie = fetch(
    "http://www.omdbapi.com/?apikey=389fc49c&s=" + movieTitle.value
  );
  movie
    .then((response) => response.json())
    .then((response) => {
      // Looping semua nilai pada object response.Search
      let cards = "";
      const movies = response.Search;
      movies.forEach((m) => {
        cards += addCards(m);
        showCard(cards);

        const movieDetailButton = document.querySelectorAll(
          ".movie-detail-button"
        );
        movieDetailButton.forEach((movieDetail) =>
          movieDetail.addEventListener("click", function () {
            const movieID = this.dataset.imdbid;
            fetch("http://www.omdbapi.com/?apikey=389fc49c&i=" + movieID)
              .then((response) => response.json())
              .then((m) => {
                const movieDetailModal = addMovieDetail(m);
                showMovieDetail(movieDetailModal);
              });
          })
        );
      });
    });
});

// Bagian Menampilkan
const addCards = (m) => {
  return /*html*/ `<div class="col-md-4 my-3">
                      <div class="card">
                        <img src="${m.Poster}" class="card-img-top" />
                        <div class="card-body">
                          <h5 class="card-title">${m.Title}</h5>
                          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                          <a href="#" class="btn btn-primary movie-detail-button " data-bs-toggle="modal"
                          data-bs-target="#movieDetailModal" data-imdbid = '${m.imdbID}' >Show Details</a>
                        </div>
                      </div>
                      </div>`;
};

const showCard = (cards) => {
  cardPlacement = document.querySelector(".cardPlacement");
  cardPlacement.innerHTML = cards;
};

const addMovieDetail = (m) => {
  return /*html*/ `<div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="movieDetailModalLabel">${m.Title}</h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="container">
                      <div class="row">
                        <div class="col">
                          <img src="${m.Poster}" class="card-img-top" />
                        </div>
                        <div class="col">
                          <ul class="list-group">
                            <li class="list-group-item">
                              <strong>Director: </strong>${m.Director}
                            </li>
                            <li class="list-group-item">
                              <strong>Writer: </strong>${m.Writer}
                            </li>
                            <li class="list-group-item">
                              <strong>Actors: </strong>${m.Actors}
                            </li>
                            <li class="list-group-item"><strong>Genre: </strong>${m.Genre}</li>
                            <li class="list-group-item">
                              <strong>Plot: </strong><br />${m.Plot}
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>

                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>`;
};

const showMovieDetail = (movieDetail) => {
  detailModalPlacement = document.querySelector(".modal-dialog");
  detailModalPlacement.innerHTML = movieDetail;
};
