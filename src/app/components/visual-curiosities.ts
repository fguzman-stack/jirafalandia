import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeArt } from './svg/giraffe-art';
import { GiraffeData } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

@Component({
  selector: 'app-visual-curiosities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, GiraffeArt],
  template: `
    <section id="curiosidades" class="py-20 bg-[#FFF9E8] relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#765137]">
            <mat-icon class="text-base text-amber-700">lightbulb</mat-icon>
            <span>Infografías Zoológicas &middot; Ciencia Asombrosa</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            Pequeñas Curiosidades Gigantes
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80">
            Descubre los asombrosos secretos anatómicos que hacen de las jirafas una de las mayores maravillas evolutivas de nuestro planeta.
          </p>
        </div>

        <!-- Interactive Height Comparison Interactive Spotlight Feature -->
        <div class="mb-16 bg-gradient-to-br from-[#FFFDF8] via-[#FFFBF0] to-[#FFF9E8] border-2 border-[#F9BE36]/50 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          <div class="absolute -top-12 -right-12 w-48 h-48 bg-[#FFF1A8]/40 rounded-full blur-2xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div class="lg:col-span-5 space-y-4">
              <span class="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#FFF1A8] text-[#765137] border border-[#F9BE36] shadow-2xs inline-flex items-center gap-1.5">
                <mat-icon class="text-sm text-amber-700">straighten</mat-icon> Comparador Interactivo de Escala
              </span>

              <h3 class="text-2xl sm:text-4xl font-extrabold text-[#765137] font-heading">
                ¿Qué tan alta es una jirafa?
              </h3>

              <p class="text-sm sm:text-base text-[#765137]/90 leading-relaxed font-medium">
                Una jirafa macho adulta puede alcanzar hasta <strong>5.8 metros</strong> de altura. Para entender esta escala colosal, compárala con un humano adulto y con un autobús urbano de dos pisos.
              </p>

              <!-- Interactive scale selector buttons -->
              <div class="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  (click)="setScaleComparison('human')"
                  [class]="activeScale() === 'human' ? 'bg-[#F9BE36] text-[#765137] shadow-md ring-2 ring-[#765137]/20 font-extrabold scale-105' : 'bg-[#FFF9E8] text-[#765137]/80 hover:bg-[#FFF1A8] font-bold'"
                  class="px-4 py-2.5 rounded-xl border border-[#F9BE36]/50 text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                >
                  👤 Persona (1.75 m)
                </button>
                <button
                  type="button"
                  (click)="setScaleComparison('bus')"
                  [class]="activeScale() === 'bus' ? 'bg-[#F9BE36] text-[#765137] shadow-md ring-2 ring-[#765137]/20 font-extrabold scale-105' : 'bg-[#FFF9E8] text-[#765137]/80 hover:bg-[#FFF1A8] font-bold'"
                  class="px-4 py-2.5 rounded-xl border border-[#F9BE36]/50 text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                >
                  🚌 Autobús (4.4 m)
                </button>
                <button
                  type="button"
                  (click)="setScaleComparison('both')"
                  [class]="activeScale() === 'both' ? 'bg-[#F9BE36] text-[#765137] shadow-md ring-2 ring-[#765137]/20 font-extrabold scale-105' : 'bg-[#FFF9E8] text-[#765137]/80 hover:bg-[#FFF1A8] font-bold'"
                  class="px-4 py-2.5 rounded-xl border border-[#F9BE36]/50 text-xs sm:text-sm transition-all duration-200 cursor-pointer"
                >
                  ✨ Ver todos juntos
                </button>
              </div>

              <!-- Fun Fact note -->
              <div class="p-4 rounded-2xl bg-[#FFF1A8]/50 border border-[#F9BE36]/40 text-xs text-[#765137] leading-relaxed shadow-2xs flex items-start gap-2.5">
                <span class="text-xl">💡</span>
                <div>
                  <strong>Dato anatómico asombroso:</strong> A pesar de tener un cuello de 2 metros de longitud, las jirafas poseen exactamente <strong>7 vértebras cervicales</strong>, ¡igual que tú y cualquier otro mamífero! Cada vértebra llega a medir casi 28 cm.
                </div>
              </div>
            </div>

            <!-- Visual Height Chart SVG -->
            <div class="lg:col-span-7 bg-[#FFFDF8] rounded-2xl border-2 border-[#F9BE36]/30 p-4 sm:p-6 flex flex-col justify-end min-h-[360px] shadow-sm">
              <div class="relative w-full h-[320px]">
                <svg viewBox="0 0 500 320" class="w-full h-full" role="img" aria-label="Compara la altura de una jirafa de 5,8 metros con una persona y un autobús de dos pisos">
                  
                  <!-- Measurement Lines & Height Grid -->
                  <line x1="50" y1="20" x2="480" y2="20" stroke="#765137" stroke-dasharray="4,4" opacity="0.25"/>
                  <text x="45" y="24" font-family="'Nunito', sans-serif" font-size="11" fill="#765137" text-anchor="end" font-weight="bold">5.8 m</text>

                  <line x1="50" y1="95" x2="480" y2="95" stroke="#765137" stroke-dasharray="4,4" opacity="0.25"/>
                  <text x="45" y="99" font-family="'Nunito', sans-serif" font-size="11" fill="#765137" text-anchor="end" font-weight="bold">4.4 m</text>

                  <line x1="50" y1="225" x2="480" y2="225" stroke="#765137" stroke-dasharray="4,4" opacity="0.25"/>
                  <text x="45" y="229" font-family="'Nunito', sans-serif" font-size="11" fill="#765137" text-anchor="end" font-weight="bold">1.75 m</text>

                  <!-- Ground Line -->
                  <line x1="20" y1="300" x2="490" y2="300" stroke="#765137" stroke-width="4"/>

                  <!-- Human Figure (1.75m) -->
                  @if (activeScale() === 'human' || activeScale() === 'both') {
                    <g transform="translate(100, 215)" class="transition-all duration-300">
                      <!-- Head -->
                      <circle cx="20" cy="12" r="9" fill="#765137"/>
                      <!-- Body -->
                      <rect x="13" y="23" width="14" height="32" rx="4" fill="#0284C7"/>
                      <!-- Legs -->
                      <line x1="16" y1="55" x2="16" y2="85" stroke="#765137" stroke-width="4"/>
                      <line x1="24" y1="55" x2="24" y2="85" stroke="#765137" stroke-width="4"/>
                      <!-- Label -->
                      <text x="20" y="100" font-family="'Fredoka', sans-serif" font-size="11" font-weight="bold" fill="#765137" text-anchor="middle">Humano (1.75 m)</text>
                    </g>
                  }

                  <!-- Double Decker Bus (4.4m) -->
                  @if (activeScale() === 'bus' || activeScale() === 'both') {
                    <g transform="translate(200, 95)" class="transition-all duration-300">
                      <!-- Bus Body -->
                      <rect x="0" y="0" width="120" height="195" rx="16" fill="#DC2626"/>
                      <!-- Windows Upper deck -->
                      <rect x="10" y="15" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <rect x="36" y="15" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <rect x="62" y="15" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <rect x="88" y="15" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <!-- Windows Lower deck -->
                      <rect x="10" y="65" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <rect x="36" y="65" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <rect x="62" y="65" width="22" height="24" rx="4" fill="#E0F2FE"/>
                      <!-- Wheels -->
                      <circle cx="25" cy="200" r="14" fill="#1F2937"/>
                      <circle cx="95" cy="200" r="14" fill="#1F2937"/>
                      <!-- Label -->
                      <text x="60" y="215" font-family="'Fredoka', sans-serif" font-size="11" font-weight="bold" fill="#765137" text-anchor="middle">Autobús (4.4 m)</text>
                    </g>
                  }

                  <!-- Giraffe Figure (5.8m) -->
                  <g app-giraffe-art transform="translate(280 -3) scale(.65)" />
                  <text x="413" y="315" font-family="'Fredoka', sans-serif" font-size="12" font-weight="bold" fill="#765137" text-anchor="middle">Jirafa (5.8 m)</text>

                </svg>
              </div>
            </div>

          </div>
        </div>

        <!-- 6 Visual Fact Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          @for (c of data.curiosities; track c.id) {
            <div 
              class="p-7 rounded-3xl border-2 border-[#F9BE36]/40 bg-[#FFFDF8] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 group hover:-translate-y-2 hover:border-[#F9BE36]"
            >
              
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <!-- Icon Badge -->
                  <div class="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 duration-300" [style.background-color]="c.color">
                    <mat-icon class="text-2xl">{{ c.icon }}</mat-icon>
                  </div>

                  <!-- Big Stat Number -->
                  <div class="text-right">
                    <span class="text-3xl sm:text-4xl font-extrabold text-[#765137] font-heading block leading-none">
                      {{ c.statNumber }}
                    </span>
                    <span class="text-xs font-bold text-[#765137]/70">{{ c.statLabel }}</span>
                  </div>
                </div>

                <h3 class="text-xl font-extrabold text-[#765137] font-heading group-hover:text-[#D97706] transition-colors pt-2">
                  {{ c.title }}
                </h3>

                <p class="text-sm text-[#765137]/80 leading-relaxed font-medium">
                  {{ c.description }}
                </p>
              </div>

              <!-- Comparison Highlight Box -->
              <div class="p-4 rounded-2xl {{ c.bgColor }} border border-black/5 space-y-1 text-xs text-[#765137] shadow-2xs">
                <span class="font-extrabold block text-sm" [style.color]="c.color">{{ c.comparisonTitle }}</span>
                <span class="leading-relaxed block opacity-90">{{ c.comparisonDesc }}</span>
              </div>

            </div>
          }
        </div>

        <!-- Easter Egg: Hidden Luna Component (Section 8.4 Encuentra a Luna) -->
        <div class="mt-16 text-center">
          <div class="inline-block relative p-5 rounded-3xl bg-[#FFFDF8] border-2 border-[#F9BE36]/60 shadow-lg hover:shadow-xl transition-shadow">
            
            <div class="flex items-center gap-3">
              <span class="text-2xl">👀</span>
              <span class="text-xs sm:text-sm font-extrabold text-[#765137]">
                Pista secreta: Dicen que a Luna le encanta jugar al escondite detrás de las acacias...
              </span>

              <!-- Luna Hiding Peek-A-Boo Interactive Button -->
              <button
                type="button"
                (click)="findLuna()"
                class="ml-2 px-4 py-2 rounded-xl bg-[#FFF1A8] hover:bg-[#F9BE36] text-[#765137] text-xs font-extrabold border border-[#F9BE36] transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
                title="¿Quién se asoma por aquí?"
              >
                ¿Mirar detrás? 🦒
              </button>
            </div>

            <!-- Luna Discovered Celebration Popup -->
            @if (lunaDiscovered()) {
              <div class="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-200 border-2 border-[#F9BE36] flex items-center justify-between gap-4 animate-bounce">
                <div class="flex items-center gap-3 text-left">
                  <span class="text-3xl">🎉</span>
                  <div>
                    <h4 class="text-sm font-extrabold text-[#765137]">¡Ajá! ¡Me encontraste, explorador!</h4>
                    <p class="text-xs text-[#765137]/80">¡Desbloqueaste la medalla secreta <strong>"¿Dónde está Luna?"</strong> en tu álbum!</p>
                  </div>
                </div>

                <button
                  type="button"
                  (click)="lunaDiscovered.set(false)"
                  class="px-4 py-1.5 rounded-xl bg-white text-xs font-extrabold text-[#765137] shadow-sm cursor-pointer hover:bg-stone-50"
                >
                  ¡Genial!
                </button>
              </div>
            }

          </div>
        </div>

      </div>

    </section>
  `
})
export class VisualCuriosities {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly activeScale = signal<'human' | 'bus' | 'both'>('both');
  readonly lunaDiscovered = signal<boolean>(false);

  setScaleComparison(mode: 'human' | 'bus' | 'both'): void {
    this.soundService.playPop();
    this.activeScale.set(mode);
  }

  findLuna(): void {
    this.soundService.playSuccess();
    this.lunaDiscovered.set(true);
    // Award the secret sticker "¿Dónde está Luna?" in the sticker album!
    this.albumService.unlock('encuentra-luna');
  }
}
