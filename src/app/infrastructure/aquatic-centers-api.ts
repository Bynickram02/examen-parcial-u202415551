import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {Reservation} from '../domain/model/reservation.entity';
import {AquaticCentersApiEndpoint} from './aquatic-centers-api-endpoint';
import {ReservationsApiEndpoint} from './reservations-api-endpoint';

/**
 *aquatic-centers-api
 @author Nickolas Ramirez
 */
@Service()
export class AquaticCentersApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly aquaticCentersEndpoint = new AquaticCentersApiEndpoint(this.http);
  private readonly reservationsEndpoint = new ReservationsApiEndpoint(this.http);

  getAquaticCenters = (): Observable<AquaticCenter[]> =>
    this.aquaticCentersEndpoint.getAll();

  getReservations = (): Observable<Reservation[]> =>
    this.reservationsEndpoint.getAll();

  createReservation = (reservation: Reservation): Observable<Reservation> =>
    this.reservationsEndpoint.create(reservation);
}
