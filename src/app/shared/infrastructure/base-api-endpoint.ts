import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BaseEntity} from '../domain/model/base-entity';
import {BaseResource, BaseResponse} from './base-response';
import {BaseAssembler} from './base-assembler';
import {ErrorHandlingEnabledBaseType} from './error-handling-enabled-base-type';

/**
 * @author Nickolas Ramirez
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> extends ErrorHandlingEnabledBaseType {
  protected constructor(
    protected http: HttpClient,
    protected endpointUrl: string,
    protected assembler: TAssembler
  ) {
    super();
  }

  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => Array.isArray(response)
        ? response.map(resource => this.assembler.toEntityFromResource(resource))
        : this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  create(entity: TEntity): Observable<TEntity> {
    return this.http.post<TResource>(this.endpointUrl, this.assembler.toResourceFromEntity(entity)).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }
}
