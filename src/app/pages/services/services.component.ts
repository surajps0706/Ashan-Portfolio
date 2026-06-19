import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-3" style="top: 10%; right: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">My Services</span>
        <h2 class="title">Enterprise Solutions & Engineering Excellence</h2>
        <p class="desc">
          Providing specialized development services tailored to improve operational efficiency, scale platforms, and engage users.
        </p>
      </div>

      <!-- Services Grid: 3 columns -->
      <div class="grid-3 services-grid">
        <div *ngFor="let service of services" class="service-card glass-card">
          <div class="service-icon-wrapper">
            <span class="material-symbols-outlined">{{ service.icon }}</span>
          </div>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          
          <div class="service-benefits">
            <h4 class="benefits-heading">Key Benefits:</h4>
            <ul class="benefits-list">
              <li *ngFor="let benefit of service.benefits">
                <span class="material-symbols-outlined check-icon">check_circle</span>
                <span>{{ benefit }}</span>
              </li>
            </ul>
          </div>

          <a routerLink="/contact" [queryParams]="{ service: service.id }" class="btn-premium secondary service-cta">
            <span>Inquire Service</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-grid {
      gap: 32px;
    }
    
    .service-card {
      padding: 40px 32px;
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: var(--primary-gradient);
        opacity: 0;
        transition: opacity var(--transition-normal);
      }
      
      &:hover::before {
        opacity: 1;
      }
    }
    
    .service-icon-wrapper {
      width: 60px;
      height: 60px;
      border-radius: var(--border-radius-md);
      background: rgba(99, 102, 241, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6366f1;
      margin-bottom: 24px;
      
      span {
        font-size: 32px;
      }
    }
    
    .service-title {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 12px;
    }
    
    .service-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin-bottom: 24px;
      flex-grow: 1;
    }
    
    .service-benefits {
      border-top: 1px solid var(--border-color);
      padding-top: 20px;
      margin-bottom: 32px;
      
      .benefits-heading {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-primary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 12px;
      }
    }
    
    .benefits-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      
      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: var(--text-secondary);
        
        .check-icon {
          color: var(--success-color);
          font-size: 18px;
        }
      }
    }
    
    .service-cta {
      width: 100%;
      text-align: center;
      padding: 12px;
    }
  `]
})
export class ServicesComponent {
  services: ServiceItem[] = [
    {
      id: 'custom-dev',
      title: 'Custom Software Development',
      description: 'Design and implementation of tailored backend microservices, real-time sync systems, and APIs custom-fitted for your workflow.',
      icon: 'code',
      benefits: ['Optimized custom architecture', 'Scalable Node/NestJS backend', 'Fully-typed codebases']
    },
    {
      id: 'erp-solutions',
      title: 'ERP Solutions',
      description: 'End-to-end Enterprise Resource Planning platforms designed to manage supply chain logistics, finance databases, and staffing schedules.',
      icon: 'settings_suggest',
      benefits: ['Unified data dashboards', 'Advanced automated workflows', 'Role-based access security']
    },
    {
      id: 'hms-solutions',
      title: 'Hospital Management Systems',
      description: 'Secure, clinical-oriented EHR portals integrating doctor schedules, electronic prescriptions, billing databases, and patient records.',
      icon: 'clinical_research',
      benefits: ['HIPAA compliant structures', 'Patient intake forms flow', 'Real-time billing analytics']
    },
    {
      id: 'sms-solutions',
      title: 'School Management Systems',
      description: 'Comprehensive academic administration hubs enabling online assignment uploads, grading sheets, and messaging pipelines.',
      icon: 'school',
      benefits: ['Interactive gradebooks', 'Parent portals integration', 'Assignment submission pipeline']
    },
    {
      id: 'web-dev',
      title: 'Website Development',
      description: 'Pixel-perfect, ultra-fast client-side websites. Built with performance structures, modern typography, and clean layouts.',
      icon: 'web',
      benefits: ['Google Lighthouse 100 scores', 'Responsive layouts grid', 'SEO semantic markup']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Conceptualizing intuitive wireframes, mockups, design tokens, and user-flow logic focused on high retention and visual delight.',
      icon: 'palette',
      benefits: ['Premium design frameworks', 'Smooth transitions & feel', 'High conversion rates']
    },
    {
      id: 'mobile-dev',
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications matching native speed and styling, utilizing frameworks like Ionic Angular or React Native.',
      icon: 'phone_iphone',
      benefits: ['Native device integrations', 'App Store deployment', 'Single codebase efficiency']
    },
    {
      id: 'business-automation',
      title: 'Business Automation',
      description: 'Integrating webhooks, message triggers, cron schedules, and CRM connections to eliminate manual processing bottlenecks.',
      icon: 'bolt',
      benefits: ['Eliminate human errors', '24/7 background automation', 'Third-party API connectors']
    }
  ];
}
