import React, { useState, useEffect } from "react";
import axios from "../axios";
import "../assets/css/row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //   console.log("Rows >>>", request);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  //   console.log("List of Movies >>> ", movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log("Youtube Movie Name >>>", movie);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
          //   console.log("url params", url);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="home_container">
      <div className="home_row">
        <h2>{title}</h2>
        <div className="poster_row">
          {movies.map((movie) => (
            <div className="poster" key={movie.id}>
              <figure
                className="poster_thumbnail"
                onClick={() =>
                  handleClick(
                    movie?.name || movie?.title || movie?.original_title
                  )
                }
              >
                <img
                  src={`${base_url}${
                    isLargeRow ? movie?.poster_path : movie?.backdrop_path
                  }`}
                  alt={movie.title}
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
      {trailerUrl && (
        <div className="youtube_video">
          <div
            className="btn_primary"
            onClick={() => {
              setTrailerUrl("");
            }}
          >
            Close
          </div>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
