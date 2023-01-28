import axios from 'axios';
import { useState } from 'react';
import { useAppDispatch } from './App/hooks';
import { setFetchedMovies } from './App/hexaSlice';

const APIKEY = 'c3c6a5436a9f4e63accef267f4683152';

export async function fetchTrending(page: number) {
  return await axios(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&adult=false&page=${page}`
  ).then(r => r.data.results);
}

async function fetchMovies(query: string, page: number) {
  return await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${query}&adult=false`
  ).then(r => r.data.results);
}

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dispatch = useAppDispatch();

  return (
    <form
      className="flex grow h-16"
      onSubmit={e => {
        e.preventDefault();
        if (searchQuery)
          fetchMovies(searchQuery).then(() => dispatch(setFetchedMovies));
      }}
    >
      <input
        type="text"
        className="grow min-w-0 px-4 min-[480px]:text-xl rounded-l-md outline-none"
        placeholder="find awesome movies"
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery}
      />
      <button type="submit" className="w-16 bg-gray-400 rounded-r-md">
        {' '}
        Go!
      </button>
    </form>
  );
}
