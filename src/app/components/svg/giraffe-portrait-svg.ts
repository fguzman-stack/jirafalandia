import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeMasaiSvg } from './giraffe-masai-svg';

@Component({
  selector: 'app-giraffe-portrait-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeMasaiSvg],
  template: `
<div class="relative w-full h-[400px] flex items-center justify-center">
  <svg viewBox="290 20 280 310" class="w-full h-full max-h-[440px]" role="img" aria-label="Retrato de jirafa merendando acacia">
    <defs>
      <radialGradient id="pBg" cx=".5" cy=".4" r=".7">
        <stop offset="0" stop-color="#FFF6E0"/>
        <stop offset="1" stop-color="#F0DDB6"/>
      </radialGradient>
      <clipPath id="pClip">
        <circle cx="430" cy="172" r="130"/>
      </clipPath>
    </defs>

    <!-- Warm round vignette background -->
    <circle cx="430" cy="172" r="130" fill="url(#pBg)"/>

    <!-- Clipped giraffe head & neck -->
    <g clip-path="url(#pClip)">
      <foreignObject x="70" y="30" width="480" height="770">
        <app-giraffe-masai-svg />
      </foreignObject>

      <!-- Acacia branch being eaten -->
      <path d="M580 250 C 548 224 520 214 480 204" fill="none" stroke="#6B4A2B" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="528" cy="204" rx="11" ry="5" fill="#7FA256" transform="rotate(-30 528 204)"/>
      <ellipse cx="540" cy="190" rx="11" ry="5" fill="#6E9347" transform="rotate(20 540 190)"/>
      <ellipse cx="548" cy="214" rx="11" ry="5" fill="#8DB062" transform="rotate(50 548 214)"/>
      <ellipse cx="520" cy="222" rx="11" ry="5" fill="#6E9347" transform="rotate(-70 520 222)"/>
      <ellipse cx="556" cy="198" rx="11" ry="5" fill="#7FA256" transform="rotate(-10 556 198)"/>
    </g>

    <!-- Golden border ring -->
    <circle cx="430" cy="172" r="130" fill="none" stroke="#E4CC9C" stroke-width="3"/>
  </svg>
</div>
  `
})
export class GiraffePortraitSvg {}
