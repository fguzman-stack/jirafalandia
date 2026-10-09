import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../services/sound';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <footer class="relative bg-gradient-to-b from-[#FFFDF5] via-[#FFD54F]/20 to-[#765137] text-[#FFFDF5] pt-24 overflow-hidden">
      
      <!-- Savannah Sunset Silhouette SVG Horizon -->
      <div class="relative w-full h-44 sm:h-60 overflow-hidden pointer-events-none">
        
        <!-- Setting Golden Sun Disk with Radiant Atmosphere Glow -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-t from-[#F59E0B] to-[#FDE047] opacity-80 blur-xl"></div>
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-[#FFF1A8] opacity-90 blur-sm"></div>

        <!-- Twinkling Sunset Stars / Fireflies in Evening Sky -->
        <div class="absolute top-4 left-1/4 w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-ping" style="animation-duration: 3s;"></div>
        <div class="absolute top-10 right-1/3 w-2 h-2 rounded-full bg-[#FFF1A8] opacity-70 animate-pulse" style="animation-duration: 2.2s;"></div>
        <div class="absolute top-6 right-1/5 w-1 h-1 rounded-full bg-white opacity-90 animate-ping" style="animation-duration: 4s;"></div>

        <svg 
          viewBox="0 0 1200 200" 
          class="w-full h-full absolute bottom-0 left-0 right-0 preserve-3d"
          preserveAspectRatio="none"
        >
          <!-- Far hills layer -->
          <path d="M0,150 Q300,100 600,140 Q900,90 1200,130 L1200,200 L0,200 Z" fill="#92400E" opacity="0.4"/>
          <!-- Near terrain layer -->
          <path d="M0,165 Q400,130 800,160 Q1050,145 1200,170 L1200,200 L0,200 Z" fill="#765137"/>

          <!-- Silhouetted Acacia Trees -->
          <!-- Tree Left -->
          <g transform="translate(180, 80) scale(0.8)">
            <path d="M40 90 L35 40 Q25 25 15 20 M35 40 Q45 25 60 15" stroke="#451A03" stroke-width="4" stroke-linecap="round"/>
            <ellipse cx="38" cy="18" rx="46" ry="14" fill="#451A03"/>
            <ellipse cx="38" cy="14" rx="36" ry="10" fill="#451A03"/>
          </g>

          <!-- Tree Center-Right -->
          <g transform="translate(820, 70) scale(0.9)">
            <path d="M50 100 L45 50 Q30 30 15 20 M45 50 Q60 30 80 20" stroke="#451A03" stroke-width="5" stroke-linecap="round"/>
            <ellipse cx="48" cy="20" rx="54" ry="16" fill="#451A03"/>
            <ellipse cx="50" cy="15" rx="42" ry="12" fill="#451A03"/>
          </g>

          <!-- Silhouetted Giraffe Mother & Baby walking toward sunset -->
          <g transform="translate(520, 75) scale(0.65)">
            <!-- Mother Giraffe -->
            <path d="M40 100 L40 50 Q40 25 50 20 L58 14 L66 18 L60 30 L52 45 L52 100 Z" fill="#451A03"/>
            <circle cx="62" cy="16" r="6" fill="#451A03"/>
          </g>
          
          <g transform="translate(575, 110) scale(0.42)">
            <!-- Baby Calf following -->
            <path d="M40 90 L40 45 Q40 25 48 20 L55 15 L62 18 L57 28 L50 40 L50 90 Z" fill="#451A03"/>
            <circle cx="58" cy="17" r="5" fill="#451A03"/>
          </g>
        </svg>
      </div>

      <!-- Footer Content -->
      <div class="bg-[#765137] pb-14 pt-8 relative z-10 border-t border-[#F9BE36]/30 shadow-2xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <!-- Storybook Farewell Message -->
          <div class="text-center space-y-3 max-w-2xl mx-auto">
            <span class="text-4xl block">🦒 ✨ 🌅</span>
            <h3 class="text-2xl sm:text-4xl font-extrabold font-heading text-[#FFFDF5]">
              Gracias por visitar Jirafalandia
            </h3>
            <p class="text-base sm:text-lg text-[#FFFDF5]/90 font-accent italic">
              "Un mundo a la altura de tu curiosidad. ¡Nos vemos en la próxima aventura!"
            </p>
          </div>

          <!-- Links, Scientific Sources & Attributions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/15 text-xs sm:text-sm text-[#FFFDF5]/85">
            
            <div class="space-y-3">
              <h4 class="font-extrabold text-[#FFD54F] uppercase tracking-wider text-xs flex items-center gap-2">
                <mat-icon class="text-base">park</mat-icon> Jirafalandia
              </h4>
              <p class="text-xs leading-relaxed text-[#FFFDF5]/80">
                Un zoológico digital interactivo dedicado al descubrimiento, respeto y conservación de las jirafas africanas.
              </p>
            </div>

            <div class="space-y-3">
              <h4 class="font-extrabold text-[#FFD54F] uppercase tracking-wider text-xs flex items-center gap-2">
                <mat-icon class="text-base">menu_book</mat-icon> Fuentes Zoológicas
              </h4>
              <ul class="space-y-1.5 text-xs">
                <li>&bull; Giraffe Conservation Foundation (GCF)</li>
                <li>&bull; UICN Lista Roja de Especies Amenazadas</li>
                <li>&bull; Taxonomía moderna de 4 especies de jirafa</li>
              </ul>
            </div>

            <div class="space-y-3">
              <h4 class="font-extrabold text-[#FFD54F] uppercase tracking-wider text-xs flex items-center gap-2">
                <mat-icon class="text-base">photo_camera</mat-icon> Fotografía y Recursos
              </h4>
              <p class="text-xs leading-relaxed text-[#FFFDF5]/80">
                Fotografías de fauna salvaje auténticas provenientes de Wikimedia Commons y Unsplash. Ilustraciones y sonidos originales.
              </p>
              <div class="pt-2">
                <a 
                  href="#inicio" 
                  (click)="soundService.playPop()"
                  class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF5]/10 hover:bg-[#FFFDF5]/20 text-[#FFD54F] font-bold text-xs transition-colors border border-white/10"
                >
                  <mat-icon class="text-sm">arrow_upward</mat-icon> Volver al inicio
                </a>
              </div>
            </div>

          </div>

          <!-- Bottom Copyright -->
          <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFDF5]/60 gap-3">
            <span>&copy; Jirafalandia &middot; Zoológico Digital Interactivo. Creado con amor para exploradores de todas las edades.</span>
            <span>Diseño visual cálido &middot; Sin chatbots ni ruidos innecesarios</span>
          </div>

        </div>
      </div>

    </footer>
  `
})
export class Footer {
  readonly soundService = inject(Sound);
}
