import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "../assets/css/banner.css";

const base_url = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  // console.log("Banner Movie >>>", movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className="banner">
      <div className="banner_image">
        <img
          src={`${base_url}${
            width > 767 ? movie?.backdrop_path : movie?.poster_path
          }`}
          alt={movie.title}
        />
      </div>
      <div className="banner_overlay"></div>
      <div className="banner_content">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner_btns">
          <button className="btn_primary">Play</button>
          <button className="btn_secondary">My List</button>
        </div>
        <p>{truncate(movie?.overview, 150)}</p>
      </div>
    </div>
  );
}

export default Banner;
