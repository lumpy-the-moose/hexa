import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '../components/App/hooks';
import { useRouter } from 'next/router';

import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

import Auth from '@/components/Auth';
import Search from '@/components/Search';
import Gallery from '@/components/Gallery';
import Details from '@/components/Details';

export default function Home() {
  const { selectedMovie } = useAppSelector(state => state.hexa);

  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center">
        <Image
          src={'logo.svg'}
          alt={'project logo'}
          width={64}
          height={64}
          className="max-[480px]:hidden cursor-pointer"
          onClick={() => router.push('/')}
        />
        <Auth />
      </div>
      <Search />
      <Gallery />
      {selectedMovie && <Details />}
    </div>
  );
}
