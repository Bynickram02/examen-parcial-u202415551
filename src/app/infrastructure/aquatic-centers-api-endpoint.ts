import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {AquaticCenter} from '../domain/model/aquatic-center.entity';
import {AquaticCenterResource, AquaticCentersResponse} from './aquatic-centers-response';
import {AquaticCenterAssembler} from './aquatic-center-assembler';
import {environment} from '../../../environments/environment';

/**
 * aquatic-center-api-endpoint (profe toy tipeando los comentarios porsiacaso ah, nada de ia, son solo de referencia)
@author Nickolas Ramirez
 */
export class AquaticCentersApiEndpoint extends BaseApiEndpoint<AquaticCenter, AquaticCenterResource, AquaticCentersResponse, AquaticCenterAssembler> {
  constructor(http: HttpClient) {
    super(http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderAquaticCentersEndpointPath}`,
      new AquaticCenterAssembler());
  }
}
