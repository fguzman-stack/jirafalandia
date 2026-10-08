import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, ParkZone } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

@Component({
  selector: 'app-interactive-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="mapa" class="py-20 bg-[#FFF9E8] relative overflow-hidden">
      
      <!-- Decorative background flora -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#765137]">
            <mat-icon class="text-base text-amber-700">explore</mat-icon>
            <span>Mapa Ilustrado del Safari</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            Explora Jirafalandia
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80">
            Un pequeño parque temático diseñado a mano. Toca cualquiera de las 5 zonas para descubrir sus paisajes, jirafas residentes y secretos ocultos.
          </p>
        </div>

        <!-- Quick Zone Selection Chips (Mobile friendly + quick jumps) -->
        <div class="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-8">
          @for (zone of data.parkZones; track zone.id) {
            <button
              type="button"
              (click)="selectZone(zone)"
              [class]="selectedZone()?.id === zone.id 
                ? 'bg-[#F9BE36] text-[#765137] shadow-md scale-105 border-[#765137]/30' 
                : 'bg-[#FFFDF5] text-[#765137]/90 hover:bg-[#FFF1A8] border-[#F9BE36]/30'"
              class="px-4 py-2 rounded-2xl border text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F9BE36]"
            >
              <mat-icon class="text-base" [style.color]="zone.color">{{ zone.icon }}</mat-icon>
              <span>{{ zone.name }}</span>
            </button>
          }
        </div>

        <!-- The Illustrated Safari Map Container -->
        <div class="relative w-full rounded-3xl bg-[#FFFDF5] border-3 border-[#F9BE36]/40 shadow-xl overflow-hidden giraffe-spots-subtle">
          
          <!-- Map Compass / Legend badge -->
          <div class="absolute top-4 left-4 z-20 bg-[#FFFDF5]/90 backdrop-blur-xs rounded-2xl px-3 py-2 border border-[#F9BE36]/50 shadow-xs flex items-center gap-2 pointer-events-none">
            <mat-icon class="text-amber-600 text-lg">navigation</mat-icon>
            <span class="text-xs font-bold text-[#765137]">Safari Jirafalandia &middot; Vista Aérea</span>
          </div>

          <!-- Main SVG Interactive Canvas -->
          <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[380px] max-h-[640px]">
            <svg 
              viewBox="0 0 1000 600" 
              class="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <!-- Base Terrain: Warm African Savanna Gradient -->
              <defs>
                <linearGradient id="savannaGrass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#FFF1A8" stop-opacity="0.9"/>
                  <stop offset="50%" stop-color="#FFF9E8" stop-opacity="0.95"/>
                  <stop offset="100%" stop-color="#E8F3E5" stop-opacity="0.9"/>
                </linearGradient>

                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#BAE6FD"/>
                  <stop offset="100%" stop-color="#7DD3FC"/>
                </linearGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#765137" flood-opacity="0.15"/>
                </filter>
              </defs>

              <rect x="0" y="0" width="1000" height="600" fill="url(#savannaGrass)"/>

              <!-- Organic Trails & Paths connecting zones -->
              <!-- Main curved pathway (sand color) -->
              <path 
                d="M 120 540 C 250 510, 280 440, 320 380 C 370 300, 480 280, 520 200 C 560 140, 680 180, 720 260 C 760 340, 680 460, 750 520" 
                stroke="#E2CE9C" 
                stroke-width="26" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                fill="none"
              />
              <path 
                d="M 120 540 C 250 510, 280 440, 320 380 C 370 300, 480 280, 520 200 C 560 140, 680 180, 720 260 C 760 340, 680 460, 750 520" 
                stroke="#FFF9E8" 
                stroke-width="4" 
                stroke-dasharray="10,12" 
                fill="none"
              />

              <!-- Secondary cross paths -->
              <path 
                d="M 320 380 Q 420 420 490 400 Q 560 380 680 460" 
                stroke="#E2CE9C" 
                stroke-width="18" 
                stroke-linecap="round" 
                fill="none"
              />

              <!-- Savannah Waterhole (Laguna de las Jirafas) -->
              <g>
                <ellipse cx="500" cy="380" rx="90" ry="50" fill="url(#waterGrad)" filter="url(#softGlow)"/>
                <ellipse cx="515" cy="375" rx="65" ry="32" fill="#E0F2FE" opacity="0.6"/>
                <!-- Ripples -->
                <ellipse cx="485" cy="375" rx="20" ry="8" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.7"/>
                <ellipse cx="530" cy="390" rx="14" ry="6" fill="none" stroke="#FFFFFF" stroke-width="1.5" opacity="0.7"/>
                <!-- Water plants / Reeds -->
                <circle cx="430" cy="380" r="4" fill="#557A55"/>
                <circle cx="438" cy="384" r="5" fill="#A7C99A"/>
                <circle cx="580" cy="360" r="5" fill="#557A55"/>
              </g>

              <!-- Illustrated Acacia Trees & Vegetation clumps -->
              <!-- Cluster 1 (West - Sabana Dorada) -->
              <g transform="translate(180, 220)">
                <!-- Acacia Trunk -->
                <path d="M40 90 L35 40 Q25 25 15 20 M35 40 Q45 25 60 15" stroke="#765137" stroke-width="4" stroke-linecap="round"/>
                <!-- Umbrella Canopy -->
                <ellipse cx="38" cy="18" rx="42" ry="16" fill="#557A55"/>
                <ellipse cx="40" cy="14" rx="34" ry="12" fill="#A7C99A" opacity="0.7"/>
              </g>

              <g transform="translate(110, 310)">
                <path d="M30 70 L28 35 Q20 20 10 15 M28 35 Q35 20 45 15" stroke="#765137" stroke-width="3" stroke-linecap="round"/>
                <ellipse cx="28" cy="14" rx="30" ry="12" fill="#557A55"/>
                <ellipse cx="29" cy="11" rx="24" ry="9" fill="#A7C99A" opacity="0.7"/>
              </g>

              <!-- Cluster 2 (North East - Bosque de Acacias) -->
              <g transform="translate(620, 120)">
                <path d="M50 110 L45 50 Q30 30 15 20 M45 50 Q60 30 80 20" stroke="#765137" stroke-width="5" stroke-linecap="round"/>
                <ellipse cx="48" cy="20" rx="58" ry="22" fill="#3F623F"/>
                <ellipse cx="50" cy="15" rx="46" ry="16" fill="#557A55"/>
                <ellipse cx="52" cy="10" rx="36" ry="12" fill="#A7C99A" opacity="0.8"/>
              </g>

              <g transform="translate(740, 160)">
                <path d="M35 80 L32 40 Q20 25 10 20 M32 40 Q45 25 55 20" stroke="#765137" stroke-width="4" stroke-linecap="round"/>
                <ellipse cx="32" cy="16" rx="40" ry="15" fill="#557A55"/>
                <ellipse cx="33" cy="12" rx="30" ry="10" fill="#A7C99A" opacity="0.7"/>
              </g>

              <!-- Cluster 3 (South - Rincón de las Crías) -->
              <g transform="translate(260, 440)">
                <ellipse cx="40" cy="20" rx="35" ry="14" fill="#A7C99A"/>
                <ellipse cx="40" cy="16" rx="28" ry="10" fill="#CBD5E1" opacity="0.5"/>
                <circle cx="20" cy="25" r="8" fill="#F472B6" opacity="0.7"/>
                <circle cx="55" cy="22" r="7" fill="#F9A8D4" opacity="0.7"/>
              </g>

              <!-- Sunset Hill in the North center (Mirador del Atardecer) -->
              <g transform="translate(460, 40)">
                <!-- Hill mound with twilight tint -->
                <ellipse cx="60" cy="100" rx="130" ry="50" fill="#FDE68A" opacity="0.7"/>
                <ellipse cx="60" cy="90" rx="100" ry="38" fill="#DDD6FE" opacity="0.6"/>
                <!-- Lookout wooden gazebo tower -->
                <rect x="50" y="55" width="20" height="24" fill="#765137" rx="2"/>
                <polygon points="40,55 60,35 80,55" fill="#B45309"/>
                <rect x="57" y="65" width="6" height="14" fill="#FFFDF5"/>
              </g>

              <!-- Mini Animated Giraffe Silhouettes grazing around -->
              <!-- Giraffe in Golden Savanna -->
              <g transform="translate(240, 330) scale(0.65)" class="animate-float">
                <path d="M30 70 L30 35 Q30 20 40 15 L45 10 L52 14 L46 25 L40 35 L40 70 Z" fill="#F9BE36"/>
                <circle cx="48" cy="11" r="7" fill="#F9BE36"/>
                <circle cx="52" cy="12" r="4" fill="#FFC6A5"/>
                <rect x="33" y="38" width="5" height="4" rx="1.5" fill="#765137"/>
                <rect x="34" y="48" width="4" height="5" rx="1.5" fill="#765137"/>
              </g>

              <!-- Little baby calf in Nursery corner -->
              <g transform="translate(390, 480) scale(0.45)" class="animate-float-delayed">
                <path d="M30 60 L30 30 Q30 18 38 14 L42 10 L48 13 L44 22 L38 30 L38 60 Z" fill="#FFD54F"/>
                <circle cx="44" cy="11" r="6" fill="#FFD54F"/>
                <circle cx="47" cy="12" r="3.5" fill="#FFC6A5"/>
                <rect x="32" y="32" width="4" height="4" rx="1" fill="#765137"/>
              </g>

              <!-- Tall Giraffe browsing Acacia Forest -->
              <g transform="translate(680, 210) scale(0.7)" class="animate-float">
                <path d="M30 80 L30 30 Q30 15 42 10 L48 6 L55 10 L48 20 L40 30 L40 80 Z" fill="#F9BE36"/>
                <circle cx="50" cy="8" r="8" fill="#F9BE36"/>
                <circle cx="54" cy="9" r="4.5" fill="#FFC6A5"/>
                <rect x="33" y="35" width="6" height="5" rx="2" fill="#765137"/>
                <rect x="34" y="46" width="5" height="6" rx="2" fill="#765137"/>
                <rect x="33" y="58" width="6" height="5" rx="2" fill="#765137"/>
              </g>

              <!-- The 5 Interactive Zone Pins / Beacons -->
              <!-- Zone 1: Sabana Dorada (x: 280, y: 280) -->
              <g 
                (click)="selectZoneById('sabana-dorada')" 
                (mouseenter)="onHoverZone()"
                class="cursor-pointer group/pin"
                transform="translate(280, 270)"
              >
                <!-- Pulse circle -->
                <circle cx="0" cy="0" r="28" fill="#F9BE36" opacity="0.3" class="animate-ping" style="animation-duration: 3s;"/>
                <circle cx="0" cy="0" r="24" fill="#FFFDF5" stroke="#F9BE36" stroke-width="4" filter="url(#softGlow)"/>
                <circle cx="0" cy="0" r="14" fill="#F9BE36"/>
                <text x="0" y="5" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#765137">1</text>
                <!-- Tooltip label -->
                <g transform="translate(0, -36)">
                  <rect x="-65" y="-14" width="130" height="28" rx="14" fill="#765137" filter="url(#softGlow)"/>
                  <text x="0" y="4" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="bold" font-size="12" fill="#FFFDF5">Sabana Dorada</text>
                </g>
              </g>

              <!-- Zone 2: Bosque de Acacias (x: 680, y: 190) -->
              <g 
                (click)="selectZoneById('bosque-acacias')" 
                (mouseenter)="onHoverZone()"
                class="cursor-pointer group/pin"
                transform="translate(680, 190)"
              >
                <circle cx="0" cy="0" r="28" fill="#557A55" opacity="0.3" class="animate-ping" style="animation-duration: 2.8s;"/>
                <circle cx="0" cy="0" r="24" fill="#FFFDF5" stroke="#557A55" stroke-width="4" filter="url(#softGlow)"/>
                <circle cx="0" cy="0" r="14" fill="#557A55"/>
                <text x="0" y="5" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">2</text>
                <g transform="translate(0, -36)">
                  <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#557A55" filter="url(#softGlow)"/>
                  <text x="0" y="4" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="bold" font-size="12" fill="#FFFDF5">Bosque de Acacias</text>
                </g>
              </g>

              <!-- Zone 3: Rincón de las Crías (x: 350, y: 440) -->
              <g 
                (click)="selectZoneById('rincon-crias')" 
                (mouseenter)="onHoverZone()"
                class="cursor-pointer group/pin"
                transform="translate(350, 440)"
              >
                <circle cx="0" cy="0" r="28" fill="#E11D48" opacity="0.3" class="animate-ping" style="animation-duration: 3.2s;"/>
                <circle cx="0" cy="0" r="24" fill="#FFFDF5" stroke="#E11D48" stroke-width="4" filter="url(#softGlow)"/>
                <circle cx="0" cy="0" r="14" fill="#E11D48"/>
                <text x="0" y="5" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">3</text>
                <g transform="translate(0, -36)">
                  <rect x="-70" y="-14" width="140" height="28" rx="14" fill="#E11D48" filter="url(#softGlow)"/>
                  <text x="0" y="4" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="bold" font-size="12" fill="#FFFDF5">Rincón de las Crías</text>
                </g>
              </g>

              <!-- Zone 4: Sendero de las Manchas (x: 750, y: 420) -->
              <g 
                (click)="selectZoneById('sendero-manchas')" 
                (mouseenter)="onHoverZone()"
                class="cursor-pointer group/pin"
                transform="translate(750, 420)"
              >
                <circle cx="0" cy="0" r="28" fill="#D97706" opacity="0.3" class="animate-ping" style="animation-duration: 2.7s;"/>
                <circle cx="0" cy="0" r="24" fill="#FFFDF5" stroke="#D97706" stroke-width="4" filter="url(#softGlow)"/>
                <circle cx="0" cy="0" r="14" fill="#D97706"/>
                <text x="0" y="5" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">4</text>
                <g transform="translate(0, -36)">
                  <rect x="-75" y="-14" width="150" height="28" rx="14" fill="#D97706" filter="url(#softGlow)"/>
                  <text x="0" y="4" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="bold" font-size="12" fill="#FFFDF5">Sendero de Manchas</text>
                </g>
              </g>

              <!-- Zone 5: Mirador del Atardecer (x: 520, y: 110) -->
              <g 
                (click)="selectZoneById('mirador-atardecer')" 
                (mouseenter)="onHoverZone()"
                class="cursor-pointer group/pin"
                transform="translate(520, 110)"
              >
                <circle cx="0" cy="0" r="28" fill="#7C3AED" opacity="0.3" class="animate-ping" style="animation-duration: 3.5s;"/>
                <circle cx="0" cy="0" r="24" fill="#FFFDF5" stroke="#7C3AED" stroke-width="4" filter="url(#softGlow)"/>
                <circle cx="0" cy="0" r="14" fill="#7C3AED"/>
                <text x="0" y="5" text-anchor="middle" font-family="'Fredoka', sans-serif" font-weight="bold" font-size="14" fill="#FFFFFF">5</text>
                <g transform="translate(0, -36)">
                  <rect x="-75" y="-14" width="150" height="28" rx="14" fill="#7C3AED" filter="url(#softGlow)"/>
                  <text x="0" y="4" text-anchor="middle" font-family="'Nunito', sans-serif" font-weight="bold" font-size="12" fill="#FFFDF5">Mirador Atardecer</text>
                </g>
              </g>

            </svg>
          </div>

          <!-- Bottom Map Callout -->
          <div class="px-6 py-4 bg-[#FFF9E8] border-t border-[#F9BE36]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#765137]">
            <span class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#F9BE36]"></span>
              Haz clic en cualquier punto marcado o botón para entrar a la zona.
            </span>
            <span class="font-bold text-[#D97706] flex items-center gap-1">
              Desbloquea pegatinas explorando cada área <mat-icon class="text-sm">stars</mat-icon>
            </span>
          </div>

        </div>

        <!-- Zone Inspection Detail Card / Drawer -->
        @if (selectedZone(); as zone) {
          <div class="mt-8 bg-[#FFFDF5] border-2 border-[#F9BE36] rounded-3xl p-6 sm:p-8 shadow-xl transition-all duration-300">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <!-- Left: Zone Identity & Atmosphere -->
              <div class="lg:col-span-7 space-y-4">
                
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm" [style.background-color]="zone.color">
                    <mat-icon class="text-2xl">{{ zone.icon }}</mat-icon>
                  </div>
                  <div>
                    <h3 class="text-2xl sm:text-3xl font-extrabold text-[#765137] font-heading">
                      {{ zone.name }}
                    </h3>
                    <p class="text-sm font-semibold text-[#765137]/70 font-accent">{{ zone.subtitle }}</p>
                  </div>
                </div>

                <p class="text-base text-[#765137]/90 leading-relaxed">
                  {{ zone.description }}
                </p>

                <!-- Atmosphere notes -->
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 flex items-start gap-3 text-sm">
                  <mat-icon class="text-amber-600 mt-0.5">spa</mat-icon>
                  <div>
                    <span class="font-bold text-[#765137] block">Ambiente:</span>
                    <span class="text-[#765137]/80">{{ zone.atmosphere }}</span>
                  </div>
                </div>

                <!-- Resident giraffes tags -->
                <div class="pt-2">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#765137]/60 block mb-2">Habitantes de esta zona:</span>
                  <div class="flex flex-wrap gap-2">
                    @for (res of zone.residents; track res) {
                      <span class="px-3 py-1 rounded-xl bg-[#FFF1A8] text-[#765137] text-xs font-bold border border-[#F9BE36]/40">
                        {{ res }}
                      </span>
                    }
                  </div>
                </div>

              </div>

              <!-- Right: Interactive Activity Tip & Sticker Unlock -->
              <div class="lg:col-span-5 bg-[#FFF9E8] border border-[#F9BE36]/50 rounded-2xl p-6 flex flex-col justify-between space-y-4">
                
                <div class="space-y-2">
                  <div class="flex items-center gap-2 text-[#D97706] font-bold text-sm">
                    <mat-icon>lightbulb</mat-icon>
                    <span>{{ zone.activityTitle }}</span>
                  </div>
                  <p class="text-sm text-[#765137]/90 leading-relaxed">
                    {{ zone.activityTip }}
                  </p>
                </div>

                <div class="pt-4 border-t border-[#F9BE36]/30 flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <mat-icon class="text-emerald-700 text-sm">check_circle</mat-icon>
                    ¡Zona descubierta!
                  </span>

                  <button
                    type="button"
                    (click)="closeZoneDetail()"
                    class="px-4 py-2 rounded-xl bg-[#FFFDF5] hover:bg-[#FFF1A8] text-[#765137] font-bold text-xs border border-[#F9BE36]/50 transition-colors cursor-pointer"
                  >
                    Cerrar detalle
                  </button>
                </div>

              </div>

            </div>
          </div>
        }

      </div>

    </section>
  `
})
export class InteractiveMap {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly selectedZone = signal<ParkZone | null>(this.data.parkZones[0]);

  selectZone(zone: ParkZone): void {
    this.soundService.playPop();
    this.selectedZone.set(zone);
    if (zone.stickerId) {
      this.albumService.unlock(zone.stickerId);
    }
  }

  selectZoneById(id: string): void {
    const found = this.data.parkZones.find(z => z.id === id);
    if (found) {
      this.selectZone(found);
    }
  }

  onHoverZone(): void {
    // Subtle hover interaction
  }

  closeZoneDetail(): void {
    this.soundService.playPop();
    this.selectedZone.set(null);
  }
}
