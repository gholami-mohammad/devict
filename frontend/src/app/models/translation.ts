import { Word } from "./word";

export class Translation {
  id?: number;
  word_id!: number;
  word?: Word;
  part_of_speech_name?: string;
  language_alpha2code!: string;
  created_by_id?: number;
  translation!: string;
  definition?: string;
  example?: string;
  step_id?: number;
  success_reviews_count!: number;
  fail_reviews_count!: number;
  total_reviews_count!: number;
  last_review!: number;
  archived!: number;
  created_at?: string;
  updated_at?: string;
}
