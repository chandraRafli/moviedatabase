$(".search-button").on("click", function () {
  $.ajax({
    url:
      "http://www.omdbapi.com/?apikey=389fc49c&s=" + $(".input-keyword").val(),
    success: (results) => {
      const movies = results.Search;
      let cards = "";
      movies.forEach((m) => {
        cards += showCard(m);
      });
      $(".movie-container").html(cards);

      // ketikda tombol detail di-klik
      $(".modal-detail-button").on("click", function () {
        $.ajax({
          url:
            "http://www.omdbapi.com/?apikey=389fc49c&i=" +
            $(this).data("imdbid"),
          success: (m) => {
            const movieDetail = /*html*/ `<div class="contianer-fluid">
                    <div class="row">
                      <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid" alt="" />
                      </div>
                      <div class="col-md">
                        <ul class="list-group">
                          <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                          <li class="list-group-item">
                            <strong>Director: </strong> ${m.Director}
                          </li>
                          <li class="list-group-item">
                            <strong>Actors: </strong> ${m.Actors}
                          </li>
                          <li class="list-group-item">
                            <strong>Writer: </strong> ${m.Writer}
                          </li>
                          <li class="list-group-item">
                            <strong>Plot: </strong><br />
                            ${m.Plot}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>`;
            $(".modal-body").html(movieDetail);
          },
          error: (e) => {
            console.log(e.responseText);
          },
        });
      });
    },
    error: (e) => {
      console.log(e.responseText);
    },
  });
});

function showCard(m) {
  return /*html*/ `<div class="col-md-4 my-5">
  <div class="card">
      <img src="${m.Poster}" class="card-img-top" />
          <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-dark modal-detail-button"
              data-bs-toggle="modal"
              data-bs-target="#movieDetailModal"
              data-imdbid="${m.imdbID}">Show Details</a>
          </div>
      </div>
  </div>`;
}
