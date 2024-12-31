export default function ProgressBar({ progress, onChange }) {
  const handleClick = (e) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;
    onChange(x / width);
  };

  return (
    <div 
      className="h-2 bg-gray-200 rounded-full cursor-pointer"
      onClick={handleClick}
    >
      <div 
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}