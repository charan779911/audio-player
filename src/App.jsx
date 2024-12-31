import AudioPlayer from './components/AudioPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <AudioPlayer
        src="/demo-song.mp3"
        title="Demo Song"
      />
    </div>
  );
}