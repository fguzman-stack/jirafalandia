import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GiraffeData, ParkZone } from '../services/giraffe-data';
import { Sound } from '../services/sound';
import { Album } from '../services/album';
import { ParkMapArt } from './svg/park-map-art';
import { HabitatScene } from './svg/habitat-scene';

@Component({
  selector: 'app-interactive-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ParkMapArt, HabitatScene],
  template: `
    <section id="mapa" class="safari-section">
      <div class="safari-container">
        <header class="safari-intro">
          <span class="eyebrow"><mat-icon>explore</mat-icon> UN PARQUE PARA PERDERSE</span>
          <h2>Explora Jirafalandia</h2>
          <p>Sigue los senderos, asómate a los recintos y conoce a sus habitantes.<br class="desktop-break"> Tu próxima aventura está a un clic de distancia.</p>
        </header>
        <div class="park-shell">
          <div class="park-toolbar">
            <div class="toolbar-title"><span class="live-dot"></span>{{ selectedZone() ? 'Estás dentro del parque' : 'Tu aventura empieza aquí' }}</div>
            <span class="visit-count"><mat-icon>explore</mat-icon> {{ visited().length }} / 5 zonas exploradas</span>
          </div>
          @if (selectedZone(); as zone) {
            <div class="habitat-heading">
              <button type="button" class="back-button" (click)="closeZoneDetail()"><mat-icon>arrow_back</mat-icon> Volver al mapa</button>
              <div><span class="habitat-kicker">RECINTO {{ zoneNumber() }} · JIRAFALANDIA</span><h3>{{ zone.name }}</h3><p>{{ zone.subtitle }}</p></div>
              <span class="habitat-weather"><mat-icon>{{ zone.icon }}</mat-icon>{{ weather() }}</span>
            </div>
            <div class="habitat-view">
              <app-habitat-scene [zone]="zone.id" [label]="zone.name + ': jirafas en su recinto, vegetación y senderos para visitantes'" />
              <span class="scene-caption">{{ sceneCaption() }}</span>
              @for (animal of animals(); track animal.name; let i = $index) {
                <button type="button" class="animal-hotspot" [class.active]="selectedAnimal() === i"
                  [style.left.%]="animal.x" [style.top.%]="animal.y" (click)="inspectAnimal(i)"
                  [attr.aria-label]="'Conocer a ' + animal.name" [attr.aria-pressed]="selectedAnimal() === i">
                  <span class="hotspot-plus">{{ selectedAnimal() === i ? '−' : '+' }}</span><span class="animal-name">{{ animal.name }}</span>
                </button>
              }
              @if (zone.id === 'bosque-acacias' && !fed()) {
                <button class="leaf-button" type="button" (click)="feed()" aria-label="Ofrecer hojas de acacia a Luna"><mat-icon>eco</mat-icon><span>Ofrécele hojas</span></button>
              }
              @if (fed()) { <div class="fed-bubble" role="status"><mat-icon>eco</mat-icon> ¡Ñam! Gracias por las hojas.</div> }
            </div>
            <div class="habitat-bottom">
              <div class="resident-note" aria-live="polite">
                @if (selectedAnimal() !== null) {
                  <span class="note-icon"><mat-icon>{{ selectedAnimal() === 2 ? 'favorite' : 'pets' }}</mat-icon></span>
                  <div><span class="small-label">CONOCE A SUS HABITANTES</span><h4>{{ activeAnimal()?.name }} · {{ activeAnimal()?.species }}</h4><p>{{ activeAnimal()?.fact }}</p></div>
                } @else {
                  <span class="note-icon"><mat-icon>touch_app</mat-icon></span>
                  <div><span class="small-label">MIRA UN POCO MÁS CERCA</span><h4>Hay una historia detrás de cada jirafa</h4><p>Toca los puntos sobre los animales para conocerlos. {{ zone.atmosphere }}</p></div>
                }
              </div>
              <div class="zone-action"><span class="discovered"><mat-icon>check_circle</mat-icon> {{ zone.stickerId ? 'Pegatina de la zona conseguida' : '¡Zona descubierta!' }}</span><a [href]="activityLink()">{{ activityLabel() }} <mat-icon>arrow_forward</mat-icon></a></div>
            </div>
          } @else {
            <div class="map-view">
              <app-park-map-art />
              <span class="map-caption">PLANO DEL PARQUE · ELIGE TU PRIMER DESTINO</span>
              @for (zone of data.parkZones; track zone.id; let i = $index) {
                <button type="button" class="map-pin" [style.left.%]="zone.x" [style.top.%]="zone.y"
                  [style.--pin-color]="zone.color" (click)="selectZone(zone)" [attr.aria-label]="'Entrar en ' + zone.name">
                  <span class="pin-name">{{ zone.name }}</span><span class="pin-number">{{ hasVisited(zone.id) ? '✓' : i + 1 }}</span>
                </button>
              }
            </div>
            <div class="map-footer"><span><mat-icon>touch_app</mat-icon> Toca una zona para entrar en su paisaje</span><span><mat-icon>local_activity</mat-icon> Explora y colecciona recuerdos</span></div>
          }
          <nav class="zone-navigation" aria-label="Recintos del parque">
            @for (zone of data.parkZones; track zone.id; let i = $index) {
              <button type="button" (click)="selectZone(zone)" [class.selected]="selectedZone()?.id === zone.id" [attr.aria-pressed]="selectedZone()?.id === zone.id">
                <span class="zone-thumb"><app-habitat-scene [zone]="zone.id" [label]="zone.name" /></span>
                <span class="zone-nav-text"><span class="zone-nav-number">{{ hasVisited(zone.id) ? '✓ DESCUBIERTA' : 'ZONA 0' + (i + 1) }}</span><strong>{{ zone.name }}</strong></span>
                <mat-icon>arrow_forward</mat-icon>
              </button>
            }
          </nav>
        </div>
        <p class="park-footnote"><mat-icon>favorite_border</mat-icon> Un zoológico virtual para observar, aprender y querer un poquito más a las jirafas.</p>
      </div>
    </section>
  `,
  styleUrl: './interactive-map.css'
})
export class InteractiveMap {
  readonly data = inject(GiraffeData);
  readonly soundService = inject(Sound);
  readonly albumService = inject(Album);
  readonly selectedZone = signal<ParkZone | null>(null);
  readonly selectedAnimal = signal<number | null>(null);
  readonly visited = signal<string[]>([]);
  readonly fed = signal(false);
  readonly zoneNumber = computed(() => this.data.parkZones.findIndex(z => z.id === this.selectedZone()?.id) + 1);
  readonly weather = computed(() => this.selectedZone()?.id === 'mirador-atardecer' ? 'Última luz' : this.selectedZone()?.id === 'bosque-acacias' ? 'Bajo las acacias' : 'Brisa de sabana');
  readonly sceneCaption = computed(() => ({
    'sabana-dorada': 'La manada pasea junto a la laguna',
    'bosque-acacias': 'Es la hora de merendar en las copas',
    'rincon-crias': 'Pequeños pasos, grandes aventuras',
    'sendero-manchas': 'Cada pelaje cuenta una historia',
    'mirador-atardecer': 'El mejor asiento para despedir el día'
  })[this.selectedZone()?.id ?? 'sabana-dorada']);
  readonly animals = computed(() => {
    const forest = this.selectedZone()?.id === 'bosque-acacias';
    const patterns = this.selectedZone()?.id === 'sendero-manchas';
    return [
      { name: 'Luna', species: forest || patterns ? 'Jirafa Reticulada' : 'Jirafa Masái', x: 35, y: 29, fact: forest || patterns ? 'Sus manchas forman una red de polígonos. Con su lengua prensil alcanza las hojas entre las espinas de las acacias.' : 'Observa su cuello y sus patas: las jirafas caminan moviendo las dos patas del mismo lado a la vez.' },
      { name: 'Kibo', species: forest ? 'Jirafa del Norte' : 'Jirafa del Sur', x: 59, y: 36, fact: forest ? 'Fíjate en sus calcetines: las jirafas de Rothschild tienen la parte inferior de las patas casi sin manchas.' : 'Sus manchas llegan hasta las patas. En su hábitat natural puede recorrer largas distancias buscando alimento.' },
      { name: 'Nala', species: 'La pequeña de la manada', x: 55, y: 60, fact: 'Una cría ya mide alrededor de 1,8 metros al nacer. En sus primeros meses aprende a explorar junto a su madre.' }
    ];
  });
  readonly activeAnimal = computed(() => this.selectedAnimal() === null ? null : this.animals()[this.selectedAnimal()!]);
  readonly activityLink = computed(() => this.selectedZone()?.id === 'sendero-manchas' ? '#juego-manchas' : this.selectedZone()?.id === 'bosque-acacias' ? '#alimentar-jirafa' : this.selectedZone()?.id === 'mirador-atardecer' ? '#momentos' : '#jirafas');
  readonly activityLabel = computed(() => this.selectedZone()?.id === 'sendero-manchas' ? 'Jugar con las manchas' : this.selectedZone()?.id === 'bosque-acacias' ? 'Seguir alimentando a Luna' : this.selectedZone()?.id === 'mirador-atardecer' ? 'Ver momentos del safari' : 'Conocer a las jirafas');

  selectZone(zone: ParkZone): void {
    this.soundService.playPop();
    this.selectedZone.set(zone);
    this.selectedAnimal.set(null);
    this.fed.set(false);
    this.visited.update(ids => ids.includes(zone.id) ? ids : [...ids, zone.id]);
    if (zone.stickerId) this.albumService.unlock(zone.stickerId);
  }
  hasVisited(id: string): boolean { return this.visited().includes(id); }
  inspectAnimal(index: number): void {
    this.soundService.playPop();
    this.selectedAnimal.update(current => current === index ? null : index);
  }
  feed(): void {
    this.soundService.playPop();
    this.fed.set(true);
    this.selectedAnimal.set(0);
  }
  closeZoneDetail(): void {
    this.soundService.playPop();
    this.selectedZone.set(null);
    this.selectedAnimal.set(null);
  }
}
