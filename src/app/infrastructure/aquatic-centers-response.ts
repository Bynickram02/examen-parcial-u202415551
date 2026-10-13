import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * @author Nickolas Ramirez
 */
export interface AquaticCenterResource extends BaseResource {
  id: number;
  name: string;
  activityType: string;
  capacity: number;
  latitude: number;
  longitude: number;
}

export interface AquaticCentersResponse extends BaseResponse {
  aquaticCenters: AquaticCenterResource[];
}
