import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import axios from 'axios';
import { parseAnime, RawAnime, Anime, HOST } from '../utils';

function Home() {
  const [data, setData] = useState<Anime[]>([]);
  const [init, setInit] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `${HOST}/data.json?sql=select+rowid%2C+anime.*+from+anime+where+title+like+%27%25${search}%25%27+limit+10%3B&_shape=array`,
      );
      const rawAnimeData: RawAnime[] = result.data;
      const animeData = [];
      for (const anime of rawAnimeData) {
        animeData.push(parseAnime(anime));
      }
      setData(animeData);
    };
    init === true && fetchData();
  }, [search]);
  return (
    <div className="App">
      <div>
        <label htmlFor="search">Search for Anime:</label>
      </div>
      <input
        value={search}
        id="search"
        onInput={(e: any) => {
          if (e.target.value === '') {
            setInit(false);
            setData([]);
          } else {
            setInit(true);
          }
          setSearch(e.target.value);
        }}
      />
      <div>
        Results:{' '}
        {data.map((d: Anime, i: number) => (
          <div key={i}>
            <a href={`/?id=${d.id}`}>{d.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
