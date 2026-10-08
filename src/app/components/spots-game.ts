import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, SpotPatternQuizItem } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { CoatSwatch } from './svg/coat-swatch';

@Component({
  selector: 'app-spots-game',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, CoatSwatch],
  template: `
    <div id="juego-manchas" class="bg-[#FFFDF5] border-3 border-[#F9BE36]/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      
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
              <app-coat-swatch [pattern]="currentQuestion().patternType" />
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
