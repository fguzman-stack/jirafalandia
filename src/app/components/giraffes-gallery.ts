import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, GiraffeSpecies } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { GiraffeReticulataSvg } from './svg/giraffe-reticulata-svg';
import { GiraffeMasaiSvg } from './svg/giraffe-masai-svg';
import { GiraffeRothschildSvg } from './svg/giraffe-rothschild-svg';
import { GiraffeArt } from './svg/giraffe-art';
import { CoatSwatch } from './svg/coat-swatch';

@Component({
  selector: 'app-giraffes-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    GiraffeReticulataSvg,
    GiraffeMasaiSvg,
    GiraffeRothschildSvg,
    GiraffeArt,
    CoatSwatch
  ],
  template: `
    <section id="jirafas" class="py-24 bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E8] to-[#FFFDF5] relative overflow-hidden">
      <!-- Background subtle decorative ambient elements -->
      <div class="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#FFF1A8]/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#F9BE36]/15 blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-extrabold text-[#765137] shadow-xs">
            <mat-icon class="text-base text-amber-700">pets</mat-icon>
            <span>Taxonomía Moderna &middot; 4 Especies Reconocidas</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            Conoce a las Jirafas
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80 font-medium">
            Durante siglos se creyó que todas las jirafas eran una sola especie. Hoy los estudios genéticos distinguen 4 grandes especies con patrones de pelaje y personalidades únicas.
          </p>
        </div>

        <!-- 4 Distinctive Species Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          @for (sp of data.species; track sp.id) {
            <div 
              class="rounded-3xl border-2 border-[#F9BE36]/40 bg-[#FFFDF8] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-2 hover:border-[#F9BE36]"
            >
              <!-- Photographic Thumbnail with Status badge -->
              <div class="relative h-64 w-full overflow-hidden bg-stone-200">
                <img 
                  [src]="sp.imageUrl" 
                  [alt]="sp.imageAlt"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <!-- Status Badge -->
                <div class="absolute top-3 left-3">
                  <span class="px-3 py-1 rounded-full text-xs font-extrabold border backdrop-blur-md shadow-sm {{ sp.statusColor }}">
                    {{ sp.status }}
                  </span>
                </div>

                <!-- Pattern Type Mini Tag -->
                <div class="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl px-3 py-1.5 text-white text-xs font-semibold flex items-center justify-between border border-white/20">
                  <span class="truncate">{{ sp.patternType }}</span>
                  <mat-icon class="text-sm text-[#FFD54F]">scatter_plot</mat-icon>
                </div>
              </div>

              <!-- Content Body -->
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-xs font-semibold italic text-[#765137]/70">{{ sp.scientificName }}</span>
                    <span class="w-3 h-3 rounded-full" [style.background-color]="sp.accentColor"></span>
                  </div>
                  <h3 class="text-xl font-extrabold text-[#765137] font-heading group-hover:text-[#D97706] transition-colors">
                    {{ sp.commonName }}
                  </h3>
                  <p class="text-xs font-bold text-[#D97706]">{{ sp.tagline }}</p>
                  <p class="text-xs text-[#765137]/80 leading-relaxed italic pt-1 line-clamp-2">
                    "{{ sp.cardQuote }}"
                  </p>
                </div>

                <!-- Pattern visual swatch illustration -->
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30 flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#765137]/20 shadow-xs">
                    <!-- SVG Pattern Swatch -->
                    <app-coat-swatch [pattern]="sp.patternSvgType" />
                  </div>
                  <div class="text-[11px] leading-tight text-[#765137]/80">
                    <span class="font-extrabold text-[#765137] block">Diseño de manchas</span>
                    <span>{{ sp.patternType }}</span>
                  </div>
                </div>

                <!-- CTA Button -->
                <button
                  type="button"
                  (click)="openSpeciesDetail(sp)"
                  class="w-full py-3 px-4 rounded-2xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer transform group-hover:scale-[1.02] active:scale-[0.98]"
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
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-md animate-fade-in">
          <div 
            class="bg-[#FFFDF8] border-3 border-[#F9BE36] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
            role="dialog"
            aria-modal="true"
          >
            <!-- Close Button -->
            <button
              type="button"
              (click)="closeSpeciesDetail()"
              class="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-[#FFFDF5]/90 hover:bg-[#FFF1A8] text-[#765137] border-2 border-[#F9BE36] flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-110 active:scale-95"
              aria-label="Cerrar ficha"
            >
              <mat-icon>close</mat-icon>
            </button>

            <!-- Mode Switcher Tabs in Modal Header -->
            <div class="relative bg-stone-100 border-b border-[#F9BE36]/30">
              <div class="flex items-center justify-start gap-2.5 p-3.5 bg-[#FFF9E8]">
                <button
                  type="button"
                  (click)="activeViewMode.set('photo')"
                  [class]="activeViewMode() === 'photo' ? 'bg-[#F9BE36] text-[#765137] shadow-md ring-2 ring-[#765137]/20 font-extrabold' : 'bg-white text-[#765137]/80 hover:bg-[#FFF1A8] font-bold'"
                  class="px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <mat-icon class="text-sm">photo</mat-icon>
                  <span>Fotografía Real</span>
                </button>
                <button
                  type="button"
                  (click)="activeViewMode.set('svg')"
                  [class]="activeViewMode() === 'svg' ? 'bg-[#F9BE36] text-[#765137] shadow-md ring-2 ring-[#765137]/20 font-extrabold' : 'bg-white text-[#765137]/80 hover:bg-[#FFF1A8] font-bold'"
                  class="px-4 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <mat-icon class="text-sm">brush</mat-icon>
                  <span>Modelo Vectorial SVG</span>
                </button>
              </div>

              <!-- Hero Image / SVG view -->
              @if (activeViewMode() === 'photo') {
                <div class="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-300">
                  <img 
                    [src]="active.imageUrl" 
                    [alt]="active.imageAlt"
                    class="w-full h-full object-cover"
                    referrerpolicy="no-referrer"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#FFFDF8] via-transparent to-black/40"></div>
                  
                  <div class="absolute bottom-5 left-6 right-6">
                    <span class="px-3.5 py-1 rounded-full text-xs font-extrabold border backdrop-blur-md shadow-md {{ active.statusColor }}">
                      Estado: {{ active.status }}
                    </span>
                    <h3 class="text-2xl sm:text-4xl font-extrabold text-[#765137] font-heading mt-2">
                      {{ active.commonName }}
                    </h3>
                    <span class="text-sm font-bold italic text-[#765137]/90">{{ active.scientificName }}</span>
                  </div>
                </div>
              } @else {
                <!-- SVG Model View -->
                <div class="relative h-80 sm:h-96 w-full overflow-hidden bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] flex items-center justify-center p-6">
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
                        <svg viewBox="25 20 330 465" class="w-full h-full" role="img" aria-label="Jirafa del sur con manchas marrones hasta las patas"><g app-giraffe-art coat="southern" /></svg>
                      }
                    }
                  </div>
                  <div class="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-xs text-[#765137] border border-[#F9BE36]/40 shadow-xs">
                    <span class="font-bold flex items-center gap-1.5"><mat-icon class="text-xs text-amber-700">zoom_in</mat-icon> Anatomía de alta definición</span>
                    <span class="text-[#D97706] font-semibold italic">Silueta de proporciones reales</span>
                  </div>
                </div>
              }
            </div>

            <!-- Modal Body Content -->
            <div class="p-6 sm:p-8 space-y-6">
              
              <!-- Quote / Tagline Banner -->
              <div class="p-4 rounded-2xl bg-[#FFF1A8]/60 border border-[#F9BE36] text-[#765137] text-sm sm:text-base font-medium flex items-start gap-3.5 shadow-2xs">
                <span class="text-2xl">🦒</span>
                <div>
                  <span class="font-extrabold block text-base">{{ active.tagline }}</span>
                  <span class="italic text-[#765137]/85">"{{ active.cardQuote }}"</span>
                </div>
              </div>

              <!-- Quick Facts Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 shadow-xs">
                  <div class="w-8 h-8 rounded-full bg-[#FFF1A8] mx-auto flex items-center justify-center mb-1 text-amber-800">
                    <mat-icon class="text-base">height</mat-icon>
                  </div>
                  <span class="text-xs text-[#765137]/70 block font-bold">Altura</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.height }}</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 shadow-xs">
                  <div class="w-8 h-8 rounded-full bg-[#FFF1A8] mx-auto flex items-center justify-center mb-1 text-amber-800">
                    <mat-icon class="text-base">fitness_center</mat-icon>
                  </div>
                  <span class="text-xs text-[#765137]/70 block font-bold">Peso</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.weight }}</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 shadow-xs">
                  <div class="w-8 h-8 rounded-full bg-[#FFF1A8] mx-auto flex items-center justify-center mb-1 text-amber-800">
                    <mat-icon class="text-base">hourglass_bottom</mat-icon>
                  </div>
                  <span class="text-xs text-[#765137]/70 block font-bold">Longevidad</span>
                  <span class="text-sm font-extrabold text-[#765137]">{{ active.lifespan }}</span>
                </div>
                <div class="p-3.5 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/40 shadow-xs">
                  <div class="w-8 h-8 rounded-full bg-[#FFF1A8] mx-auto flex items-center justify-center mb-1 text-amber-800">
                    <mat-icon class="text-base">terrain</mat-icon>
                  </div>
                  <span class="text-xs text-[#765137]/70 block font-bold">Hábitat</span>
                  <span class="text-xs font-extrabold text-[#765137] truncate block">{{ active.habitat }}</span>
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
