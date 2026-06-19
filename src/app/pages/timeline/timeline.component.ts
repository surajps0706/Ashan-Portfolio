import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-3" style="bottom: 20%; left: 30%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">My Journey</span>
        <h2 class="title">Professional Experience Timeline</h2>
        <p class="desc">
          A review of my engineering roles, core ownership areas, and key achievements over the years.
        </p>
      </div>

      <!-- Vertical Timeline Wrapper -->
      <div class="timeline-container">
        <!-- Main center line -->
        <div class="timeline-line"></div>

        <!-- Timeline Items -->
        <div *ngFor="let item of experiences; let i = index" class="timeline-item" [class.even]="i % 2 === 0" [class.odd]="i % 2 !== 0">
          <!-- Dot Indicator -->
          <div class="timeline-dot">
            <span class="material-symbols-outlined">work</span>
          </div>

          <!-- Card Content -->
          <div class="timeline-card glass-card">
            <!-- Timeline Card Header -->
            <div class="card-header">
              <span class="duration-tag">{{ item.duration }}</span>
              <h3 class="role-title">{{ item.role }}</h3>
              <h4 class="company-name">{{ item.company }}</h4>
            </div>

            <!-- Card Content Body -->
            <div class="card-body">
              <div class="timeline-section">
                <h5>Core Responsibilities:</h5>
                <ul class="resp-list">
                  <li *ngFor="let resp of item.responsibilities">{{ resp }}</li>
                </ul>
              </div>

              <div class="timeline-section achievement-section">
                <h5>Key Accomplishments:</h5>
                <ul class="ach-list">
                  <li *ngFor="let ach of item.achievements">
                    <span class="material-symbols-outlined star-icon">star</span>
                    <span>{{ ach }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline-container {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px 0;
    }
    
    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--border-color);
      transform: translateX(-50%);
      
      @media (max-width: 768px) {
        left: 24px;
      }
    }
    
    .timeline-item {
      display: flex;
      justify-content: flex-end;
      width: 50%;
      padding: 0 40px 48px 0;
      position: relative;
      
      @media (max-width: 768px) {
        width: 100%;
        justify-content: flex-start;
        padding: 0 0 32px 64px;
      }
      
      &.even {
        align-self: flex-start;
      }
      
      &.odd {
        align-self: flex-end;
        justify-content: flex-start;
        padding: 0 0 48px 40px;
        left: 50%;
        
        @media (max-width: 768px) {
          left: 0;
          padding-left: 64px;
        }
      }
    }
    
    .timeline-dot {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-gradient);
      border: 4px solid var(--bg-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      right: -20px;
      top: 0;
      z-index: 10;
      box-shadow: var(--shadow-sm);
      
      @media (max-width: 768px) {
        left: 4px;
        right: auto;
      }
      
      span {
        font-size: 18px;
      }
    }
    
    .timeline-item.odd .timeline-dot {
      left: -20px;
      right: auto;
      
      @media (max-width: 768px) {
        left: 4px;
      }
    }
    
    .timeline-card {
      width: 100%;
      padding: 32px;
      
      &:hover {
        transform: translateY(-2px);
      }
    }
    
    .card-header {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 16px;
      margin-bottom: 16px;
      
      .duration-tag {
        font-size: 0.85rem;
        font-weight: 700;
        color: #a855f7;
        background: rgba(168, 85, 247, 0.08);
        padding: 4px 12px;
        border-radius: var(--border-radius-full);
        display: inline-block;
        margin-bottom: 12px;
      }
      
      .role-title {
        font-size: 1.35rem;
        font-weight: 750;
        margin-bottom: 4px;
      }
      
      .company-name {
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-secondary);
      }
    }
    
    .timeline-section {
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      h5 {
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text-primary);
        letter-spacing: 0.05em;
        margin-bottom: 8px;
      }
    }
    
    .resp-list {
      padding-left: 20px;
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.6;
      
      li {
        margin-bottom: 6px;
      }
    }
    
    .ach-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 0.9rem;
        color: var(--text-secondary);
        
        .star-icon {
          color: #a855f7;
          font-size: 18px;
          margin-top: 1px;
        }
      }
    }
  `]
})
export class TimelineComponent {
  experiences: TimelineItem[] = [
    {
      company: 'Veloce Solutions (Contract)',
      role: 'Lead Frontend Architect',
      duration: '2024 - Present',
      responsibilities: [
        'Architect standalone component flows and custom Signal-based state systems for Angular enterprise workspaces.',
        'Implement Webpack Module Federation structures to break massive monorepos into micro-frontends.',
        'Mentor a distributed frontend team of 8 engineers and establish automated linting, testing, and PR reviews guidelines.'
      ],
      achievements: [
        'Accelerated dashboard initial loading speed, slashing bundle sizes by 32%.',
        'Implemented a unified Tailwind/SCSS variables system used across 4 autonomous product dashboards.'
      ]
    },
    {
      company: 'CloudStream Systems',
      role: 'Senior Full-Stack Engineer',
      duration: '2021 - 2024',
      responsibilities: [
        'Designed high-throughput REST APIs and GraphQL gateways using NestJS and PostgreSQL database indexing.',
        'Built infrastructure deployments on AWS ECS using Docker containers and automated GitHub Actions CI/CD pipelines.',
        'Crafted dynamic patient management dashboards with Angular Material and custom analytics charts.'
      ],
      achievements: [
        'Migrated classic EC2 server stacks to Serverless ECS configurations, lowering cloud hosting billing by 24%.',
        'Optimized slow patient intake database queries, reducing data load responses from 3s to 200ms.'
      ]
    },
    {
      company: 'InnoTech Solutions',
      role: 'Frontend Developer',
      duration: '2019 - 2021',
      responsibilities: [
        'Built modular frontend elements, reusable forms validators, and utility filters for multi-tenant educational apps.',
        'Collaborated with designers to convert visual Figma wireframes into pixel-perfect HTML layouts.',
        'Wrote end-to-end integration test suites utilizing Jasmine and Karma frameworks.'
      ],
      achievements: [
        'Successfully completed registration portals used across 12 public schools for over 15,000 active students.',
        'Replaced third-party animation libraries with lightweight native Angular Animations, improving UI fluidity.'
      ]
    }
  ];
}
