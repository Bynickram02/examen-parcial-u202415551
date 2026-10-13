import {Component, inject} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/**
 * @author Nickolas Ramirez
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css'
})
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);
  protected readonly languages = ['en', 'es'];
  protected readonly currentLanguage = this.translate.currentLang;

  protected useLanguage(language: string): void {
    this.translate.use(language);
    document.documentElement.lang = language;
  }
}
