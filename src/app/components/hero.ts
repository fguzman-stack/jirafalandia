import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
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
              (keydown.enter)="onGiraffeClick()"
              class="w-full max-w-md h-[460px] sm:h-[500px] relative rounded-3xl bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E8] to-[#FFF1A8] border-3 border-[#F9BE36]/60 shadow-xl overflow-hidden cursor-pointer group select-none transition-transform hover:scale-[1.01] text-left focus:outline-hidden focus-visible:ring-4 focus-visible:ring-[#F9BE36]"
              title="¡Haz clic en Luna para saludarla!"
              aria-label="Interactuar con Luna la jirafa"
            >
              <!-- Sun ray backdrop in frame -->
              <div class="absolute top-8 right-8 w-28 h-28 rounded-full bg-[#FFD54F]/30 blur-xl pointer-events-none"></div>
              
              <!-- Subtle Acacia branch overhang -->
              <div class="absolute top-0 right-0 w-36 h-28 pointer-events-none opacity-80">
                <svg viewBox="0 0 120 100" fill="none">
                  <path d="M120 0 Q80 20 50 35 Q30 45 10 50" stroke="#765137" stroke-width="4" stroke-linecap="round"/>
                  <!-- Acacia leaves clusters -->
                  <ellipse cx="60" cy="25" rx="14" ry="7" fill="#557A55" transform="rotate(-15 60 25)"/>
                  <ellipse cx="40" cy="35" rx="15" ry="8" fill="#A7C99A" transform="rotate(10 40 35)"/>
                  <ellipse cx="20" cy="45" rx="12" ry="6" fill="#557A55" transform="rotate(-5 20 45)"/>
                  <ellipse cx="75" cy="18" rx="16" ry="8" fill="#557A55" transform="rotate(20 75 18)"/>
                </svg>
              </div>

              <!-- Interactive Giraffe SVG -->
              <div class="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
                <svg 
                  viewBox="0 0 360 480" 
                  class="w-full h-full max-h-[460px] transition-transform duration-300 group-hover:scale-102"
                >
                  <!-- Ground Savannah Mound -->
                  <ellipse cx="180" cy="470" rx="160" ry="30" fill="#A7C99A" opacity="0.6"/>
                  <ellipse cx="180" cy="475" rx="130" ry="20" fill="#557A55" opacity="0.4"/>

                  <!-- Giraffe Body & Shoulders -->
                  <path 
                    d="M100 480 C110 390 130 340 160 320 C180 320 200 340 220 390 C230 430 240 480 240 480 Z" 
                    fill="#F9BE36"
                  />
                  <!-- Chest Pattern Spots -->
                  <rect x="150" y="360" width="24" height="20" rx="8" fill="#765137" opacity="0.85"/>
                  <rect x="185" y="380" width="22" height="24" rx="7" fill="#765137" opacity="0.85"/>
                  <rect x="135" y="410" width="20" height="22" rx="7" fill="#765137" opacity="0.85"/>
                  <rect x="175" y="425" width="28" height="20" rx="8" fill="#765137" opacity="0.85"/>

                  <!-- Long Elegant Neck -->
                  <path 
                    d="M160 330 C162 250 166 180 170 120 L210 120 C214 180 218 250 220 330 Z" 
                    fill="#F9BE36"
                  />
                  
                  <!-- Neck spots -->
                  <rect x="172" y="140" width="18" height="20" rx="6" fill="#765137" opacity="0.85"/>
                  <rect x="176" y="175" width="22" height="22" rx="7" fill="#765137" opacity="0.85"/>
                  <rect x="171" y="215" width="20" height="24" rx="7" fill="#765137" opacity="0.85"/>
                  <rect x="180" y="255" width="24" height="22" rx="7" fill="#765137" opacity="0.85"/>
                  <rect x="168" y="290" width="22" height="22" rx="7" fill="#765137" opacity="0.85"/>

                  <!-- Mane along neck back -->
                  <path 
                    d="M165 120 C162 170 160 230 158 310" 
                    stroke="#765137" 
                    stroke-width="5" 
                    stroke-dasharray="6,4"
                  />

                  <!-- Head (Tiltable with mouse interaction) -->
                  <g [attr.transform]="'rotate(' + headAngle() + ', 190, 110)'">
                    
                    <!-- Ears (Left & Right with twitch animation) -->
                    <g class="animate-ear">
                      <path d="M142 85 C122 75 125 58 145 72 Z" fill="#F9BE36" stroke="#765137" stroke-width="1.5"/>
                      <path d="M140 82 C127 75 129 64 142 74 Z" fill="#FFC6A5"/>
                    </g>
                    <g class="animate-ear" style="animation-delay: 0.8s;">
                      <path d="M238 85 C258 75 255 58 235 72 Z" fill="#F9BE36" stroke="#765137" stroke-width="1.5"/>
                      <path d="M240 82 C253 75 251 64 238 74 Z" fill="#FFC6A5"/>
                    </g>

                    <!-- Ossicones (Horns with rounded tufts) -->
                    <!-- Left horn -->
                    <path d="M174 72 L168 40" stroke="#765137" stroke-width="5" stroke-linecap="round"/>
                    <circle cx="167" cy="38" r="7" fill="#765137"/>
                    <circle cx="166" cy="36" r="2" fill="#F9BE36"/>
                    <!-- Right horn -->
                    <path d="M206 72 L212 40" stroke="#765137" stroke-width="5" stroke-linecap="round"/>
                    <circle cx="213" cy="38" r="7" fill="#765137"/>
                    <circle cx="214" cy="36" r="2" fill="#F9BE36"/>

                    <!-- Main Head Shape -->
                    <path 
                      d="M155 90 C155 72 225 72 225 90 C225 105 215 120 205 130 C195 138 185 138 175 130 C165 120 155 105 155 90 Z" 
                      fill="#F9BE36" 
                      stroke="#765137" 
                      stroke-width="1"
                    />

                    <!-- Soft Cheeks -->
                    <circle cx="163" cy="102" r="7" fill="#FFC6A5" opacity="0.6"/>
                    <circle cx="217" cy="102" r="7" fill="#FFC6A5" opacity="0.6"/>

                    <!-- Snout & Mouth Area -->
                    <ellipse cx="190" cy="128" rx="22" ry="16" fill="#FFC6A5"/>
                    <!-- Nostrils -->
                    <ellipse cx="182" cy="124" rx="2.5" ry="3.5" fill="#765137"/>
                    <ellipse cx="198" cy="124" rx="2.5" ry="3.5" fill="#765137"/>
                    <!-- Friendly smiling mouth -->
                    <path d="M182 135 Q190 142 198 135" stroke="#765137" stroke-width="2.5" stroke-linecap="round" fill="none"/>

                    <!-- Left Eye + Interactive Pupil -->
                    <ellipse cx="172" cy="88" rx="8" ry="9" fill="#FFFDF5" stroke="#765137" stroke-width="1"/>
                    <g [attr.transform]="'translate(' + pupilX() + ', ' + pupilY() + ')'">
                      <circle cx="172" cy="88" r="5" fill="#765137"/>
                      <circle cx="174" cy="86" r="1.8" fill="#FFFFFF"/>
                    </g>
                    <!-- Eyelash -->
                    <path d="M165 82 Q172 79 179 82" stroke="#765137" stroke-width="2" stroke-linecap="round" fill="none"/>

                    <!-- Right Eye + Interactive Pupil -->
                    <ellipse cx="208" cy="88" rx="8" ry="9" fill="#FFFDF5" stroke="#765137" stroke-width="1"/>
                    <g [attr.transform]="'translate(' + pupilX() + ', ' + pupilY() + ')'">
                      <circle cx="208" cy="88" r="5" fill="#765137"/>
                      <circle cx="210" cy="86" r="1.8" fill="#FFFFFF"/>
                    </g>
                    <!-- Eyelash -->
                    <path d="M201 82 Q208 79 215 82" stroke="#765137" stroke-width="2" stroke-linecap="round" fill="none"/>

                  </g>
                </svg>
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
