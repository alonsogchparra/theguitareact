import { useEffect, useState } from 'react';
import clickOne from '../media/sounds/click1.wav';

export const useMetronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    const click = new Audio(clickOne);

    if (isPlaying) {
      timer = setInterval(() => click.play(), (60 / bpm) * 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [bpm, isPlaying]);

  return { bpm, setBpm, isPlaying, setIsPlaying };
};
