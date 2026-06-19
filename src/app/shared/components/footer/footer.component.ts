import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <footer class="footer-wrapper">
      <div class="container footer-grid">
        <!-- Brand Info -->
        <div class="brand-info">
          <a routerLink="/" class="logo logo-flex">
            <img src="images/logo.jpg" alt="Ashan TechLabs Logo" class="logo-img" />
            <span class="logo-text">Ashan <span class="logo-accent">TechLabs</span></span>
          </a>
          <p class="brand-desc">
            Premium custom software development, ERP systems, web development, IoT solutions, and business automation.
          </p>
          <div class="social-links">
            <a href="https://linkedin.com" target="_blank" class="social-icon" aria-label="LinkedIn">
              <i class="social-svg-icon"><span class="material-symbols-outlined">network_node</span></i>
            </a>
            <a href="https://github.com" target="_blank" class="social-icon" aria-label="GitHub">
              <i class="social-svg-icon"><span class="material-symbols-outlined">terminal</span></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon" aria-label="Twitter">
              <i class="social-svg-icon"><span class="material-symbols-outlined">campaign</span></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3 class="link-title">Navigation</h3>
          <ul class="link-list">
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about">About</a></li>
            <li><a routerLink="/services">Services</a></li>
            <li><a routerLink="/skills">Skills</a></li>
          </ul>
        </div>

        <!-- Secondary Links -->
        <div class="footer-links">
          <h3 class="link-title">Resources</h3>
          <ul class="link-list">
            <li><a routerLink="/projects">Projects</a></li>
            <li><a routerLink="/experience">Timeline</a></li>
            <li><a routerLink="/testimonials">Testimonials</a></li>
            <li><a routerLink="/blog">Blog</a></li>
          </ul>
        </div>

        <!-- Contact/Newsletter Info -->
        <div class="footer-contact">
          <h3 class="link-title">Get in Touch</h3>
          <p class="contact-text">Have a project or partnership in mind? Let's connect.</p>
          <a routerLink="/contact" class="btn-premium primary footer-cta">Let's Talk</a>
        </div>
      </div>

      <div class="container footer-bottom">
        <p>&copy; {{ currentYear }} Ashan TechLabs. All rights reserved.</p>
        <div class="bottom-links">
          <a href="#">Privacy Policy</a>
          <span>&middot;</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: var(--surface-solid);
      border-top: 1px solid var(--border-color);
      padding: 80px 0 32px 0;
      margin-top: auto;
      transition: background-color var(--transition-normal);
      
      @media (max-width: 768px) {
        padding: 48px 0 24px 0;
      }
    }
    
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 2fr;
      gap: 48px;
      margin-bottom: 60px;
      
      @media (max-width: 1024px) {
        grid-template-columns: 1fr 1fr;
        gap: 32px;
      }
      
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
    
    .brand-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .logo {
      font-family: var(--font-heading);
      color: var(--text-primary);
      
      .logo-accent {
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    .logo-flex {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .logo-img {
      height: 38px;
      width: auto;
      border-radius: var(--border-radius-xs);
    }
    .logo-text {
      font-size: 1.25rem;
      font-weight: 800;
      letter-spacing: -0.03em;
    }
    
    .brand-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 320px;
    }
    
    .social-links {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }
    
    .social-icon {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      color: var(--text-secondary);
      transition: all var(--transition-fast);
      
      &:hover {
        background: var(--primary-gradient);
        color: white;
        border-color: transparent;
        transform: translateY(-2px);
      }
    }
    
    .social-svg-icon {
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .link-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .link-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      
      a {
        font-size: 0.95rem;
        color: var(--text-secondary);
        
        &:hover {
          color: #a855f7;
        }
      }
    }
    
    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
    
    .contact-text {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 280px;
    }
    
    .footer-cta {
      padding: 10px 24px;
      font-size: 0.9rem;
    }
    
    .footer-bottom {
      border-top: 1px solid var(--border-color);
      padding-top: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      color: var(--text-muted);
      
      @media (max-width: 640px) {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }
      
      a:hover {
        color: var(--text-secondary);
      }
    }
    
    .bottom-links {
      display: flex;
      gap: 12px;
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
