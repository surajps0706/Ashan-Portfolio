import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { Blog } from '../../core/models/blog.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-1" style="top: 10%; right: 20%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Insights</span>
        <h2 class="title">Alex's Technology Journal</h2>
        <p class="desc">
          Deep-dives into modern web architectures, state managers, performance tuning, and cloud-native solutions.
        </p>
      </div>

      <!-- Filters & Search Bar -->
      <div class="filter-controls-bar glass-card">
        <div class="search-box">
          <span class="material-symbols-outlined search-icon">search</span>
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onSearchChange($event)" 
            placeholder="Search articles by title, summary, or topics..." 
            class="search-input" 
          />
        </div>

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

      <!-- Featured Article (Only show when filters are empty and featured exists) -->
      <div *ngIf="featuredPost() && !searchFilter() && selectedCategory() === 'All'" class="featured-post-card glass-card">
        <div class="featured-image-box">
          <img [src]="featuredPost()?.image" [alt]="featuredPost()?.title" class="featured-image" />
        </div>
        <div class="featured-content">
          <span class="category-tag">{{ featuredPost()?.category }}</span>
          <h3 class="featured-title">{{ featuredPost()?.title }}</h3>
          <p class="featured-desc">{{ featuredPost()?.summary }}</p>
          <div class="featured-meta">
            <span>By {{ featuredPost()?.author }}</span>
            <span>&bull;</span>
            <span>{{ featuredPost()?.publishedDate | date }}</span>
            <span>&bull;</span>
            <span>{{ featuredPost()?.readTime }}</span>
          </div>
          <a [routerLink]="['/blog', featuredPost()?.id]" class="btn-premium primary featured-cta">Read Article</a>
        </div>
      </div>

      <!-- General Articles Grid -->
      <h3 class="grid-section-title" *ngIf="!searchFilter() && selectedCategory() === 'All'">Recent Articles</h3>
      <div class="grid-3 blog-grid" *ngIf="paginatedBlogs().length > 0; else noBlogs">
        <div *ngFor="let post of paginatedBlogs()" class="blog-card glass-card">
          <div class="blog-card-img">
            <img [src]="post.image" [alt]="post.title" />
            <div class="blog-cat-badge">{{ post.category }}</div>
          </div>
          <div class="blog-card-body">
            <div class="blog-meta">
              <span>{{ post.publishedDate | date }}</span>
              <span>&middot;</span>
              <span>{{ post.readTime }}</span>
            </div>
            <h4 class="blog-title">{{ post.title }}</h4>
            <p class="blog-desc">{{ post.summary }}</p>
            <a [routerLink]="['/blog', post.id]" class="blog-read-link">
              <span>Read Full Article</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Pagination Controls (Only show if multiple pages needed) -->
      <div class="pagination-bar" *ngIf="totalPages() > 1">
        <button 
          (click)="prevPage()" 
          [disabled]="currentPage() === 1" 
          class="btn-premium secondary page-btn">
          <span class="material-symbols-outlined">chevron_left</span>
        </button>
        <span class="page-indicator">Page {{ currentPage() }} of {{ totalPages() }}</span>
        <button 
          (click)="nextPage()" 
          [disabled]="currentPage() === totalPages()" 
          class="btn-premium secondary page-btn">
          <span class="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <!-- Empty State -->
      <ng-template #noBlogs>
        <div class="empty-state glass-card">
          <span class="material-symbols-outlined empty-icon">menu_book</span>
          <h3>No Articles Found</h3>
          <p>We couldn't find any articles matching your search tags. Please modify your query.</p>
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
    
    // Featured post
    .featured-post-card {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 32px;
      padding: 32px;
      margin-bottom: 60px;
      
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 20px;
        gap: 20px;
      }
    }
    
    .featured-image-box {
      height: 320px;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      
      .featured-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .featured-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;
      
      .category-tag {
        font-size: 0.8rem;
        font-weight: 700;
        color: #a855f7;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      
      .featured-title {
        font-size: 1.8rem;
        font-weight: 800;
        line-height: 1.3;
      }
      
      .featured-desc {
        color: var(--text-secondary);
        font-size: 1rem;
        line-height: 1.6;
      }
      
      .featured-meta {
        font-size: 0.85rem;
        color: var(--text-muted);
        display: flex;
        gap: 8px;
      }
      
      .featured-cta {
        padding: 10px 24px;
        font-size: 0.9rem;
      }
    }
    
    .grid-section-title {
      font-size: 1.6rem;
      font-weight: 800;
      margin-bottom: 24px;
    }
    
    // Grid
    .blog-grid {
      gap: 32px;
    }
    
    .blog-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }
    
    .blog-card-img {
      height: 200px;
      position: relative;
      overflow: hidden;
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .blog-cat-badge {
        position: absolute;
        bottom: 12px;
        left: 12px;
        background: rgba(3, 7, 18, 0.6);
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        padding: 2px 10px;
        border-radius: var(--border-radius-full);
        font-size: 0.75rem;
        font-weight: 700;
      }
    }
    
    .blog-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      flex-grow: 1;
    }
    
    .blog-meta {
      font-size: 0.8rem;
      color: var(--text-muted);
      display: flex;
      gap: 6px;
    }
    
    .blog-title {
      font-size: 1.25rem;
      font-weight: 700;
      line-height: 1.4;
    }
    
    .blog-desc {
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }
    
    .blog-read-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 700;
      color: #a855f7;
      margin-top: auto;
      padding-top: 12px;
      
      span {
        transition: transform var(--transition-fast);
      }
      
      &:hover span:last-child {
        transform: translateX(4px);
      }
    }
    
    // Pagination
    .pagination-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 60px;
      
      .page-btn {
        width: 44px;
        height: 44px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .page-indicator {
        font-size: 0.95rem;
        font-weight: 600;
        color: var(--text-secondary);
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
export class BlogComponent implements OnInit {
  blogs = signal<Blog[]>([]);
  searchQuery = '';

  // Filters State
  selectedCategory = signal<string>('All');
  searchFilter = signal<string>('');

  // Pagination State
  currentPage = signal<number>(1);
  pageSize = 6;

  categories = ['All', 'Angular', 'Architecture', 'Cloud & Backend'];

  // Computed featured post (highest index/featured flag)
  featuredPost = computed(() => {
    return this.blogs().find(post => post.featured) || null;
  });

  // Filtered Blog List (excludes featured post if viewing default category grid)
  filteredBlogs = computed(() => {
    let list = this.blogs();
    const query = this.searchFilter().toLowerCase().trim();
    const category = this.selectedCategory();
    const featured = this.featuredPost();

    // If viewing main overview, exclude featured post from the grid
    if (category === 'All' && !query && featured) {
      list = list.filter(p => p.id !== featured.id);
    }

    if (category !== 'All') {
      list = list.filter(p => p.category === category);
    }

    if (query) {
      list = list.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Paginated and filtered lists
  paginatedBlogs = computed(() => {
    const list = this.filteredBlogs();
    const pageIndex = this.currentPage() - 1;
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return list.slice(start, end);
  });

  totalPages = computed(() => {
    const list = this.filteredBlogs();
    return Math.ceil(list.length / this.pageSize);
  });

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs.set(data);
      },
      error: (err) => {
        console.error('Failed to load blog posts', err);
      }
    });
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1);
  }

  onSearchChange(value: string) {
    this.searchFilter.set(value);
    this.currentPage.set(1);
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  resetFilters() {
    this.searchQuery = '';
    this.searchFilter.set('');
    this.selectedCategory.set('All');
    this.currentPage.set(1);
  }
}
