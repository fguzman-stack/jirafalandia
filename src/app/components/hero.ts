import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { GiraffePortraitSvg } from './svg/giraffe-portrait-svg';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, GiraffePortraitSvg],
  template: `
    <section 
      id="inicio"
      (mousemove)="onMouseMove($event)"
      class="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF1A8] via-[#FFF9E8] to-[#FFF9E8]"
    >
      <!-- Sun background illumination -->
      <div class="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-[#FFD54F]/40 blur-3xl pointer-events-none"></div>
      <div class="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-[#FFF1A8]/60 blur-2xl pointer-events-none"></div>

      <!-- Floating Animated Clouds -->
      <div class="absolute top-24 left-10 opacity-70 animate-float pointer-events-none hidden md:block">
        <svg width="140" height="60" viewBox="0 0 140 60" fill="white">
          <ellipse cx="40" cy="40" rx="30" ry="20" fill="white"/>
          <ellipse cx="70" cy="30" rx="35" ry="25" fill="white"/>
          <ellipse cx="105" cy="40" rx="25" ry="18" fill="white"/>
          <rect x="25" y="35" width="90" height="20" rx="10" fill="white"/>
        </svg>
      </div>

      <div class="absolute top-36 right-16 opacity-60 animate-float-delayed pointer-events-none hidden sm:block">
        <svg width="180" height="70" viewBox="0 0 180 70" fill="white">
          <ellipse cx="50" cy="45" rx="35" ry="22" fill="white"/>
          <ellipse cx="95" cy="35" rx="45" ry="30" fill="white"/>
          <ellipse cx="140" cy="45" rx="30" ry="20" fill="white"/>
          <rect x="35" y="40" width="120" height="22" rx="11" fill="white"/>
        </svg>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          <!-- Left Column: Editorial Content & CTAs -->
          <div class="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            <!-- Greeting badge -->
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FFFDF5] border border-[#F9BE36]/50 shadow-2xs">
              <span class="w-2.5 h-2.5 rounded-full bg-[#557A55] animate-ping"></span>
              <span class="text-xs sm:text-sm font-bold text-[#765137] tracking-wide">
                Zoológico Digital &middot; Experiencia Interactiva
              </span>
            </div>

            <!-- Main Heading with high typographic character -->
            <div class="space-y-2">
              <h1 class="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#765137] font-heading tracking-tight leading-[1.1]">
                ¡Hola, explorador! <span class="inline-block transform hover:rotate-12 transition-transform duration-200 origin-bottom">🦒</span>
              </h1>
              <p class="text-xl sm:text-2xl lg:text-3xl font-medium text-[#765137]/90 font-accent max-w-xl">
                Hay un mundo enorme por descubrir. ¿Nos acompañas?
              </p>
            </div>

            <p class="text-base sm:text-lg text-[#765137]/80 max-w-xl leading-relaxed">
              Entra a un safari interactivo diseñado para todas las edades. Explora las 4 especies de jirafas, descubre por qué sus manchas son únicas, aliméntalas con hojas frescas y desvela los secretos de la sabana africana.
            </p>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a 
                href="#mapa" 
                (click)="onExploreClick()"
                class="px-8 py-4 rounded-2xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border-2 border-[#765137]/15 cursor-pointer focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#F9BE36]"
              >
                <span>¡Comenzar aventura!</span>
                <mat-icon class="text-xl">explore</mat-icon>
              </a>

              <a 
                href="#jirafas" 
                (click)="soundService.playPop()"
                class="px-7 py-4 rounded-2xl bg-[#FFFDF5] hover:bg-[#FFF1A8] text-[#765137] font-bold text-base sm:text-lg border-2 border-[#F9BE36]/40 shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#F9BE36]"
              >
                <span>Conoce a las jirafas</span>
                <mat-icon class="text-xl">pets</mat-icon>
              </a>
            </div>

            <!-- Safari Quick Stats / Fun highlight -->
            <div class="pt-4 flex flex-wrap items-center gap-6 text-sm text-[#765137]/80 border-t border-[#F9BE36]/30 w-full">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#A7C99A]/40 flex items-center justify-center text-[#557A55]">
                  <mat-icon class="text-base">verified</mat-icon>
                </div>
                <span>4 especies reconocidas</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#FFD54F]/40 flex items-center justify-center text-[#765137]">
                  <mat-icon class="text-base">sports_esports</mat-icon>
                </div>
                <span>Minijuegos interactivos</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-[#FFC6A5]/50 flex items-center justify-center text-[#765137]">
                  <mat-icon class="text-base">collections_bookmark</mat-icon>
                </div>
                <span>Álbum de pegatinas</span>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive Character (Luna) Illustration -->
          <div class="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            <!-- Speech Bubble from Luna -->
            <div 
              class="relative mb-3 bg-[#FFFDF5] border-2 border-[#F9BE36] px-5 py-3 rounded-2xl shadow-md text-sm sm:text-base font-bold text-[#765137] flex items-center gap-2.5 transition-all duration-300 max-w-xs animate-bounce"
              style="animation-duration: 3s;"
            >
              <span class="text-xl">✨</span>
              <span>{{ currentSpeech() }}</span>
              <!-- Bubble triangle pin pointing down -->
              <div class="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#F9BE36]"></div>
            </div>

            <!-- The Big Interactive Giraffe (Luna) Card Container -->
            <button
              type="button"
              (click)="onGiraffeClick()"
              class="w-full max-w-md h-[460px] sm:h-[500px] relative rounded-3xl bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E8] to-[#FFF1A8] border-3 border-[#F9BE36]/60 shadow-xl overflow-hidden cursor-pointer group select-none transition-transform hover:scale-[1.01] text-left focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#F9BE36]"
              title="¡Haz clic en Luna para saludarla!"
              aria-label="Interactuar con Luna la jirafa"
            >
              <!-- Sun ray backdrop in frame -->
              <div class="absolute top-8 right-8 w-28 h-28 rounded-full bg-[#FFD54F]/30 blur-xl pointer-events-none"></div>
              
              <!-- Interactive Giraffe SVG -->
              <div class="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
                <app-giraffe-portrait-svg style="height: 100%; width: 100%" [tilt]="headAngle()" [gazeX]="pupilX()" [gazeY]="pupilY()" />
              </div>

              <!-- Interactive Badge overlay -->
              <div class="absolute bottom-4 left-4 right-4 bg-[#FFFDF5]/90 backdrop-blur-xs rounded-2xl p-2.5 flex items-center justify-between border border-[#F9BE36]/50 shadow-xs pointer-events-none">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span class="text-xs font-bold text-[#765137]">Luna te está mirando</span>
                </div>
                <span class="text-xs font-bold text-[#D97706] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Tócame <mat-icon class="text-sm">touch_app</mat-icon>
                </span>
              </div>

            </button>

          </div>

        </div>
      </div>

      <!-- Bottom Landscape Transition Wave -->
      <div class="absolute bottom-0 left-0 right-0 h-10 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" class="w-full h-full preserve-3d" preserveAspectRatio="none">
          <path d="M0,40 C320,60 480,20 720,45 C960,70 1200,20 1440,40 L1440,60 L0,60 Z" fill="#FFF9E8"/>
        </svg>
      </div>
    </section>
  `
})
export class Hero {
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly pupilX = signal<number>(0);
  readonly pupilY = signal<number>(0);
  readonly headAngle = signal<number>(0);
  readonly currentSpeech = signal<string>('¡Hola! Soy Luna, ¿exploramos juntos?');

