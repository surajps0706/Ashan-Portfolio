import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../core/services/project.service';
import { Project } from '../../core/models/project.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatIconModule, FormsModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-2" style="top: 30%; right: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">My Works</span>
        <h2 class="title">Featured Projects Showcase</h2>
        <p class="desc">
          Explore a curated selection of enterprise applications, clinic management databases, educational platforms, and custom development modules I have delivered.
        </p>
      </div>

      <!-- Search & Filters Bar -->
      <div class="filter-controls-bar glass-card">
        <!-- Search Input -->
        <div class="search-box">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onSearchChange($event)" 
            placeholder="Search by title, description, or technology..." 
            class="search-input" 
          />
        </div>

        <!-- Category Tabs -->
        <div class="category-tabs">
          <button 
            *ngFor="let cat of categories" 
            (click)="selectCategory(cat)"
            [class.active]="selectedCategory() === cat"
            class="filter-tab-btn">
            {{ cat }}
          </button>
        </div>
      </div>

      <!-- Projects Grid Layout -->
      <div class="grid-2 projects-grid" *ngIf="filteredProjects().length > 0; else noProjects">
        <div *ngFor="let project of filteredProjects()" class="project-card-wrapper glass-card">
          <!-- Card Image Header -->
          <div class="card-image-box">
            <img [src]="project.image" [alt]="project.title" class="project-image" />
            <div class="project-category-badge">{{ project.category }}</div>
          </div>

          <!-- Card Content Body -->
          <div class="card-body">
            <div class="project-meta">
              <span class="industry-badge">{{ project.industry }}</span>
            </div>
            
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>

            <!-- Expanded Details Drawer -->
            <div class="expanded-details">
              <div class="detail-block">
                <strong>Challenge:</strong>
                <p>{{ project.challenges }}</p>
              </div>
              <div class="detail-block">
                <strong>Business Impact:</strong>
                <p>{{ project.impact }}</p>
              </div>
            </div>

            <!-- Tech Stack Chips -->
            <div class="tech-stack-wrap">
              <span *ngFor="let tech of project.technologies" class="tech-chip">
                {{ tech }}
              </span>
            </div>

            <!-- Card Actions footer -->
            <div class="card-actions">
              <a [href]="project.liveUrl" target="_blank" class="btn-premium primary small-btn">
                <span class="material-symbols-outlined">visibility</span>
                <span>Live Demo</span>
              </a>
              <a [href]="project.gitUrl" target="_blank" class="btn-premium secondary small-btn">
                <span class="material-symbols-outlined">terminal</span>
                <span>Code</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State Template -->
      <ng-template #noProjects>
        <div class="empty-state glass-card">
          <span class="material-symbols-outlined empty-icon">search_off</span>
          <h3>No Projects Found</h3>
          <p>We couldn't find any projects matching your search criteria. Try a different query or category.</p>
          <button (click)="resetFilters()" class="btn-premium primary">Reset Filters</button>
        </div>
      </ng-template>
    </section>
  `,
  styles: [`
    .filter-controls-bar {
      padding: 16px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      margin-bottom: 40px;
      
      @media (max-width: 1024px) {
        flex-direction: column;
        align-items: stretch;
      }
    }
    
    .search-box {
      position: relative;
      flex-grow: 1;
      display: flex;
      align-items: center;
      
      .search-icon {
        position: absolute;
        left: 16px;
        color: var(--text-muted);
        font-size: 22px;
      }
      
      .search-input {
        width: 100%;
        padding: 12px 16px 12px 48px;
        background: var(--surface-solid);
        border: 1px solid var(--border-color);
        border-radius: var(--border-radius-full);
        color: var(--text-primary);
        font-family: var(--font-body);
        font-size: 0.95rem;
        outline: none;
        transition: border-color var(--transition-fast);
        
        &:focus {
          border-color: #a855f7;
        }
      }
    }
    
    .category-tabs {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 4px;
      
      &::-webkit-scrollbar {
        height: 4px;
      }
    }
    
    .filter-tab-btn {
      padding: 8px 18px;
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-full);
      color: var(--text-secondary);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      white-space: nowrap;
      transition: all var(--transition-fast);
      
      &:hover {
        background: var(--border-color);
        color: var(--text-primary);
      }
      
      &.active {
        background: var(--primary-gradient);
        color: white;
        border-color: transparent;
      }
    }
    
    // Projects Grid
    .projects-grid {
      gap: 32px;
    }
    
    .project-card-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      
      &:hover .project-image {
        transform: scale(1.03);
      }
    }
    
    .card-image-box {
      height: 240px;
      position: relative;
      overflow: hidden;
      
      .project-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
      }
      
      .project-category-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(3, 7, 18, 0.6);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 4px 12px;
        border-radius: var(--border-radius-full);
        font-size: 0.8rem;
        font-weight: 700;
      }
    }
    
    .card-body {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex-grow: 1;
    }
    
    .project-meta {
      display: flex;
      
      .industry-badge {
        font-size: 0.8rem;
        font-weight: 700;
        color: #a855f7;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
    }
    
    .project-title {
      font-size: 1.5rem;
      font-weight: 800;
    }
    
    .project-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-secondary);
    }
    
    .expanded-details {
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: rgba(99, 102, 241, 0.03);
      border-left: 2px solid #a855f7;
      padding: 12px 16px;
      border-radius: 0 var(--border-radius-md) var(--border-radius-md) 0;
      font-size: 0.9rem;
      
      strong {
        color: var(--text-primary);
        font-weight: 700;
      }
      
      p {
        font-size: 0.85rem;
        line-height: 1.5;
        margin-top: 4px;
      }
    }
    
    .tech-stack-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
      margin-bottom: 12px;
    }
    
    .tech-chip {
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      color: var(--text-secondary);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--border-radius-full);
    }
    
    .card-actions {
      display: flex;
      gap: 12px;
      margin-top: auto;
      border-top: 1px solid var(--border-color);
      padding-top: 20px;
      
      .small-btn {
        flex: 1;
        padding: 10px 16px;
        font-size: 0.85rem;
        border-radius: var(--border-radius-md);
      }
    }
    
    // Empty state
    .empty-state {
      padding: 60px 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      
      .empty-icon {
        font-size: 48px;
        color: var(--text-muted);
      }
      
      p {
        max-width: 400px;
        margin-bottom: 8px;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  projectsList = signal<Project[]>([]);
  searchQuery = '';
  
  // Filtering inputs
  selectedCategory = signal<string>('All');
  searchFilter = signal<string>('');

  categories = ['All', 'Frontend & UI/UX', 'Backend & Cloud', 'Full Stack'];

  // Reactive Computed Filtered List
  filteredProjects = computed(() => {
    let list = this.projectsList();
    const query = this.searchFilter().toLowerCase().trim();
    const category = this.selectedCategory();

    if (category !== 'All') {
      list = list.filter(p => p.category === category);
    }

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.industry.toLowerCase().includes(query) ||
        p.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }

    return list;
  });

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projectsList.set(data);
      },
      error: (err) => {
        console.error('Failed to load projects', err);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onSearchChange(value: string) {
    this.searchFilter.set(value);
  }

  resetFilters() {
    this.searchQuery = '';
    this.searchFilter.set('');
    this.selectedCategory.set('All');
  }
}
