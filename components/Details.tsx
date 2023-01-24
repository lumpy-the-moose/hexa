import { useAppSelector, useAppDispatch } from './App/hooks';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { updateSelectedMovie } from '@/components/App/hexaSlice';

export default function Details() {
  const { fetchedMovies, selectedMovie } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();

  const selected = fetchedMovies.find(item => item.id === selectedMovie);
  const { poster_path, original_title, release_date, overview } = selected;

  return (
    <Rodal
      visible={!!selectedMovie}
      onClose={() => dispatch(updateSelectedMovie(null))}
      closeOnEsc={true}
      customStyles={{
        margin: '10vh auto',
        padding: 0,
        backgroundColor: 'transparent',
      }}
      customMaskStyles={{
        backgroundColor: '#000000cc',
      }}
    >
      <div className="w-[250px] sm:w-[350px]">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={original_title}
          className="object-cover"
        />
        <div className="p-2 bg-gray-500">
          <p className="text-white break-words">{original_title}</p>
          <p className="text-white">{release_date?.slice(0, 4)}</p>
          <p className="text-white">{overview}</p>
        </div>
      </div>
    </Rodal>
  );
}
