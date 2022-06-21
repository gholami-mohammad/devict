import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-the-text',
  templateUrl: './google-the-text.component.html',
  styleUrls: ['./google-the-text.component.scss']
})
export class GoogleTheTextComponent implements OnInit {

  @Input() text: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
