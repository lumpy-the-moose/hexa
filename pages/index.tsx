import { useEffect } from 'react';
import Image from 'next/image';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

export default function Home() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDcZV0jOUp8kR0f37kEjlpx5ETD32I86gs',
    authDomain: 'hexa-f88fc.firebaseapp.com',
    projectId: 'hexa-f88fc',
    storageBucket: 'hexa-f88fc.appspot.com',
    messagingSenderId: '203913453445',
    appId: '1:203913453445:web:df6ab17e05707534d92eec',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    authCheck();
  }, []);

  function authCheck() {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log('SignedIn');
        // ...
      } else {
        // User is signed out
        console.log('SignedOut');
        // ...
      }
    });
  }

  function logIn() {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  }

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
              onClick={logIn}
              className="flex flex-row items-end gap-2 text-xl"
            >
              <FiLogIn />
            </button>
            <button
              onClick={logOut}
              className="flex flex-row items-end gap-2 text-xl"
            >
              <FiLogOut />
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
