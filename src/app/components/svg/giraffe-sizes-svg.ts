import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeArt, GiraffeCoat } from './giraffe-art';

@Component({
  selector: 'app-giraffe-sizes-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `
    <div class="size-guide">
      <header><span>DEL PRIMER PASO A LAS COPAS DE LOS ÁRBOLES</span><h3>Crecer a lo grande</h3><p>Una misma línea de suelo. Cinco momentos de una vida de altura.</p></header>
      <svg class="size-lineup" viewBox="0 0 1200 490" role="img" aria-label="Comparación proporcional: cría de 1,8 metros, juvenil de 3,2, hembra de 4,3, adulto de 5,1 y macho de 5,8 metros">
        @for (y of [72, 145, 218, 291, 364]; track y) { <path [attr.d]="'M10 ' + y + ' H1190'" stroke="#ece6d5" fill="none" /> }
        <path d="M10 422 H1190" stroke="#d7bf85" stroke-width="2" />
        @for (animal of animals; track animal.label; let i = $index) {
          <g app-giraffe-art [coat]="animal.coat" [calf]="animal.label === 'Cría'" [attr.transform]="animalTransform(i, animal.height)" />
          <text [attr.x]="110 + i * 230" y="452" text-anchor="middle" fill="#644d35" font-size="17" font-weight="800">{{ animal.height }} m</text>
          <text [attr.x]="110 + i * 230" y="473" text-anchor="middle" fill="#8c795e" font-size="13">{{ animal.label }}</text>
        }
      </svg>
      <p class="scale-note">Estaturas orientativas · Las jirafas adultas pueden superar los 5 metros.</p>
    </div>
  `,
  styles: [`
    .size-guide { padding: 28px 24px; border: 1px solid #ddd0b3; border-radius: 24px; background: #fffdf5; color: #644d35; }
    header { text-align: center; } header > span { font-size: 9px; letter-spacing: 2px; color: #8e9672; font-weight: 900; }
    h3 { font-size: 30px; margin: 8px 0; font-weight: 600; } header p, .scale-note { color: #8c795e; font-size: 12px; }
    .size-lineup { display: block; width: 100%; height: auto; margin-top: 28px; }
    .scale-note { text-align: center; margin-top: 22px; }
    @media (max-width: 600px) { .size-guide { padding: 20px 10px; } .size-lineup { margin-top: 20px; } h3 { font-size: 25px; } header > span { font-size: 7px; letter-spacing: 1px; } }
  `]
})
export class GiraffeSizesSvg {
  animalTransform(index: number, height: number): string {
    const scale = height / 5.8 * .92;
    const x = 110 + index * 230 - 175 * scale;
    const y = 422 - (index === 0 ? 464 : 466) * scale;
    return `translate(${x} ${y}) scale(${scale})`;
  }
  readonly animals: { label: string; height: number; coat: GiraffeCoat }[] = [
    { label: 'Cría', height: 1.8, coat: 'northern' },
    { label: 'Juvenil', height: 3.2, coat: 'northern' },
    { label: 'Hembra', height: 4.3, coat: 'masai' },
    { label: 'Adulto', height: 5.1, coat: 'southern' },
    { label: 'Macho', height: 5.8, coat: 'reticulated' }
  ];
}
