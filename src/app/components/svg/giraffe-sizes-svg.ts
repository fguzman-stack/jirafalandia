import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GiraffeCalfSvg } from './giraffe-calf-svg';
import { GiraffeRothschildSvg } from './giraffe-rothschild-svg';
import { GiraffeMasaiSvg } from './giraffe-masai-svg';
import { GiraffeReticulataSvg } from './giraffe-reticulata-svg';

@Component({
  selector: 'app-giraffe-sizes-svg',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GiraffeCalfSvg,
    GiraffeRothschildSvg,
    GiraffeMasaiSvg,
    GiraffeReticulataSvg
  ],
  template: `
<div class="w-full bg-gradient-to-b from-[#FFFDF8] to-[#FBF1DC] rounded-3xl p-6 sm:p-8 border border-[#EFE1C6] shadow-md flex flex-col items-center">
  <div class="text-center mb-6">
    <h3 class="font-heading font-extrabold text-2xl sm:text-3xl text-[#6B4C26]">Todos los Tamaños</h3>
    <p class="text-xs sm:text-sm text-[#AE9060] font-accent">De cría recién nacida a macho adulto dominante</p>
  </div>

  <!-- Scale Comparison Line -->
  <div class="w-full flex items-end justify-between sm:justify-around gap-2 pt-6 pb-2 border-b-2 border-dashed border-[#E2C48D] min-h-[360px] sm:min-h-[440px]">
    
    <!-- XS: Cría (150px) -->
    <div class="flex flex-col items-center group">
      <div class="w-20 sm:w-28 h-36 sm:h-44 transition-transform group-hover:scale-105">
        <app-giraffe-calf-svg />
      </div>
      <div class="mt-2 text-center">
        <span class="block text-xs sm:text-sm font-extrabold text-[#8A6A3B]">XS</span>
        <span class="text-[10px] sm:text-xs text-[#8A6A3B]/70">Cría · 1.8 m</span>
      </div>
    </div>

    <!-- S: Joven / Rothschild (215px) -->
    <div class="flex flex-col items-center group">
      <div class="w-24 sm:w-36 h-48 sm:h-56 transition-transform group-hover:scale-105">
        <app-giraffe-rothschild-svg />
      </div>
      <div class="mt-2 text-center">
        <span class="block text-xs sm:text-sm font-extrabold text-[#8A6A3B]">S</span>
        <span class="text-[10px] sm:text-xs text-[#8A6A3B]/70">Juvenil · 3.2 m</span>
      </div>
    </div>

    <!-- M: Hembra / Masái (290px) -->
    <div class="flex flex-col items-center group">
      <div class="w-28 sm:w-44 h-60 sm:h-72 transition-transform group-hover:scale-105">
        <app-giraffe-masai-svg />
      </div>
      <div class="mt-2 text-center">
        <span class="block text-xs sm:text-sm font-extrabold text-[#8A6A3B]">M</span>
        <span class="text-[10px] sm:text-xs text-[#8A6A3B]/70">Hembra · 4.3 m</span>
      </div>
    </div>

    <!-- L: Macho joven (370px) -->
    <div class="flex flex-col items-center group hidden md:flex">
      <div class="w-36 sm:w-52 h-72 sm:h-84 transition-transform group-hover:scale-105">
        <app-giraffe-reticulata-svg />
      </div>
      <div class="mt-2 text-center">
        <span class="block text-xs sm:text-sm font-extrabold text-[#8A6A3B]">L</span>
        <span class="text-[10px] sm:text-xs text-[#8A6A3B]/70">Adulto · 5.1 m</span>
      </div>
    </div>

    <!-- XL: Macho adulto dominante (470px) -->
    <div class="flex flex-col items-center group">
      <div class="w-36 sm:w-60 h-80 sm:h-96 transition-transform group-hover:scale-105">
        <app-giraffe-reticulata-svg />
      </div>
      <div class="mt-2 text-center">
        <span class="block text-xs sm:text-sm font-extrabold text-[#8A6A3B]">XL</span>
        <span class="text-[10px] sm:text-xs text-[#8A6A3B]/70">Macho Máx · 5.8 m</span>
      </div>
    </div>

  </div>

  <div class="mt-4 text-[11px] text-[#AE9060] italic text-center">
    *Guía proporcional de estaturas naturales desde el suelo de la sabana hasta los osicones.
  </div>
</div>
  `
})
export class GiraffeSizesSvg {}
