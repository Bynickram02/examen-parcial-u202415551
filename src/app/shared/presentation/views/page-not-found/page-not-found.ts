import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

/**
 * Page not found view.
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, MatIcon, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  private readonly router = inject(Router);
  protected readonly invalidPath = inject(ActivatedRoute).snapshot.url.map(segment => segment.path).join('/');

  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
