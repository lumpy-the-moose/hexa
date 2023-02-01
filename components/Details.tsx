import { useAppSelector, useAppDispatch } from './App/hooks';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FiHeart, FiTrash } from 'react-icons/fi';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import { setFavoriteMovies, setModalOpened, setIsFavorite } from '@/components/App/hexaSlice';

import { fetchFavoriteMovies, addFavoriteMovie, removeFavoriteMovie } from './dBase';

export default function Details() {
  const { selectedMovie, modalOpened, favoriteMovies, isFavorite } = useAppSelector(
    state => state.hexa
  );
  const dispatch = useAppDispatch();

  const { poster_path, title, release_date, overview, id }: Movie = selectedMovie;

  useEffect(() => {
    dispatch(setIsFavorite(favoriteMovies.some((movie: Movie) => movie.id === selectedMovie.id)));
  }, [favoriteMovies, selectedMovie]);

  return (
    <Rodal
      visible={modalOpened}
      onClose={() => dispatch(setModalOpened(false))}
      closeOnEsc={true}
      className="w-[250px] sm:w-[350px]"
      customStyles={{
        margin: '10vh auto',
        padding: 0,
        backgroundColor: 'transparent',
      }}
      customMaskStyles={{
        backgroundColor: '#000000cc',
      }}
    >
      <div className="group relative bg-black">
        <IconContext.Provider
          value={{
            size: '64px',
            color: '#f43f5e',
          }}
        >
          {isFavorite ? (
            <FiTrash
              className="absolute inset-x-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 opacity-0 max-[768px]:opacity-100 group-hover:opacity-100 duration-500 cursor-pointer z-[1]"
              onClick={async () => {
                removeFavoriteMovie(document.cookie.slice(4), id);
                const favoriteMovies = await fetchFavoriteMovies(document.cookie.slice(4));
                favoriteMovies && dispatch(setFavoriteMovies(favoriteMovies));
                dispatch(setModalOpened(false));
              }}
            />
          ) : (
            <FiHeart
              className="absolute inset-x-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 opacity-0 max-[768px]:opacity-100 group-hover:opacity-100 duration-500 cursor-pointer z-[1]"
              onClick={async () => {
                addFavoriteMovie(document.cookie.slice(4), {
                  poster_path,
                  title,
                  release_date,
                  overview,
                  id,
                });
                const favoriteMovies = await fetchFavoriteMovies(document.cookie.slice(4));
                favoriteMovies && dispatch(setFavoriteMovies(favoriteMovies));
                dispatch(setModalOpened(false));
              }}
            />
          )}
        </IconContext.Provider>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          className="object-cover hover:bg-black group-hover:opacity-50 duration-500"
        />
      </div>
      <div className="p-2 bg-gray-500">
        <p className="text-white break-words">{title}</p>
        <p className="text-white">{release_date?.slice(0, 4)}</p>
        <p className="text-white">{overview}</p>
      </div>
    </Rodal>
  );
}
