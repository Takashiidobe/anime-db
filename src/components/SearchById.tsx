import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';
import { parseAnime, RawAnime, Anime, HOST } from '../utils';

function RenderAnime(anime: Anime | null) {
  if (anime === null) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div>
          <img src={anime.picture} alt="thumbnail" />
        </div>
        <div>Episodes: {anime.episodes}</div>
        <div>Title: {anime.title}</div>
        <div>Type: {anime.type}</div>
        <div>Type: {anime.episodes}</div>
        <div>status: {anime.status.toLocaleLowerCase()}</div>
        <div>
          Aired:{' '}
          {anime.season === 'UNDEFINED' ? '' : anime.season.toLocaleLowerCase()}{' '}
          {anime.year}
        </div>
        <div>
          Tags:{' '}
          {anime.tags.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
        </div>
        <div>
          Related Anime:{' '}
          {anime.relations.map((rel, i) => (
            <div key={rel}>
              <a href={rel}>{rel}</a>
            </div>
          ))}
        </div>
        <div>
          <a href="/">{'<-'} Back Home</a>
        </div>
      </div>
    );
  }
}

function SearchById({ id }: any) {
  const [data, setData] = useState<Anime | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${HOST}/data.json?sql=select+*+from+anime+where+rowid+%3D+${id}%3B&_shape=array`,
      );
      const rawAnimeData: RawAnime = result.data[0];
      setData(parseAnime(rawAnimeData));
    };
    fetchData();
  }, []);
  return <div className="App">{RenderAnime(data)}</div>;
}

export default SearchById;
