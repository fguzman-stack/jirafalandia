import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, GiraffeSpecies } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { HabitatScene } from './svg/habitat-scene';

@Component({
  selector: 'app-africa-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, HabitatScene],
  template: `
    <section id="donde-viven" class="py-20 bg-[#FFF9E8] relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#765137]">
            <mat-icon class="text-base text-amber-700">public</mat-icon>
            <span>Geografía y Hábitats &middot; Mapa de África</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            El Mundo de las Jirafas
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80">
            Cada especie domina una región diferente del continente africano. Selecciona una jirafa para iluminar sus territorios de sabana, matorral y desierto.
          </p>
        </div>

        <!-- Interactive Species Selector Tabs -->
        <div class="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 mb-10">
          @for (sp of data.species; track sp.id) {
            <button
              type="button"
              (click)="selectSpecies(sp)"
              [class]="selectedSpecies().id === sp.id
                ? 'bg-[#F9BE36] text-[#765137] shadow-md scale-105 border-[#765137]/40 ring-2 ring-[#765137]/20'
                : 'bg-[#FFFDF5] text-[#765137]/80 hover:bg-[#FFF1A8] border-[#F9BE36]/40'"
              class="px-5 py-3 rounded-2xl border text-sm sm:text-base font-extrabold transition-all duration-200 flex items-center gap-2.5 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F9BE36]"
            >
              <span class="w-3 h-3 rounded-full" [style.background-color]="sp.accentColor"></span>
              <span>{{ sp.commonName }}</span>
            </button>
          }
        </div>

        <!-- Main Map Display and Information Panel Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF5] border-3 border-[#F9BE36]/40 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
          
          <!-- Left: Illustrated Stylized Africa Map SVG -->
          <div class="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            <div class="relative w-full max-w-[520px] aspect-[4/5]">
              
              <!-- Subtle Background Ocean & Compass -->
              <div class="absolute inset-0 bg-[#E0F2FE]/40 rounded-3xl border border-[#BAE6FD] overflow-hidden">
                <!-- Compass Rose in North-West ocean -->
                <div class="absolute top-4 left-4 opacity-50 pointer-events-none">
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="#765137" stroke-width="1.5" fill="none" stroke-dasharray="4,3"/>
                    <polygon points="50,15 56,45 50,42 44,45" fill="#B45309"/>
                    <polygon points="50,85 56,55 50,58 44,55" fill="#765137"/>
                    <text x="50" y="12" font-family="'Fredoka', sans-serif" font-size="12" font-weight="bold" fill="#765137" text-anchor="middle">N</text>
                  </svg>
                </div>

                <!-- Ocean Waves decoration -->
                <div class="absolute bottom-6 left-6 text-xs text-[#0284C7]/60 font-accent italic">
                  Océano Atlántico
                </div>
                <div class="absolute top-1/3 right-4 text-xs text-[#0284C7]/60 font-accent italic">
                  Océano Índico
                </div>
              </div>

              <!-- Africa Continent SVG Shape -->
              <svg 
                viewBox="0 0 500 620" 
                class="w-full h-full relative z-10 select-none"
                role="img"
                [attr.aria-label]="'Mapa de África con el hábitat aproximado de ' + selectedSpecies().commonName"
              >
                <defs>
                  <filter id="africaShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#765137" flood-opacity="0.12"/>
                  </filter>

                  <!-- Pattern gradients for zones -->
                  <linearGradient id="reticulataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#F97316"/>
                    <stop offset="100%" stop-color="#EA580C"/>
                  </linearGradient>

                  <linearGradient id="masaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#EAB308"/>
                    <stop offset="100%" stop-color="#CA8A04"/>
                  </linearGradient>

                  <linearGradient id="northernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#FB923C"/>
                    <stop offset="100%" stop-color="#D97706"/>
                  </linearGradient>

                  <linearGradient id="southernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#84CC16"/>
                    <stop offset="100%" stop-color="#65A30D"/>
                  </linearGradient>
                </defs>

                <!-- Base Continent Outline in Sand/Cream tones -->
                <path 
                  d="M87 99 L109 72 L158 58 L193 55 L212 73 L239 78 L250 102 L286 102 L308 87 L345 91 L360 143 L375 182 L391 219 L417 241 L459 225 L453 252 L422 283 L400 312 L373 337 L377 368 L367 397 L368 429 L351 458 L339 502 L316 539 L291 565 L266 585 L243 581 L226 555 L210 517 L201 479 L185 448 L181 413 L184 383 L169 352 L174 326 L162 306 L130 299 L106 312 L83 301 L65 276 L48 263 L40 236 L48 202 L63 181 L68 149 Z" 
                  fill="#ead9aa" 
                  stroke="#baaa7b" 
                  stroke-width="2.5"
                  filter="url(#africaShadow)"
                />

                <!-- Madagascar Island -->
                <path 
                  d="M440 404 L449 425 L445 447 L433 473 L420 498 L411 490 L417 461 L421 437 Z" 
                  fill="#ead9aa" 
                  stroke="#baaa7b" 
                  stroke-width="3"
                />

                <!-- Internal Biome / Sahara & Savannah decorative textures -->
                <!-- Northern Desert Area (Sahara) -->
                <path 
                  d="M 90 140 Q 240 110 370 130 Q 340 200 130 200 Z" 
                  fill="#FEF3C7" 
                  opacity="0.6"
                />
                
                <!-- Central Equatorial Forest -->
                <path d="M183 288 Q228 263 285 291 L312 338 Q286 381 229 369 L193 344 Z" fill="#a7ba8b" opacity="0.6"/>
                <path d="M324 150 Q309 201 320 254 M300 296 Q324 328 310 384 M199 413 Q263 433 310 403" fill="none" stroke="#fff4d4" stroke-width="2" stroke-dasharray="5 5"/>
                <path d="M322 328 Q332 313 340 329 L334 349 Z M325 367 Q335 351 339 372 L334 393 Z" fill="#8eb9af"/>
                <g fill="#c4a56d" opacity=".65"><path d="M140 149 l10 -16 10 16 Z M161 152 l9 -12 9 12 Z M235 177 l12 -16 12 16 Z"/></g>

                <!-- ============================================== -->
                <!-- DYNAMIC DISTRIBUTION ZONES ACCORDING TO SPECIES -->
                <!-- ============================================== -->

                <!-- 1. RETICULATED DISTRIBUTION (Horn of Africa & North Kenya) -->
                @if (selectedSpecies().id === 'reticulata') {
                  <g class="transition-all duration-300">
                    <path 
                      d="M 350 240 C 390 220, 430 240, 420 280 C 390 310, 350 300, 340 270 Z" 
                      fill="url(#reticulataGrad)" 
                      opacity="0.85"
                      stroke="#FFFFFF"
                      stroke-width="3"
                    />
                    <!-- Pulsing Pin Marker -->
                    <circle cx="380" cy="265" r="8" fill="#FFFFFF"/>
                    <circle cx="380" cy="265" r="5" fill="#EA580C"/>
                    <text x="380" y="245" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="12" fill="#78350F" text-anchor="middle">Kenia / Somalia</text>
                  </g>
                }

                <!-- 2. MASAI DISTRIBUTION (Kenya, Tanzania / Serengeti / Masai Mara) -->
                @if (selectedSpecies().id === 'tippelskirchi') {
                  <g class="transition-all duration-300">
                    <path 
                      d="M 320 280 C 370 280, 390 330, 370 380 C 330 380, 310 330, 320 280 Z" 
                      fill="url(#masaiGrad)" 
                      opacity="0.85"
                      stroke="#FFFFFF"
                      stroke-width="3"
                    />
                    <!-- Pulsing Pin Marker -->
                    <circle cx="345" cy="330" r="8" fill="#FFFFFF"/>
                    <circle cx="345" cy="330" r="5" fill="#CA8A04"/>
                    <text x="345" y="310" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="12" fill="#78350F" text-anchor="middle">Serengueti / Masai Mara</text>
                  </g>
                }

                <!-- 3. NORTHERN GIRAFFE DISTRIBUTION (Sahel corridor, Niger, Chad, Cameroon, South Sudan, Uganda) -->
                @if (selectedSpecies().id === 'camelopardalis') {
                  <g class="transition-all duration-300">
                    <!-- Discontinuous patches in Sahel -->
                    <ellipse cx="120" cy="210" rx="20" ry="14" fill="url(#northernGrad)" opacity="0.85" stroke="#FFFFFF" stroke-width="2"/>
                    <ellipse cx="220" cy="230" rx="35" ry="18" fill="url(#northernGrad)" opacity="0.85" stroke="#FFFFFF" stroke-width="2"/>
                    <ellipse cx="300" cy="250" rx="35" ry="22" fill="url(#northernGrad)" opacity="0.85" stroke="#FFFFFF" stroke-width="2"/>
                    <!-- Pin Marker on East Sahel -->
                    <circle cx="300" cy="250" r="8" fill="#FFFFFF"/>
                    <circle cx="300" cy="250" r="5" fill="#D97706"/>
                    <text x="300" y="230" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="12" fill="#78350F" text-anchor="middle">Sahel / Níger / Chad / Uganda</text>
                  </g>
                }

                <!-- 4. SOUTHERN GIRAFFE DISTRIBUTION (South Africa, Namibia, Botswana, Zimbabwe) -->
                @if (selectedSpecies().id === 'giraffa') {
                  <g class="transition-all duration-300">
                    <path 
                      d="M 210 440 C 310 420, 360 450, 340 530 C 290 560, 220 540, 210 440 Z" 
                      fill="url(#southernGrad)" 
                      opacity="0.85"
                      stroke="#FFFFFF"
                      stroke-width="3"
                    />
                    <!-- Pulsing Pin Marker -->
                    <circle cx="275" cy="485" r="8" fill="#FFFFFF"/>
                    <circle cx="275" cy="485" r="5" fill="#65A30D"/>
                    <text x="275" y="470" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="12" fill="#78350F" text-anchor="middle">Kruger / Kalahari / Namibia</text>
                  </g>
                }

                <!-- Major African landmark labels -->
                <text x="250" y="110" font-family="'Nunito', sans-serif" font-size="11" fill="#765137" opacity="0.4" font-weight="bold" text-anchor="middle">DESIERTO DEL SÁHARA</text>
                <text x="230" y="325" font-family="'Nunito', sans-serif" font-size="10" fill="#557A55" opacity="0.5" font-weight="bold" text-anchor="middle">CUENCA DEL CONGO</text>
                <text x="260" y="520" font-family="'Nunito', sans-serif" font-size="10" fill="#765137" opacity="0.4" font-weight="bold" text-anchor="middle">KALAHARI</text>

              </svg>
            </div>

            <!-- Disclaimer footnote -->
            <p class="text-[11px] text-[#765137]/60 italic mt-3 text-center">
              *Las áreas ilustradas representan rangos geográficos aproximados basados en los censos de la Giraffe Conservation Foundation (GCF).
            </p>

          </div>

          <!-- Right: Species Regional Details Card -->
          <div class="lg:col-span-5 space-y-6">
            <div class="rounded-2xl overflow-hidden border border-[#d9cbaa] shadow-sm">
              <app-habitat-scene [zone]="selectedSpecies().id === 'reticulata' || selectedSpecies().id === 'camelopardalis' ? 'bosque-acacias' : 'sabana-dorada'" [label]="'Paisaje ilustrado del hábitat de ' + selectedSpecies().commonName" />
            </div>
            
            <div class="space-y-2">
              <span class="px-3 py-1 rounded-full text-xs font-bold border {{ selectedSpecies().statusColor }}">
                {{ selectedSpecies().status }}
              </span>
              
              <h3 class="text-3xl font-extrabold text-[#765137] font-heading">
                {{ selectedSpecies().commonName }}
              </h3>
              
              <p class="text-sm italic font-semibold text-[#765137]/70">
                {{ selectedSpecies().scientificName }}
              </p>
            </div>

            <!-- Evocative Quote -->
            <div class="p-4 rounded-2xl bg-[#FFF1A8]/60 border border-[#F9BE36] text-[#765137] italic font-accent text-base">
              "{{ selectedSpecies().cardQuote }}"
            </div>

            <!-- Habitat & Biome -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm font-bold text-[#765137]">
                <mat-icon class="text-emerald-700">landscape</mat-icon>
                <span>Bioma y Ecosistema</span>
              </div>
              <p class="text-sm text-[#765137]/90 leading-relaxed">
                {{ selectedSpecies().habitat }}
              </p>
            </div>

            <!-- Countries where it lives -->
            <div class="space-y-3">
              <div class="flex items-center gap-2 text-sm font-bold text-[#765137]">
                <mat-icon class="text-amber-700">flag</mat-icon>
                <span>Países donde puedes encontrarla</span>
              </div>
              <div class="flex flex-wrap gap-2">
                @for (c of selectedSpecies().countries; track c) {
                  <span class="px-3 py-1.5 rounded-xl bg-[#FFF9E8] border border-[#F9BE36]/40 text-xs font-extrabold text-[#765137]">
                    📍 {{ c }}
                  </span>
                }
              </div>
            </div>

            <!-- Photo preview from habitat -->
            <div class="relative h-44 rounded-2xl overflow-hidden border border-[#F9BE36]/40 shadow-xs">
              <img 
                [src]="selectedSpecies().imageUrl" 
                [alt]="selectedSpecies().imageAlt"
                class="w-full h-full object-cover"
                referrerpolicy="no-referrer"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                <span class="text-white text-xs font-bold drop-shadow-sm">
                  Paisaje típico &middot; {{ selectedSpecies().commonName }}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  `
})
export class AfricaMap {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly selectedSpecies = signal<GiraffeSpecies>(this.data.species[0]);

  selectSpecies(sp: GiraffeSpecies): void {
    this.soundService.playPop();
    this.selectedSpecies.set(sp);

    // Unlock "Ruta Africana" sticker in the album!
    this.albumService.unlock('explorador-africa');
  }
}
