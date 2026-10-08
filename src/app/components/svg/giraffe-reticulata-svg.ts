import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-giraffe-reticulata-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `<svg viewBox="25 20 330 465" class="w-full h-full" role="img" aria-label="Jirafa reticulada de largas patas, pelaje miel y manchas castañas"><g app-giraffe-art coat="reticulated" /></svg>`,
  styles: [':host { display: block; width: 100%; height: 100%; }']
})
export class GiraffeReticulataSvg {}
