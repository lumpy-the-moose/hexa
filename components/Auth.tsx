import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector, useAppDispatch } from '../components/App/hooks';
import { IconContext } from 'react-icons';
import { FiLogIn, FiLogOut } from 'react-icons/fi';

import { setSignedIn, setFavoriteMovies } from '@/components/App/hexaSlice';

import { updateUser, fetchFavoriteMovies } from './dBase';

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

// Initialize Firebase

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
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(setSignedIn(true));
        setEmail(user.email);
        setAvatarURL(user.photoURL);
        console.log('SignedIn');
        document.cookie = `uid=${uid}; path=/`;
        const favoriteMovies = await fetchFavoriteMovies(document.cookie.slice(4));
        favoriteMovies && dispatch(setFavoriteMovies(favoriteMovies));

        // ...
      } else {
        // User is signed out
        dispatch(setSignedIn(false));
        console.log('SignedOut');
        document.cookie = `uid=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        // ...
      }
    });
  }

  async function logIn() {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const { uid, email } = result.user;
        updateUser(uid, email);
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

  async function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
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
