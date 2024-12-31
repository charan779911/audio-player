import { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';
import { formatTime } from '../utils/timeFormat';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default function AudioPlayer({ src, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration));
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    
    return () => {
      audio.removeEventListener('loadedmetadata', () => setDuration(audio.duration));
      audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (value) => {
    const time = value * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <audio ref={audioRef} src={src} />
      
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
      
      <ProgressBar 
        progress={currentTime / duration} 
        onChange={handleProgress}
      />
      
      <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={togglePlay}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 focus:outline-none"
        >
          {isPlaying ? (
            <PauseIcon className="h-6 w-6" />
          ) : (
            <PlayIcon className="h-6 w-6" />
          )}
        </button>
        
        <VolumeControl value={volume} onChange={handleVolume} />
      </div>
    </div>
  );
}