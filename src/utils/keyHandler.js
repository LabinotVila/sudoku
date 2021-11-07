import { useRef, useEffect } from 'react';


export default function useKey(key, cb) {
  const callbackRef = useRef(cb)

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(event) {
      if (event.which === 38 || event.which === 40) event.preventDefault();

      if (event.which === key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key])
}
