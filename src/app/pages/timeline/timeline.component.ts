import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimelineItem {
  phase: string;
  title: string;
  subtitle: string;
  icon: string;
  details: string[];
  outcomes: string[];
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
        <span class="subtitle">Our Process</span>
        <h2 class="title">How We Approach Your Project</h2>
        <p class="desc">
          A step-by-step roadmap showing how we take a project from an initial idea to a high-performance, live production system.
        </p>
      </div>

      <!-- Vertical Timeline Wrapper -->
      <div class="timeline-container">
        <!-- Main center line -->
        <div class="timeline-line"></div>

        <!-- Timeline Items -->
        <div *ngFor="let item of processes; let i = index" class="timeline-item" [class.even]="i % 2 === 0" [class.odd]="i % 2 !== 0">
          <!-- Dot Indicator -->
          <div class="timeline-dot">
            <span class="material-symbols-outlined">{{ item.icon }}</span>
          </div>

          <!-- Card Content -->
          <div class="timeline-card glass-card">
            <!-- Timeline Card Header -->
            <div class="card-header">
              <span class="duration-tag">{{ item.phase }}</span>
              <h3 class="role-title">{{ item.title }}</h3>
              <h4 class="company-name">{{ item.subtitle }}</h4>
            </div>

            <!-- Card Content Body -->
            <div class="card-body">
              <div class="timeline-section">
                <h5>What We Do:</h5>
                <ul class="resp-list">
                  <li *ngFor="let detail of item.details">{{ detail }}</li>
                </ul>
              </div>

              <div class="timeline-section achievement-section">
                <h5>Key Deliverables & Goals:</h5>
                <ul class="ach-list">
                  <li *ngFor="let outcome of item.outcomes">
                    <span class="material-symbols-outlined star-icon">done_all</span>
                    <span>{{ outcome }}</span>
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
  processes: TimelineItem[] = [
    {
      phase: 'Phase 1',
      title: 'Discovery & Requirements Analysis',
      subtitle: 'Understanding your vision & constraints',
      icon: 'search',
      details: [
        'Conduct initial strategy consultations to define product scope, goals, and business targets.',
        'Document comprehensive technical specifications, target user flows, and stack requirements.',
        'Establish clear project milestones, communication pipelines, and development timelines.'
      ],
      outcomes: [
        'Detailed project brief and functional specification documents.',
        'Formulated technical roadmap and high-level system architecture strategy.'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'Design & Prototyping',
      subtitle: 'Creating interactive, pixel-perfect user journeys',
      icon: 'palette',
      details: [
        'Design modern Figma mockups with custom color schemes, typography, and layouts.',
        'Craft detailed wireframes representing all viewport sizes (mobile, tablet, desktop).',
        'Gather feedback and iterate on interactions to refine usability and aesthetics.'
      ],
      outcomes: [
        'High-fidelity interactive prototype link in Figma.',
        'Unified design tokens, component style guides, and asset libraries.'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Agile Development',
      subtitle: 'Writing clean, high-performance production code',
      icon: 'code',
      details: [
        'Scaffold modular, clean frontends using component-driven frameworks like Angular.',
        'Build secure, scalable backend services and high-throughput REST or GraphQL APIs.',
        'Employ signal-based state management strategies and optimize loading states for efficiency.'
      ],
      outcomes: [
        'Fully responsive layouts conforming to W3C and modern web design standards.',
        'Modular, maintainable code repositories with automated linting configurations.'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Quality Assurance & Testing',
      subtitle: 'Ensuring stability, speed, and cross-browser reliability',
      icon: 'fact_check',
      details: [
        'Perform multi-device testing on popular viewports, mobile operating systems, and browsers.',
        'Conduct speed audits, security scans, and accessibility optimization tests.',
        'Run thorough component integration testing to prevent regressions and security flaws.'
      ],
      outcomes: [
        'Detailed test summary and performance optimization report.',
        'Optimal SEO indexing configuration and clean console runtimes.'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'Deployment & Release',
      subtitle: 'Launching your product safely to the world',
      icon: 'rocket_launch',
      details: [
        'Configure secure cloud hosting environments (AWS, Vercel, Firebase) with custom domains.',
        'Set up continuous deployment (CI/CD) pipelines to push updates automatically on git commits.',
        'Implement database migrations, SSL certificates, and production-level caching servers.'
      ],
      outcomes: [
        'Live, secure production website accessible worldwide.',
        'Automated code-to-cloud release pipelines fully functional.'
      ]
    },
    {
      phase: 'Phase 6',
      title: 'Support & Post-Launch Optimization',
      subtitle: 'Sustaining long-term scaling and maintenance',
      icon: 'support_agent',
      details: [
        'Monitor server load, error tracking platforms, and user behavior metrics to guarantee uptime.',
        'Perform regular security patches, dependencies audits, and performance tuning.',
        'Collaborate on future phase expansions and feature updates based on market feedback.'
      ],
      outcomes: [
        'Proactive system health checks and scheduled database backups.',
        'Ongoing feature iterations and performance upgrades.'
      ]
    }
  ];
}
