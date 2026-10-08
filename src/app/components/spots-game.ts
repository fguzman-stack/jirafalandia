import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, SpotPatternQuizItem } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

@Component({
  selector: 'app-spots-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="bg-[#FFFDF5] border-3 border-[#F9BE36]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#F9BE36]/30">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] text-xs font-bold mb-1">
            <mat-icon class="text-sm">scatter_plot</mat-icon> Minijuego 2
          </div>
          <h3 class="text-2xl sm:text-3xl font-extrabold text-[#765137] font-heading">
            Descubre las Manchas
          </h3>
          <p class="text-xs sm:text-sm text-[#765137]/80">
            Cada especie de jirafa viste un patrón de pelaje único. ¿Puedes relacionar la textura con la especie correcta?
          </p>
        </div>

        <!-- Score & Round indicator -->
        <div class="flex items-center gap-3 bg-[#FFF1A8] px-4 py-2.5 rounded-2xl border border-[#F9BE36]">
          <div class="w-10 h-10 rounded-xl bg-[#FFFDF5] flex items-center justify-center text-amber-700 shadow-2xs font-extrabold text-base">
            {{ currentIndex() + 1 }}/{{ totalQuestions }}
          </div>
          <div class="text-xs text-[#765137]">
            <span class="font-extrabold block">Aciertos: {{ correctCount() }}</span>
            <span class="text-[#765137]/70">Ronda de detectives</span>
          </div>
        </div>
      </div>

      <!-- Current Question Card -->
      @if (!isFinished()) {
        <div class="space-y-6">
          
          <!-- Central Pattern Inspection Box -->
          <div class="bg-[#FFF9E8] border-2 border-[#F9BE36]/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            
            <!-- Large Illustrated Pattern Tile -->
            <div class="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-3 border-[#765137]/20 shadow-md shrink-0 bg-white">
              @switch (currentQuestion().patternType) {
                @case ('reticulated') {
                  <svg viewBox="0 0 100 100" class="w-full h-full bg-[#FFF9E8]">
                    <!-- Sharp geometric polygons separated by white net -->
                    <polygon points="10,10 42,8 38,42 8,36" fill="#C2410C"/>
                    <polygon points="48,8 90,12 88,44 44,42" fill="#B45309"/>
                    <polygon points="8,48 40,48 36,90 12,88" fill="#9A3412"/>
                    <polygon points="46,48 88,50 85,88 44,88" fill="#C2410C"/>
                    <!-- Crisp white grid separation -->
                    <line x1="0" y1="45" x2="100" y2="45" stroke="#FFFDF5" stroke-width="4"/>
                    <line x1="43" y1="0" x2="43" y2="100" stroke="#FFFDF5" stroke-width="4"/>
                  </svg>
                }
                @case ('masai') {
                  <svg viewBox="0 0 100 100" class="w-full h-full bg-[#FFF9E8]">
                    <!-- Jagged dark oak leaf edges -->
                    <path d="M12 18 L24 8 L38 14 L34 32 L20 38 L14 30 Z" fill="#78350F"/>
                    <path d="M50 12 L72 6 L86 22 L70 38 L54 30 Z" fill="#451A03"/>
                    <path d="M10 54 L32 46 L38 72 L22 84 L6 70 Z" fill="#78350F"/>
                    <path d="M54 52 L82 46 L88 78 L68 86 L50 68 Z" fill="#451A03"/>
                  </svg>
                }
                @case ('northern') {
                  <svg viewBox="0 0 100 100" class="w-full h-full bg-[#FFFDF5]">
                    <!-- Soft rectangles with clean white background below -->
                    <rect x="10" y="10" width="32" height="28" rx="8" fill="#B45309"/>
                    <rect x="52" y="12" width="36" height="30" rx="8" fill="#92400E"/>
                    <!-- Clean white bottom area representing pristine legs -->
                    <rect x="0" y="55" width="100" height="45" fill="#FFFFFF"/>
                    <circle cx="25" cy="70" r="6" fill="#D97706" opacity="0.3"/>
                    <circle cx="75" cy="75" r="7" fill="#B45309" opacity="0.3"/>
                  </svg>
                }
                @case ('southern') {
                  <svg viewBox="0 0 100 100" class="w-full h-full bg-[#FFFDF5]">
                    <!-- Mottled spots extending everywhere -->
                    <ellipse cx="25" cy="22" rx="16" ry="14" fill="#4D7C0F"/>
                    <ellipse cx="70" cy="25" rx="18" ry="14" fill="#365314"/>
                    <ellipse cx="30" cy="65" rx="15" ry="16" fill="#365314"/>
                    <ellipse cx="75" cy="70" rx="14" ry="14" fill="#4D7C0F"/>
                    <circle cx="50" cy="46" r="8" fill="#4D7C0F" opacity="0.8"/>
                  </svg>
                }
              }
            </div>

            <!-- Hint & Description -->
            <div class="space-y-2 text-center md:text-left">
              <span class="text-xs font-bold uppercase tracking-wider text-[#D97706]">Pista del detective:</span>
              <h4 class="text-lg sm:text-xl font-bold text-[#765137] font-heading">
                "{{ currentQuestion().hint }}"
              </h4>
              <p class="text-xs sm:text-sm text-[#765137]/80 leading-relaxed">
                Examina los bordes, el color y la regularidad del dibujo. ¿A cuál de estas 4 jirafas pertenece este pelaje?
              </p>
            </div>

          </div>

          <!-- Answer Options Grid (The 4 species) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            @for (sp of data.species; track sp.id) {
              <button
                type="button"
                [disabled]="selectedAnswer() !== null"
                (click)="checkAnswer(sp.commonName)"
                [class]="getButtonClass(sp.commonName)"
                class="p-4 rounded-2xl border text-left font-bold transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#F9BE36]"
              >
                <div class="flex items-center gap-3">
                  <span class="w-3 h-3 rounded-full" [style.background-color]="sp.accentColor"></span>
                  <span class="text-sm sm:text-base text-[#765137]">{{ sp.commonName }}</span>
                </div>
                <mat-icon class="text-amber-700/60 text-lg">chevron_right</mat-icon>
              </button>
            }
          </div>

          <!-- Feedback message -->
          @if (feedback(); as fb) {
            <div 
              class="p-4 rounded-2xl border flex items-start gap-3 transition-all animate-fade-in"
              [class]="fb.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-amber-50 border-amber-300 text-amber-900'"
            >
              <mat-icon [class]="fb.isCorrect ? 'text-emerald-600' : 'text-amber-600'">
                {{ fb.isCorrect ? 'check_circle' : 'psychology' }}
              </mat-icon>
              <div class="flex-1 text-xs sm:text-sm">
                <span class="font-extrabold block">{{ fb.isCorrect ? '¡Genial! 🌟' : '¡Casi! Fíjate bien 😊' }}</span>
                <span>{{ fb.message }}</span>
              </div>
              <button
                type="button"
                (click)="nextQuestion()"
                class="px-4 py-1.5 rounded-xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] text-xs font-extrabold shrink-0 cursor-pointer shadow-xs"
              >
                {{ currentIndex() + 1 >= totalQuestions ? 'Ver resultado' : 'Siguiente' }}
              </button>
            </div>
          }

        </div>
      } @else {
        <!-- Finished Result Screen -->
        <div class="text-center py-8 space-y-4 animate-fade-in">
          <div class="w-20 h-20 rounded-full bg-[#FFF1A8] border-2 border-[#F9BE36] flex items-center justify-center mx-auto text-4xl shadow-inner">
            🏆
          </div>
          <h4 class="text-2xl font-extrabold text-[#765137] font-heading">
            ¡Investigación Completada!
          </h4>
          <p class="text-sm text-[#765137]/80 max-w-md mx-auto">
            Acertaste <strong>{{ correctCount() }} de {{ totalQuestions }}</strong> patrones de manchas. Ya tienes mirada de experto en safari.
          </p>
          <div class="pt-2">
            <button
              type="button"
              (click)="restartQuiz()"
              class="px-6 py-3 rounded-2xl bg-[#F9BE36] hover:bg-[#FFD54F] text-[#765137] font-extrabold text-sm shadow-md transition-colors cursor-pointer"
            >
              Jugar otra ronda 🔄
            </button>
          </div>
        </div>
      }

    </div>
  `
})
export class SpotsGame {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);

  readonly currentIndex = signal<number>(0);
  readonly correctCount = signal<number>(0);
  readonly isFinished = signal<boolean>(false);
  readonly selectedAnswer = signal<string | null>(null);
  readonly feedback = signal<{ isCorrect: boolean; message: string } | null>(null);

  get totalQuestions(): number {
    return this.data.quizItems.length;
  }

  currentQuestion(): SpotPatternQuizItem {
    return this.data.quizItems[this.currentIndex()];
  }

  checkAnswer(speciesChosen: string): void {
    if (this.selectedAnswer()) return;
    this.selectedAnswer.set(speciesChosen);

    const current = this.currentQuestion();
    const isCorrect = current.speciesName.toLowerCase().includes(speciesChosen.toLowerCase()) || 
                      speciesChosen.toLowerCase().includes(current.speciesName.toLowerCase());

    if (isCorrect) {
      this.soundService.playSuccess();
      this.correctCount.set(this.correctCount() + 1);
      this.feedback.set({
        isCorrect: true,
        message: current.explanation
      });
      // Unlock "Ojo de Detective" sticker!
      this.albumService.unlock('maestro-manchas');
    } else {
      this.soundService.playError();
      this.feedback.set({
        isCorrect: false,
        message: `¡Casi! Esa textura corresponde a la ${current.speciesName}. ` + current.hint
      });
    }
  }

  getButtonClass(speciesName: string): string {
    const selected = this.selectedAnswer();
    if (!selected) {
      return 'bg-[#FFF9E8] hover:bg-[#FFF1A8] border-[#F9BE36]/40';
    }
    if (selected === speciesName) {
      const isCorrect = this.currentQuestion().speciesName.toLowerCase().includes(speciesName.toLowerCase());
      return isCorrect 
        ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs' 
        : 'bg-amber-100 border-amber-400 text-amber-900';
    }
    return 'bg-gray-50 border-gray-200 opacity-60';
  }

  nextQuestion(): void {
    this.soundService.playPop();
    this.selectedAnswer.set(null);
    this.feedback.set(null);

    const nextIdx = this.currentIndex() + 1;
    if (nextIdx >= this.totalQuestions) {
      this.isFinished.set(true);
    } else {
      this.currentIndex.set(nextIdx);
    }
  }

  restartQuiz(): void {
    this.soundService.playPop();
    this.currentIndex.set(0);
    this.correctCount.set(0);
    this.selectedAnswer.set(null);
    this.feedback.set(null);
    this.isFinished.set(false);
  }
}
