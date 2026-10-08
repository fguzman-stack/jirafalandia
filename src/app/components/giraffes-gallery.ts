import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, GiraffeSpecies } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { GiraffeReticulataSvg } from './svg/giraffe-reticulata-svg';
import { GiraffeMasaiSvg } from './svg/giraffe-masai-svg';
import { GiraffeRothschildSvg } from './svg/giraffe-rothschild-svg';
import { GiraffeCalfSvg } from './svg/giraffe-calf-svg';

@Component({
  selector: 'app-giraffes-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    GiraffeReticulataSvg,
    GiraffeMasaiSvg,
    GiraffeRothschildSvg,
    GiraffeCalfSvg
  ],
  template: `
    <section id="jirafas" class="py-20 bg-[#FFFDF5] relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#765137]">
            <mat-icon class="text-base text-amber-700">pets</mat-icon>
            <span>Taxonomía Moderna &middot; 4 Especies Reconocidas</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            Conoce a las Jirafas
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80">
            Durante siglos se creyó que todas las jirafas eran una sola especie. Hoy los estudios genéticos distinguen 4 grandes especies con patrones de pelaje y personalidades únicas.
          </p>
        </div>

        <!-- 4 Distinctive Species Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          @for (sp of data.species; track sp.id) {
            <div 
              class="rounded-3xl border-2 border-[#F9BE36]/40 bg-[#FFF9E8] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              <!-- Photographic Thumbnail with Status badge -->
              <div class="relative h-60 w-full overflow-hidden bg-stone-200">
                <img 
                  [src]="sp.imageUrl" 
                  [alt]="sp.imageAlt"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <!-- Status Badge -->
                <div class="absolute top-3 left-3">
                  <span class="px-2.5 py-1 rounded-full text-xs font-extrabold border shadow-xs {{ sp.statusColor }}">
                    {{ sp.status }}
                  </span>
                </div>

                <!-- Pattern Type Mini Tag -->
                <div class="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs rounded-xl px-2.5 py-1 text-white text-xs font-medium flex items-center justify-between">
                  <span class="truncate">{{ sp.patternType }}</span>
                  <mat-icon class="text-sm text-[#FFD54F]">lens</mat-icon>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-1.5">
                  <span class="text-xs font-semibold italic text-[#765137]/70 block">{{ sp.scientificName }}</span>
                  <h3 class="text-xl font-extrabold text-[#765137] font-heading group-hover:text-[#D97706] transition-colors">
                    {{ sp.commonName }}
                  </h3>
                  <p class="text-xs font-semibold text-[#D97706]">{{ sp.tagline }}</p>
                  <p class="text-xs text-[#765137]/80 leading-relaxed italic pt-1">
                    "{{ sp.cardQuote }}"
                  </p>
                </div>

                <!-- Pattern visual swatch illustration -->
                <div class="p-3 rounded-2xl bg-[#FFFDF5] border border-[#F9BE36]/30 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-black/10">
                    <!-- SVG Pattern Swatch -->
                    @switch (sp.patternSvgType) {
                      @case ('reticulated') {
                        <svg viewBox="0 0 40 40" class="w-full h-full bg-[#FFF9E8]">
                          <polygon points="4,4 18,4 16,18 4,16" fill="#C2410C"/>
                          <polygon points="22,4 36,4 36,18 20,18" fill="#B45309"/>
                          <polygon points="4,22 18,22 16,36 4,36" fill="#9A3412"/>
                          <polygon points="22,22 36,22 36,36 20,36" fill="#C2410C"/>
                        </svg>
                      }
                      @case ('masai') {
                        <svg viewBox="0 0 40 40" class="w-full h-full bg-[#FFF9E8]">
                          <!-- Jagged oak leaf spots -->
                          <path d="M5 8 L12 4 L18 8 L15 15 L8 16 Z" fill="#78350F"/>
                          <path d="M22 6 L32 2 L36 10 L30 18 L24 14 Z" fill="#451A03"/>
                          <path d="M4 24 L14 20 L16 32 L8 36 L2 30 Z" fill="#78350F"/>
                          <path d="M24 24 L34 22 L36 34 L28 36 L22 30 Z" fill="#451A03"/>
                        </svg>
                      }
                      @case ('northern') {
                        <svg viewBox="0 0 40 40" class="w-full h-full bg-[#FFFDF5]">
                          <rect x="4" y="4" width="14" height="12" rx="4" fill="#B45309"/>
                          <rect x="22" y="5" width="14" height="13" rx="4" fill="#92400E"/>
                          <!-- Legs white without spots -->
                          <rect x="0" y="24" width="40" height="16" fill="#FFFFFF"/>
                          <circle cx="10" cy="28" r="3" fill="#D97706" opacity="0.4"/>
                        </svg>
                      }
                      @case ('southern') {
                        <svg viewBox="0 0 40 40" class="w-full h-full bg-[#FFFDF5]">
                          <ellipse cx="10" cy="10" rx="6" ry="5" fill="#4D7C0F"/>
                          <ellipse cx="28" cy="12" rx="7" ry="6" fill="#365314"/>
                          <ellipse cx="12" cy="28" rx="6" ry="6" fill="#365314"/>
                          <ellipse cx="28" cy="28" rx="5" ry="5" fill="#4D7C0F"/>
                        </svg>
                      }
                    }
                  </div>
                  <div class="text-[11px] leading-tight text-[#765137]/80">
                    <span class="font-bold text-[#765137] block">Diseño de mancha</span>
                    <span>{{ sp.patternType }}</span>
                  </div>
                </div>

                <!-- CTA Button -->
                <button
                  type="button"
                  (click)="openSpeciesDetail(sp)"
                  class="w-full py-2.5 px-4 rounded-xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#765137]"
                >
                  <span>Descubrir más</span>
                  <mat-icon class="text-base">arrow_forward</mat-icon>
                </button>
              </div>
            </div>
          }
        </div>

      </div>

      <!-- Modal Inmersivo de Detalle de Jirafa -->
      @if (activeSpecies(); as active) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div 
            class="bg-[#FFFDF5] border-3 border-[#F9BE36] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            <!-- Close Button -->
            <button
              type="button"
              (click)="closeSpeciesDetail()"
              class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FFFDF5] text-[#765137] hover:bg-[#FFF1A8] border border-[#F9BE36]/60 flex items-center justify-center shadow-md cursor-pointer focus:outline-hidden"
              aria-label="Cerrar ficha"
            >
              <mat-icon>close</mat-icon>
            </button>

            <!-- Mode Switcher Tabs in Modal Header -->
            <div class="relative bg-stone-100 border-b border-[#F9BE36]/30">
              <div class="flex items-center justify-start gap-2 p-3 bg-[#FFF9E8]">
                <button
                  type="button"
                  (click)="activeViewMode.set('photo')"
                  [class]="activeViewMode() === 'photo' ? 'bg-[#F9BE36] text-[#765137] shadow-xs' : 'bg-white text-[#765137]/80 hover:bg-[#FFF1A8]'"
                  class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <mat-icon class="text-sm">photo</mat-icon>
                  <span>Fotografía Real</span>
                </button>
                <button
                  type="button"
                  (click)="activeViewMode.set('svg')"
                  [class]="activeViewMode() === 'svg' ? 'bg-[#F9BE36] text-[#765137] shadow-xs' : 'bg-white text-[#765137]/80 hover:bg-[#FFF1A8]'"
                  class="px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <mat-icon class="text-sm">brush</mat-icon>
                  <span>Modelo Vectorial SVG</span>
                </button>
              </div>

              <!-- Hero Image / SVG view -->
              @if (activeViewMode() === 'photo') {
                <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-300">
                  <img 
                    [src]="active.imageUrl" 
                    [alt]="active.imageAlt"
                    class="w-full h-full object-cover"
                    referrerpolicy="no-referrer"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#FFFDF5] via-transparent to-black/30"></div>
                  
                  <div class="absolute bottom-4 left-6 right-6">
                    <span class="px-3 py-1 rounded-full text-xs font-bold border shadow-xs {{ active.statusColor }}">
                      Estado: {{ active.status }}
                    </span>
                    <h3 class="text-2xl sm:text-4xl font-extrabold text-[#765137] font-heading mt-2">
                      {{ active.commonName }}
                    </h3>
                    <span class="text-sm font-semibold italic text-[#765137]/80">{{ active.scientificName }}</span>
                  </div>
                </div>
              } @else {
                <!-- SVG Model View -->
                <div class="relative h-80 sm:h-96 w-full overflow-hidden bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] flex items-center justify-center p-4">
                  <div class="w-full h-full max-h-80 flex items-center justify-center">
                    @switch (active.patternSvgType) {
                      @case ('reticulated') {
                        <app-giraffe-reticulata-svg />
                      }
                      @case ('masai') {
                        <app-giraffe-masai-svg />
                      }
                      @case ('northern') {
                        <app-giraffe-rothschild-svg />
                      }
                      @case ('southern') {
                        <app-giraffe-masai-svg />
                      }
                    }
                  </div>
                  <div class="absolute bottom-3 left-4 right-4 bg-white/80 backdrop-blur-xs rounded-xl p-2 flex items-center justify-between text-xs text-[#765137] border border-[#F9BE36]/30">
                    <span class="font-bold">Ilustración Vectorial Original 100% SVG</span>
                    <span class="text-[#D97706] italic">Teselación anatómica nativa</span>
                  </div>
                </div>
              }
            </div>

            <!-- Modal Body Content -->
            <div class="p-6 sm:p-8 space-y-6">
              
              <!-- Quote / Tagline Banner -->
              <div class="p-4 rounded-2xl bg-[#FFF1A8]/60 border border-[#F9BE36] text-[#765137] text-sm sm:text-base font-medium flex items-start gap-3">
                <span class="text-2xl">🦒</span>
                <div>
                  <span class="font-bold block">{{ active.tagline }}</span>
                  <span class="italic text-[#765137]/80">"{{ active.cardQuote }}"</span>
                </div>
              </div>

              <!-- Quick Facts Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="p-3 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30">
                  <mat-icon class="text-amber-700 text-lg">height</mat-icon>
                  <span class="text-xs text-[#765137]/70 block font-semibold">Altura</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.height }}</span>
                </div>
                <div class="p-3 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30">
                  <mat-icon class="text-amber-700 text-lg">fitness_center</mat-icon>
                  <span class="text-xs text-[#765137]/70 block font-semibold">Peso</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.weight }}</span>
                </div>
                <div class="p-3 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30">
                  <mat-icon class="text-amber-700 text-lg">hourglass_bottom</mat-icon>
                  <span class="text-xs text-[#765137]/70 block font-semibold">Longevidad</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.lifespan }}</span>
                </div>
                <div class="p-3 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30">
                  <mat-icon class="text-amber-700 text-lg">terrain</mat-icon>
                  <span class="text-xs text-[#765137]/70 block font-semibold">Hábitat</span>
                  <span class="text-xs font-bold text-[#765137] truncate block">{{ active.habitat }}</span>
                </div>
              </div>

              <!-- Detailed Coat Pattern Description -->
              <div class="p-4 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-[#765137]">
                  <mat-icon class="text-amber-700">texture</mat-icon>
                  <span>Anatomía del Mosaico (Patrón de Manchas)</span>
                </div>
                <p class="text-sm text-[#765137]/90 leading-relaxed">
                  {{ active.patternDescription }}
                </p>
              </div>

              <!-- Geographical Distribution -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm font-bold text-[#765137]">
                  <mat-icon class="text-amber-700">public</mat-icon>
                  <span>Distribución Geográfica y Países</span>
                </div>
                <p class="text-sm text-[#765137]/90">
                  {{ active.distribution }}
                </p>
                <div class="flex flex-wrap gap-1.5 pt-1">
                  @for (country of active.countries; track country) {
                    <span class="px-2.5 py-1 rounded-xl bg-[#FFF1A8] text-[#765137] text-xs font-bold border border-[#F9BE36]/30">
                      📍 {{ country }}
                    </span>
                  }
                </div>
              </div>

              <!-- Curious Fact & Sound Vocalization Simulation -->
              <div class="p-4 rounded-2xl bg-[#FFF1A8] border border-[#F9BE36] space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-[#765137]/70 flex items-center gap-1.5">
                    <mat-icon class="text-amber-800 text-base">auto_awesome</mat-icon>
                    Dato Asombroso
                  </span>
                  
                  <!-- Vocalization Simulator button -->
                  <button
                    type="button"
                    (click)="playGiraffeHum()"
                    class="px-3 py-1 rounded-xl bg-[#FFFDF5] hover:bg-[#FFD54F] text-[#765137] text-xs font-bold border border-[#F9BE36]/50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    title="Escuchar zumbido nocturno de jirafa"
                  >
                    <mat-icon class="text-sm">graphic_eq</mat-icon>
                    <span>Escuchar zumbido</span>
                  </button>
                </div>

                <p class="text-sm text-[#765137] font-medium leading-relaxed">
                  {{ active.curiousFact }}
                </p>
              </div>

              <!-- Modal Footer -->
              <div class="pt-4 border-t border-[#F9BE36]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span class="text-xs text-[#765137]/60 italic">
                  Fuente: Giraffe Conservation Foundation (GCF) & IUCN
                </span>

                <button
                  type="button"
                  (click)="closeSpeciesDetail()"
                  class="px-6 py-2.5 rounded-2xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm transition-colors cursor-pointer"
                >
                  ¡Entendido, volver!
                </button>
              </div>

            </div>
          </div>
        </div>
      }

    </section>
  `
})
export class GiraffesGallery {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly activeSpecies = signal<GiraffeSpecies | null>(null);
  readonly activeViewMode = signal<'photo' | 'svg'>('svg');
  private exploredSpecies = new Set<string>();

  openSpeciesDetail(sp: GiraffeSpecies): void {
    this.soundService.playChime();
    this.activeSpecies.set(sp);
    this.activeViewMode.set('svg');
    this.exploredSpecies.add(sp.id);

    // If user has explored all 4 species, award the "Jirafita de Oro" sticker!
    if (this.exploredSpecies.size >= 4) {
      this.albumService.unlock('gran-zoologo');
    }
  }

  closeSpeciesDetail(): void {
    this.soundService.playPop();
    this.activeSpecies.set(null);
  }

  playGiraffeHum(): void {
    this.soundService.playChime();
  }
}
