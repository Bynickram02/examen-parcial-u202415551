import {Routes} from '@angular/router';

const reservationForm = () => import('./views/reservation-form/reservation-form').then(m => m.ReservationForm);

/**
 * @author Nickolas Ramirez
 */
export const aquaticCentersRoutes: Routes = [
  { path: 'new', loadComponent: reservationForm, title: 'AquaLife - New Reservation' }
];
