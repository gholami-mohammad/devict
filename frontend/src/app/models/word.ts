export class Word {
  id?: number;
  word!: string;
  language_alpha2code?: string;
  created_by_id?: number;
  step_id?: number;
  success_reviews_count?: number;
  fail_reviews_count?: number;
  total_reviews_count?: number;
  last_review?: string;
  archived!: boolean;
}
