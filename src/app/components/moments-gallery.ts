import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData } from '../services/giraffe-data';
import { Sound } from '../services/sound';

@Component({
  selector: 'app-moments-gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <section id="momentos" class="py-20 bg-[#FFFDF5] relative overflow-hidden">
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#765137]">
            <mat-icon class="text-base text-amber-700">photo_library</mat-icon>
            <span>Safari Visual &middot; Galería Editorial</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#765137] font-heading tracking-tight">
            Momentos Bonitos
          </h2>

          <p class="text-base sm:text-lg text-[#765137]/80">
            Escenas íntimas y serenas de la vida en la sabana. Toca cualquier fotografía para apreciarla en detalle y contemplar la calma de estos gigantes gentiles.
          </p>
        </div>

        <!-- Asymmetric Editorial Photo Gallery Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (photo of data.moments; track photo.id; let i = $index) {
            <button 
              type="button"
              (click)="openLightbox(i)"
              (keydown.enter)="openLightbox(i)"
              [attr.aria-label]="'Ver fotografía ampliada: ' + photo.title"
              class="group relative rounded-3xl overflow-hidden border-2 border-[#F9BE36]/40 bg-[#FFF9E8] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 text-left focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#F9BE36]"
              [class.sm:col-span-2]="i === 0 || i === 5"
              [class.h-80]="i !== 0 && i !== 5"
              [class.h-96]="i === 0 || i === 5"
            >
              <!-- Photo Image -->
              <img 
                [src]="photo.imageUrl" 
                [alt]="photo.alt"
                loading="lazy"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              <!-- Gradient overlay & caption -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity flex flex-col justify-between p-6">
                <!-- Top Tag -->
                <div class="flex justify-between items-start">
                  <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                    {{ photo.tag }}
                  </span>
                  <div class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <mat-icon class="text-base">zoom_in</mat-icon>
                  </div>
                </div>

                <!-- Bottom Text -->
                <div class="space-y-1 text-white">
                  <h3 class="text-xl sm:text-2xl font-bold font-heading drop-shadow-sm">
                    {{ photo.title }}
                  </h3>
                  <p class="text-xs sm:text-sm text-white/90 drop-shadow-xs line-clamp-2">
                    {{ photo.caption }}
                  </p>
                  <span class="text-[11px] text-[#FFD54F] font-semibold block pt-1">
                    📍 {{ photo.location }}
                  </span>
                </div>
              </div>

            </button>
          }
        </div>

      </div>

      <!-- Lightbox Modal for Full View -->
      @if (activePhotoIndex() !== null) {
        @let current = data.moments[activePhotoIndex()!];
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          
          <!-- Close Button -->
          <button
            type="button"
            (click)="closeLightbox()"
            class="absolute top-4 right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Cerrar imagen"
          >
            <mat-icon class="text-2xl">close</mat-icon>
          </button>

          <!-- Prev Button -->
          <button
            type="button"
            (click)="prevPhoto($event)"
            class="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Foto anterior"
          >
            <mat-icon class="text-2xl">arrow_back</mat-icon>
          </button>

          <!-- Next Button -->
          <button
            type="button"
            (click)="nextPhoto($event)"
            class="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Foto siguiente"
          >
            <mat-icon class="text-2xl">arrow_forward</mat-icon>
          </button>

          <!-- Image Container & Captions -->
          <div class="max-w-4xl w-full max-h-[85vh] bg-[#FFF9E8] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div class="relative flex-1 min-h-[350px] max-h-[60vh] bg-stone-900">
              <img 
                [src]="current.imageUrl" 
                [alt]="current.alt"
                class="w-full h-full object-contain"
                referrerpolicy="no-referrer"
              />
            </div>
            
            <div class="p-6 bg-[#FFFDF5] border-t border-[#F9BE36]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="space-y-1">
                <span class="text-xs font-bold text-[#D97706] uppercase tracking-wider">{{ current.tag }} &middot; {{ current.location }}</span>
                <h4 class="text-2xl font-extrabold text-[#765137] font-heading">{{ current.title }}</h4>
                <p class="text-sm text-[#765137]/80">{{ current.caption }}</p>
              </div>

              <div class="text-xs text-[#765137]/60 shrink-0 italic">
                {{ current.attribution }}
              </div>
            </div>
          </div>

        </div>
      }

    </section>
  `
})
export class MomentsGallery {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);

  readonly activePhotoIndex = signal<number | null>(null);

  openLightbox(index: number): void {
    this.soundService.playPop();
    this.activePhotoIndex.set(index);
  }

  closeLightbox(): void {
    this.soundService.playPop();
    this.activePhotoIndex.set(null);
  }

  prevPhoto(e: Event): void {
    e.stopPropagation();
    this.soundService.playPop();
    const current = this.activePhotoIndex();
    if (current === null) return;
    const prev = current === 0 ? this.data.moments.length - 1 : current - 1;
    this.activePhotoIndex.set(prev);
  }

  nextPhoto(e: Event): void {
    e.stopPropagation();
    this.soundService.playPop();
    const current = this.activePhotoIndex();
    if (current === null) return;
    const next = (current + 1) % this.data.moments.length;
    this.activePhotoIndex.set(next);
  }
}
