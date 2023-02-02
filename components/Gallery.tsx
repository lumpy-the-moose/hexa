import { useEffect, useRef, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './App/hooks';
import axios from 'axios';

import {
  incrementPage,
  setSelectedMovie,
  setModalOpened,
  setFetchedMovies,
  clearFetchedMovies,
  setIsLoading,
  setHasMore,
} from '@/components/App/hexaSlice';

import { APIKEY } from '@/pages';

export default function Gallery() {
  const { fetchedMovies, searchQuery, page, isLoading, hasMore } = useAppSelector(
    state => state.hexa
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!searchQuery) return;
    console.log('clear');
    dispatch(clearFetchedMovies());
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery && page !== 1) {
      console.log('fetchTrending');
      dispatch(setIsLoading(true));
      axios(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&adult=false&page=${page}`
      ).then(res => {
        dispatch(setFetchedMovies(res.data.results));
        dispatch(setHasMore(page < res.data.total_pages));
        dispatch(setIsLoading(false));
      });
    } else if (searchQuery) {
      console.log('fetchMovies');
      dispatch(setIsLoading(true));
      axios(
        `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&query=${searchQuery}&adult=false&page=${page}`
      ).then(res => {
        dispatch(setFetchedMovies(res.data.results));
        dispatch(setHasMore(page < res.data.total_pages));
        dispatch(setIsLoading(false));
      });
    }
  }, [searchQuery, page]);

  const observer = useRef<IntersectionObserver>();
  const lastElement = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          console.log('intersecting');
          dispatch(incrementPage());
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const markup = fetchedMovies.map(
    ({ poster_path, title, release_date, overview, id }: Movie, index) => {
      return (
        <>
          <div
            key={id}
            ref={index === fetchedMovies.length - 1 ? lastElement : undefined}
            className="w-[220px] min-h-[400px] bg-gray-800 rounded-b-md hover:scale-[1.03] transition-transform cursor-pointer"
            onClick={() => {
              dispatch(setSelectedMovie({ poster_path, title, release_date, overview, id }));
              dispatch(setModalOpened(true));
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={title}
              width="220"
              className="object-cover"
            />
            <div className="w-[220px] p-2">
              <p className="text-white break-words">{title}</p>
              <p className="text-white">{release_date?.slice(0, 4)}</p>
            </div>
          </div>
        </>
      );
    }
  );

  return (
    <>
      <div className="flex justify-center flex-wrap gap-5">{markup}</div>
    </>
  );
}
