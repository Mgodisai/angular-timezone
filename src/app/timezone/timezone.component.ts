import { Input, Output, Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timezone',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss'],
})
export class TimezoneComponent {
  @Input() timezone: string = '';
  @Input() isCurrent: boolean = false;
  @Input() allTimezones: string[] = [];
  @Input() currentTimezones: string[] = [];
  @Output() timezoneSelected = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() timezoneUpdated = new EventEmitter<{
    oldTimezone: string;
    newTimezone: string;
  }>();
  currentTime: string = '';
  private updateInterval: any = null;
  private previousTimezone: string = '';

  ngOnInit() {
    this.previousTimezone = this.timezone;
    this.updateTime();
    this.startAutoUpdate();
  }

  ngOnDestroy() {
    this.stopAutoUpdate();
  }

  selectTimezone() {
    this.timezoneSelected.emit(this.timezone);
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

  removeTimezone() {
    this.stopAutoUpdate();
    this.remove.emit(this.timezone);
  }

  onTimezoneBlur() {
    this.updateTimezone();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.updateTimezone();
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private updateTimezone() {
    if (
      this.allTimezones.includes(this.timezone) &&
      !this.currentTimezones.includes(this.timezone)
    ) {
      const oldTimezone = this.previousTimezone;
      this.previousTimezone = this.timezone;
      this.timezoneUpdated.emit({ oldTimezone, newTimezone: this.timezone });
    } else {
      this.timezone = this.previousTimezone;
    }
  }
}
