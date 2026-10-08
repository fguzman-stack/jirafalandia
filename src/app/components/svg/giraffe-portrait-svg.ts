import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-giraffe-portrait-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt],
  template: `
    <svg viewBox="0 0 420 360" preserveAspectRatio="xMidYMid slice" class="w-full h-full" role="img" aria-label="Retrato de una jirafa alcanzando hojas de acacia">
      <rect width="420" height="360" rx="32" fill="#e7edda" />
      <circle cx="296" cy="105" r="68" fill="#fff0ba" />
      <path d="M0 295 Q130 256 240 298 T420 287 V360 H0 Z" fill="#ccd6af" />
      <g app-giraffe-art transform="translate(-298 -65) scale(1.9)" [headTilt]="tilt()" [gazeX]="gazeX()" [gazeY]="gazeY()" />
      <g stroke-linecap="round">
        <path d="M420 64 Q342 103 308 157" stroke="#886042" stroke-width="7" fill="none" />
        <path d="M373 90 Q357 60 329 72 Q327 96 373 90 M348 115 Q368 84 394 94 Q393 119 348 115 M326 135 Q312 103 289 118 Q291 140 326 135 M313 150 Q339 124 358 138 Q350 160 313 150" fill="#608052" />
        <path d="M330 76 L361 87 M353 111 L384 99 M298 122 L320 133" stroke="#a6ba77" stroke-width="2" />
      </g>
    </svg>
  `,
  styles: [':host { display: block; height: 400px; width: 100%; }']
})
export class GiraffePortraitSvg {
  readonly tilt = input(0);
  readonly gazeX = input(0);
  readonly gazeY = input(0);
}
