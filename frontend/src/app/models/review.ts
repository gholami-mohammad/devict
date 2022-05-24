import { Step } from "./step";

export class Review {
  id?: number;
  review_type!: ReviewType;
  item_id!: number;
  step_id!: number;
  step?: Step;
  remembered!: boolean;
  created_at?: string;
  updated_at?: string;
}

export enum ReviewType {
  Word = 'w',
  Translation = 't',
}
