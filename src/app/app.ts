import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from './components/navbar';
import { Hero } from './components/hero';
import { InteractiveMap } from './components/interactive-map';
import { GiraffesGallery } from './components/giraffes-gallery';
import { AfricaMap } from './components/africa-map';
import { FeedingGame } from './components/feeding-game';
import { SpotsGame } from './components/spots-game';
import { MomentsGallery } from './components/moments-gallery';
import { VisualCuriosities } from './components/visual-curiosities';
import { StickerAlbumModal } from './components/sticker-album-modal';
import { Footer } from './components/footer';
import { SvgShowcase } from './components/svg-showcase';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIconModule,
    Navbar,
    Hero,
    InteractiveMap,
    GiraffesGallery,
    SvgShowcase,
    AfricaMap,
    FeedingGame,
    SpotsGame,
    MomentsGallery,
    VisualCuriosities,
    StickerAlbumModal,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
