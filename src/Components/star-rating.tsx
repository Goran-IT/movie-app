import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating= ({ rating, onRatingChange }:StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  return (
    <div>
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1;

        return (
          <FaStar
            key={index}
            size={24}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
            color={(hoverRating || rating) >= starValue ? '#ffc107' : '#e4e5e9'}
          />
        );
      })}
    </div>
  );
};

export default StarRating;