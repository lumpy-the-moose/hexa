import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './App/hooks';
import { updateFetchedMovies } from './App/hexaSlice';

const APIKEY = 'c3c6a5436a9f4e63accef267f4683152';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTrending();
  }, []);

  async function fetchTrending() {
    return await axios(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&adult=false`
    )
      .then(r => dispatch(updateFetchedMovies(r.data.results)))
      .then(r => console.log(r));
  }

  async function fetchMovies(query: string) {
    return await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${query}&adult=false`
    ).then(r => dispatch(updateFetchedMovies(r.data.results)));
  }

  return (
    <form
      className="flex grow h-16"
      onSubmit={e => {
        e.preventDefault();
        if (searchQuery) fetchMovies(searchQuery);
      }}
    >
      <input
        type="text"
        className="grow min-w-0 px-4 min-[480px]:text-xl rounded-l-md outline-none"
        placeholder="find awesome movies"
        onChange={e => setSearchQuery(e.target.value)}
        value={searchQuery ? searchQuery : ''}
      />
      <button type="submit" className="w-16 bg-gray-400 rounded-r-md">
        {' '}
        Go!
      </button>
    </form>
  );
}
