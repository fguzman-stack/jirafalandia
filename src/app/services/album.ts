import { Injectable, signal, computed } from '@angular/core';

export interface Sticker {
  id: string;
  title: string;
  description: string;
  category: 'explorador' | 'juegos' | 'secreto' | 'especies';
  icon: string;
  unlockedAt: string | null;
  bgGradient: string;
}

const INITIAL_STICKERS: Sticker[] = [
  {
    id: 'primer-saludo',
    title: 'Primer Saludo',
    description: '¡Conociste a Luna en el inicio de Jirafalandia!',
    category: 'explorador',
    icon: 'sentiment_very_satisfied',
    unlockedAt: null,
    bgGradient: 'from-amber-200 to-yellow-400'
  },
  {
    id: 'amante-acacias',
    title: 'Banquete de Hojas',
    description: 'Alimentaste a la jirafa con 5 o más hojas tiernas de acacia.',
    category: 'juegos',
    icon: 'eco',
    unlockedAt: null,
    bgGradient: 'from-emerald-200 to-green-400'
  },
  {
    id: 'maestro-manchas',
    title: 'Ojo de Detective',
    description: 'Completaste el juego de identificar patrones de manchas.',
    category: 'juegos',
    icon: 'lens',
    unlockedAt: null,
    bgGradient: 'from-amber-300 to-orange-400'
  },
  {
    id: 'explorador-africa',
    title: 'Ruta Africana',
    description: 'Exploraste la distribución de las 4 especies en el mapa de África.',
    category: 'especies',
    icon: 'public',
    unlockedAt: null,
    bgGradient: 'from-orange-200 to-amber-500'
  },
  {
    id: 'guardian-crias',
    title: 'Cuidador de Crías',
    description: 'Visitaste el Rincón de las Crías en el mapa del safari.',
    category: 'explorador',
    icon: 'favorite',
    unlockedAt: null,
    bgGradient: 'from-pink-200 to-rose-300'
  },
  {
    id: 'mirador-atardecer',
    title: 'Cielo Dorado',
    description: 'Descubriste el Mirador del Atardecer en el mapa.',
    category: 'explorador',
    icon: 'wb_twilight',
    unlockedAt: null,
    bgGradient: 'from-amber-200 to-purple-300'
  },
  {
    id: 'encuentra-luna',
    title: '¿Dónde está Luna?',
    description: 'Encontraste a Luna escondida en uno de sus rincones secretos.',
    category: 'secreto',
    icon: 'visibility',
    unlockedAt: null,
    bgGradient: 'from-yellow-200 to-amber-400'
  },
  {
    id: 'gran-zoologo',
    title: 'Jirafita de Oro',
    description: 'Descubriste las 4 especies de jirafas en la galería zoológica.',
    category: 'especies',
    icon: 'stars',
    unlockedAt: null,
    bgGradient: 'from-yellow-300 to-amber-500'
  }
];

const STORAGE_KEY = 'jirafalandia_stickers_v1';

@Injectable({
  providedIn: 'root'
})
export class Album {
  private readonly _stickers = signal<Sticker[]>(this.loadFromStorage());
  readonly stickers = this._stickers.asReadonly();

  readonly unlockedCount = computed(() => 
    this._stickers().filter(s => s.unlockedAt !== null).length
  );

  readonly totalCount = computed(() => this._stickers().length);

  readonly progressPercentage = computed(() => {
    const total = this.totalCount();
    if (total === 0) return 0;
    return Math.round((this.unlockedCount() / total) * 100);
  });

  readonly newUnlockAlert = signal<Sticker | null>(null);

  private loadFromStorage(): Sticker[] {
    if (typeof window === 'undefined') return INITIAL_STICKERS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return INITIAL_STICKERS;
      const parsed: Record<string, string> = JSON.parse(stored);
      return INITIAL_STICKERS.map(sticker => ({
        ...sticker,
        unlockedAt: parsed[sticker.id] ?? null
      }));
    } catch {
      return INITIAL_STICKERS;
    }
  }

  private saveToStorage(stickers: Sticker[]): void {
    if (typeof window === 'undefined') return;
    try {
      const map: Record<string, string> = {};
      stickers.forEach(s => {
        if (s.unlockedAt) map[s.id] = s.unlockedAt;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch {
      // Storage error
    }
  }

  unlock(id: string): boolean {
    const current = this._stickers();
    const existing = current.find(s => s.id === id);
    if (!existing || existing.unlockedAt) return false;

    const nowStr = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updated = current.map(s => 
      s.id === id ? { ...s, unlockedAt: nowStr } : s
    );

    this._stickers.set(updated);
    this.saveToStorage(updated);

    const newlyUnlocked = updated.find(s => s.id === id) ?? null;
    this.newUnlockAlert.set(newlyUnlocked);

    // Auto-dismiss notification after 4 seconds
    setTimeout(() => {
      if (this.newUnlockAlert()?.id === id) {
        this.newUnlockAlert.set(null);
      }
    }, 4500);

    return true;
  }

  dismissAlert(): void {
    this.newUnlockAlert.set(null);
  }

  resetProgress(): void {
    const resetList = INITIAL_STICKERS.map(s => ({ ...s, unlockedAt: null }));
    this._stickers.set(resetList);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Storage error
      }
    }
  }
}
