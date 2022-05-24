import { Component, Input, OnInit } from '@angular/core';
import { Translation } from 'src/app/models/translation';

@Component({
  selector: 'app-word-translations-index-render',
  templateUrl: './word-translations-index-render.component.html',
  styleUrls: ['./word-translations-index-render.component.scss']
})
export class WordTranslationsIndexRenderComponent implements OnInit {
  @Input() translations: Translation[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
