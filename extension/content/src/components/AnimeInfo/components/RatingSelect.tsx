import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import { useMemo, useRef, useState } from "react";
import { Score } from "../../../api/types/Score";

type RatingSelectProps = {
  rating: Score;
  setRating: (rating: Score) => void;
};

export function RatingSelect({ rating, setRating }: RatingSelectProps) {
  const [localRating, setLocalRating] = useState<number>(rating);

  const stars = useMemo(() => {
    const starCount = Math.floor(localRating / 2);
    const halfStar = starCount !== localRating / 2;

    return Array.from({ length: 5 }, (_, index) => {
      if (index < starCount) {
        return <IconStarFilled key={index} />;
      }

      if (index === starCount && halfStar) {
        return <IconStarHalfFilled key={index} />;
      }

      return <IconStar key={index} />;
    });
  }, [localRating]);

  const container = useRef<HTMLDivElement>(null);

  return (
    <div className="rating-select-container">
      <div
        ref={container}
        className="rating-stars-container"
        onClick={() => setRating(localRating as Score)}
        onMouseLeave={() => setLocalRating(rating)}
        onMouseMove={(event) => {
          const rect = container.current?.getBoundingClientRect();

          const x = event.clientX - (rect?.left || 0);
          const p = (x * 100) / (rect?.width || 1);

          const percent = Math.ceil(p / 10) * 10;

          setLocalRating(percent / 10);
        }}
      >
        {stars}
      </div>
      <span className="rating-value">{localRating}</span>
    </div>
  );
}