  private speechOptions = [
    '¡Hola! Soy Luna, ¿exploramos juntos?',
    '¡Qué día tan bonito en la sabana!',
    '¡Fíjate en las manchas de mis primas!',
    '¡Me encantan las hojas tiernas de acacia!',
    '¿Sabías que mi lengua mide casi 50 cm?',
    '¡Mira! Puedes desbloquear pegatinas en el mapa.'
  ];
  private speechIdx = 0;

  onMouseMove(e: MouseEvent): void {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates from -1 to 1
    const nx = (clientX / innerWidth) * 2 - 1;
    const ny = (clientY / innerHeight) * 2 - 1;

    // Pupil offset (range -2.5 to 2.5)
    this.pupilX.set(Math.max(-2.5, Math.min(2.5, nx * 2.5)));
    this.pupilY.set(Math.max(-2.5, Math.min(2.5, ny * 2.5)));

    // Gentle head tilt (range -3 to 3 deg)
    this.headAngle.set(Math.max(-3.5, Math.min(3.5, nx * 3.5)));
  }

  onGiraffeClick(): void {
    this.soundService.playChime();
    this.speechIdx = (this.speechIdx + 1) % this.speechOptions.length;
    this.currentSpeech.set(this.speechOptions[this.speechIdx]);
    
    // Unlock "Primer Saludo" sticker in album
    this.albumService.unlock('primer-saludo');
  }

  onExploreClick(): void {
    this.soundService.playPop();
  }
}
