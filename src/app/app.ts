import { Component } from '@angular/core';
import { DiscountPipe } from './discount.pipe';
import { AppDisableAfterClickDirective } from './app-disable-after-click.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DiscountPipe, AppDisableAfterClickDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

