import { useAppSelector } from './App/hooks';

export default function Gallery() {
  const { fetchedMovies } = useAppSelector(state => state.hexa);

  const markup = fetchedMovies.map(
    ({ poster_path, original_title, release_date, overview, id }) => {
      return (
        <div
          key={id}
          className="w-[220px] min-h-[400px] bg-gray-800 rounded-b-md hover:scale-[1.03] transition-transform cursor-pointer"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={original_title}
            width="220"
            className="h-[330px] object-cover"
          />
          <div className="w-[220px] p-2">
            <p className="text-white break-words">{original_title}</p>
            <p className="text-white">{release_date?.slice(0, 4)}</p>
          </div>
        </div>
      );
    }
  );

  return <div className="flex justify-center flex-wrap gap-5">{markup}</div>;
}
