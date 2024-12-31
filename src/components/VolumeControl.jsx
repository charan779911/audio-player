import { SpeakerWaveIcon } from '@heroicons/react/24/solid';

export default function VolumeControl({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <SpeakerWaveIcon className="h-5 w-5 text-gray-600" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-24"
      />
    </div>
  );
}