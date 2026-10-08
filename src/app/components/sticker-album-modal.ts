import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Album } from '../services/album';
import { Sound } from '../services/sound';

@Component({
  selector: 'app-sticker-album-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <!-- Global Sticker Unlock Toast / Alert Notification (shown whenever a badge is unlocked) -->
    @if (albumService.newUnlockAlert(); as alert) {
      <div class="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#FFFDF5] border-3 border-[#F9BE36] rounded-3xl p-4 shadow-2xl flex items-center gap-4 animate-bounce">
        <div class="w-12 h-12 rounded-2xl bg-[#FFF1A8] border border-[#F9BE36] flex items-center justify-center text-amber-700 shrink-0">
          <mat-icon class="text-2xl">{{ alert.icon }}</mat-icon>
        </div>
        <div class="flex-1 min-w-0">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-[#D97706] block">¡Nueva Pegatina Desbloqueada!</span>
          <h4 class="text-sm font-extrabold text-[#765137] truncate">{{ alert.title }}</h4>
          <p class="text-xs text-[#765137]/80 line-clamp-1">{{ alert.description }}</p>
        </div>
        <button
          type="button"
          (click)="albumService.dismissAlert()"
          class="text-[#765137]/60 hover:text-[#765137] p-1 cursor-pointer"
          aria-label="Cerrar aviso"
        >
          <mat-icon class="text-sm">close</mat-icon>
        </button>
      </div>
    }

    <!-- Main Full Sticker Album Modal Dialog -->
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in">
        <div 
          class="bg-[#FFFDF5] border-3 border-[#F9BE36] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6"
          role="dialog"
          aria-modal="true"
        >
          
          <!-- Top bar: Title + Close Button -->
          <div class="flex items-center justify-between pb-4 border-b border-[#F9BE36]/30">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#F9BE36] flex items-center justify-center text-[#765137] shadow-sm">
                <mat-icon class="text-2xl">stars</mat-icon>
              </div>
              <div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-[#765137] font-heading leading-tight">
                  Álbum de Descubrimientos
                </h3>
                <p class="text-xs sm:text-sm text-[#765137]/70 font-accent">
                  Colecciona las 8 pegatinas explorando Jirafalandia
                </p>
              </div>
            </div>

            <button
              type="button"
              (click)="closeModal()"
              class="w-10 h-10 rounded-full bg-[#FFF9E8] hover:bg-[#FFF1A8] text-[#765137] border border-[#F9BE36]/40 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar álbum"
            >
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <!-- Progress Bar & Stats -->
          <div class="bg-[#FFF9E8] rounded-2xl p-4 border border-[#F9BE36]/40 space-y-2">
            <div class="flex items-center justify-between text-xs sm:text-sm font-extrabold text-[#765137]">
              <span>Progreso del safari: {{ albumService.unlockedCount() }} de {{ albumService.totalCount() }} pegatinas</span>
              <span>{{ albumService.progressPercentage() }}%</span>
            </div>
            
            <div class="w-full h-3 rounded-full bg-white border border-[#F9BE36]/30 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-[#F9BE36] to-[#557A55] rounded-full transition-all duration-500"
                [style.width.%]="albumService.progressPercentage()"
              ></div>
            </div>
          </div>

          <!-- Stickers Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            @for (sticker of albumService.stickers(); track sticker.id) {
              <div 
                class="rounded-2xl border-2 p-4 flex flex-col items-center text-center justify-between transition-all duration-300 relative"
                [class]="sticker.unlockedAt 
                  ? 'bg-gradient-to-b from-[#FFFDF5] to-[#FFF1A8]/50 border-[#F9BE36] shadow-sm' 
                  : 'bg-stone-50 border-dashed border-stone-300 opacity-60'"
              >
                <!-- Badge Icon Graphic -->
                <div 
                  class="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 shadow-inner transition-transform group-hover:scale-105"
                  [class]="sticker.unlockedAt 
                    ? 'bg-gradient-to-tr ' + sticker.bgGradient + ' text-[#765137] border-2 border-white' 
                    : 'bg-stone-200 text-stone-400 border border-stone-300'"
                >
                  <mat-icon class="text-3xl">
                    {{ sticker.unlockedAt ? sticker.icon : 'lock' }}
                  </mat-icon>
                </div>

                <div class="space-y-1 mb-2">
                  <h4 class="text-sm font-extrabold text-[#765137]">
                    {{ sticker.title }}
                  </h4>
                  <p class="text-[11px] text-[#765137]/80 leading-snug">
                    {{ sticker.description }}
                  </p>
                </div>

                <!-- Unlocked Date or Locked Tag -->
                <div class="w-full pt-2 border-t border-black/5 text-[10px] font-bold">
                  @if (sticker.unlockedAt) {
                    <span class="text-emerald-700 flex items-center justify-center gap-1">
                      <mat-icon class="text-xs">verified</mat-icon> {{ sticker.unlockedAt }}
                    </span>
                  } @else {
                    <span class="text-stone-400">Por descubrir</span>
                  }
                </div>

              </div>
            }
          </div>

          <!-- Footer Actions: Reset or close -->
          <div class="pt-4 border-t border-[#F9BE36]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#765137]">
            <button
              type="button"
              (click)="confirmReset()"
              class="text-rose-700 hover:text-rose-900 underline font-semibold cursor-pointer"
            >
              Reiniciar progreso del álbum
            </button>

            <button
              type="button"
              (click)="closeModal()"
              class="px-6 py-2.5 rounded-2xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm transition-colors cursor-pointer"
            >
              Cerrar álbum
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class StickerAlbumModal {
  readonly albumService = inject(Album);
  readonly soundService = inject(Sound);

  readonly isOpen = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('open-album-modal', () => {
        this.isOpen.set(true);
      });
    }
  }

  closeModal(): void {
    this.soundService.playPop();
    this.isOpen.set(false);
  }

  confirmReset(): void {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Deseas reiniciar todas tus pegatinas conseguidas?')) {
        this.albumService.resetProgress();
        this.soundService.playPop();
      }
    }
  }
}
