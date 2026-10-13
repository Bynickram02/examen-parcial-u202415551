import {inject, Service, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Observable, switchMap, tap, throwError} from 'rxjs';
import {AquaticCentersApi} from '../infrastructure/aquatic-centers-api';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';

export const CAPACITY_EXCEEDED = 'capacity-exceeded';

/**
 * Aquatic centers and reservations state.
 * @author Nickolas Ramirez
 */
@Service()
export class AquaticCentersStore {
  private readonly aquaticCentersApi = inject(AquaticCentersApi);

  private readonly aquaticCentersSignal = signal<AquaticCenter[]>([]);
  readonly aquaticCenters = this.aquaticCentersSignal.asReadonly();

  private readonly reservationsSignal = signal<Reservation[]>([]);
  readonly reservations = this.reservationsSignal.asReadonly();

  private readonly loadingSignal = signal(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadAquaticCenters();
    this.loadReservations();
  }

  getAquaticCenterByActivityType = (activityType: ActivityType): AquaticCenter | undefined =>
    this.aquaticCenters().find(aquaticCenter => aquaticCenter.activityType === activityType);

  addReservation = (reservation: Reservation): Observable<Reservation> =>
    this.aquaticCentersApi.getReservations().pipe(
      switchMap(reservations => {
        this.reservationsSignal.set(reservations);
        const aquaticCenter = this.aquaticCenters().find(center => center.id === reservation.aquaticCenterId);
        if (!aquaticCenter?.canAccept(reservation.participants, reservations)) {
          return throwError(() => new Error(CAPACITY_EXCEEDED));
        }
        return this.aquaticCentersApi.createReservation(reservation);
      }),
      tap(created => this.reservationsSignal.update(reservations => [...reservations, created]))
    );

  private loadAquaticCenters(): void {
    this.loadingSignal.set(true);
    this.aquaticCentersApi.getAquaticCenters().pipe(takeUntilDestroyed()).subscribe({
      next: aquaticCenters => {
        this.aquaticCentersSignal.set(aquaticCenters);
        this.loadingSignal.set(false);
      },
      error: (error: Error) => {
        this.errorSignal.set(error.message);
        this.loadingSignal.set(false);
      }
    });
  }

  private loadReservations(): void {
    this.aquaticCentersApi.getReservations().pipe(takeUntilDestroyed()).subscribe({
      next: reservations => this.reservationsSignal.set(reservations),
      error: (error: Error) => this.errorSignal.set(error.message)
    });
  }
}
