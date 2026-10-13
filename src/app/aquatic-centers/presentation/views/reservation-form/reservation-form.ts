import {Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {AquaticCentersStore, CAPACITY_EXCEEDED} from '../../../application/aquatic-centers.store';
import {WeatherStore} from '../../../../weather/application/weather.store';
import {CurrentTemperature} from '../../../../weather/presentation/components/current-temperature/current-temperature';
import {AquaticCenter} from '../../../domain/model/aquatic-center.entity';
import {ActivityType} from '../../../domain/model/activity-type';
import {Reservation} from '../../../domain/model/reservation.entity';

/**
 * New reservation form.
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-reservation-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    TranslatePipe,
    CurrentTemperature
  ],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.css'
})
export class ReservationForm {
  private readonly router = inject(Router);
  protected readonly aquaticCentersStore = inject(AquaticCentersStore);
  protected readonly weatherStore = inject(WeatherStore);

  protected readonly selectedAquaticCenter = signal<AquaticCenter | undefined>(undefined);
  protected readonly saving = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly availableCapacity = computed(() =>
    this.selectedAquaticCenter()?.availableCapacity(this.aquaticCentersStore.reservations()) ?? null);

  protected readonly canCreate = computed(() =>
    !this.saving() && !!this.selectedAquaticCenter() && !!this.weatherStore.currentWeather());

  protected readonly form = new FormGroup({
    activityType: new FormControl<ActivityType | null>(null, Validators.required),
    participantName: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/\S/)]}),
    participants: new FormControl(1, {nonNullable: true, validators: [Validators.required, Validators.min(1)]})
  });

  constructor() {
    this.weatherStore.clear();
  }

  protected selectActivityType(activityType: ActivityType): void {
    const aquaticCenter = this.aquaticCentersStore.getAquaticCenterByActivityType(activityType);
    this.selectedAquaticCenter.set(aquaticCenter);
    this.errorMessage.set(null);
    this.updateParticipantsValidators();
    this.loadTemperature();
  }

  protected loadTemperature(): void {
    const aquaticCenter = this.selectedAquaticCenter();
    if (aquaticCenter) {
      this.weatherStore.loadCurrentWeather(aquaticCenter.latitude, aquaticCenter.longitude);
    }
  }

  protected submit(): void {
    const aquaticCenter = this.selectedAquaticCenter();
    const currentWeather = this.weatherStore.currentWeather();
    if (this.form.invalid || !aquaticCenter || !currentWeather) {
      this.form.markAllAsTouched();
      return;
    }

    const {participantName, participants} = this.form.getRawValue();
    const reservation = new Reservation({
      id: 0,
      aquaticCenterId: aquaticCenter.id,
      activityType: aquaticCenter.activityType,
      participantName: participantName.trim(),
      participants,
      weatherTemperature: currentWeather.temperature,
      reservedAt: new Date()
    });

    this.saving.set(true);
    this.errorMessage.set(null);
    this.aquaticCentersStore.addReservation(reservation).subscribe({
      next: () => this.router.navigate(['/home']).then(),
      error: (error: Error) => {
        this.saving.set(false);
        this.updateParticipantsValidators();
        this.errorMessage.set(error.message === CAPACITY_EXCEEDED
          ? 'reservation-form.errors.capacity-exceeded'
          : 'reservation-form.errors.save-failed');
      }
    });
  }

  private updateParticipantsValidators(): void {
    const participants = this.form.controls.participants;
    participants.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.availableCapacity() ?? 0),
      Validators.pattern(/^\d+$/)
    ]);
    participants.updateValueAndValidity();
  }
}
