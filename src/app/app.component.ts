import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimezoneComponent } from './timezone/timezone.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimezoneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  timezones = [
    'Europe/Budapest',
    'Africa/Accra',
    'America/New_York',
    'Asia/Tokyo',
    'Australia/Sydney',
  ];

  title = 'Timezones';
  desc = 'Click on component to select as current timezone';
  selectedTimezone: string = '';

  onTimezoneSelected($event: string) {
    this.selectedTimezone = $event;
  }
}
