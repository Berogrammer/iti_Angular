import { Component } from '@angular/core';
import { CoursesComponent } from './courses/courses';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoursesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
