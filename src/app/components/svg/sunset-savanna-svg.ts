import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HabitatScene } from './habitat-scene';

@Component({
  selector: 'app-sunset-savanna-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HabitatScene],
  template: `<div class="rounded-3xl overflow-hidden border border-[#b999a0] shadow-lg"><app-habitat-scene zone="mirador-atardecer" label="Familia de jirafas a contraluz y mirador de madera bajo el sol del atardecer" /></div>`
})
export class SunsetSavannaSvg {}
