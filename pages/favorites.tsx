import Image from 'next/image';
import { useRouter } from 'next/router';

import Auth from '@/components/Auth';
import Details from '@/components/Details';

import { useAppSelector, useAppDispatch } from '@/components/App/hooks';
import { setSelectedMovie, setModalOpened } from '@/components/App/hexaSlice';

export default function Favorites() {
  const { selectedMovie, favoriteMovies } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const markup = favoriteMovies.map(
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
            <p className="text-white">{release_date.slice(0, 4)}</p>
          </div>
        </div>
      );
    }
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="sticky top-0 z-10 flex items-center p-2 bg-[#00e6b8] rounded-lg">
          <Image
            src={'logo.svg'}
            alt={'project logo'}
            width={64}
            height={64}
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
          <Auth />
        </div>
        <div className="flex justify-center flex-wrap gap-5">{markup}</div>
        {selectedMovie && <Details />}
      </div>
    </>
  );
}
