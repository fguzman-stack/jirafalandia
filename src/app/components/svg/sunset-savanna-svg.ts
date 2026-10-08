import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sunset-savanna-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="w-full rounded-2xl overflow-hidden shadow-xl border border-[#A8446C]/30 bg-[#3E2255]">
  <svg viewBox="0 0 1000 400" preserveAspectRatio="xMidYMid slice" class="w-full h-auto block" role="img" aria-label="Siluetas de jirafas al atardecer en la sabana">
    <defs>
      <linearGradient id="sSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3E2255"/>
        <stop offset=".4" stop-color="#A8446C"/>
        <stop offset=".72" stop-color="#EE6F48"/>
        <stop offset="1" stop-color="#FDB659"/>
      </linearGradient>
      <radialGradient id="sSun" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#FFE9AE"/>
        <stop offset=".45" stop-color="#FFD27C" stop-opacity=".8"/>
        <stop offset="1" stop-color="#FFD27C" stop-opacity="0"/>
      </radialGradient>
      <symbol id="sunset_acacia" viewBox="0 0 200 200">
        <g fill="currentColor">
          <path d="M92 200 C96 162 94 140 78 114 L84 109 C98 126 102 138 104 156 C108 134 118 118 140 100 L146 105 C126 122 114 140 112 200Z"/>
          <ellipse cx="100" cy="84" rx="92" ry="21"/>
          <ellipse cx="50" cy="100" rx="46" ry="14"/>
          <ellipse cx="152" cy="97" rx="46" ry="15"/>
          <ellipse cx="104" cy="64" rx="56" ry="15"/>
        </g>
      </symbol>
    </defs>

    <!-- Sky Backdrop -->
    <rect width="1000" height="400" fill="url(#sSky)"/>
    
    <!-- Big Twilight Sun -->
    <circle cx="500" cy="300" r="190" fill="url(#sSun)"/>
    <circle cx="500" cy="300" r="62" fill="#FFE2A0"/>

    <!-- Flying African Birds in sunset sky -->
    <path d="M120 70q7 -9 14 0q7 -9 14 0" fill="none" stroke="#5A2146" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M190 48q5.6 -7.2 11.2 0q5.6 -7.2 11.2 0" fill="none" stroke="#5A2146" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M790 64q7.7 -9.9 15.4 0q7.7 -9.9 15.4 0" fill="none" stroke="#5A2146" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M850 92q5.6 -7.2 11.2 0q5.6 -7.2 11.2 0" fill="none" stroke="#5A2146" stroke-width="2.4" stroke-linecap="round"/>

    <!-- Midground Hill -->
    <path d="M0 340 Q250 322 500 336 T1000 330 L1000 400 L0 400Z" fill="#3A1634"/>

    <!-- Silhouetted Acacia Trees -->
    <use href="#sunset_acacia" x="70" y="145" width="200" height="200" style="color:#2B0E2A"/>
    <use href="#sunset_acacia" x="860" y="103" width="240" height="240" style="color:#2B0E2A"/>
    <use href="#sunset_acacia" x="700" y="230" width="110" height="110" style="color:#2B0E2A"/>

    <!-- Silhouetted Walking Giraffe Family -->
    <!-- Tall Adult Bull Silhouette -->
    <g transform="translate(180, 110) scale(0.38)" fill="#2B0E2A">
      <!-- Body & Neck -->
      <path d="M100 480 C110 390 130 340 160 320 L220 320 C250 360 270 410 270 480 Z"/>
      <path d="M160 330 C162 250 166 180 170 120 L210 120 C214 180 218 250 220 330 Z"/>
      <!-- Head & Horns -->
      <ellipse cx="190" cy="110" rx="22" ry="16"/>
      <ellipse cx="206" cy="116" rx="14" ry="10"/>
      <line x1="184" y1="98" x2="182" y2="78" stroke="#2B0E2A" stroke-width="6" stroke-linecap="round"/>
      <circle cx="182" cy="76" r="4"/>
      <line x1="196" y1="98" x2="198" y2="78" stroke="#2B0E2A" stroke-width="6" stroke-linecap="round"/>
      <circle cx="198" cy="76" r="4"/>
      <!-- Long Walking Legs -->
      <line x1="120" y1="480" x2="110" y2="620" stroke="#2B0E2A" stroke-width="12" stroke-linecap="round"/>
      <line x1="150" y1="480" x2="165" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="230" y1="480" x2="215" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="260" y1="480" x2="280" y2="620" stroke="#2B0E2A" stroke-width="12" stroke-linecap="round"/>
      <!-- Tail -->
      <path d="M105 480 Q85 530 90 580" stroke="#2B0E2A" stroke-width="4" fill="none"/>
    </g>

    <!-- Calf Silhouette Following -->
    <g transform="translate(380, 210) scale(0.25)" fill="#2B0E2A">
      <path d="M100 480 C110 400 130 360 160 340 L210 340 C235 380 250 420 250 480 Z"/>
      <path d="M160 340 C162 270 166 210 170 160 L205 160 C208 210 212 270 214 340 Z"/>
      <ellipse cx="187" cy="150" rx="20" ry="15"/>
      <line x1="180" y1="138" x2="178" y2="120" stroke="#2B0E2A" stroke-width="5" stroke-linecap="round"/>
      <circle cx="178" cy="118" r="3"/>
      <line x1="194" y1="138" x2="196" y2="120" stroke="#2B0E2A" stroke-width="5" stroke-linecap="round"/>
      <circle cx="196" cy="118" r="3"/>
      <line x1="120" y1="480" x2="115" y2="600" stroke="#2B0E2A" stroke-width="9" stroke-linecap="round"/>
      <line x1="150" y1="480" x2="160" y2="600" stroke="#2B0E2A" stroke-width="9" stroke-linecap="round"/>
      <line x1="220" y1="480" x2="210" y2="600" stroke="#2B0E2A" stroke-width="9" stroke-linecap="round"/>
      <line x1="240" y1="480" x2="255" y2="600" stroke="#2B0E2A" stroke-width="9" stroke-linecap="round"/>
    </g>

    <!-- Mother Giraffe Browsing -->
    <g transform="translate(520, 140) scale(0.35)" fill="#2B0E2A">
      <path d="M100 480 C110 390 130 340 160 320 L220 320 C250 360 270 410 270 480 Z"/>
      <path d="M160 330 C164 240 170 170 178 110 L218 110 C214 170 212 240 220 330 Z"/>
      <ellipse cx="198" cy="100" rx="22" ry="16"/>
      <line x1="192" y1="88" x2="190" y2="68" stroke="#2B0E2A" stroke-width="6" stroke-linecap="round"/>
      <circle cx="190" cy="66" r="4"/>
      <line x1="204" y1="88" x2="206" y2="68" stroke="#2B0E2A" stroke-width="6" stroke-linecap="round"/>
      <circle cx="206" cy="66" r="4"/>
      <line x1="120" y1="480" x2="115" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="150" y1="480" x2="155" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="230" y1="480" x2="225" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="260" y1="480" x2="270" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
    </g>

    <!-- Distant Giraffe on Right Horizon -->
    <g transform="translate(830, 200) scale(-0.24, 0.24)" fill="#2B0E2A">
      <path d="M100 480 C110 390 130 340 160 320 L220 320 C250 360 270 410 270 480 Z"/>
      <path d="M160 330 C162 250 166 180 170 120 L210 120 C214 180 218 250 220 330 Z"/>
      <ellipse cx="190" cy="110" rx="22" ry="16"/>
      <line x1="120" y1="480" x2="110" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
      <line x1="260" y1="480" x2="275" y2="620" stroke="#2B0E2A" stroke-width="11" stroke-linecap="round"/>
    </g>

    <!-- Foreground Terrain Ridge -->
    <path d="M0 352 Q300 340 520 350 T1000 346 L1000 400 L0 400Z" fill="#2B0E2A"/>

    <!-- Savanna Grass Clumps in Foreground -->
    <g fill="#2B0E2A">
      <path d="M706 381 Q708 368 709 363 Q710 372 710 381Z"/>
      <path d="M850 361 Q852 352 853 350 Q853 355 853 361Z"/>
      <path d="M476 377 Q478 365 479 360 Q480 369 480 377Z"/>
      <path d="M28 385 Q26 369 26 359 Q27 372 27 385Z"/>
      <path d="M996 384 Q998 376 999 372 Q1000 378 1000 384Z"/>
      <path d="M125 588 Q127 575 127 566 Q128 577 128 588Z"/>
    </g>
  </svg>
</div>
  `
})
export class SunsetSavannaSvg {}
