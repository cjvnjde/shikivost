import { Score } from './Score';

export type Rate = {
  id: number;
  user_id: number;
  target_id: number;
  target_type: string;
  score: Score;
  status: string;
  rewatches: number;
  episodes: number;
  volumes: number;
  chapters: number;
  text: any;
  text_html: string;
  created_at: string;
  updated_at: string;
};
