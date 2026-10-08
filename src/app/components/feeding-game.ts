import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { GiraffeArt } from './svg/giraffe-art';
import { AcaciaArt } from './svg/acacia-art';

interface LeafItem {
  id: number;
  label: string;
  x: number;
  y: number;
  eaten: boolean;
}

@Component({
  selector: 'app-feeding-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, GiraffeArt, AcaciaArt],
  template: `
    <div id="alimentar-jirafa" class="bg-[#FFFDF5] border-3 border-[#F9BE36]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F9BE36]/30">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F3E5] text-[#557A55] text-xs font-bold mb-1">
            <mat-icon class="text-sm">eco</mat-icon> Minijuego 1
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-[#765137] font-heading">
            Alimenta a la Jirafa
          </h3>
          <p class="text-xs sm:text-sm text-[#765137]/80">
            Toca o haz clic sobre las hojas frescas de acacia para que Luna las saboree con su lengua prensil.
          </p>
        </div>

        <!-- Feeding Score & Counter -->
        <div class="flex items-center gap-3 bg-[#FFF1A8] px-4 py-2.5 rounded-2xl border border-[#F9BE36]">
          <div class="w-10 h-10 rounded-xl bg-[#FFFDF5] flex items-center justify-center text-amber-700 shadow-2xs font-extrabold text-lg">
            {{ leavesFed() }}
          </div>
          <div class="text-xs text-[#765137]">
            <span class="font-extrabold block">Hojas comidas</span>
            <span class="text-[#765137]/70">Meta: 5 para medalla</span>
          </div>
        </div>
      </div>

      <!-- Feeding Playground Area -->
      <div class="relative w-full h-[360px] sm:h-[400px] rounded-2xl bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E8] to-[#E8F3E5] border border-[#F9BE36]/30 overflow-hidden select-none">
        
        <!-- Background Savannah Sky & Birds -->
        <div class="absolute top-4 left-6 opacity-40">
          <svg width="40" height="15" viewBox="0 0 40 15" fill="none">
            <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="#765137" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>

        <!-- Acacia Tree on the Right side -->
        <div class="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none">
          <svg viewBox="0 0 280 400" class="w-full h-full">
            <g app-acacia-art transform="translate(-35 -20) scale(2.25)" />
          </svg>
        </div>

        <!-- Interactive Leaves placed on the acacia tree branches -->
        @for (leaf of leaves(); track leaf.id) {
          @if (!leaf.eaten) {
            <button
              type="button"
              (click)="feedLeaf(leaf)"
              [style.left.%]="leaf.x"
              [style.top.%]="leaf.y"
              class="absolute z-20 group transform hover:scale-125 active:scale-95 transition-transform duration-200 p-2 cursor-pointer focus:outline-hidden"
              title="¡Toca para dar esta hoja a Luna!"
            >
              <div class="w-10 h-10 rounded-2xl bg-[#A7C99A] group-hover:bg-[#557A55] border-2 border-white shadow-md flex items-center justify-center text-white transition-colors animate-bounce" style="animation-duration: 2.5s;">
                <mat-icon class="text-xl">eco</mat-icon>
              </div>
              <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-[#765137] text-white px-1.5 py-0.2 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Dar hoja
              </span>
            </button>
          }
        }

        <!-- Animated Giraffe on the Left side -->
        <div class="absolute left-4 sm:left-12 bottom-0 w-64 h-full pointer-events-none transition-transform duration-500"
             [class.translate-x-6]="isMunching()"
             [class.rotate-1]="isMunching()">
          <svg viewBox="120 15 250 465" class="w-full h-full" role="img" aria-label="Luna estira el cuello para alcanzar las hojas de acacia">
            <g app-giraffe-art [eating]="isMunching()" [headTilt]="isMunching() ? -4 : 0" />
          </svg>
        </div>

        <!-- Floating hearts & yum bubbles when eating -->
        @if (isMunching()) {
          <div class="absolute left-40 sm:left-64 top-20 flex flex-col items-center gap-1 animate-bounce pointer-events-none">
            <span class="text-3xl text-rose-500">❤️</span>
            <span class="px-2.5 py-1 rounded-full bg-[#FFFDF5] border border-rose-300 text-rose-700 text-xs font-extrabold shadow-sm">
              ¡Ñam ñam, riquísimo!
            </span>
          </div>
        }

        <!-- Bottom reset tree button when all leaves are eaten -->
        @if (allLeavesEaten()) {
          <div class="absolute inset-0 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4 z-30 animate-fade-in">
            <div class="bg-[#FFFDF5] border-2 border-[#F9BE36] rounded-3xl p-6 text-center max-w-sm shadow-xl space-y-4">
              <span class="text-4xl block">🎉</span>
              <h4 class="text-xl font-extrabold text-[#765137] font-heading">
                ¡Banquete completado!
              </h4>
              <p class="text-xs text-[#765137]/80">
                Luna ha devorado todas las hojas de acacia y está super feliz con su pancita llena.
              </p>
              <button
                type="button"
                (click)="resetTree()"
                class="px-6 py-2.5 rounded-xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm shadow-md transition-colors cursor-pointer"
              >
                Hacer brotar más hojas 🍃
              </button>
            </div>
          </div>
        }

      </div>

      <!-- Footer Fun Zoological Tip -->
      <div class="mt-4 p-3 rounded-2xl bg-[#FFF9E8] border border-[#F9BE36]/30 flex items-center gap-2.5 text-xs text-[#765137]/90">
        <mat-icon class="text-amber-700 shrink-0 text-base">info</mat-icon>
        <span>
          <strong>¿Sabías que?</strong> La lengua de la jirafa mide hasta 50 cm y es de color azul negruzco por la melanina para evitar quemaduras solares mientras come durante horas bajo el sol.
        </span>
      </div>

    </div>
  `
})
export class FeedingGame {
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly leavesFed = signal<number>(0);
  readonly isMunching = signal<boolean>(false);

  readonly leaves = signal<LeafItem[]>([
    { id: 1, label: 'Hoja tierna 1', x: 55, y: 18, eaten: false },
    { id: 2, label: 'Hoja tierna 2', x: 68, y: 15, eaten: false },
    { id: 3, label: 'Hoja tierna 3', x: 62, y: 28, eaten: false },
    { id: 4, label: 'Hoja tierna 4', x: 78, y: 22, eaten: false },
    { id: 5, label: 'Hoja tierna 5', x: 72, y: 34, eaten: false },
    { id: 6, label: 'Hoja tierna 6', x: 84, y: 30, eaten: false }
  ]);

  allLeavesEaten(): boolean {
    return this.leaves().every(l => l.eaten);
  }

  feedLeaf(leaf: LeafItem): void {
    if (leaf.eaten) return;

    this.soundService.playMunch();
    this.isMunching.set(true);

    const updated = this.leaves().map(l => 
      l.id === leaf.id ? { ...l, eaten: true } : l
    );
    this.leaves.set(updated);

    const nextCount = this.leavesFed() + 1;
    this.leavesFed.set(nextCount);

    if (nextCount >= 5) {
      // Unlock "Banquete de Hojas" sticker!
      this.albumService.unlock('amante-acacias');
    }

    setTimeout(() => {
      this.isMunching.set(false);
    }, 1200);
  }

  resetTree(): void {
    this.soundService.playPop();
    const fresh = this.leaves().map(l => ({ ...l, eaten: false }));
    this.leaves.set(fresh);
  }
}
