import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button 
      mat-icon-button 
      (click)="themeService.toggleTheme()" 
      class="theme-toggle-btn"
      aria-label="Toggle dark/light mode">
      <span class="material-symbols-outlined icon-animation">
        {{ themeService.isDark() ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      color: var(--text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      backdrop-filter: blur(8px);
      width: 40px;
      height: 40px;
      transition: all var(--transition-normal);
      
      &:hover {
        background: var(--border-color);
        transform: scale(1.05);
        color: #8b5cf6;
        border-color: rgba(139, 92, 246, 0.4);
      }
    }
    
    .icon-animation {
      font-size: 20px;
      transition: transform var(--transition-slow);
    }
    
    .theme-toggle-btn:hover .icon-animation {
      transform: rotate(360deg);
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}
}
