import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../../../core/models/blog.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="section container detail-section">
      <!-- Back to listing link -->
      <a routerLink="/blog" class="back-link">
        <span class="material-symbols-outlined">arrow_back</span>
        <span>Back to Articles</span>
      </a>

      <div class="article-wrapper glass-card" *ngIf="blog; else loader">
        <!-- Header metadata -->
        <header class="article-header">
          <span class="category-tag">{{ blog.category }}</span>
          <h1 class="article-title">{{ blog.title }}</h1>
          
          <div class="article-meta">
            <div class="author-info">
              <span class="material-symbols-outlined">person</span>
              <span>{{ blog.author }}</span>
            </div>
            <span>&bull;</span>
            <div class="date-info">
              <span class="material-symbols-outlined">calendar_today</span>
              <span>{{ blog.publishedDate | date }}</span>
            </div>
            <span>&bull;</span>
            <div class="read-info">
              <span class="material-symbols-outlined">schedule</span>
              <span>{{ blog.readTime }}</span>
            </div>
          </div>
        </header>

        <!-- Banner Image -->
        <div class="banner-box">
          <img [src]="blog.image" [alt]="blog.title" class="banner-img" />
        </div>

        <!-- HTML Article Content -->
        <article class="article-body" [innerHTML]="safeContent">
        </article>
      </div>

      <!-- Loading State -->
      <ng-template #loader>
        <div class="loader-box glass-card">
          <span class="material-symbols-outlined loading-icon">history</span>
          <h3>Loading Article...</h3>
        </div>
      </ng-template>
    </section>
  `,
  styles: [`
    .detail-section {
      max-width: 900px;
    }
    
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      font-weight: 700;
      color: #a855f7;
      margin-bottom: 24px;
      transition: transform var(--transition-fast);
      
      &:hover {
        transform: translateX(-4px);
      }
    }
    
    .article-wrapper {
      padding: 48px;
      
      @media (max-width: 768px) {
        padding: 24px;
      }
    }
    
    .article-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 32px;
      
      .category-tag {
        font-size: 0.85rem;
        font-weight: 700;
        color: #a855f7;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        align-self: flex-start;
      }
      
      .article-title {
        font-size: 2.5rem;
        font-weight: 850;
        line-height: 1.2;
        letter-spacing: -0.03em;
        
        @media (max-width: 768px) {
          font-size: 1.8rem;
        }
      }
    }
    
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 12px;
      font-size: 0.85rem;
      color: var(--text-secondary);
      
      .author-info, .date-info, .read-info {
        display: flex;
        align-items: center;
        gap: 6px;
        
        span:first-child {
          font-size: 18px;
        }
      }
    }
    
    .banner-box {
      height: 400px;
      border-radius: var(--border-radius-lg);
      overflow: hidden;
      margin-bottom: 40px;
      
      @media (max-width: 768px) {
        height: 240px;
        margin-bottom: 24px;
      }
      
      .banner-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    // Article text body styling
    .article-body {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--text-secondary);
      
      ::ng-deep p {
        margin-bottom: 24px;
      }
      
      ::ng-deep h3 {
        font-size: 1.5rem;
        font-weight: 800;
        margin: 40px 0 16px 0;
        color: var(--text-primary);
      }
      
      ::ng-deep pre {
        background: var(--surface-solid);
        border: 1px solid var(--border-color);
        padding: 20px;
        border-radius: var(--border-radius-md);
        overflow-x: auto;
        margin: 24px 0;
        
        code {
          font-family: monospace;
          font-size: 0.95rem;
          color: var(--text-primary);
        }
      }
      
      ::ng-deep ul, ::ng-deep ol {
        margin-bottom: 24px;
        padding-left: 24px;
        
        li {
          margin-bottom: 8px;
        }
      }
      
      ::ng-deep strong {
        color: var(--text-primary);
      }
    }
    
    // Loader
    .loader-box {
      padding: 60px 40px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      
      .loading-icon {
        font-size: 40px;
        color: #a855f7;
        animation: spin 2s linear infinite;
      }
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog?: Blog;
  safeContent?: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.blogService.getBlogById(id).subscribe({
        next: (data) => {
          if (data) {
            this.blog = data;
            this.safeContent = this.sanitizer.bypassSecurityTrustHtml(data.content);
          }
        },
        error: (err) => {
          console.error('Failed to load article detail', err);
        }
      });
    }
  }
}
