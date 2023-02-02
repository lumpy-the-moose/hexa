import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/components/App/hooks';
import { useRouter } from 'next/router';
import axios from 'axios';

import 'rodal/lib/rodal.css';

import Auth from '@/components/Auth';
import Search from '@/components/Search';
import Gallery from '@/components/Gallery';
import Details from '@/components/Details';
import { setFetchedMovies, setHasMore } from '@/components/App/hexaSlice';
import { useEffect } from 'react';

export const APIKEY = 'c3c6a5436a9f4e63accef267f4683152';

export const getServerSideProps = async () => {
  const res = await axios(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKEY}&adult=false&page=1`
  );

  return {
    props: {
      trendingMovies: res.data.results,
    },
  };
};

export default function Home({ trendingMovies }: { trendingMovies: []; totalPages: number }) {
  const { selectedMovie } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setFetchedMovies(trendingMovies));
    dispatch(setHasMore(true));
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="sticky top-0 z-10 flex flex-col gap-2 p-2 bg-[#00e6b8] rounded-lg">
        <div className="flex items-center">
          <Image
            src={'logo.svg'}
            alt={'project logo'}
            width={64}
            height={64}
            className="cursor-pointer"
            onClick={() => router.reload()}
          />
          <Auth />
        </div>
        <Search />
      </div>
      <Gallery />
      {selectedMovie && <Details />}
    </div>
  );
}
