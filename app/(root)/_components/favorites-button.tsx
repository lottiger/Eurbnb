'use client';

interface FavoriteButtonProps {
  isFavorited: boolean;
  onToggle: () => void; // Callback-funktion för att hantera favoritlogiken
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorited, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-2 right-2 focus:outline-none"
      aria-label="Favoritknapp"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorited ? "red" : "rgba(0, 0, 0, 0.7)"} // Rött om favoritmarkerad, svagt svart annars
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
