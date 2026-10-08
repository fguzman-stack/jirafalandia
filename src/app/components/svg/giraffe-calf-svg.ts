import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-giraffe-calf-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `<svg viewBox="25 55 330 430" class="w-full h-full" role="img" aria-label="Cría de jirafa con grandes orejas y osicones pequeños"><g app-giraffe-art coat="northern" [calf]="true" /></svg>`,
  styles: [':host { display: block; width: 100%; height: 100%; }']
})
export class GiraffeCalfSvg {}
