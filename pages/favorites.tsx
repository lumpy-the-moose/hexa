import Image from 'next/image';
import { useAppSelector } from '../components/App/hooks';
import { useRouter } from 'next/router';

import Auth from '@/components/Auth';
import Gallery from '@/components/Gallery';
import Details from '@/components/Details';

export default function Favorites() {
  const { selectedMovie, signedIn } = useAppSelector(state => state.hexa);

  const router = useRouter();

  return (
    signedIn && (
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
        <Gallery />
        {selectedMovie && <Details />}
      </div>
    )
  );
}
