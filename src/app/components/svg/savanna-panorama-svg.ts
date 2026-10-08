import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HabitatScene } from './habitat-scene';

@Component({
  selector: 'app-savanna-panorama-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HabitatScene],
  template: `<div class="rounded-3xl overflow-hidden border border-[#d8c9a3] shadow-lg"><app-habitat-scene /></div>`
})
export class SavannaPanoramaSvg {}
