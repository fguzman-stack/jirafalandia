import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { GiraffeArt, GiraffeCoat } from './giraffe-art';
import { AcaciaArt } from './acacia-art';

@Component({
  selector: 'app-habitat-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GiraffeArt, AcaciaArt],
  template: `
    <svg viewBox="0 0 1000 580" class="habitat-svg" role="img" [attr.aria-label]="label()">
      <!-- Flat colour layers deliberately avoid document-global SVG IDs. -->
      <rect width="1000" height="580" [attr.fill]="sunset() ? '#d89c9f' : '#d8e9df'" />
      <path d="M0 160 Q240 220 510 145 T1000 165 V400 H0 Z" [attr.fill]="sunset() ? '#e5afa0' : '#e9eee0'" />
      <path d="M0 280 Q220 200 510 265 T1000 235 V440 H0 Z" [attr.fill]="sunset() ? '#f0c19c' : '#f4edcf'" />
      <circle cx="744" [attr.cy]="sunset() ? 245 : 115" [attr.r]="sunset() ? 77 : 43" fill="#fff1c0" />
      <g fill="#fffdf0" opacity=".6"><path d="M90 111 Q104 94 127 101 Q143 69 169 95 Q198 85 212 111 Z" /><path d="M420 80 Q442 58 460 69 Q480 48 494 65 Q514 58 530 80 Z" /></g>
      <path d="M0 339 L106 292 L196 330 L308 255 L432 326 L544 302 L666 340 L804 292 L1000 334 V480 H0 Z" [attr.fill]="sunset() ? '#b999a0' : '#bac6a2'" opacity=".6" />
      <path d="M0 387 Q220 325 480 379 T1000 354 V580 H0 Z" [attr.fill]="sunset() ? '#9b8390' : forest() ? '#a7b984' : '#d7bf83'" />
      <g app-acacia-art transform="translate(43 235) scale(.8)" [night]="sunset()" />
      <g app-acacia-art transform="translate(806 228) scale(.9)" [night]="sunset()" />
      <g app-acacia-art transform="translate(463 306) scale(.42)" [night]="sunset()" />
      @if (forest()) {
        <g app-acacia-art transform="translate(627 140) scale(1.3)" />
        <g app-acacia-art transform="translate(-77 126) scale(1.5)" />
        <g app-acacia-art transform="translate(288 195) scale(.9)" />
      }
      <path d="M0 441 Q242 409 447 438 T1000 417 V580 H0 Z" [attr.fill]="sunset() ? '#796b7b' : forest() ? '#c5cf9d' : '#ebd8a4'" />
      <!-- A waterhole with banks, reflections and reeds. -->
      <path d="M633 431 Q694 393 811 413 Q895 430 852 462 Q738 491 644 468 Q594 451 633 431 Z" [attr.fill]="sunset() ? '#af9da5' : '#a1c6bd'" />
      <path d="M660 433 Q760 415 830 432 M689 455 Q754 464 807 450" stroke="#eaf1db" stroke-width="3" fill="none" opacity=".6" />
      <g stroke="#73885c" stroke-width="3" fill="none"><path d="M636 458 l-5 -24 m5 24 l8 -19 M857 441 l-4 -19 m4 19 l10 -13" /></g>
      <!-- Animals sit on a common ground plane; calf and far animal create depth. -->
      <g app-giraffe-art [coat]="mainCoat()" transform="translate(136 62) scale(.91)" [silhouette]="sunset()" />
      <g app-giraffe-art [coat]="forest() ? 'northern' : 'southern'" transform="translate(723 116) scale(-.68 .68)" [silhouette]="sunset()" />
      <g app-giraffe-art coat="northern" transform="translate(433 246) scale(.5)" [calf]="true" [silhouette]="sunset()" />
      @if (nursery()) {
        <g app-giraffe-art coat="reticulated" transform="translate(657 266) scale(-.46 .46)" [calf]="true" />
        <path d="M738 383 H887 V449 H738 Z" fill="#c49a6c" />
        <path d="M716 387 L812 333 L910 387 Z" fill="#aa7951" />
        <path d="M770 449 V402 H812 V449 M838 410 H866 V435 H838 Z" fill="#7a6045" />
        <path d="M727 384 L812 345 L896 384" stroke="#e0bf88" stroke-width="5" fill="none" />
      }
      @if (sunset()) {
        <!-- Raised wooden viewing deck. -->
        <path d="M759 435 H948 V449 H759 Z M786 449 V514 H798 V449 M914 449 V507 H926 V449" fill="#443a45" />
        <path d="M772 435 V402 M817 435 V402 M863 435 V402 M908 435 V402 M941 435 V402 M772 406 H941" stroke="#443a45" stroke-width="7" fill="none" />
      }
      <path d="M0 552 Q179 475 349 526 T670 526 T1000 537" [attr.stroke]="sunset() ? '#c3a09c' : '#f8edce'" stroke-width="36" fill="none" />
      <!-- Visitor fence, timber posts and hand-painted botanical foreground. -->
      <g [attr.stroke]="sunset() ? '#443a45' : '#947455'" fill="none" stroke-linecap="round">
        <path d="M24 534 Q166 547 303 534 M704 537 Q842 548 984 526" stroke-width="4" />
        @for (x of fencePosts; track x) { <path [attr.d]="'M' + x + ' 563 v-50'" stroke-width="9" /> }
      </g>
      <g [attr.stroke]="sunset() ? '#443a45' : '#8a9b64'" stroke-width="3" fill="none" stroke-linecap="round">
        @for (x of grasses; track x; let i = $index) {
          <path [attr.d]="'M' + x + ' ' + (492 + i % 3 * 23) + ' l-8 -19 m8 19 l2 -27 m-2 27 l10 -14'" />
        }
      </g>
      <g stroke="#58584b" stroke-width="2" fill="none"><path d="M530 121 q9 -10 18 0 q9 -10 18 0 M570 103 q7 -8 14 0 q7 -8 14 0" /></g>
      @if (patterns()) {
        @for (x of [745, 817, 889]; track x; let i = $index) {
          <g [attr.transform]="'translate(' + x + ' 340)'">
            <path d="M0 70 V147 M44 70 V147" stroke="#947455" stroke-width="6" />
            <rect width="50" height="76" rx="5" fill="#fff0cc" stroke="#947455" stroke-width="4" />
            <path [attr.d]="i === 1 ? 'M9 16 l8 -5 8 8 13 -2 -4 12 6 12 -13 -1 -10 12 -6 -12 -5 -8 7 -8 Z' : 'M9 14 L31 10 L41 29 L33 47 L13 43 L5 28 Z'" [attr.fill]="i === 1 ? '#765035' : '#a45b32'" />
            <path d="M10 62 H40" stroke="#947455" stroke-width="3" />
          </g>
        }
      }
    </svg>
  `,
  styles: [`:host { display: block; width: 100%; } .habitat-svg { display: block; width: 100%; height: auto; }`]
})
export class HabitatScene {
  readonly zone = input('sabana-dorada');
  readonly label = input('Hábitat ilustrado con una familia de jirafas, acacias y una laguna');
  readonly sunset = computed(() => this.zone() === 'mirador-atardecer');
  readonly forest = computed(() => this.zone() === 'bosque-acacias');
  readonly nursery = computed(() => this.zone() === 'rincon-crias');
  readonly patterns = computed(() => this.zone() === 'sendero-manchas');
  readonly mainCoat = computed<GiraffeCoat>(() => this.forest() || this.patterns() ? 'reticulated' : 'masai');
  readonly fencePosts = [24, 94, 164, 234, 704, 774, 844, 914, 984];
  readonly grasses = [34, 87, 177, 292, 354, 412, 591, 683, 733, 876, 938, 975];
}
