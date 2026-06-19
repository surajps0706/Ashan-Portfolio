import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="scroll-progress-bar" 
      [style.width.%]="progress()">
    </div>
  `,
  styles: [`
    .scroll-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: var(--primary-gradient);
      z-index: 9999;
      transition: width 0.1s ease-out;
      box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
    }
  `]
})
export class ScrollProgressComponent {
  progress = signal(0);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const docElement = document.documentElement;
    const docBody = document.body;
    
    const scrollTop = docElement.scrollTop || docBody.scrollTop;
    const scrollHeight = docElement.scrollHeight || docBody.scrollHeight;
    const clientHeight = docElement.clientHeight;
    
    const totalScrollable = scrollHeight - clientHeight;
    if (totalScrollable > 0) {
      this.progress.set((scrollTop / totalScrollable) * 100);
    } else {
      this.progress.set(0);
    }
  }
}
