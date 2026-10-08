import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

@InjectableNav()
@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-40 bg-[#FFF9E8]/95 backdrop-blur-md border-b border-[#F9BE36]/30 shadow-xs transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <!-- Brand Logo -->
        <a href="#inicio" class="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F9BE36] rounded-xl px-2 py-1">
          <!-- Animated mini giraffe logo icon -->
          <div class="w-12 h-12 rounded-2xl bg-[#FFF1A8] border-2 border-[#F9BE36] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-200 overflow-hidden relative">
            <svg class="w-9 h-9" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Mini giraffe illustration -->
              <path d="M48 95 L48 45 Q48 35 55 30 L62 25 L68 35 L60 48 L60 95 Z" fill="#F9BE36"/>
              <!-- Head -->
              <ellipse cx="66" cy="24" rx="14" ry="11" fill="#F9BE36"/>
              <!-- Snout -->
              <ellipse cx="76" cy="27" rx="8" ry="6" fill="#FFC6A5"/>
              <!-- Nostril -->
              <circle cx="78" cy="26" r="1.5" fill="#765137"/>
              <!-- Eye -->
              <circle cx="67" cy="21" r="3" fill="#765137"/>
              <circle cx="68" cy="20" r="1" fill="#FFFFFF"/>
              <!-- Horns (Ossicones) -->
              <path d="M60 17 L57 10" stroke="#765137" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="56" cy="9" r="2.5" fill="#765137"/>
              <path d="M64 16 L63 9" stroke="#765137" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="62" cy="8" r="2.5" fill="#765137"/>
              <!-- Ear -->
              <path d="M54 22 Q46 20 50 15 Q55 17 56 22 Z" fill="#F9BE36" stroke="#765137" stroke-width="1"/>
              <!-- Spots -->
              <rect x="51" y="52" width="7" height="6" rx="2" fill="#765137" opacity="0.8"/>
              <rect x="53" y="65" width="6" height="7" rx="2" fill="#765137" opacity="0.8"/>
              <rect x="50" y="78" width="8" height="6" rx="2" fill="#765137" opacity="0.8"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="text-2xl font-extrabold text-[#765137] tracking-tight leading-none font-heading flex items-center gap-1.5">
              Jirafalandia
              <span class="inline-block text-xs font-semibold px-2 py-0.5 bg-[#FFD54F] text-[#765137] rounded-full">Safari 🦒</span>
            </span>
            <span class="text-xs text-[#765137]/70 font-medium tracking-wide">A la altura de tu curiosidad</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1 xl:gap-2">
          <a href="#inicio" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Inicio
          </a>
          <a href="#mapa" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Mapa Safari
          </a>
          <a href="#jirafas" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Las Jirafas
          </a>
          <a href="#coleccion-svg" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors flex items-center gap-1">
            <span>Colección SVG</span>
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          </a>
          <a href="#donde-viven" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Dónde Viven
          </a>
          <a href="#juegos" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Jugar
          </a>
          <a href="#momentos" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Momentos
          </a>
          <a href="#curiosidades" (click)="onNavClick()" class="px-3 py-2 text-sm font-bold text-[#765137] hover:text-[#D97706] hover:bg-[#FFF1A8]/50 rounded-xl transition-colors">
            Curiosidades
          </a>
        </nav>

        <!-- Action Controls: Audio + Sticker Album Modal trigger + Mobile Menu Toggle -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Audio Toggle -->
          <button 
            type="button" 
            (click)="soundService.toggleSound()"
            [title]="soundService.isMuted() ? 'Activar sonido de safari' : 'Silenciar sonido'"
            class="p-2.5 rounded-xl border border-[#F9BE36]/40 bg-[#FFFDF5] hover:bg-[#FFF1A8] text-[#765137] transition-all flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F9BE36] shadow-2xs cursor-pointer"
            aria-label="Control de sonido"
          >
            <mat-icon class="text-xl">
              {{ soundService.isMuted() ? 'volume_off' : 'volume_up' }}
            </mat-icon>
          </button>

          <!-- Sticker Album Button -->
          <button
            type="button"
            (click)="openAlbum()"
            class="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-bold text-sm shadow-xs border border-[#F9BE36] transition-all transform active:scale-95 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#765137]"
            title="Ver Álbum de Pegatinas"
          >
            <mat-icon class="text-lg">stars</mat-icon>
            <span class="hidden sm:inline">Álbum</span>
            <span class="px-1.5 py-0.5 text-xs bg-[#FFFDF5] text-[#765137] rounded-full font-extrabold shadow-2xs">
              {{ albumService.unlockedCount() }}/{{ albumService.totalCount() }}
            </span>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
            class="lg:hidden p-2.5 rounded-xl border border-[#F9BE36]/40 bg-[#FFFDF5] text-[#765137] hover:bg-[#FFF1A8] transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Menú principal"
          >
            <mat-icon>{{ isMobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden border-t border-[#F9BE36]/30 bg-[#FFF9E8] px-4 pt-3 pb-6 shadow-lg transition-all animate-fade-in">
          <nav class="flex flex-col gap-1.5">
            <a 
              href="#inicio" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-amber-600">home</mat-icon> Inicio</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#mapa" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-emerald-600">map</mat-icon> Mapa Safari</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#jirafas" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-amber-700">pets</mat-icon> Las Jirafas</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#coleccion-svg" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-amber-500">brush</mat-icon> Colección SVG</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#donde-viven" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-orange-600">public</mat-icon> Dónde Viven</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#juegos" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-rose-600">sports_esports</mat-icon> Jugar y Aprender</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#momentos" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-indigo-600">photo_library</mat-icon> Momentos Bonitos</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
            <a 
              href="#curiosidades" 
              (click)="closeMobileMenu()" 
              class="px-4 py-2.5 rounded-xl font-bold text-[#765137] hover:bg-[#FFF1A8] flex items-center justify-between"
            >
              <span class="flex items-center gap-2.5"><mat-icon class="text-teal-600">lightbulb</mat-icon> Curiosidades</span>
              <mat-icon class="text-sm opacity-50">chevron_right</mat-icon>
            </a>
          </nav>
        </div>
      }
    </header>
  `
})
export class Navbar {
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);
  readonly isMobileMenuOpen = signal<boolean>(false);

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.soundService.playPop();
  }

  onNavClick(): void {
    this.soundService.playPop();
  }

  openAlbum(): void {
    this.soundService.playChime();
    // Dispatch an event or trigger the album modal state in App component
    window.dispatchEvent(new CustomEvent('open-album-modal'));
  }
}

function InjectableNav(): ClassDecorator {
  return (target) => target;
}
