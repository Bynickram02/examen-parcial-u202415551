import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';
import {Reservation} from './reservation.entity';

/**

 * @author Nickolas Ramirez
 */
export class AquaticCenter implements BaseEntity {
  id: number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;

  constructor(props: {
    id: number;
    name: string;
    activityType: ActivityType;
    capacity: number;
    latitude: number;
    longitude: number;
  }) {
    this.id = props.id;
    this.name = props.name;
    this.activityType = props.activityType;
    this.capacity = props.capacity;
    this.latitude = props.latitude;
    this.longitude = props.longitude;
  }

  ownReservations(reservations: Reservation[]): Reservation[] {
    return reservations.filter(reservation => reservation.aquaticCenterId === this.id);
  }

  totalParticipants(reservations: Reservation[]): number {
    return this.ownReservations(reservations)
      .reduce((total, reservation) => total + reservation.participants, 0);
  }

  availableCapacity(reservations: Reservation[]): number {
    return this.capacity - this.totalParticipants(reservations);
  }

  canAccept(participants: number, reservations: Reservation[]): boolean {
    return participants > 0 && participants <= this.availableCapacity(reservations);
  }
}
