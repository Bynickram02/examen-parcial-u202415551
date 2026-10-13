import {Component, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatError} from '@angular/material/form-field';
import {TranslatePipe} from '@ngx-translate/core';
import {AquaticCentersStore} from '../../../application/aquatic-centers.store';
import {AquaticCenterSummary} from '../aquatic-center-summary/aquatic-center-summary';

/**
 * Grid of aquatic center summaries.
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-aquatic-center-summary-list',
  imports: [MatGridListModule, MatProgressSpinner, MatError, TranslatePipe, AquaticCenterSummary],
  templateUrl: './aquatic-center-summary-list.html',
  styleUrl: './aquatic-center-summary-list.css'
})
export class AquaticCenterSummaryList {
  protected readonly store = inject(AquaticCentersStore);
  protected readonly columns = toSignal(
    inject(BreakpointObserver).observe('(max-width: 768px)').pipe(map(result => result.matches ? 1 : 2)),
    {initialValue: 2}
  );
}
