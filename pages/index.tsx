import { useState } from 'react';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FiLogIn, FiUser } from 'react-icons/fi';

export default function Home() {
  const [logedIn, setLogedIn] = useState(false);

  return (
    <>
      <header className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <Image src={'logo.svg'} alt={'project logo'} width={64} height={64} />
          <IconContext.Provider
            value={{
              size: '32px',
            }}
          >
            <button
              onClick={() => setLogedIn(!logedIn)}
              className="flex flex-row items-end gap-2 text-xl"
            >
              <span>user</span>
              {logedIn ? <FiLogIn /> : <FiUser />}
            </button>
          </IconContext.Provider>
        </div>
        <form
          className="flex grow h-16"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            className="grow rounded-md px-4 outline-none text-xl"
            placeholder="find awesome photos"
          />
          <button type="submit" className="w-16 rounded-r-md -ml-16 bg-gray-400">
            {' '}
            Go!
          </button>
        </form>
      </header>
      <section></section>
    </>
  );
}
