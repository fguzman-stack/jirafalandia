import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoatSwatch } from './coat-swatch';
import { GiraffeCoat } from './giraffe-art';

@Component({
  selector: 'app-giraffe-patterns-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CoatSwatch],
  template: `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
      @for (coat of coats; track coat.pattern) {
        <figure class="p-3 sm:p-4 rounded-2xl bg-[#fffdf5] border border-[#ddd0b3]">
          <div class="aspect-[4/5] rounded-xl overflow-hidden"><app-coat-swatch [pattern]="coat.pattern" /></div>
          <figcaption class="pt-3 text-center"><h4 class="font-heading font-semibold text-lg text-[#644d35]">{{ coat.name }}</h4><p class="text-xs text-[#8c795e] mt-1">{{ coat.detail }}</p></figcaption>
        </figure>
      }
    </div>
  `
})
export class GiraffePatternsSvg {
  readonly coats: { pattern: GiraffeCoat; name: string; detail: string }[] = [
    { pattern: 'reticulated', name: 'Reticulada', detail: 'Un mosaico de líneas crema' },
    { pattern: 'masai', name: 'Masái', detail: 'Bordes como hojas de roble' },
    { pattern: 'northern', name: 'Del Norte', detail: 'Suaves islas de color canela' },
    { pattern: 'southern', name: 'Del Sur', detail: 'Manchas de contorno irregular' }
  ];
}
