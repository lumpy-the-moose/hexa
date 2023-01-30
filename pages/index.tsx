import Image from 'next/image';
import { useAppSelector } from '@/components/App/hooks';
import { useRouter } from 'next/router';

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
