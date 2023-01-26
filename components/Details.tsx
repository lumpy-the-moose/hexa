import { useAppSelector, useAppDispatch } from './App/hooks';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { setModalOpened } from '@/components/App/hexaSlice';

import { addFavoriteMovie } from './dBase';

export default function Details() {
  const { selectedMovie, modalOpened } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();

  const { poster_path, title, release_date, overview, id }: Movie = selectedMovie;

  return (
    <Rodal
      visible={modalOpened}
      onClose={() => dispatch(setModalOpened(false))}
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
          alt={title}
          className="object-cover"
          onDoubleClick={() =>
            addFavoriteMovie(document.cookie.slice(4), {
              poster_path,
              title,
              release_date,
              overview,
              id,
            })
          }
        />
        <div className="p-2 bg-gray-500">
          <p className="text-white break-words">{title}</p>
          <p className="text-white">{release_date?.slice(0, 4)}</p>
          <p className="text-white">{overview}</p>
        </div>
      </div>
    </Rodal>
  );
}
