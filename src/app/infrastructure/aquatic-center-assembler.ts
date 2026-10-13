import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {ActivityType} from '../domain/model/activity-type';
import {AquaticCenterResource, AquaticCentersResponse} from './aquatic-centers-response';

/**
 * @author Nickolas Ramirez
 */
export class AquaticCenterAssembler implements BaseAssembler<AquaticCenter, AquaticCenterResource, AquaticCentersResponse> {
  toEntitiesFromResponse = (response: AquaticCentersResponse): AquaticCenter[] =>
    response.aquaticCenters.map(resource => this.toEntityFromResource(resource));

  toEntityFromResource = (resource: AquaticCenterResource): AquaticCenter =>
    new AquaticCenter({
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType as ActivityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude
    });

  toResourceFromEntity = (entity: AquaticCenter): AquaticCenterResource => ({
    id: entity.id,
    name: entity.name,
    activityType: entity.activityType,
    capacity: entity.capacity,
    latitude: entity.latitude,
    longitude: entity.longitude
  });
}
