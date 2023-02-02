import { useRef, MutableRefObject } from 'react';
import { useAppDispatch } from './App/hooks';

import { setSearchQuery, resetPage } from './App/hexaSlice';

export default function Search() {
  const dispatch = useAppDispatch();

  const input = useRef() as MutableRefObject<HTMLInputElement>;

  return (
    <form
      className="flex grow h-16"
      onSubmit={e => {
        e.preventDefault();
        console.log('submitted');
        dispatch(setSearchQuery(input.current.value));
        dispatch(resetPage());
      }}
    >
      <input
        ref={input}
        type="text"
        className="grow min-w-0 px-4 min-[480px]:text-xl rounded-l-md outline-none"
        placeholder="find awesome movies"
      />
      <button type="submit" className="w-16 bg-gray-400 rounded-r-md">
        Go!
      </button>
    </form>
  );
}
