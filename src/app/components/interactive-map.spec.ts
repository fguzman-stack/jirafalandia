import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InteractiveMap } from './interactive-map';
import { Sound } from '../services/sound';
import { Album } from '../services/album';

describe('Exploración visual del parque', () => {
  const unlock = vi.fn();
  beforeEach(async () => {
    unlock.mockClear();
    await TestBed.configureTestingModule({
      imports: [InteractiveMap],
      providers: [
        { provide: Sound, useValue: { playPop: vi.fn() } },
        { provide: Album, useValue: { unlock } }
      ]
    }).compileComponents();
  });

  it('abre un paisaje interactivo desde un pin y permite regresar al plano', () => {
    const fixture = TestBed.createComponent(InteractiveMap);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-park-map-art')).toBeTruthy();
    (element.querySelector('[aria-label="Entrar en Bosque de Acacias"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelector('.habitat-view app-habitat-scene')).toBeTruthy();
    expect(element.querySelector('.habitat-heading h3')?.textContent).toContain('Bosque de Acacias');
    expect(element.querySelectorAll('.animal-hotspot')).toHaveLength(3);
    expect(unlock).not.toHaveBeenCalled();
    (element.querySelector('.back-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelector('app-park-map-art')).toBeTruthy();
    expect(fixture.componentInstance.visited()).toEqual(['bosque-acacias']);
  });

  it('descubre habitantes, ofrece hojas y reinicia la interacción al cambiar de recinto', () => {
    const fixture = TestBed.createComponent(InteractiveMap);
    const component = fixture.componentInstance;
    component.selectZone(component.data.parkZones[1]);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('.leaf-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(element.querySelector('[role="status"]')?.textContent).toContain('Gracias por las hojas');
    expect(element.querySelector('.resident-note h4')?.textContent).toContain('Luna');
    expect(element.querySelector('.leaf-button')).toBeNull();
    component.selectZone(component.data.parkZones[2]);
    fixture.detectChanges();
    expect(unlock).toHaveBeenCalledWith('guardian-crias');
    expect(element.querySelector('.fed-bubble')).toBeNull();
    expect(component.selectedAnimal()).toBeNull();
    component.selectZone(component.data.parkZones[1]);
    expect(component.visited()).toHaveLength(2);
  });
});
