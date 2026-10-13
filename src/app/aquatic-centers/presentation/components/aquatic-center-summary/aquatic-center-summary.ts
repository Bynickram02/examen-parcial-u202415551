import {Component, computed, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {AquaticCenter} from '../../../domain/model/aquatic-center.entity';
import {Reservation} from '../../../domain/model/reservation.entity';

/**
 AquaCenter cards for the presentation
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-aquatic-center-summary',
  imports: [MatCardModule, MatListModule, MatIcon, TranslatePipe, DatePipe],
  templateUrl: './aquatic-center-summary.html',
  styleUrl: './aquatic-center-summary.css'
})
export class AquaticCenterSummary {
  readonly aquaticCenter = input.required<AquaticCenter>();
  readonly reservations = input.required<Reservation[]>();

  protected readonly centerReservations = computed(() => this.aquaticCenter().ownReservations(this.reservations()));
  protected readonly totalParticipants = computed(() => this.aquaticCenter().totalParticipants(this.reservations()));
  protected readonly availableCapacity = computed(() => this.aquaticCenter().availableCapacity(this.reservations()));
}
