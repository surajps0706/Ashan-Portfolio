import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="floating-actions-container">
      <!-- Back to Top Button -->
      <button 
        *ngIf="showBackToTop()" 
        mat-fab 
        (click)="scrollToTop()" 
        class="action-btn back-to-top" 
        aria-label="Back to top">
        <span class="material-symbols-outlined">arrow_upward</span>
      </button>

      <!-- Email quick contact -->
      <a 
        href="mailto:support&#64;ashantechlabs.com?subject=Project Inquiry" 
        mat-fab 
        class="action-btn email-btn" 
        aria-label="Email Ashan TechLabs">
        <span class="material-symbols-outlined">mail</span>
      </a>

      <!-- WhatsApp Floating Button -->
      <a 
        href="https://wa.me/919840067650?text=Hi Ashan TechLabs, I would like to discuss a project with you." 
        target="_blank" 
        mat-fab 
        class="action-btn whatsapp-btn" 
        aria-label="Chat on WhatsApp">
        <!-- SVG WhatsApp Icon -->
        <svg class="whatsapp-svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M12.012 2c-5.506 0-9.988 4.482-9.988 9.988 0 1.761.46 3.473 1.333 4.981L2 22l5.23-1.373c1.455.794 3.09 1.213 4.774 1.216h.004c5.505 0 9.988-4.482 9.988-9.988 0-2.671-1.04-5.181-2.928-7.07C17.202 2.924 14.69 2 12.012 2zm0 1.666c2.228 0 4.321.868 5.895 2.443 1.574 1.575 2.441 3.668 2.441 5.897 0 4.593-3.738 8.331-8.331 8.331-.1.002-.294.004-.393-.002-1.503-.003-2.98-.403-4.275-1.157l-.307-.183-3.179.834.848-3.098-.2-.319c-.83-1.32-1.268-2.854-1.268-4.432.001-4.592 3.74-8.33 8.333-8.33v-.002zM9.47 7.7c-.172-.379-.356-.387-.522-.394-.136-.006-.293-.006-.45-.006-.157 0-.413.06-.629.294-.216.236-.824.805-.824 1.963 0 1.158.843 2.277.96 2.434.118.158 1.66 2.534 4.022 3.553.562.242 1.001.387 1.344.496.565.179 1.079.154 1.485.093.454-.069 1.393-.57 1.59-.122.197-.449.197-.834.197-.899.001-.065-.008-.121-.059-.153-.051-.033-.3-.148-.629-.312s-1.393-.687-1.492-.722c-.098-.035-.17-.051-.242.051-.072.102-.28.349-.343.42-.063.07-.126.079-.294-.005-.168-.085-.71-.262-1.353-.836-.5-.446-.838-.997-.936-1.165-.098-.168-.01-.259.073-.343.076-.076.168-.196.252-.294.084-.098.112-.168.168-.28.056-.112.028-.21-.014-.294s-.522-1.359-.728-1.802z"/>
        </svg>
      </a>
    </div>
  `,
  styles: [`
    .floating-actions-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      z-index: 1000;
      pointer-events: auto;
      
      @media (max-width: 768px) {
        bottom: 16px;
        right: 16px;
        gap: 8px;
      }
    }
    
    .action-btn {
      transition: all var(--transition-normal) !important;
      color: white !important;
      
      &:hover {
        transform: translateY(-4px) scale(1.05);
        box-shadow: var(--shadow-lg);
      }
    }
    
    .back-to-top {
      background: var(--card-bg) !important;
      color: var(--text-primary) !important;
      border: 1px solid var(--border-color);
      backdrop-filter: blur(8px);
      
      &:hover {
        background: var(--border-color) !important;
      }
    }
    
    .email-btn {
      background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%) !important;
      box-shadow: 0 4px 15px rgba(168, 85, 247, 0.4) !important;
    }
    
    .whatsapp-btn {
      background: #25d366 !important;
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4) !important;
    }
    
    .whatsapp-svg {
      display: block;
    }
  `]
})
export class FloatingActionsComponent {
  showBackToTop = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showBackToTop.set(scrollOffset > 400);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
