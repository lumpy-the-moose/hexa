import Image from 'next/image';

import Auth from '@/components/Auth';

export default function Home() {
  return (
    <>
      <header className="flex flex-col gap-5">
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
        <form
          className="flex grow h-16"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="grow px-4 text-xl rounded-md outline-none"
            placeholder="find awesome movies"
          />
          <button type="submit" className="w-16 -ml-16 bg-gray-400 rounded-r-md">
            {' '}
            Go!
          </button>
        </form>
      </header>
      <section></section>
    </>
  );
}
