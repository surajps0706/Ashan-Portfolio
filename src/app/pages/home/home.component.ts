import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypingEffectComponent } from '../../shared/components/typing-effect/typing-effect.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, TypingEffectComponent, MatButtonModule, MatIconModule],
  template: `
    <section class="hero-section container">
      <!-- Background Glowing Shapes -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-1"></div>
        <div class="mesh-blob blob-2"></div>
        <div class="mesh-blob blob-3"></div>
      </div>

      <div class="hero-content">
        <!-- Badge -->
        <div class="availability-badge">
          <span class="status-dot"></span>
          <span>Available for consulting & contracts</span>
        </div>

        <!-- Hero Text -->
        <h1 class="hero-title">
          We are <span class="gradient-text">Ashan TechLabs</span>
        </h1>
        
        <h2 class="hero-subtitle">
          We are <app-typing-effect [words]="['Custom Software Builders', 'ERP Platform Experts', 'IoT Systems Architects', 'Full-Stack Developers']"></app-typing-effect>
        </h2>

        <p class="hero-description">
          We design and architect high-performance enterprise applications, custom ERP databases, scalable IoT systems, and pixel-perfect mobile apps for businesses and startups.
        </p>

        <!-- CTA Buttons -->
        <div class="hero-actions">
          <a routerLink="/projects" class="btn-premium primary">
            <span>View Projects</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
          <a routerLink="/contact" class="btn-premium secondary">
            <span>Contact Us</span>
            <span class="material-symbols-outlined">mail</span>
          </a>
        </div>
      </div>

      <!-- Hero Visual (Profile Picture / Tech Grid) -->
      <div class="hero-visual">
        <div class="visual-wrapper glass-card">
          <div class="image-overlay"></div>
          <img src="images/logo.jpg" alt="Ashan TechLabs Logo" class="profile-img" />
          <div class="tech-tag tag-angular"><span class="tech-icon">🅰️</span> Angular</div>
          <div class="tech-tag tag-node"><span class="tech-icon">🟢</span> Node.js</div>
          <div class="tech-tag tag-cloud"><span class="tech-icon">☁️</span> AWS</div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: calc(100vh - 120px);
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      align-items: center;
      gap: 48px;
      position: relative;
      
      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        text-align: center;
        padding-top: 40px;
        padding-bottom: 40px;
        gap: 48px;
      }
    }
    
    .hero-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      z-index: 10;
      
      @media (max-width: 1024px) {
        align-items: center;
      }
    }
    
    .availability-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 16px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      backdrop-filter: blur(8px);
      
      .status-dot {
        width: 8px;
        height: 8px;
        background-color: var(--success-color);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--success-color);
        animation: pulse 2s infinite;
      }
    }
    
    @keyframes pulse {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    
    .hero-title {
      font-size: 4rem;
      line-height: 1.1;
      font-weight: 850;
      letter-spacing: -0.04em;
      
      @media (max-width: 768px) {
        font-size: 3rem;
      }
    }
    
    .hero-subtitle {
      font-size: 2rem;
      font-weight: 600;
      color: var(--text-secondary);
      min-height: 48px;
      
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
    
    .hero-description {
      font-size: 1.25rem;
      line-height: 1.6;
      color: var(--text-secondary);
      max-width: 600px;
      
      @media (max-width: 1024px) {
        margin: 0 auto;
      }
    }
    
    .hero-actions {
      display: flex;
      gap: 16px;
      margin-top: 12px;
      
      @media (max-width: 640px) {
        flex-direction: column;
        width: 100%;
        a { width: 100%; }
      }
    }
    
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 5;
    }
    
    .visual-wrapper {
      position: relative;
      width: 380px;
      height: 380px;
      border-radius: var(--border-radius-xl);
      overflow: visible !important;
      display: flex;
      align-items: center;
      justify-content: center;
      
      @media (max-width: 768px) {
        width: 280px;
        height: 280px;
      }
    }
    
    .profile-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #ffffff;
      padding: 24px;
      border-radius: var(--border-radius-xl);
    }
    
    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(99, 102, 241, 0.15), transparent);
      z-index: 2;
      border-radius: var(--border-radius-xl);
      pointer-events: none;
    }
    
    // Tech Floating Tags
    .tech-tag {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 18px;
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-lg);
      font-weight: 700;
      font-size: 0.9rem;
      z-index: 10;
      animation: float 6s ease-in-out infinite;
      
      &.tag-angular {
        top: 15%;
        left: -15%;
        animation-delay: 0s;
        
        @media (max-width: 768px) {
          left: -5%;
        }
      }
      
      &.tag-node {
        bottom: 20%;
        right: -15%;
        animation-delay: 2s;
        
        @media (max-width: 768px) {
          right: -5%;
        }
      }
      
      &.tag-cloud {
        bottom: -5%;
        left: 20%;
        animation-delay: 4s;
      }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
      100% { transform: translateY(0px); }
    }
  `]
})
export class HomeComponent { }
