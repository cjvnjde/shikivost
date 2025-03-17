import {
  IconLoader2,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useSetScore } from "../../../api/mutations/useSetScore";
import { useRating } from "../../../api/queries/useRating";
import { Score } from "../../../api/types/Score";

export function RatingSelect() {
  const container = useRef<HTMLDivElement>(null);
  const { data: rating } = useRating();
  const { mutate: setRating, isPending } = useSetScore(rating?.id);
  const score = rating?.score ?? 0;

  const [localRating, setLocalRating] = useState<number>(score);

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

  const onMouseMove = useCallback(
    (event: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
      const rect = container.current?.getBoundingClientRect();

      const x = event.clientX - (rect?.left || 0);
      const p = (x * 100) / (rect?.width || 1);

      const percent = Math.ceil(p / 10) * 10;

      setLocalRating(percent / 10);
    },
    [],
  );

  const onMouseLeave = useCallback(() => setLocalRating(score), [score]);

  return (
    <div className="rating-select-container">
      <div
        ref={container}
        className="rating-stars-container"
        onClick={() => setRating(localRating as Score)}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
      >
        {stars}
      </div>
      <span className="rating-value">
        {isPending ? (
          <IconLoader2 size={16} className="loading" />
        ) : (
          localRating
        )}
      </span>
    </div>
  );
}
