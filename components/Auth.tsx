import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '@/components/App/hooks';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import { setSignedIn, setFavoriteMovies } from '@/components/App/hexaSlice';

import { updateUser, fetchFavoriteMovies } from './firebase';

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDcZV0jOUp8kR0f37kEjlpx5ETD32I86gs',
  authDomain: 'hexa-f88fc.firebaseapp.com',
  projectId: 'hexa-f88fc',
  storageBucket: 'hexa-f88fc.appspot.com',
  messagingSenderId: '203913453445',
  appId: '1:203913453445:web:df6ab17e05707534d92eec',
  databaseURL: 'https://hexa-f88fc-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Auth() {
  const [email, setEmail] = useState<string | null>('');
  const [avatarURL, setAvatarURL] = useState<string | null>('');
  const { signedIn } = useAppSelector(state => state.hexa);
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, []);

  function authCheck() {
    onAuthStateChanged(auth, async user => {
      if (user) {
        const uid = user.uid;
        dispatch(setSignedIn(true));
        setEmail(user.email);
        setAvatarURL(user.photoURL);
        document.cookie = `uid=${uid}; path=/`;
        const favoriteMovies = await fetchFavoriteMovies(document.cookie.slice(4));
        favoriteMovies && dispatch(setFavoriteMovies(favoriteMovies));
      } else {
        dispatch(setSignedIn(false));
        document.cookie = `uid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      }
    });
  }

  async function logIn() {
    signInWithPopup(auth, provider)
      .then(result => {
        const { uid, email } = result.user;
        updateUser(uid, email);
        console.log('signedIn');
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function logOut() {
    signOut(auth)
      .then(() => {
        console.log('signedOut');
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="flex gap-4 h-12 ml-auto">
      {signedIn && (
        <button
          onClick={() => router.push('/favorites')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full cursor-pointer"
        >
          <div className="max-[768px]:hidden ">{email}</div>
          <img
            src={avatarURL ? avatarURL : undefined}
            alt="user photo"
            width="32"
            className="rounded-full"
          />
        </button>
      )}
      <button
        onClick={!signedIn ? logIn : logOut}
        className="p-2 bg-gray-200 rounded-xl cursor-pointer"
      >
        <IconContext.Provider
          value={{
            size: '32px',
          }}
        >
          {!signedIn ? <FiLogIn /> : <FiLogOut />}
        </IconContext.Provider>
      </button>
    </div>
  );
}
