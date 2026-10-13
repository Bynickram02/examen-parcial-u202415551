import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {ActivityType} from './activity-type';

/**
 * Reservation entity.
 * @author Nickolas Ramirez
 */
export class Reservation implements BaseEntity {
  id: number;
  aquaticCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: Date;

  constructor(props: {
    id: number;
    aquaticCenterId: number;
    activityType: ActivityType;
    participantName: string;
    participants: number;
    weatherTemperature: number;
    reservedAt: Date;
  }) {
    this.id = props.id;
    this.aquaticCenterId = props.aquaticCenterId;
    this.activityType = props.activityType;
    this.participantName = props.participantName;
    this.participants = props.participants;
    this.weatherTemperature = props.weatherTemperature;
    this.reservedAt = props.reservedAt;
  }
}
