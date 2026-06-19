import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Ashan TechLabs - Custom Software & ERP Solutions'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Ashan TechLabs'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),
    title: 'Services & Enterprise Solutions | Ashan TechLabs'
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent),
    title: 'Skills & Tech Stack | Ashan TechLabs'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
    title: 'Projects Showcase | Ashan TechLabs'
  },
  {
    path: 'experience',
    loadComponent: () => import('./pages/timeline/timeline.component').then(m => m.TimelineComponent),
    title: 'Company Timeline & Journey | Ashan TechLabs'
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent),
    title: 'Client Testimonials | Ashan TechLabs'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),
    title: 'Insights Blog | Ashan TechLabs'
  },
  {
    path: 'blog/:id',
    loadComponent: () => import('./pages/blog/blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
    title: 'Blog Article | Ashan TechLabs'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | Ashan TechLabs'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
