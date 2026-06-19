import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-typing-effect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="typing-text">{{ displayedText() }}</span><span class="cursor">|</span>
  `,
  styles: [`
    .typing-text {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
    }
    
    .cursor {
      color: #a855f7;
      animation: blink 0.75s step-end infinite;
      font-weight: 400;
      margin-left: 2px;
    }
    
    @keyframes blink {
      from, to { color: transparent }
      50% { color: #a855f7 }
    }
  `]
})
export class TypingEffectComponent implements OnInit, OnDestroy {
  @Input() words: string[] = ['Senior Full-Stack Developer', 'Software Consultant', 'Startup Founder'];
  @Input() typeSpeed = 100;
  @Input() eraseSpeed = 50;
  @Input() delayBetween = 2000;

  displayedText = signal('');
  private currentWordIndex = 0;
  private isDestroyed = false;

  ngOnInit() {
    this.startTypingLoop();
  }

  ngOnDestroy() {
    this.isDestroyed = true;
  }

  private async startTypingLoop() {
    while (!this.isDestroyed) {
      const word = this.words[this.currentWordIndex];
      
      // Type word
      for (let i = 0; i <= word.length; i++) {
        if (this.isDestroyed) return;
        this.displayedText.set(word.substring(0, i));
        await this.sleep(this.typeSpeed);
      }
      
      // Hold at end
      await this.sleep(this.delayBetween);
      
      // Erase word
      for (let i = word.length; i >= 0; i--) {
        if (this.isDestroyed) return;
        this.displayedText.set(word.substring(0, i));
        await this.sleep(this.eraseSpeed);
      }
      
      // Delay before next word
      await this.sleep(500);
      
      // Increment index
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
