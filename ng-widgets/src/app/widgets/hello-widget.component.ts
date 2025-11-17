import { Component, Input } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-hello-widget',
  imports: [
    DatePipe
  ],
  template: `
    <div style="border:1px solid #ddd; padding:12px; border-radius:8px;">
      <h3 style="margin-top:0;">Hello, {{ name || 'world' }}!</h3>
      <p>Today is {{ today | date:'fullDate' }}.</p>
    </div>
  `
})
export class HelloWidgetComponent {
  @Input() name = '';
  today = new Date();
}
