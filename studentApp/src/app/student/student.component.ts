import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Student {
  id: number;
  name: string;
  age: number;
  photoUrl: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {

  students: Student[] = [
    {
      id: 1,
      name: "Ali",
      age: 20,
      photoUrl: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Sara",
      age: 22,
      photoUrl: "https://i.pravatar.cc/150?img=2"
    }
    
  ];

}