import { Component, signal, computed } from '@angular/core';
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
        <div class="mesh-blob blob-2" style="top: 15%; right: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">My Stack</span>
        <h2 class="title">Technical Expertise & Core Toolkit</h2>
        <p class="desc">
          An interactive, search-driven look at the programming languages, framework platforms, database engines, and DevOps tools I leverage to build software.
        </p>
      </div>

      <!-- Interactive Search & Filter Controls -->
      <div class="controls-container glass-card">
        <!-- Search bar -->
        <div class="search-wrapper">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search skills (e.g. Angular, Docker, SCSS)..." 
            (input)="onSearch($event)" 
            [value]="searchQuery()" 
            class="search-input" />
          <button *ngIf="searchQuery()" (click)="clearSearch()" class="clear-btn" aria-label="Clear search">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Filter Tabs -->
        <div class="tabs-wrapper">
          <button 
            *ngFor="let tab of tabs" 
            (click)="selectTab(tab)" 
            [class.active]="selectedCategory() === tab" 
            class="tab-btn">
            {{ tab === 'All' ? 'All Tech' : tab.replace(' Development', '').replace(' Systems', '').replace(' & Infrastructure', '') }}
          </button>
        </div>
      </div>

      <!-- Skill Categories Layout -->
      <div class="categories-container" *ngIf="filteredCategories().length > 0; else noResults">
        <div *ngFor="let category of filteredCategories()" class="category-block">
          <h3 class="category-title">
            <span class="gradient-text">{{ category.title }}</span>
          </h3>
          
          <div class="grid-2 skills-grid">
            <div *ngFor="let skill of category.skills" class="skill-card glass-card">
              <div class="skill-info">
                <div class="skill-name-icon">
                  <span class="skill-emoji">{{ skill.icon }}</span>
                  <div class="skill-text">
                    <span class="skill-name">{{ skill.name }}</span>
                    <!-- Badge based on level -->
                    <span class="level-badge" [ngClass]="getLevelClass(skill.level)">
                      {{ getLevelLabel(skill.level) }}
                    </span>
                  </div>
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

      <!-- No Results Template -->
      <ng-template #noResults>
        <div class="no-results glass-card">
          <span class="material-symbols-outlined warning-icon">search_off</span>
          <h3>No skills found matching your criteria</h3>
          <p>Try searching for another keyword or select the "All Tech" tab.</p>
          <button (click)="resetFilters()" class="btn-premium primary reset-btn">Reset Filters</button>
        </div>
      </ng-template>
    </section>
  `,
  styles: [`
    .controls-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 24px;
      margin-bottom: 48px;
      
      @media (max-width: 992px) {
        flex-direction: column;
        align-items: stretch;
      }
    }

    .search-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      flex-grow: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      padding: 0 16px;
      height: 48px;
      transition: all var(--transition-fast);

      &:focus-within {
        border-color: #a855f7;
        box-shadow: 0 0 12px rgba(168, 85, 247, 0.15);
        background: rgba(255, 255, 255, 0.08);
      }

      .search-icon {
        color: var(--text-secondary);
        margin-right: 12px;
        font-size: 20px;
      }

      .search-input {
        background: transparent;
        border: none;
        outline: none;
        color: var(--text-primary);
        font-size: 0.95rem;
        width: 100%;
        height: 100%;
        font-family: var(--font-body);

        &::placeholder {
          color: var(--text-muted);
        }
      }

      .clear-btn {
        background: transparent;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        padding: 4px;
        border-radius: var(--border-radius-full);
        transition: all var(--transition-fast);

        &:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        span {
          font-size: 18px;
        }
      }
    }

    .tabs-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      
      @media (max-width: 992px) {
        justify-content: center;
      }
    }

    .tab-btn {
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      cursor: pointer;
      transition: all var(--transition-fast);
      font-family: var(--font-heading);

      &:hover {
        color: var(--text-primary);
        background: var(--border-color);
        transform: translateY(-1px);
      }

      &.active {
        color: white;
        background: var(--primary-gradient);
        border-color: transparent;
        box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);
      }
    }
    
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
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg), var(--shadow-glow);
        border-color: rgba(168, 85, 247, 0.3);
      }
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
        font-size: 1.8rem;
      }
      
      .skill-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      
      .skill-name {
        font-family: var(--font-heading);
        font-weight: 700;
        font-size: 1.1rem;
      }

      .level-badge {
        font-size: 0.65rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        padding: 2px 6px;
        border-radius: var(--border-radius-xs);
        display: inline-block;
        width: fit-content;
        
        &.badge-expert {
          background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
          color: #ec4899;
          border: 1px solid rgba(236, 72, 153, 0.3);
        }

        &.badge-advanced {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
          color: #a855f7;
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        &.badge-intermediate {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
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

      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: white;
        box-shadow: 0 0 8px white;
      }
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

    .no-results {
      text-align: center;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      .warning-icon {
        font-size: 48px;
        color: var(--text-muted);
      }

      h3 {
        font-size: 1.4rem;
        font-weight: 700;
      }

      p {
        color: var(--text-secondary);
        max-width: 400px;
      }

      .reset-btn {
        margin-top: 8px;
      }
    }
  `]
})
export class SkillsComponent {
  searchQuery = signal('');
  selectedCategory = signal('All');

  tabs = ['All', 'Frontend Development', 'Backend Systems', 'Database Systems', 'Cloud & Infrastructure'];

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

  filteredCategories = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return this.categories
      .map(cat => {
        const matchesCategory = category === 'All' || cat.title === category;
        if (!matchesCategory) return null;

        const filteredSkills = cat.skills.filter(skill => 
          skill.name.toLowerCase().includes(query)
        );

        if (filteredSkills.length === 0) return null;

        return {
          title: cat.title,
          skills: filteredSkills
        };
      })
      .filter((cat): cat is SkillCategory => cat !== null);
  });

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  selectTab(tab: string) {
    this.selectedCategory.set(tab);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('All');
  }

  getLevelClass(level: number): string {
    if (level >= 90) return 'badge-expert';
    if (level >= 80) return 'badge-advanced';
    return 'badge-intermediate';
  }

  getLevelLabel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    return 'Intermediate';
  }
}
