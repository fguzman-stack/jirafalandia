import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AcaciaArt } from './acacia-art';
import { GiraffeArt } from './giraffe-art';

@Component({
  selector: 'app-park-map-art',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AcaciaArt, GiraffeArt],
  template: `
    <svg viewBox="0 0 1000 600" role="img" aria-label="Plano ilustrado de Jirafalandia: cinco recintos conectados por senderos alrededor de una laguna" class="park-map">
      <rect width="1000" height="600" fill="#edf0d8" />
      <path d="M60 386 Q-15 209 155 102 Q286 22 449 65 Q605 0 822 93 Q1022 156 943 374 Q993 537 791 554 Q609 597 487 536 Q315 600 118 515 Z" fill="#d9dfb4" stroke="#c0cd9c" stroke-width="3" />
      <!-- Individually landscaped enclosures. -->
      <path d="M117 195 Q155 126 316 170 Q376 195 365 298 Q336 363 177 355 Q104 329 117 195 Z" fill="#ebd5a0" stroke="#c7ad79" stroke-width="2" />
      <path d="M586 176 Q650 100 843 173 Q902 227 844 317 Q742 360 627 289 Z" fill="#b8ca9c" stroke="#94ac7b" stroke-width="2" />
      <path d="M219 399 Q325 349 405 409 Q459 473 363 515 Q268 546 219 474 Z" fill="#e5d7bc" stroke="#c9b194" stroke-width="2" />
      <path d="M653 369 Q744 342 843 395 Q919 460 831 509 Q705 541 641 461 Z" fill="#e4d4a5" stroke="#c3ab77" stroke-width="2" />
      <path d="M361 127 Q430 25 568 64 Q640 97 573 155 Q466 183 361 127 Z" fill="#d2c7cb" stroke="#b6a6b7" stroke-width="2" />
      <!-- Broad pale footpaths with a warm sand edge. -->
      <path d="M491 592 L487 496 Q413 390 383 332 Q334 251 406 183 Q521 150 582 211 Q595 305 647 338 Q712 397 660 481 Q587 537 487 496 M383 332 Q445 311 520 336 Q591 356 647 338" stroke="#c3b187" stroke-width="29" fill="none" stroke-linecap="round" />
      <path d="M491 592 L487 496 Q413 390 383 332 Q334 251 406 183 Q521 150 582 211 Q595 305 647 338 Q712 397 660 481 Q587 537 487 496 M383 332 Q445 311 520 336 Q591 356 647 338" stroke="#faf0d1" stroke-width="22" fill="none" stroke-linecap="round" />
      <!-- Lagoon, shoreline, ripples and a small bridge. -->
      <path d="M422 386 Q427 344 489 357 Q529 343 562 378 Q585 416 528 439 Q456 457 422 414 Z" fill="#89b8ae" stroke="#cad5b2" stroke-width="9" />
      <path d="M447 385 Q475 370 503 382 M478 410 Q514 420 540 399" stroke="#d7eee0" stroke-width="3" fill="none" />
      <g transform="translate(569 306) rotate(22)"><rect width="44" height="76" rx="4" fill="#ab845b" /><path d="M6 8 H38 M6 20 H38 M6 32 H38 M6 44 H38 M6 56 H38 M6 68 H38" stroke="#e4c79b" stroke-width="3" /></g>
      <!-- Acacias rendered with real branches and layered leafy crowns. -->
      @for (tree of trees; track $index) {
        <g app-acacia-art [attr.transform]="'translate(' + tree[0] + ' ' + tree[1] + ') scale(' + tree[2] + ')'" />
      }
      <g app-giraffe-art transform="translate(139 191) scale(.25)" coat="masai" />
      <g app-giraffe-art transform="translate(268 231) scale(.21)" coat="southern" />
      <g app-giraffe-art transform="translate(652 171) scale(.25)" />
      <g app-giraffe-art transform="translate(740 219) scale(.2)" coat="northern" />
      <g app-giraffe-art transform="translate(266 398) scale(.18)" [calf]="true" />
      <g app-giraffe-art transform="translate(360 420) scale(-.15 .15)" [calf]="true" />
      <!-- Nursery shelter and viewing pavilion. -->
      <g transform="translate(230 398)"><path d="M0 19 H62 V59 H0 Z" fill="#bd966a" /><path d="M-10 20 L31 -3 L74 20 Z" fill="#926b4d" /><path d="M19 59 V31 H40 V59" fill="#6c6548" /></g>
      <g transform="translate(476 85)"><path d="M0 23 V63 M57 23 V63 M0 46 H57" stroke="#89664f" stroke-width="6" /><path d="M-14 25 L29 -4 L71 25 Z" fill="#b98763" /><path d="M-6 64 H65" stroke="#89664f" stroke-width="9" /></g>
      <g transform="translate(730 417)"><path d="M0 0 H25 V32 H0 Z M46 0 H71 V32 H46 Z M92 0 H117 V32 H92 Z" fill="#fff0cc" stroke="#997b52" stroke-width="3" /><path d="M12 32 V53 M59 32 V53 M105 32 V53" stroke="#997b52" stroke-width="4" /><path d="M6 7 L17 5 L20 20 L8 24 Z M51 6 l8 3 6 -4 -2 9 4 8 -10 -2 -4 5 -1 -10 Z M98 8 h12 v16 H98 Z" fill="#a1693c" /></g>
      <!-- Entrance gate and ranger hut. -->
      <g transform="translate(435 530)"><path d="M0 66 V10 H12 V66 M97 66 V10 H109 V66" fill="#886447" /><rect x="-10" width="129" height="27" rx="5" fill="#608052" /><text x="54" y="18" fill="#fff4d4" text-anchor="middle" font-size="13" font-weight="800" font-family="Nunito, sans-serif">JIRAFALANDIA</text></g>
      <g transform="translate(549 528)"><rect width="51" height="40" rx="3" fill="#cfb287" /><path d="M-7 3 L24 -20 L59 3 Z" fill="#866a4d" /><rect x="10" y="12" width="30" height="18" fill="#72896b" /></g>
      <!-- Grass, rock gardens and the compass complete the illustrated park. -->
      <g fill="#a5b781"><ellipse cx="97" cy="459" rx="34" ry="18" /><ellipse cx="893" cy="349" rx="30" ry="18" /><ellipse cx="137" cy="112" rx="26" ry="12" /></g>
      <g fill="#b6ac8e"><ellipse cx="156" cy="375" rx="14" ry="9" /><ellipse cx="172" cy="379" rx="10" ry="7" /><ellipse cx="858" cy="523" rx="15" ry="8" /></g>
      <g stroke="#9fab70" stroke-width="2" fill="none">@for (x of [84, 186, 316, 398, 603, 797, 906]; track x) {<path [attr.d]="'M' + x + ' 490 l-5 -12 m5 12 l4 -17'" />}</g>
      <g transform="translate(919 69)"><circle r="29" fill="#fff6df" stroke="#bfac81" /><path d="M0 -22 L8 0 L0 -5 L-8 0 Z" fill="#765137" /><path d="M0 22 L8 0 L0 5 L-8 0 Z" fill="#bc9b66" /><text y="-36" text-anchor="middle" font-size="13" fill="#765137" font-weight="800">N</text></g>
    </svg>
  `,
  styles: [':host { display: block; } .park-map { display: block; width: 100%; height: auto; }']
})
export class ParkMapArt {
  readonly trees = [[63, 187, .53], [132, 135, .5], [90, 289, .36], [295, 140, .37], [600, 133, .62], [718, 116, .7], [810, 181, .55], [793, 279, .36], [188, 428, .32], [377, 435, .31], [860, 393, .32], [74, 381, .4]];
}
