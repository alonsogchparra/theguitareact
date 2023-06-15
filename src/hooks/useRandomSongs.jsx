import { useState } from 'react';
import { useMetronome } from 'react-metronome-hook';
import { key } from '../keys/youtube';
import youtube from '../api/youtube';
import click1 from '../media/sounds/click1.wav';
import click2 from '../media/sounds/click2.wav';

export const useRandomSongs = () => {
  const [musicList, setMusicList] = useState([]);
  const [copyMusicList, setCopyMusicList] = useState([]);
  const [musicItem, setMusicItem] = useState('');
  const [counter, setCounter] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // ----------- Video Random Elements ------------
  const [selectedVideo, setSelectedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoType, setVideoType] = useState('original');

  // ----------- BPM Random Elements ------------
  const [addBPM, setAddBPM] = useState(120);
  const [addBeatsPM, setAddBeatsPM] = useState(4);

  const regex = /^[0-9\b]+$/;

  //----------- NEW BPM ---------------

  const {
    startMetronome,
    isTicking,
    stopMetronome,
    bpm,
    setBpm,
    setBeatsPerMeasure,
    setSounds,
  } = useMetronome(120, 4, [click1, click2]);

  const getRandomNumber = (min, max) => {
    let stepOne = max - min;
    let stepTwo = Math.random() * stepOne;
    let result = Math.floor(stepTwo) + min;
    return result;
  };

  const getSong = () => {
    if (musicList.length === 0) {
      setMusicItem('');
    } else {
      setIsButtonPressed(true);
      let randomIndex = getRandomNumber(0, musicList.length);
      let randomSong = musicList[randomIndex];

      setMusicList(
        musicList.filter((music) => music.title !== randomSong.title)
      );

      setMusicItem(randomSong);
      setCounter(counter + 1);

      setAddBPM(
        randomSong?.beat_per_minute ? randomSong?.beat_per_minute : 120
      );
      setAddBeatsPM(
        randomSong?.beats_per_measure ? randomSong?.beats_per_measure : 4
      );
    }
  };

  // ----------- BPM Random Elements ------------
  const changeBPMHandler = (e) => {
    if (e.target.value === '' || regex.test(e.target.value)) {
      if (e.target.name === 'bpm') {
        setAddBPM(e.target.value);
      } else {
        setAddBeatsPM(e.target.value);
      }
    }
  };

  const startOver = () => {
    if (isTicking) {
      stopMetronome();
    }
    setMusicList(copyMusicList);
    setCounter(0);
    setMusicItem('');
    setIsButtonPressed(false);
  };

  // ----------- BPM Random Elements ------------
  const showVideoHandler = async (artist, title) => {
    let searchTerm;

    if (videoType === 'original') {
      searchTerm = `${title} ${artist}`;
    } else if (videoType === 'backing') {
      searchTerm = `${title} ${artist} backing track`;
    } else if (videoType === 'live') {
      searchTerm = `${title} ${artist} live`;
    }

    try {
      const response = await youtube.get('search', {
        params: {
          part: 'snippet',
          maxResult: 5,
          key,
          q: searchTerm,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.log('ERROR SEARCHING VIDEO', error);
    }
  };

  return {
    musicList,
    setMusicList,
    copyMusicList,
    setCopyMusicList,
    musicItem,
    setMusicItem,
    counter,
    setCounter,
    isButtonPressed,
    setIsButtonPressed,
    addBPM,
    setAddBPM,
    addBeatsPM,
    setAddBeatsPM,
    startMetronome,
    isTicking,
    stopMetronome,
    bpm,
    setBpm,
    setBeatsPerMeasure,
    setSounds,
    getRandomNumber,
    getSong,
    changeBPMHandler,
    startOver,
    selectedVideo,
    setSelectedVideo,
    videos,
    setVideos,
    videoType,
    setVideoType,
    showVideoHandler,
  };
};
