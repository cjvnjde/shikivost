import { useMemo, useRef, useState } from 'preact/hooks';
import { Score } from '../../../api/src/types/Score';

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
        return <StarFilled key={index} />;
      }

      if (index === starCount && halfStar) {
        return <StarHalfFilled key={index} />;
      }

      return <Star key={index} />;
    });
  }, [localRating]);

  const container = useRef<HTMLDivElement>(null);

  return (
    <div className="rating-select-container">
      <div
        ref={container}
        className="rating-select"
        onClick={() => setRating(localRating as Score)}
        onMouseLeave={() => setLocalRating(rating)}
        onMouseMove={(event) => {
          const rect = container.current.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const p = (x * 100) / rect.width;

          const percent = Math.ceil(p / 10) * 10;

          setLocalRating(percent / 10);
        }}
      >
        {stars}
      </div>
      <span className="rating-select-text">{localRating}</span>
    </div>
  );
}

function StarFilled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-star-filled"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
        stroke-width="0"
        fill="currentColor"
      />
    </svg>
  );
}

function StarHalfFilled() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-star-half-filled"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 1a.993 .993 0 0 1 .823 .443l.067 .116l2.852 5.781l6.38 .925c.741 .108 1.08 .94 .703 1.526l-.07 .095l-.078 .086l-4.624 4.499l1.09 6.355a1.001 1.001 0 0 1 -1.249 1.135l-.101 -.035l-.101 -.046l-5.693 -3l-5.706 3c-.105 .055 -.212 .09 -.32 .106l-.106 .01a1.003 1.003 0 0 1 -1.038 -1.06l.013 -.11l1.09 -6.355l-4.623 -4.5a1.001 1.001 0 0 1 .328 -1.647l.113 -.036l.114 -.023l6.379 -.925l2.853 -5.78a.968 .968 0 0 1 .904 -.56zm0 3.274v12.476a1 1 0 0 1 .239 .029l.115 .036l.112 .05l4.363 2.299l-.836 -4.873a1 1 0 0 1 .136 -.696l.07 -.099l.082 -.09l3.546 -3.453l-4.891 -.708a1 1 0 0 1 -.62 -.344l-.073 -.097l-.06 -.106l-2.183 -4.424z"
        stroke-width="0"
        fill="currentColor"
      />
    </svg>
  );
}

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-star"
      width="25"
      height="25"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
    </svg>
  );
}
