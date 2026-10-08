import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type GiraffeCoat = 'reticulated' | 'masai' | 'northern' | 'southern';

/** Native SVG geometry shared by the animals, maps and habitat scenes. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- A native SVG group preserves the SVG namespace.
  selector: 'g[app-giraffe-art]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:ellipse cx="175" cy="470" rx="124" ry="10" fill="#403720" opacity=".12" />
    <svg:g [attr.transform]="calf() ? 'translate(0 54) scale(1 .88)' : null"
      stroke-linejoin="round" stroke-linecap="round">
      <!-- Far legs, slender joints and dark split hooves. -->
      <svg:path d="M118 286 Q132 322 133 351 L120 453 L133 453 L153 350 L152 284 M220 277 L234 350 L260 454 L273 454 L253 347 L253 268"
        [attr.fill]="silhouette() ? '#302c38' : '#c49a59'" />
      <svg:path d="M117 450 L134 450 L137 464 L115 464 Z M259 450 L274 450 L279 464 L258 464 Z" [attr.fill]="dark()" />
      <svg:g class="giraffe-tail">
        <svg:path d="M86 251 Q53 273 58 327 Q58 342 47 353" fill="none" [attr.stroke]="skin()" stroke-width="7" />
        <svg:path d="M47 344 Q29 358 39 379 Q57 369 53 349 Z" [attr.fill]="dark()" />
      </svg:g>
      <!-- Sloping shoulders, deep chest, angled neck: recognisable giraffe anatomy. -->
      <svg:path [attr.d]="body" [attr.fill]="skin()" />
      @if (!silhouette()) {
        <svg:path d="M94 257 Q168 218 238 241 L254 281 Q196 307 117 291 Z" fill="#fff4d7" opacity=".24" />
        @for (spot of bodySpots(); track $index) {
          <svg:path [attr.d]="spot" [attr.fill]="coatColor()" />
        }
        <svg:g transform="translate(255 117) rotate(14)">
          @for (y of neckRows; track y; let i = $index) {
            <svg:path [attr.d]="spotShape()" [attr.transform]="'translate(' + (i % 2 ? -3 : -2) + ' ' + y + ') scale(.65 .8)'" [attr.fill]="coatColor()" />
          }
        </svg:g>
        <svg:path d="M106 303 L119 334 L112 352 L108 352 L109 326 Z M241 299 L250 328 L247 342 L238 328 Z" [attr.fill]="coatColor()" />
        @if (coat() !== 'northern') {
          <svg:path d="M100 375 L109 379 L105 397 L97 394 Z M97 413 L104 417 L101 434 L95 430 Z M241 375 L249 381 L248 399 L242 394 Z M240 419 L249 423 L248 437 L240 434 Z" [attr.fill]="coatColor()" opacity=".65" />
        }
        <svg:path d="M93 292 Q134 311 193 300 M235 285 Q245 309 244 335" stroke="#8e673f" stroke-width="2" fill="none" opacity=".4" />
      }
      <svg:path d="M91 450 L106 450 L109 466 L88 466 Z M237 450 L251 450 L254 466 L234 466 Z" [attr.fill]="dark()" />
      <svg:path d="M218 223 L249 97 L257 93 L230 231 Z" [attr.fill]="dark()" />
      <!-- Alert ears, ossicones, a tapered muzzle and soft expressive eye. -->
      <svg:g class="giraffe-head" [attr.transform]="(calf() ? 'translate(-24 -8) scale(1.08) ' : '') + 'rotate(' + headTilt() + ' 265 100)'">
        <svg:path d="M261 74 L256 45 M278 72 L282 43" [attr.stroke]="skin()" stroke-width="8" />
        <svg:circle cx="255" cy="43" r="6" [attr.fill]="dark()" />
        <svg:circle cx="283" cy="41" r="6" [attr.fill]="dark()" />
        <svg:path d="M260 83 Q234 59 220 73 Q225 93 256 96 M282 78 Q295 52 314 61 Q316 80 289 91" [attr.fill]="skin()" />
        @if (!silhouette()) {
          <svg:path d="M251 84 Q234 71 228 76 Q238 86 253 89 M292 77 Q303 63 308 65 Q307 75 292 83" fill="#d89477" />
        }
        <svg:path d="M252 91 Q252 71 273 70 Q290 70 301 91 L323 106 Q334 116 326 127 Q320 135 301 132 L269 116 Q251 111 252 91 Z" [attr.fill]="skin()" />
        @if (!silhouette()) {
          <svg:path d="M308 100 Q330 107 329 121 Q327 136 310 131 L301 119 Z" fill="#d7aa78" />
          <svg:path d="M269 74 L279 73 L288 82 L276 87 L266 83 Z M259 96 L267 93 L272 105 L264 109 Z" [attr.fill]="coatColor()" />
          <svg:ellipse cx="286" cy="94" rx="7" ry="8" fill="#422c20" />
          <svg:circle [attr.cx]="284 + gazeX() * .3" [attr.cy]="92 + gazeY() * .3" r="2.4" fill="#fffdf0" />
          <svg:path d="M280 87 L277 83 M284 85 L283 80 M291 88 L293 84" stroke="#422c20" stroke-width="2" />
          <svg:ellipse cx="322" cy="115" rx="3" ry="2" fill="#68472d" transform="rotate(22 322 115)" />
          <svg:path d="M308 126 Q317 129 324 125" stroke="#68472d" stroke-width="1.8" fill="none" />
          <svg:path d="M296 101 Q301 99 304 104" stroke="#fff2cf" stroke-width="3" fill="none" opacity=".7" />
          @if (eating()) { <svg:path d="M320 126 Q348 126 351 114 Q355 104 347 105 Q341 108 345 116 Q338 125 320 126 Z" fill="#695879" /> }
        }
      </svg:g>
    </svg:g>
  `,
  styles: [`
    :host { display: inline; }
    .giraffe-tail { transform-origin: 86px 251px; animation: safari-tail 6s ease-in-out infinite; }
    @keyframes safari-tail { 0%, 80%, 100% { transform: rotate(0); } 90% { transform: rotate(-7deg); } }
    @media (prefers-reduced-motion: reduce) { .giraffe-tail { animation: none; } }
  `]
})
export class GiraffeArt {
  readonly coat = input<GiraffeCoat>('reticulated');
  readonly calf = input(false);
  readonly silhouette = input(false);
  readonly headTilt = input(0);
  readonly gazeX = input(0);
  readonly gazeY = input(0);
  readonly eating = input(false);
  readonly skin = computed(() => this.silhouette() ? '#302c38' : this.coat() === 'northern' ? '#f5e8c9' : '#e9c885');
  readonly dark = computed(() => this.silhouette() ? '#302c38' : '#62452c');
  readonly coatColor = computed(() => ({ reticulated: '#a45b32', masai: '#765035', northern: '#b7834c', southern: '#946238' })[this.coat()]);
  readonly spotShape = computed(() => this.coat() === 'masai'
    ? 'M0 0 L8 -4 L13 1 L20 -2 L18 6 L23 11 L17 15 L17 23 L10 20 L4 24 L1 17 L-5 13 L0 8 Z'
    : this.coat() === 'northern' ? 'M0 1 Q10 -3 18 2 L20 14 Q17 22 6 21 L-2 14 Z' : 'M0 0 L14 -3 L23 9 L17 22 L3 20 L-4 10 Z');
  readonly body = 'M84 252 Q86 237 113 234 Q165 229 216 209 L252 95 L276 104 L258 236 Q264 268 251 294 L250 355 L250 454 L237 454 L234 351 L225 300 Q165 311 121 297 L113 354 L104 454 L91 454 L96 350 L96 292 Q77 280 84 252 Z';
  readonly neckRows = [0, 27, 54, 81, 108];
  readonly bodySpots = computed(() => this.baseBodySpots.map(path => {
    if (this.coat() === 'reticulated') return path;
    const points = [...path.matchAll(/(?:M|L)(\d+) (\d+)/g)].map(match => [Number(match[1]), Number(match[2])]);
    if (this.coat() === 'masai') {
      return points.map(([x, y], i) => {
        const next = points[(i + 1) % points.length];
        const dx = next[0] - x;
        const dy = next[1] - y;
        const length = Math.hypot(dx, dy);
        return `${i ? 'L' : 'M'}${x} ${y} L${x + dx * .35} ${y + dy * .35} L${x + dx * .5 - dy / length * 3} ${y + dy * .5 + dx / length * 3} L${x + dx * .65} ${y + dy * .65}`;
      }).join(' ') + ' Z';
    }
    // Rounded corners distinguish the softer northern and southern coats.
    return points.map(([x, y], i) => {
      const previous = points[(i + points.length - 1) % points.length];
      const next = points[(i + 1) % points.length];
      return `${i ? 'L' : 'M'}${x + (previous[0] - x) * .2} ${y + (previous[1] - y) * .2} Q${x} ${y} ${x + (next[0] - x) * .2} ${y + (next[1] - y) * .2}`;
    }).join(' ') + ' Z';
  }));
  readonly baseBodySpots = [
    'M92 246 L110 239 L122 254 L113 270 L92 266 Z',
    'M120 241 L144 237 L151 255 L139 268 L125 261 Z',
    'M151 237 L176 230 L183 249 L164 264 L154 254 Z',
    'M183 229 L206 221 L217 235 L205 252 L188 248 Z',
    'M220 216 L240 216 L249 234 L238 251 L218 244 Z',
    'M98 275 L114 275 L122 286 L112 297 L99 288 Z',
    'M122 270 L142 276 L140 296 L123 291 L117 283 Z',
    'M149 270 L165 268 L181 279 L174 299 L149 295 Z',
    'M173 262 L193 254 L205 270 L192 287 L179 277 Z',
    'M200 282 L213 269 L231 274 L226 296 L207 301 Z',
    'M239 257 L252 248 L255 270 L245 283 L233 270 Z',
  ];
}
