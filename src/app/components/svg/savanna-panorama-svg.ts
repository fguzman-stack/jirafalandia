import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeReticulataSvg } from './giraffe-reticulata-svg';
import { GiraffeMasaiSvg } from './giraffe-masai-svg';
import { GiraffeRothschildSvg } from './giraffe-rothschild-svg';
import { GiraffeCalfSvg } from './giraffe-calf-svg';

@Component({
  selector: 'app-savanna-panorama-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GiraffeReticulataSvg,
    GiraffeMasaiSvg,
    GiraffeRothschildSvg,
    GiraffeCalfSvg
  ],
  template: `
<div class="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#EFE1C6] bg-[#6FB1DA]">
  
  <!-- The Full Vector Savanna Canvas -->
  <svg viewBox="0 0 1100 600" preserveAspectRatio="xMidYMid slice" class="w-full h-auto block select-none" role="img" aria-label="Familia de jirafas en la sabana">
    <defs>
      <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6FB1DA"/>
        <stop offset=".55" stop-color="#F3DDB2"/>
        <stop offset="1" stop-color="#FAD3A0"/>
      </linearGradient>
      <radialGradient id="hSun" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#FFF4CC"/>
        <stop offset=".35" stop-color="#FFE8A8" stop-opacity=".9"/>
        <stop offset="1" stop-color="#FFE8A8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="hGround" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#D3B374"/>
        <stop offset=".5" stop-color="#BE9A5C"/>
        <stop offset="1" stop-color="#9C7A42"/>
      </linearGradient>
      <symbol id="pano_acacia" viewBox="0 0 200 200">
        <g fill="currentColor">
          <path d="M92 200 C96 162 94 140 78 114 L84 109 C98 126 102 138 104 156 C108 134 118 118 140 100 L146 105 C126 122 114 140 112 200Z"/>
          <ellipse cx="100" cy="84" rx="92" ry="21"/>
          <ellipse cx="50" cy="100" rx="46" ry="14"/>
          <ellipse cx="152" cy="97" rx="46" ry="15"/>
          <ellipse cx="104" cy="64" rx="56" ry="15"/>
        </g>
      </symbol>
    </defs>

    <!-- Sky -->
    <rect width="1100" height="600" fill="url(#hSky)"/>

    <!-- Sun with Golden Glow -->
    <circle cx="880" cy="190" r="190" fill="url(#hSun)"/>
    <circle cx="880" cy="190" r="42" fill="#FFF2C4"/>

    <!-- Soft Drifting Clouds -->
    <g transform="translate(180 110) scale(1.3)" fill="#fff" opacity="0.85">
      <ellipse cx="0" cy="0" rx="60" ry="15"/>
      <ellipse cx="-24" cy="-10" rx="30" ry="16"/>
      <ellipse cx="14" cy="-14" rx="34" ry="19"/>
      <ellipse cx="42" cy="-4" rx="24" ry="11"/>
    </g>
    <g transform="translate(520 70) scale(0.9)" fill="#fff" opacity="0.7">
      <ellipse cx="0" cy="0" rx="60" ry="15"/>
      <ellipse cx="-24" cy="-10" rx="30" ry="16"/>
      <ellipse cx="14" cy="-14" rx="34" ry="19"/>
      <ellipse cx="42" cy="-4" rx="24" ry="11"/>
    </g>
    <g transform="translate(1010 60) scale(1.1)" fill="#fff" opacity="0.8">
      <ellipse cx="0" cy="0" rx="60" ry="15"/>
      <ellipse cx="-24" cy="-10" rx="30" ry="16"/>
      <ellipse cx="14" cy="-14" rx="34" ry="19"/>
      <ellipse cx="42" cy="-4" rx="24" ry="11"/>
    </g>

    <!-- Rolling African Hills -->
    <path d="M0 400 Q140 340 300 388 T600 372 T900 384 T1100 360 L1100 470 L0 470Z" fill="#D9C79B" opacity=".75"/>
    <path d="M0 430 Q200 392 400 424 T800 414 T1100 420 L1100 480 L0 480Z" fill="#C7AC72"/>

    <!-- Acacia Trees -->
    <use href="#pano_acacia" x="40" y="218" width="230" height="230" style="color:#6B7740"/>
    <use href="#pano_acacia" x="980" y="254" width="190" height="190" style="color:#6B7740"/>
    <use href="#pano_acacia" x="430" y="330" width="110" height="110" style="color:#7C8750"/>

    <!-- Foreground Savanna Grass Layer -->
    <path d="M0 450 Q300 432 560 446 T1100 440 L1100 600 L0 600Z" fill="url(#hGround)"/>

    <!-- Birds in flight -->
    <g fill="none" stroke="#4B3A22" stroke-width="2.2" stroke-linecap="round" opacity=".7">
      <path d="M620 110q6-8 12 0q6-8 12 0"/>
      <path d="M660 84q5-7 10 0q5-7 10 0"/>
      <path d="M590 138q5-7 10 0q5-7 10 0"/>
    </g>

    <!-- Savanna Grass Clumps -->
    <g fill="#9A8440">
      <path d="M680 555 Q683 543 686 534 Q687 545 687 555Z"/>
      <path d="M1035 555 Q1037 541 1038 532 Q1038 544 1038 555Z"/>
      <path d="M30 518 Q32 507 33 499 Q33 509 34 518Z"/>
      <path d="M306 579 Q308 565 308 556 Q309 567 309 579Z"/>
      <path d="M174 563 Q176 555 177 551 Q177 557 177 563Z"/>
      <path d="M497 590 Q499 575 500 564 Q500 577 500 590Z"/>
      <path d="M803 583 Q805 571 806 562 Q806 573 806 583Z"/>
    </g>

    <!-- The Giraffes Family Positioned in the Landscape -->
    
    <!-- 1. Distant Masai in midground -->
    <g transform="translate(620, 160) scale(0.38)">
      <foreignObject x="70" y="30" width="480" height="770">
        <app-giraffe-masai-svg />
      </foreignObject>
    </g>

    <!-- 2. Distant Rothschild facing left -->
    <g transform="translate(1096, 114) scale(-0.5, 0.5)">
      <foreignObject x="70" y="30" width="480" height="770">
        <app-giraffe-rothschild-svg />
      </foreignObject>
    </g>

    <!-- 3. Foreground Reticulated Adult strolling gracefully -->
    <g transform="translate(142, 45) scale(0.62)">
      <foreignObject x="70" y="30" width="480" height="770">
        <app-giraffe-reticulata-svg />
      </foreignObject>
    </g>

    <!-- 4. Baby Calf walking playfully alongside -->
    <g transform="translate(418, 184) scale(0.5)">
      <foreignObject x="100" y="120" width="420" height="680">
        <app-giraffe-calf-svg />
      </foreignObject>
    </g>

  </svg>
</div>
  `
})
export class SavannaPanoramaSvg {}
