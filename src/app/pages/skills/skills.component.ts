import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number; // percentage
  experience: string;
  icon: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-1" style="bottom: 10%; left: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">My Stack</span>
        <h2 class="title">Technical Expertise & Core Toolkit</h2>
        <p class="desc">
          A granular view of the programming languages, framework platforms, database engines, and dev-ops systems I leverage to build software.
        </p>
      </div>

      <!-- Skill Categories Layout -->
      <div class="categories-container">
        <div *ngFor="let category of categories" class="category-block">
          <h3 class="category-title">{{ category.title }}</h3>
          
          <div class="grid-2 skills-grid">
            <div *ngFor="let skill of category.skills" class="skill-card glass-card">
              <div class="skill-info">
                <div class="skill-name-icon">
                  <span class="skill-emoji">{{ skill.icon }}</span>
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
                <span class="skill-exp">{{ skill.experience }}</span>
              </div>
              
              <!-- Custom Animated Progress Bar -->
              <div class="progress-track">
                <div class="progress-fill" [style.width.%]="skill.level">
                  <span class="progress-bubble">{{ skill.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .categories-container {
      display: flex;
      flex-direction: column;
      gap: 60px;
    }
    
    .category-block {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .category-title {
      font-size: 1.6rem;
      font-weight: 800;
      border-bottom: 2px solid var(--border-color);
      padding-bottom: 12px;
      display: inline-block;
      align-self: flex-start;
      margin-bottom: 8px;
    }
    
    .skills-grid {
      gap: 24px;
    }
    
    .skill-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      overflow: visible !important;
    }
    
    .skill-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .skill-name-icon {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .skill-emoji {
        font-size: 1.6rem;
      }
      
      .skill-name {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 1.1rem;
      }
    }
    
    .skill-exp {
      font-size: 0.85rem;
      font-weight: 700;
      color: #a855f7;
      background: rgba(168, 85, 247, 0.08);
      padding: 4px 10px;
      border-radius: var(--border-radius-full);
    }
    
    // Progress Bar
    .progress-track {
      width: 100%;
      height: 8px;
      background: var(--border-color);
      border-radius: var(--border-radius-full);
      position: relative;
    }
    
    .progress-fill {
      height: 100%;
      background: var(--primary-gradient);
      border-radius: var(--border-radius-full);
      position: relative;
      transition: width 1.5s cubic-bezier(0.1, 0.8, 0.25, 1);
    }
    
    .progress-bubble {
      position: absolute;
      right: -15px;
      top: -30px;
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-sm);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: var(--border-radius-sm);
      color: var(--text-primary);
    }
  `]
})
export class SkillsComponent {
  categories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'Angular 20', level: 95, experience: '6+ yrs', icon: '🅰️' },
        { name: 'TypeScript', level: 95, experience: '7+ yrs', icon: '🔷' },
        { name: 'JavaScript (ES6+)', level: 90, experience: '8+ yrs', icon: '🟨' },
        { name: 'SCSS & TailwindCSS', level: 90, experience: '6+ yrs', icon: '🎨' },
        { name: 'React', level: 80, experience: '4+ yrs', icon: '⚛️' },
        { name: 'HTML5 & Semantics', level: 95, experience: '8+ yrs', icon: '📄' }
      ]
    },
    {
      title: 'Backend Systems',
      skills: [
        { name: 'Node.js & NestJS', level: 90, experience: '5+ yrs', icon: '🟢' },
        { name: 'Java & Spring Boot', level: 85, experience: '4+ yrs', icon: '☕' },
        { name: '.NET Core & C#', level: 75, experience: '3+ yrs', icon: '🎯' }
      ]
    },
    {
      title: 'Database Systems',
      skills: [
        { name: 'PostgreSQL', level: 85, experience: '5+ yrs', icon: '🐘' },
        { name: 'MySQL', level: 85, experience: '6+ yrs', icon: '🐬' },
        { name: 'MongoDB', level: 80, experience: '4+ yrs', icon: '🍃' }
      ]
    },
    {
      title: 'Cloud & Infrastructure',
      skills: [
        { name: 'AWS (ECS, RDS, S3)', level: 85, experience: '4+ yrs', icon: '☁️' },
        { name: 'Docker Containers', level: 85, experience: '5+ yrs', icon: '🐳' },
        { name: 'Azure Services', level: 70, experience: '2+ yrs', icon: '💎' }
      ]
    }
  ];
}
