import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ScrollProgressComponent } from '../scroll-progress/scroll-progress.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ThemeToggleComponent,
    ScrollProgressComponent,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <!-- Floating Logo -->
    <a routerLink="/" class="floating-logo">
      <img src="images/logo.png" alt="Ashan TechLabs Logo" class="logo-img" />
    </a>

    <header class="navbar-wrapper">
      <app-scroll-progress></app-scroll-progress>
      <div class="navbar-container">
        <!-- Desktop Navigation Links -->
        <nav class="desktop-menu">
          <a *ngFor="let link of navLinks" 
             [routerLink]="link.path" 
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: link.exact}"
             class="nav-link">
            {{ link.label }}
          </a>
        </nav>

        <!-- Right Side Actions -->
        <div class="actions">
          <app-theme-toggle></app-theme-toggle>
          <a routerLink="/contact" class="btn-premium primary nav-cta">Contact Us</a>
          
          <!-- Mobile Menu Button -->
          <button mat-icon-button (click)="toggleMobileMenu()" class="mobile-menu-btn" aria-label="Toggle menu">
            <span class="material-symbols-outlined">
              {{ isMobileMenuOpen() ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="isMobileMenuOpen()">
        <nav class="mobile-nav">
          <a *ngFor="let link of navLinks" 
             [routerLink]="link.path" 
             routerLinkActive="active"
             [routerLinkActiveOptions]="{exact: link.exact}"
             (click)="closeMobileMenu()"
             class="mobile-nav-link">
            {{ link.label }}
          </a>
          <a routerLink="/contact" (click)="closeMobileMenu()" class="btn-premium primary mobile-cta">Contact Us</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .floating-logo {
      position: fixed;
      top: 18px;
      left: 48px;
      height: 72px;
      z-index: 1001;
      display: flex;
      align-items: center;
      text-decoration: none;
      transition: all var(--transition-normal);
      
      @media (max-width: 1024px) {
        top: 14px;
        left: 24px;
        height: 56px;
      }
    }
    
    .logo-img {
      height: 100%;
      width: auto;
      border-radius: var(--border-radius-xs);
      transition: all var(--transition-normal);
    }
    
    :host-context(.dark-theme) .logo-img {
      filter: invert(1) brightness(1.2);
    }

    .navbar-wrapper {
      position: fixed;
      top: 24px;
      left: 60%;
      transform: translateX(-50%);
      height: 60px;
      width: fit-content;
      background: var(--card-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--card-border);
      border-radius: var(--border-radius-full);
      box-shadow: var(--shadow-md);
      z-index: 1000;
      transition: all var(--transition-normal);
      display: flex;
      align-items: center;
      
      @media (max-width: 1024px) {
        top: 16px;
        right: 24px;
        left: auto;
        transform: none;
        height: 52px;
      }
    }
    
    .navbar-container {
      display: flex;
      align-items: center;
      gap: 16px;
      height: 100%;
      padding: 0 16px !important;
      
      @media (max-width: 768px) {
        padding: 0 12px !important;
        gap: 8px;
      }
    }
    
    .desktop-menu {
      display: flex;
      align-items: center;
      gap: 8px;
      
      @media (max-width: 1024px) {
        display: none;
      }
    }
    
    .nav-link {
      padding: 8px 16px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-secondary);
      border-radius: var(--border-radius-full);
      transition: all var(--transition-fast);
      position: relative;
      white-space: nowrap;
      
      &:hover {
        color: var(--text-primary);
        background: var(--border-color);
      }
      
      &.active {
        color: #a855f7;
        background: rgba(168, 85, 247, 0.08);
        font-weight: 600;
      }
    }
    
    .actions {
      display: flex;
      align-items: center;
      gap: 16px;
      
      @media (max-width: 768px) {
        gap: 8px;
      }
    }
    
    .nav-cta {
      padding: 8px 20px;
      font-size: 0.85rem;
      
      @media (max-width: 1024px) {
        display: none;
      }
    }
    
    .mobile-menu-btn {
      display: none;
      color: var(--text-primary);
      
      @media (max-width: 1024px) {
        display: inline-flex;
      }
    }
    
    // Mobile Drawer
    .mobile-drawer {
      position: fixed;
      top: 80px;
      right: 24px;
      left: auto;
      width: 280px;
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 24px;
      box-shadow: var(--shadow-xl);
      transform: translateY(-20px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 999;
      
      @media (max-width: 480px) {
        width: calc(100% - 48px);
        left: 24px;
        right: 24px;
      }
      
      &.open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
    
    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .mobile-nav-link {
      padding: 12px 16px;
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-secondary);
      border-radius: var(--border-radius-md);
      transition: all var(--transition-fast);
      
      &:hover {
        color: var(--text-primary);
        background: var(--border-color);
      }
      
      &.active {
        color: #a855f7;
        background: rgba(168, 85, 247, 0.08);
      }
    }
    
    .mobile-cta {
      margin-top: 12px;
      width: 100%;
      padding: 12px;
    }
  `]
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);

  navLinks = [
    { path: '/', label: 'Home', exact: true },
    { path: '/about', label: 'About', exact: false },
    { path: '/services', label: 'Services', exact: false },
    { path: '/skills', label: 'Skills', exact: false },
    { path: '/projects', label: 'Projects', exact: false },
    { path: '/experience', label: 'Timeline', exact: false },
    { path: '/testimonials', label: 'Testimonials', exact: false },
    // { path: '/blog', label: 'Blog', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
