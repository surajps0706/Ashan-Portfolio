import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Strength {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-2" style="top: 20%; left: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">About Us</span>
        <h2 class="title">Our Story & Development Labs</h2>
        <p class="desc">
          Bridging the gap between robust enterprise architecture, custom ERPs, and premium interactive software.
        </p>
      </div>

      <!-- Main Layout: Grid 2 -->
      <div class="grid-2 bio-container">
        <!-- Left: Bio & Details -->
        <div class="bio-text">
          <h3 class="bio-heading">Who is Ashan TechLabs?</h3>
          <p class="bio-paragraph">
            We are an agile enterprise software agency and consulting lab. With over 8 years of active service experience, we help retail businesses, sports complexes, agritech groups, and startups conceptualize, design, and deploy highly secure custom databases and storefronts.
          </p>
          <p class="bio-paragraph">
            Our engineering philosophy centers around robust microservices integration, responsive mobile layouts, clean code practices, and zero-defect deployments. Whether it's custom ERP systems or IoT integrations, we strive for operational efficiency.
          </p>

          <!-- Strength Bullet Grid -->
          <div class="education-card glass-card">
            <div class="edu-header">
              <span class="material-symbols-outlined header-icon">verified</span>
              <h4>Agency Milestones</h4>
            </div>
            <div class="edu-item">
              <span class="edu-year">2018</span>
              <div class="edu-details">
                <h5>Founded in Chennai</h5>
                <p>Established as a core custom development lab in Madipakkam, Chennai.</p>
              </div>
            </div>
            <div class="edu-item">
              <span class="edu-year">2022</span>
              <div class="edu-details">
                <h5>Enterprise Certified</h5>
                <p>Recognized for delivering secure, scalable corporate ERP databases & booking systems.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Animated Stats Grid -->
        <div class="stats-grid">
          <div *ngFor="let stat of stats" class="stat-card glass-card">
            <span class="material-symbols-outlined stat-icon">{{ stat.icon }}</span>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Core Strengths Section -->
      <div class="strengths-section">
        <h3 class="strengths-title text-center">My Core Strengths</h3>
        <div class="grid-3 strengths-grid">
          <div *ngFor="let strength of strengths" class="strength-card glass-card">
            <div class="strength-icon-box">
              <span class="material-symbols-outlined">{{ strength.icon }}</span>
            </div>
            <h4>{{ strength.title }}</h4>
            <p>{{ strength.description }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .bio-container {
      margin-bottom: 80px;
      align-items: flex-start;
    }
    
    .bio-text {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .bio-heading {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    
    .bio-paragraph {
      font-size: 1.05rem;
      line-height: 1.7;
    }
    
    .education-card {
      margin-top: 24px;
      padding: 24px;
      
      .edu-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 12px;
        
        .header-icon {
          color: #a855f7;
          font-size: 28px;
        }
        
        h4 {
          margin: 0;
          font-size: 1.15rem;
        }
      }
    }
    
    .edu-item {
      display: grid;
      grid-template-columns: 100px 1fr;
      gap: 16px;
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .edu-year {
        font-family: var(--font-heading);
        font-weight: 700;
        color: #a855f7;
        font-size: 0.95rem;
      }
      
      h5 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom: 4px;
      }
      
      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
      }
    }
    
    // Stats grid
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      width: 100%;
      
      @media (max-width: 640px) {
        gap: 16px;
      }
    }
    
    .stat-card {
      padding: 36px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      
      .stat-icon {
        font-size: 36px;
        background: var(--primary-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .stat-value {
        font-family: var(--font-heading);
        font-size: 2.8rem;
        font-weight: 800;
        letter-spacing: -0.03em;
        line-height: 1;
      }
      
      .stat-label {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
    
    // Strengths
    .strengths-section {
      margin-top: 40px;
    }
    
    .strengths-title {
      font-size: 1.8rem;
      font-weight: 800;
      margin-bottom: 40px;
      text-align: center;
    }
    
    .strength-card {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      
      .strength-icon-box {
        width: 50px;
        height: 50px;
        border-radius: var(--border-radius-md);
        background: rgba(168, 85, 247, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a855f7;
        
        span {
          font-size: 28px;
        }
      }
      
      h4 {
        font-size: 1.25rem;
        font-weight: 700;
      }
      
      p {
        font-size: 0.95rem;
        line-height: 1.6;
      }
    }
  `]
})
export class AboutComponent {
  stats: Stat[] = [
    { value: '8+', label: 'Years Experience', icon: 'schedule' },
    { value: '45+', label: 'Projects Completed', icon: 'task_alt' },
    { value: '20+', label: 'Happy Clients', icon: 'sentiment_very_satisfied' },
    { value: '15+', label: 'Technologies Used', icon: 'computer' }
  ];

  strengths: Strength[] = [
    {
      title: 'Architectural Thinking',
      description: 'Designing modular, loosely-coupled micro-frontend and standalone systems that make large teams productive.',
      icon: 'architecture'
    },
    {
      title: 'Performance Optimization',
      description: 'Tuning bundles, rendering pipelines, database queries, and static asset flows to hit perfect Google Lighthouse metrics.',
      icon: 'speed'
    },
    {
      title: 'Business Alignment',
      description: 'Translating product descriptions and timelines into actionable engineering roadmaps that create concrete business value.',
      icon: 'insights'
    }
  ];
}
