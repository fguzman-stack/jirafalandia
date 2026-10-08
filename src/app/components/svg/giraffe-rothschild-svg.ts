import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-giraffe-rothschild-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `<svg viewBox="25 20 330 465" class="w-full h-full" role="img" aria-label="Jirafa de Rothschild, manchas canela y calcetines blancos"><g app-giraffe-art coat="northern" /></svg>`,
  styles: [':host { display: block; width: 100%; height: 100%; }']
})
export class GiraffeRothschildSvg {}
