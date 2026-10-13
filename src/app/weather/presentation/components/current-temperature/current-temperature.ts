import {Component, inject, output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslatePipe} from '@ngx-translate/core';
import {WeatherStore} from '../../../application/weather.store';

/**
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-current-temperature',
  imports: [MatIcon, MatButton, MatProgressSpinner, TranslatePipe, DecimalPipe],
  templateUrl: './current-temperature.html',
  styleUrl: './current-temperature.css'
})
export class CurrentTemperature {
  protected readonly store = inject(WeatherStore);
  readonly retry = output<void>();
}
