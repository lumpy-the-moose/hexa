import Image from 'next/image';

import Auth from '@/components/Auth';
import Search from '@/components/Search';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center">
          <Image
            src={'logo.svg'}
            alt={'project logo'}
            width={64}
            height={64}
            className="max-[480px]:hidden"
          />
          <Auth />
        </div>
        <Search />
        <Gallery />
      </div>
      <section></section>
    </>
  );
}
