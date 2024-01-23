import { h } from 'preact';
import { isAuthorized } from '../state';
import { StatusSelect } from './StatusSelect';

export function AnimeInfo() {
  return <div>{isAuthorized.value && <StatusSelect />}</div>;
}
