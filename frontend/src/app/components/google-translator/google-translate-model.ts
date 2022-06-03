export interface Sentence {
  trans: string;
  orig: string;
  backend: number;
}

export interface Entry {
  word: string;
  reverse_translation: string[];
  score?: number;
}

export interface Dict {
  pos: string;
  terms: string[];
  entry: Entry[];
  base_form: string;
  pos_enum: number;
}

export interface Spell {
}

export interface LdResult {
  srclangs: string[];
  srclangs_confidences: number[];
  extended_srclangs: string[];
}

export interface GoogleTranslateResponse {
  sentences: Sentence[];
  dict: Dict[];
  src: string;
  confidence: number;
  spell: Spell;
  ld_result: LdResult;
}
