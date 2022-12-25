import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
// ng animation
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-root',
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(180deg)' })),
      transition('default => rotated', animate('400ms ease-in')),
      transition('rotated => default', animate('400ms ease-out'))
    ])
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular15';


  constructor(
    public router : Router,
  ) { }

  state: string = 'default';

  rotate(){
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
