import { Api } from '@shikivost/api';
import { h } from 'preact';
import { currentRate, isAuthorized } from '../state';
import { RatingSelect } from './RatingSelect';
import { StatusSelect } from './StatusSelect';

const api = Api.create();

export function AnimeInfo() {
  if (!isAuthorized.value) {
    return null;
  }

  return (
    <div>
      <StatusSelect />
      {currentRate.value?.id && (
        <RatingSelect
          rating={currentRate.value?.score || 0}
          setRating={async (score) => {
            if (currentRate.value?.id) {
              currentRate.value = await api.setScore(
                currentRate.value.id,
                score
              );
            }
          }}
        />
      )}
    </div>
  );
}
