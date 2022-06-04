import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.scss']
})
export class TextToSpeechComponent implements OnInit {
  @Input() text = '';
  constructor() { }

  ngOnInit(): void {
  }

  speak() {
    let synth = speechSynthesis;
    let utterance = new SpeechSynthesisUtterance(this.text);
    synth.speak(utterance);
  }

}
