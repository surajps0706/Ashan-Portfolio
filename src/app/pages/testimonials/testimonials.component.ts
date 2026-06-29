import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-2" style="top: 20%; left: 15%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Testimonials</span>
        <h2 class="title">What My Clients & Partners Say</h2>
        <p class="desc">
          Reviews and feedback from startup founders, product managers, and enterprise directors I've collaborated with.
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="carousel-container glass-card" (mouseenter)="pause()" (mouseleave)="resume()">
        
        <!-- Active Slide Wrapper -->
        <div class="slide-wrapper" [style.transform]="'translateX(' + (-activeIdx() * 100) + '%)'">
          <div *ngFor="let item of testimonials" class="slide-item">
            <div class="slide-content">
              <!-- Rating Stars -->
              <div class="rating-box">
                <span *ngFor="let star of [1,2,3,4,5]" class="material-symbols-outlined star">
                  {{ star <= item.rating ? 'star' : 'star_outline' }}
                </span>
              </div>
              
              <!-- Review text -->
              <blockquote class="review-text">
                "{{ item.text }}"
              </blockquote>

              <!-- Client Bio Info -->
              <div class="client-bio">
                <img [src]="item.image" [alt]="item.name" class="client-photo" />
                <div class="client-info">
                  <h4 class="client-name">{{ item.name }}</h4>
                  <p class="client-details">{{ item.role }} &middot; <strong>{{ item.company }}</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Navigation Controls -->
        <button class="nav-arrow prev" (click)="prev()" aria-label="Previous slide">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <button class="nav-arrow next" (click)="next()" aria-label="Next slide">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>

        <!-- Carousel Indicators (Dots) -->
        <div class="indicators">
          <button 
            *ngFor="let item of testimonials; let i = index" 
            (click)="setSlide(i)"
            [class.active]="activeIdx() === i"
            class="indicator-dot"
            [aria-label]="'Go to slide ' + (i + 1)">
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .carousel-container {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      padding: 60px 48px;
      
      @media (max-width: 640px) {
        padding: 40px 24px;
      }
    }
    
    .slide-wrapper {
      display: flex;
      transition: transform var(--transition-slow);
      width: 100%;
    }
    
    .slide-item {
      min-width: 100%;
      flex-shrink: 0;
      box-sizing: border-box;
    }
    
    .slide-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 24px;
    }
    
    .rating-box {
      display: flex;
      gap: 4px;
      
      .star {
        color: #fbbf24; // yellow
        font-size: 24px;
      }
    }
    
    .review-text {
      font-size: 1.4rem;
      line-height: 1.6;
      font-weight: 550;
      color: var(--text-primary);
      font-style: italic;
      max-width: 600px;
      
      @media (max-width: 640px) {
        font-size: 1.15rem;
      }
    }
    
    .client-bio {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
      text-align: left;
    }
    
    .client-photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--border-color);
    }
    
    .client-name {
      font-size: 1.05rem;
      font-weight: 700;
      margin: 0 0 2px 0;
    }
    
    .client-details {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin: 0;
    }
    
    // Navigation arrows
    .nav-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary);
      cursor: pointer;
      z-index: 10;
      transition: all var(--transition-fast);
      
      &:hover {
        background: var(--border-color);
        color: var(--text-primary);
        transform: translateY(-50%) scale(1.05);
      }
      
      &.prev {
        left: 12px;
        @media (max-width: 640px) { left: 4px; }
      }
      
      &.next {
        right: 12px;
        @media (max-width: 640px) { right: 4px; }
      }
    }
    
    // Indicators (dots)
    .indicators {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 40px;
    }
    
    .indicator-dot {
      width: 8px;
      height: 8px;
      background: var(--border-color);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all var(--transition-fast);
      padding: 0;
      
      &.active {
        width: 24px;
        background: #a855f7;
        border-radius: var(--border-radius-full);
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  activeIdx = signal(0);
  private intervalId: any;
  private autoPlayDelay = 5000;
  private isPlaying = true;

  testimonials: Testimonial[] = [
    {
      name: 'Gokul',
      role: 'Founder & CEO',
      company: 'Gokul Tech',
      image: 'images/project-turf.png',
      rating: 5,
      text: 'It was a wonderful experience working with you on my website. You were extremely patient in understanding my requirements, listening to every detail, and incorporating my ideas thoughtfully. The final website turned out exactly how I envisioned it. Your professionalism, creativity, and dedication throughout the process were truly appreciated. Highly recommended! Thank you.'
    },
    {
      name: 'Manish',
      role: 'Managing Director',
      company: 'Manish Solutions',
      image: 'images/project-plant.png',
      rating: 5,
      text: 'It was a wonderful experience working with you on my website. You were extremely patient in understanding my requirements, listening to every detail, and incorporating my ideas thoughtfully. The final website turned out exactly how I envisioned it. Your professionalism, creativity, and dedication throughout the process were truly appreciated. Highly recommended! Thank you.'
    },
    {
      name: 'Tagini',
      role: 'Operations Head',
      company: 'Tagini Group',
      image: 'images/project-myha.png',
      rating: 5,
      text: 'It was a wonderful experience working with you on my website. You were extremely patient in understanding my requirements, listening to every detail, and incorporating my ideas thoughtfully. The final website turned out exactly how I envisioned it. Your professionalism, creativity, and dedication throughout the process were truly appreciated. Highly recommended! Thank you.'
    },
    {
      name: 'Wooden Castle',
      role: 'Founder & CEO',
      company: 'Wooden Castle Brand',
      image: 'images/project-castle.png',
      rating: 5,
      text: 'It was a wonderful experience working with you on my website. You were extremely patient in understanding my requirements, listening to every detail, and incorporating my ideas thoughtfully. The final website turned out exactly how I envisioned it. Your professionalism, creativity, and dedication throughout the process were truly appreciated. Highly recommended! Thank you.'
    }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      if (this.isPlaying) {
        this.next();
      }
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  pause() {
    this.isPlaying = false;
  }

  resume() {
    this.isPlaying = true;
  }

  next() {
    this.activeIdx.update(idx => (idx + 1) % this.testimonials.length);
  }

  prev() {
    this.activeIdx.update(idx => (idx - 1 + this.testimonials.length) % this.testimonials.length);
  }

  setSlide(index: number) {
    this.activeIdx.set(index);
  }
}
