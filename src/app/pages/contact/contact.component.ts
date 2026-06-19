import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  template: `
    <section class="section container">
      <!-- Decorative Background Blur -->
      <div class="mesh-bg">
        <div class="mesh-blob blob-3" style="bottom: 10%; right: 10%;"></div>
      </div>

      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Contact</span>
        <h2 class="title">Let's Connect on Your Next Project</h2>
        <p class="desc">
          Ready to optimize your operations or build a new platform? Fill out the form below or reach out via email.
        </p>
      </div>

      <!-- Layout: Form and Info Grid -->
      <div class="grid-2 contact-layout">
        
        <!-- Left: Quick Info Column -->
        <div class="contact-info-col">
          <h3 class="info-title">Contact Information</h3>
          <p class="info-desc">Feel free to reach out directly or schedule a direct consultation call.</p>

          <div class="info-cards-stack">
            <div class="info-item-card glass-card">
              <span class="material-symbols-outlined item-icon">mail</span>
              <div class="item-content">
                <h5>Email Us</h5>
                <a href="mailto:support&#64;ashantechlabs.com">support&#64;ashantechlabs.com</a>
              </div>
            </div>

            <div class="info-item-card glass-card">
              <span class="material-symbols-outlined item-icon">phone_iphone</span>
              <div class="item-content">
                <h5>Call Us</h5>
                <a href="tel:+919840067650">+91 98400 67650</a>
              </div>
            </div>

            <div class="info-item-card glass-card">
              <span class="material-symbols-outlined item-icon">location_on</span>
              <div class="item-content">
                <h5>Location</h5>
                <p>Madipakkam, Chennai &middot; Tamil Nadu, India</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Reactive Form Column -->
        <div class="contact-form-col glass-card">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="reactive-form">
            <!-- Name Field -->
            <div class="form-group">
              <label for="name">Your Name *</label>
              <input 
                id="name"
                type="text" 
                formControlName="name" 
                placeholder="John Doe" 
                class="form-control"
                [class.invalid]="hasError('name')"
              />
              <span class="error-msg" *ngIf="hasError('name')">Name is required.</span>
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <label for="email">Email Address *</label>
              <input 
                id="email"
                type="email" 
                formControlName="email" 
                placeholder="john&#64;company.com" 
                class="form-control"
                [class.invalid]="hasError('email')"
              />
              <span class="error-msg" *ngIf="hasError('email')">Please enter a valid email.</span>
            </div>

            <!-- Double Grid (Phone & Company) -->
            <div class="form-row">
              <div class="form-group">
                <label for="phone">Phone (Optional)</label>
                <input 
                  id="phone"
                  type="text" 
                  formControlName="phone" 
                  placeholder="+1 (555) 000-0000" 
                  class="form-control" 
                />
              </div>

              <div class="form-group">
                <label for="company">Company (Optional)</label>
                <input 
                  id="company"
                  type="text" 
                  formControlName="company" 
                  placeholder="Acme Corp" 
                  class="form-control" 
                />
              </div>
            </div>

            <!-- Subject Field -->
            <div class="form-group">
              <label for="subject">Subject *</label>
              <input 
                id="subject"
                type="text" 
                formControlName="subject" 
                placeholder="Project Partnership / Consulting" 
                class="form-control"
                [class.invalid]="hasError('subject')"
              />
              <span class="error-msg" *ngIf="hasError('subject')">Subject is required.</span>
            </div>

            <!-- Message Field -->
            <div class="form-group">
              <label for="message">Your Message *</label>
              <textarea 
                id="message"
                formControlName="message" 
                rows="5" 
                placeholder="Provide details about your project or inquiry..." 
                class="form-control text-area"
                [class.invalid]="hasError('message')"
              ></textarea>
              <span class="error-msg" *ngIf="hasError('message')">
                Message is required (minimum 10 characters).
              </span>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit" 
              [disabled]="contactForm.invalid || isSubmitting()" 
              class="btn-premium primary submit-btn">
              <span *ngIf="!isSubmitting()">Send Message</span>
              <span *ngIf="isSubmitting()" class="loading-spinner"></span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-layout {
      gap: 48px;
      align-items: flex-start;
      
      @media (max-width: 1024px) {
        gap: 32px;
      }
    }
    
    .contact-info-col {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .info-title {
      font-size: 1.8rem;
      font-weight: 800;
    }
    
    .info-desc {
      font-size: 1.05rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    
    .info-cards-stack {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 12px;
    }
    
    .info-item-card {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      
      .item-icon {
        width: 50px;
        height: 50px;
        border-radius: var(--border-radius-md);
        background: rgba(168, 85, 247, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a855f7;
        font-size: 26px;
      }
      
      .item-content {
        h5 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        
        a, p {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        
        a:hover {
          color: #a855f7;
        }
      }
    }
    
    // Form styles
    .contact-form-col {
      padding: 40px;
      
      @media (max-width: 768px) {
        padding: 24px;
      }
    }
    
    .reactive-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      label {
        font-size: 0.9rem;
        font-weight: 700;
        color: var(--text-primary);
      }
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      
      @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
    
    .form-control {
      width: 100%;
      padding: 12px 16px;
      background: var(--surface-solid);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-md);
      color: var(--text-primary);
      font-family: var(--font-body);
      font-size: 0.95rem;
      outline: none;
      transition: border-color var(--transition-fast);
      
      &:focus {
        border-color: #a855f7;
      }
      
      &.invalid {
        border-color: var(--error-color);
      }
    }
    
    .text-area {
      resize: vertical;
    }
    
    .error-msg {
      font-size: 0.8rem;
      color: var(--error-color);
      font-weight: 600;
    }
    
    .submit-btn {
      padding: 14px 28px;
      width: 100%;
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
    
    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = signal(false);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Check for query parameters to pre-fill subject
    const serviceId = this.route.snapshot.queryParamMap.get('service');
    let subjectInitial = '';

    if (serviceId) {
      const prettyServiceName = serviceId.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      subjectInitial = `Inquiry regarding ${prettyServiceName} service`;
    }

    // Initialize Reactive Form
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: [subjectInitial, Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) return;

    this.isSubmitting.set(true);
    
    this.contactService.sendMessage(this.contactForm.value).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        if (res.success) {
          this.snackBar.open(res.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
          });
          this.contactForm.reset();
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.snackBar.open('Something went wrong. Please try again later.', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-error']
        });
        console.error('Contact submission error', err);
      }
    });
  }
}
