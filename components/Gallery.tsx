import { useAppSelector, useAppDispatch } from './App/hooks';

import { setSelectedMovie, setModalOpened } from '@/components/App/hexaSlice';

export default function Gallery() {
  const { fetchedMovies } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();

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

  return <div className="flex justify-center flex-wrap gap-5">{markup}</div>;
}
