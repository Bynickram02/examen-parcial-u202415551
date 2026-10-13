import {inject, Service, signal} from '@angular/core';
import {Subscription} from 'rxjs';
import {WeatherApi} from '../infrastructure/weather-api';
import {CurrentWeather} from '../domain/model/current-weather.entity';

/**
 * @author Nickolas Ramirez
 */
@Service()
export class WeatherStore {
  private readonly weatherApi = inject(WeatherApi);
  private request?: Subscription;

  private readonly currentWeatherSignal = signal<CurrentWeather | null>(null);
  readonly currentWeather = this.currentWeatherSignal.asReadonly();

  private readonly loadingSignal = signal(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  loadCurrentWeather(latitude: number, longitude: number): void {
    this.clear();
    this.loadingSignal.set(true);
    this.request = this.weatherApi.getCurrentWeather(latitude, longitude).subscribe({
      next: currentWeather => {
        if (currentWeather.hasValidTemperature()) {
          this.currentWeatherSignal.set(currentWeather);
        } else {
          this.errorSignal.set('Invalid temperature');
        }
        this.loadingSignal.set(false);
      },
      error: (error: Error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      }
    });
  }

  clear(): void {
    this.request?.unsubscribe();
    this.currentWeatherSignal.set(null);
    this.errorSignal.set(null);
    this.loadingSignal.set(false);
  }
}
