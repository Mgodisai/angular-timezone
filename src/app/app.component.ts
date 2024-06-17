import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimezoneComponent } from './timezone/timezone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimezoneComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  availableTimezones = [
    'Europe/Budapest',
    'Africa/Accra',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Europe/London',
    'Pacific/Auckland',
    'America/Los_Angeles',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Shanghai',
    'Europe/Paris',
  ];

  usedTimezones: string[] = [];
  maxTimezones = 5;
  maxAvailableTimezones = this.availableTimezones.length;

  title = 'Timezones';
  desc =
    'Click on component to select as current timezone, add new component with random timezone, remove component, or update timezone.';
  selectedTimezone: string = '';

  onTimezoneSelected($event: string) {
    this.selectedTimezone = $event;
  }

  addRandomTimezone() {
    if (this.usedTimezones.length < this.maxTimezones) {
      let newTimezone: string;

      const randomIndex = Math.floor(
        Math.random() * this.availableTimezones.length
      );
      newTimezone = this.availableTimezones[randomIndex];
      this.availableTimezones.splice(randomIndex, 1);
      this.usedTimezones.push(newTimezone);
    }
  }

  removeTimezone(timezone: string) {
    this.usedTimezones = this.usedTimezones.filter((tz) => tz !== timezone);
    this.availableTimezones.push(timezone);
  }

  updateTimezone({
    oldTimezone,
    newTimezone,
  }: {
    oldTimezone: string;
    newTimezone: string;
  }) {
    const index = this.usedTimezones.indexOf(oldTimezone);
    if (index !== -1 && !this.usedTimezones.includes(newTimezone)) {
      this.usedTimezones[index] = newTimezone;
      this.availableTimezones.push(oldTimezone);
      this.availableTimezones = this.availableTimezones.filter(
        (tz) => tz !== newTimezone
      );
    }
  }

  getAvailableTimezonesSorted() {
    return this.availableTimezones.sort();
  }
}
