import { Translation } from './translation';
import { Review } from './review';
import { Step } from './step';
export class Word {
  id?: number;
  word!: string;
  language_alpha2code?: string;
  created_by_id?: number;
  step_id?: number;
  step?: Step;
  success_reviews_count?: number;
  fail_reviews_count?: number;
  total_reviews_count?: number;
  last_review?: string;
  archived!: boolean;
  created_at?: string;
  updated_at?: string;

  translations!: Translation[];
  reviews?: Review[];
}
