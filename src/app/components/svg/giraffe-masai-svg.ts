import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-giraffe-masai-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `<svg viewBox="25 20 330 465" class="w-full h-full" role="img" aria-label="Jirafa masái de pelaje dorado y manchas oscuras dentadas"><g app-giraffe-art coat="masai" /></svg>`,
  styles: [':host { display: block; width: 100%; height: 100%; }']
})
export class GiraffeMasaiSvg {}
