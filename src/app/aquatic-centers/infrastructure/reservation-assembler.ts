import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reservation} from '../domain/model/reservation.entity';
import {ActivityType} from '../domain/model/activity-type';
import {ReservationResource, ReservationsResponse} from './reservations-response';

/**
 @author Nickolas Ramirez
 */
export class ReservationAssembler implements BaseAssembler<Reservation, ReservationResource, ReservationsResponse> {
  toEntitiesFromResponse = (response: ReservationsResponse): Reservation[] =>
    response.reservations.map(resource => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: ReservationResource): Reservation =>
    new Reservation({
      id: resource.id,
      aquaticCenterId: resource.aquaticCenterId,
      activityType: resource.activityType as ActivityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: new Date(resource.reservedAt)
    });

  toResourceFromEntity = (entity: Reservation): ReservationResource => ({
    aquaticCenterId: entity.aquaticCenterId,
    activityType: entity.activityType,
    participantName: entity.participantName,
    participants: entity.participants,
    weatherTemperature: entity.weatherTemperature,
    reservedAt: entity.reservedAt.toISOString()
  } as ReservationResource);
}
