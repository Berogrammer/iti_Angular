import { Component, signal } from '@angular/core';
import { StudentComponent } from './student/student.component';
@Component({
  selector: 'app-root',  
  standalone: true,
  imports: [StudentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('studentApp');
}
