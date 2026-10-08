import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector -- A native SVG group preserves the SVG namespace.
  selector: 'g[app-acacia-art]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg:ellipse cx="100" cy="191" rx="65" ry="9" fill="#35472b" opacity=".13" />
    <svg:path d="M90 191 L94 129 L72 83 L80 79 L103 118 L120 81 L129 81 L110 136 L112 191 Z" [attr.fill]="night() ? '#302c38' : '#886042'" />
    <svg:path d="M98 145 L98 185 M99 130 L83 96 M107 128 L121 96" stroke="#c59660" stroke-width="3" opacity=".45" fill="none" />
    <svg:path d="M9 82 Q0 65 26 59 Q22 43 50 44 Q58 23 82 35 Q96 18 116 34 Q139 22 151 43 Q177 39 181 56 Q205 62 192 80 Q161 98 108 91 Q49 99 9 82 Z" [attr.fill]="night() ? '#302c38' : '#466548'" />
    @if (!night()) {
      <svg:path d="M17 64 Q40 48 65 52 Q79 34 107 42 Q139 34 155 52 Q180 50 185 65 Q137 76 99 69 Q58 80 17 64 Z" fill="#70915b" />
      <svg:path d="M40 53 Q53 39 74 44 M96 38 Q118 31 137 42 M147 55 Q167 51 176 59" stroke="#a5b97c" stroke-width="6" fill="none" stroke-linecap="round" />
      <svg:g fill="#b7c78c" opacity=".65"><svg:circle cx="56" cy="61" r="2" /><svg:circle cx="90" cy="53" r="2" /><svg:circle cx="133" cy="60" r="2" /><svg:circle cx="163" cy="67" r="2" /></svg:g>
    }
  `
})
export class AcaciaArt { readonly night = input(false); }
