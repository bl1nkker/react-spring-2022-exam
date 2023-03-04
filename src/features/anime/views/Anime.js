import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

function Anime() {
  const [animeList, SetAnimeList] = useState([]);
  const [topAnime, SetTopAnime] = useState([]);
  const [search, SetSearch] = useState("");

  const GetTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/top/anime`).then((res) =>
      res.json()
    );
    console.log(temp);
    SetTopAnime(temp.data.slice(0, 5));
  };

  const HandleSearch = (e) => {
    e.preventDefault();

    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`).then(
      (res) => res.json()
    );

    SetAnimeList(temp.data);
  };

  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} />
        <MainContent
          HandleSearch={HandleSearch}
          search={search}
          SetSearch={SetSearch}
          animeList={animeList}
        />
      </div>
    </div>
  );
}

export default Anime;
