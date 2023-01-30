import { useState, useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from './App/hooks';

import {
  incrementPage,
  setSelectedMovie,
  setModalOpened,
  setFetchedMovies,
} from '@/components/App/hexaSlice';

import { fetchTrending, fetchMovies } from './Search';

export default function Gallery() {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { searchActivated, fetchedMovies, searchQuery, page } = useAppSelector(
    state => state.hexa
  );
  const dispatch = useAppDispatch();

  const loader = useRef(null);

  useEffect(() => {
    if (page === 0) {
      console.log('page === 0', page === 0);
      setHasMore(true);
      return;
    }

    if (searchActivated) {
      console.log(page);
      if (hasMore) {
        console.log(hasMore);
        fetchMovies(searchQuery, page).then(r => {
          console.log('r.total_pages', r.total_pages);
          dispatch(setFetchedMovies(r.results));

          if (page >= r.total_pages) {
            setHasMore(false);
            console.log('hasMore setted to false');
          }
        });
      }
    } else {
      fetchTrending(page).then(r => {
        dispatch(setFetchedMovies(r));
      });
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('intersecting');
        dispatch(incrementPage());
      }
    });

    observer.observe(loader.current!);
  }, [hasMore]);

  const markup = fetchedMovies.map(
    ({ poster_path, title, release_date, overview, id }: Movie) => {
      return (
        <div
          key={id}
          className="w-[220px] min-h-[400px] bg-gray-800 rounded-b-md hover:scale-[1.03] transition-transform cursor-pointer"
          onClick={() => {
            dispatch(
              setSelectedMovie({ poster_path, title, release_date, overview, id })
            );
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
      );
    }
  );

  return (
    <>
      <div className="flex justify-center flex-wrap gap-5">{markup}</div>
      <div ref={loader}></div>
    </>
  );
}
