import React from "react";
import Row from "./components/Row";
import requests from "./requests";
import Banner from "./components/Banner";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <div className="container">
        <Row
          title="Netflix Originals"
          fetchUrl={requests?.fetchNetflixOriginals}
          isLargeRow
        />
        <Row title="Trending" fetchUrl={requests?.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests?.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests?.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests?.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests?.fetchHorrorMovies} />
        <Row title="Romantic Movies" fetchUrl={requests?.fetchRomaceMovies} />
        <Row title="Documentries" fetchUrl={requests?.fetchDocumentries} />
      </div>
    </div>
  );
}

export default App;
