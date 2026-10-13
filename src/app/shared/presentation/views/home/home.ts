import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {AquaticCenterSummaryList} from '../../../../aquatic-centers/presentation/components/aquatic-center-summary-list/aquatic-center-summary-list';

/**
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-home',
  imports: [TranslatePipe, AquaticCenterSummaryList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
}
