import { Injectable, signal, effect, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSignal = signal<'light' | 'dark'>('dark');
  currentTheme = this.currentThemeSignal.asReadonly();

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      this.currentThemeSignal.set(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentThemeSignal.set(prefersDark ? 'dark' : 'light');
    }

    // Effect to apply the correct theme class to document body
    effect(() => {
      const theme = this.currentThemeSignal();
      const body = this.document.body;
      if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        body.style.colorScheme = 'dark';
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        body.style.colorScheme = 'light';
      }
      localStorage.setItem('theme', theme);
    });
  }

  toggleTheme() {
    this.currentThemeSignal.update(theme => theme === 'light' ? 'dark' : 'light');
  }

  isDark(): boolean {
    return this.currentThemeSignal() === 'dark';
  }
}
