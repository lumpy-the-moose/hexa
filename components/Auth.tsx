import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

export default function Auth() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState<string | null>('');
  const [avatarURL, setAvatarURL] = useState<string | null>('');

  const router = useRouter();

  useEffect(() => {
    authCheck();
  }, []);

  function authCheck() {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setSignedIn(true);
        setEmail(user.email);
        setAvatarURL(user.photoURL);
        console.log(user);
        // ...
      } else {
        // User is signed out
        setSignedIn(false);
        console.log('SignedOut');
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
        const user = result.user;
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
    <div className="flex gap-4 ml-auto">
      {signedIn && (
        <button
          onClick={() => router.push('/favorites')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full cursor-pointer"
        >
          {email}
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
