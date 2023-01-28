import { useState, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './App/hooks';

import {
  setSelectedMovie,
  setModalOpened,
  setFetchedMovies,
} from '@/components/App/hexaSlice';

import InfiniteScroll from 'react-infinite-scroller';

import { fetchTrending } from './Search';

export default function Gallery() {
  const [page, setPage] = useState<number>(1);
  const { fetchedMovies } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();

  const loadMoreHandler = useCallback(
    (page: number) => {
      console.log(page);
      fetchTrending(page).then(r => {
        dispatch(setFetchedMovies(r));
      });
    },
    [page]
  );

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
    <InfiniteScroll
      className="flex justify-center flex-wrap gap-5"
      pageStart={0}
      initialLoad={true}
      loadMore={loadMoreHandler}
      hasMore={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {markup}
    </InfiniteScroll>
  );
}
