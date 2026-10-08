import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GiraffeCoat } from './giraffe-art';

@Component({
  selector: 'app-coat-swatch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="0 0 180 200" class="w-full h-full" role="img" [attr.aria-label]="label()">
      <rect width="180" height="200" [attr.fill]="pattern() === 'northern' ? '#f6ead0' : '#edce92'" />
      @for (tile of tiles; track $index; let i = $index) {
        <g [attr.transform]="'translate(' + tile[0] + ' ' + tile[1] + ') rotate(' + (i % 3 * 8 - 8) + ') scale(' + (i % 2 ? '.93' : '1') + ')'">
          <path [attr.d]="shape()" [attr.fill]="color()" />
          <path [attr.d]="shape()" transform="translate(2 1) scale(.86)" fill="#ffffff" opacity=".035" />
        </g>
      }
    </svg>
  `,
  styles: [':host { display: block; width: 100%; height: 100%; }']
})
export class CoatSwatch {
  readonly pattern = input<GiraffeCoat>('reticulated');
  readonly label = computed(() => ({ reticulated: 'Pelaje reticulado: mosaico castaño separado por líneas crema', masai: 'Pelaje masái: manchas oscuras con bordes dentados', northern: 'Pelaje del norte: manchas canela de bordes suaves', southern: 'Pelaje del sur: manchas marrones redondeadas e irregulares' })[this.pattern()]);
  readonly color = computed(() => ({ reticulated: '#a45b32', masai: '#765035', northern: '#b7834c', southern: '#946238' })[this.pattern()]);
  readonly shape = computed(() => ({
    reticulated: 'M-20 -17 L9 -22 L24 -4 L17 20 L-9 24 L-26 7 Z',
    masai: 'M-16 -14 L-5 -18 L0 -12 L12 -21 L14 -10 L23 -9 L18 0 L24 12 L13 12 L8 23 L0 18 L-10 23 L-12 13 L-24 10 L-18 1 L-23 -7 Z',
    northern: 'M-18 -13 Q-20 -20 -9 -20 L12 -16 Q22 -13 20 -2 L18 13 Q15 23 3 20 L-16 15 Q-24 10 -20 0 Z',
    southern: 'M-17 -11 Q-13 -20 -4 -16 Q7 -24 16 -14 Q24 -10 19 2 Q26 12 11 17 Q3 26 -7 16 Q-21 20 -22 6 Q-29 -2 -17 -11 Z'
  })[this.pattern()]);
  readonly tiles = Array.from({ length: 25 }, (_, i) => [(i % 5) * 45 + (Math.floor(i / 5) % 2 ? 18 : 0), Math.floor(i / 5) * 46 + 5]);
}
