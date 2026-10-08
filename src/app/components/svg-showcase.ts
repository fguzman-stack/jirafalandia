import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeReticulataSvg } from './svg/giraffe-reticulata-svg';
import { GiraffeMasaiSvg } from './svg/giraffe-masai-svg';
import { GiraffeRothschildSvg } from './svg/giraffe-rothschild-svg';
import { GiraffeCalfSvg } from './svg/giraffe-calf-svg';
import { GiraffePortraitSvg } from './svg/giraffe-portrait-svg';
import { GiraffeSizesSvg } from './svg/giraffe-sizes-svg';
import { GiraffePatternsSvg } from './svg/giraffe-patterns-svg';
import { SunsetSavannaSvg } from './svg/sunset-savanna-svg';
import { SavannaPanoramaSvg } from './svg/savanna-panorama-svg';

@Component({
  selector: 'app-svg-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    GiraffeReticulataSvg,
    GiraffeMasaiSvg,
    GiraffeRothschildSvg,
    GiraffeCalfSvg,
    GiraffePortraitSvg,
    GiraffeSizesSvg,
    GiraffePatternsSvg,
    SunsetSavannaSvg,
    SavannaPanoramaSvg
  ],
  template: `
    <section id="coleccion-svg" class="py-20 bg-[#FBF4E6] relative overflow-hidden border-t-2 border-b-2 border-[#EFE1C6]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1A8] border border-[#F9BE36] text-xs sm:text-sm font-bold text-[#5B4222]">
            <mat-icon class="text-base text-[#D97706]">brush</mat-icon>
            <span>Colección Vectorial 100% SVG Auténtica</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-extrabold text-[#4A3017] font-heading tracking-tight">
            Colección de Jirafas
          </h2>

          <p class="text-base sm:text-lg text-[#A0835A] font-accent">
            Ilustración vectorial &middot; pelaje generado por teselación geométrica &middot; 100% SVG nativo sin dependencias externas
          </p>
        </div>

        <!-- Big Hero Savanna Panorama -->
        <div class="w-full">
          <app-savanna-panorama-svg />
        </div>

        <!-- 4 Character Cards + Portrait Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <!-- Card 1: Reticulada -->
          <div class="bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] border border-[#EFE1C6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:-translate-y-1">
            <h3 class="font-heading font-extrabold text-xl text-[#6B4C26] text-center">Jirafa Reticulada</h3>
            <p class="text-xs text-[#AE9060] font-medium text-center mb-4">Placas poligonales separadas por red crema</p>
            <div class="w-full h-[400px] flex items-center justify-center">
              <app-giraffe-reticulata-svg />
            </div>
          </div>

          <!-- Card 2: Masái -->
          <div class="bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] border border-[#EFE1C6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:-translate-y-1">
            <h3 class="font-heading font-extrabold text-xl text-[#6B4C26] text-center">Jirafa Masái</h3>
            <p class="text-xs text-[#AE9060] font-medium text-center mb-4">Manchas dentadas, tono dorado</p>
            <div class="w-full h-[400px] flex items-center justify-center">
              <app-giraffe-masai-svg />
            </div>
          </div>

          <!-- Card 3: Rothschild / Del Norte -->
          <div class="bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] border border-[#EFE1C6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:-translate-y-1">
            <h3 class="font-heading font-extrabold text-xl text-[#6B4C26] text-center">Jirafa de Rothschild</h3>
            <p class="text-xs text-[#AE9060] font-medium text-center mb-4">Parches claros y patas casi blancas</p>
            <div class="w-full h-[400px] flex items-center justify-center transform scale-x-[-1]">
              <app-giraffe-rothschild-svg />
            </div>
          </div>

          <!-- Card 4: Cría -->
          <div class="bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] border border-[#EFE1C6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:-translate-y-1">
            <h3 class="font-heading font-extrabold text-xl text-[#6B4C26] text-center">Cría</h3>
            <p class="text-xs text-[#AE9060] font-medium text-center mb-4">Cabeza grande, cuello corto, patas largas</p>
            <div class="w-full h-[400px] flex items-center justify-center">
              <app-giraffe-calf-svg />
            </div>
          </div>

          <!-- Card 5: Retrato merendando acacia -->
          <div class="bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] border border-[#EFE1C6] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center group hover:-translate-y-1 md:col-span-2 lg:col-span-2">
            <h3 class="font-heading font-extrabold text-xl text-[#6B4C26] text-center">Retrato</h3>
            <p class="text-xs text-[#AE9060] font-medium text-center mb-4">Merendando hojas frescas de acacia</p>
            <div class="w-full">
              <app-giraffe-portrait-svg />
            </div>
          </div>

        </div>

        <!-- Section: Todos los tamaños -->
        <div class="w-full">
          <app-giraffe-sizes-svg />
        </div>

        <!-- Section: Siluetas al atardecer -->
        <div class="w-full space-y-3">
          <div class="text-center">
            <h3 class="font-heading font-extrabold text-2xl text-[#6B4C26]">Siluetas al Atardecer</h3>
            <p class="text-xs text-[#AE9060]">Crepúsculo en la sabana con tonos púrpura y siluetas al contraluz</p>
          </div>
          <app-sunset-savanna-svg />
        </div>

        <!-- Section: Estampados y Texturas -->
        <div class="w-full space-y-3">
          <div class="text-center">
            <h3 class="font-heading font-extrabold text-2xl text-[#6B4C26]">Estampados</h3>
            <p class="text-xs text-[#AE9060]">Texturas vectoriales listas para fondos, pelajes y textiles</p>
          </div>
          <app-giraffe-patterns-svg />
        </div>

      </div>
    </section>
  `
})
export class SvgShowcase {}
