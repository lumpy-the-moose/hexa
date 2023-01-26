import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update, child, get } from 'firebase/database';

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
const database = getDatabase(app);

export function updateUser(userId: string, email: string | null) {
  update(ref(database, 'users/' + userId), {
    email: email,
  });
}

export function addFavoriteMovie(userId: string, movie: Movie) {
  if (userId) {
    const updates: any = {};
    updates['users/' + userId + '/favoriteMovies/' + movie.id] = movie;
    update(ref(database), updates);
  } else {
    console.log('%cPlease LogIn', 'color: green');
  }
}

export async function fetchFavoriteMovies(uid: string): Promise<any> {
  const favoriteMoviesRef = ref(getDatabase());

  return await get(child(favoriteMoviesRef, `users/${uid}/favoriteMovies/`)).then(
    snapshot => {
      if (snapshot.exists()) {
        console.log(Object.values(snapshot.val()));
        return Object.values(snapshot.val());
      } else {
        console.log('No data available');
      }
    }
  );
}
