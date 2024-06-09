import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timezone.component.html',
  styleUrl: './timezone.component.scss',
})
export class TimezoneComponent {
  @Input() timezone: string = '';
  @Input() isCurrent: boolean = false;
  @Output() timezoneChanged = new EventEmitter<string>();
  currentTime: string = '';
  private updateInterval: any = null;

  ngOnInit() {
    this.updateTime();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
  }

  selectTimezone() {
    this.timezoneChanged.emit(this.timezone);
    this.startAutoUpdate();
  }

  startAutoUpdate() {
    if (!this.updateInterval) {
      this.updateInterval = setInterval(() => {
        this.updateTime();
      }, 1000);
    }
  }

  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  updateTime() {
    this.currentTime = new Date().toLocaleString('en-EN', {
      timeZone: this.timezone,
    });
    if (!this.isCurrent) {
      this.stopAutoUpdate();
    }
  }
}
