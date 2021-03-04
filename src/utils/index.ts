export type Season = 'UNDEFINED' | 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';
export type Status = 'FINISHED' | 'UNKNOWN' | 'CURRENTLY' | 'UPCOMING';
export type Type = 'Special' | 'Movie' | 'OVA' | 'TV' | 'ONA';

export interface Anime {
  id: number;
  sources: string[];
  title: string;
  type: Type;
  episodes: number;
  status: Status;
  season: Season;
  year: number;
  picture: string;
  thumbnail: string;
  relations: string[];
  tags: string[];
}

export interface RawAnime {
  rowid: number;
  sources: string;
  title: string;
  type: string;
  episodes: number;
  status: string;
  animeSeason: string;
  picture: string;
  thumbnail: string;
  relations: string;
  tags: string;
}

export function parseJSON(str: string) {
  return JSON.parse(str.replaceAll("'", '\"'));
}

export function parseAnime({
  rowid,
  sources,
  title,
  type,
  episodes,
  status,
  animeSeason,
  picture,
  thumbnail,
  relations,
  tags,
}: RawAnime): Anime {
  return {
    id: rowid,
    sources: parseJSON(sources),
    title,
    type: type as Type,
    episodes,
    status: status as Status,
    season: parseJSON(animeSeason).season as Season,
    year: parseJSON(animeSeason).year,
    picture,
    thumbnail,
    relations: parseJSON(relations),
    tags: parseJSON(tags),
  };
}

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export const HOST = isLocalhost ? 'localhost:8081' : 'https://anime-db.vercel.app';