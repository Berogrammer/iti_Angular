import { Component, signal, computed } from '@angular/core';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  seats: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class CoursesComponent {
  courses = signal<Course[]>([
    {
      id: 1,
      title: 'Angular Fundamentals',
      instructor: 'John Doe',
      price: 199,
      seats: 25,
      image: 'https://via.placeholder.com/300x200/4285f4/ffffff?text=Angular',
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced TypeScript',
      instructor: 'Jane Smith',
      price: 249,
      seats: 18,
      image: 'https://via.placeholder.com/300x200/34a853/ffffff?text=TypeScript',
      category: 'Programming'
    },
    {
      id: 3,
      title: 'React Mastery',
      instructor: 'Bob Johnson',
      price: 229,
      seats: 12,
      image: 'https://via.placeholder.com/300x200/fbbc04/000000?text=React',
      category: 'Programming'
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Alice Brown',
      price: 179,
      seats: 30,
      image: 'https://via.placeholder.com/300x200/ea4335/ffffff?text=UI/UX',
      category: 'Design'
    },
    {
      id: 5,
      title: 'Figma Advanced',
      instructor: 'Charlie Wilson',
      price: 199,
      seats: 8,
      image: 'https://via.placeholder.com/300x200/ffffff/000000?text=Figma',
      category: 'Design'
    },
    {
      id: 6,
      title: 'Business Strategy Essentials',
      instructor: 'Diana Davis',
      price: 299,
      seats: 15,
      image: 'https://via.placeholder.com/300x200/9aa0de/ffffff?text=Business',
      category: 'Business'
    }
  ]);

  selectedCategory = signal<'All' | 'Programming' | 'Design' | 'Business'>('All');

  filteredCourses = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'All' 
      ? this.courses() 
      : this.courses().filter(course => course.category === cat);
  });


  register(courseId: number) {
    this.courses.update(courses => 
      courses.map(course => 
        course.id === courseId 
          ? { ...course, seats: Math.max(0, course.seats - 1) }
          : course
      )
    );
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory.set(select.value as 'All' | 'Programming' | 'Design' | 'Business');
  }
}
