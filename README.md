<div align="center">

# 🦒 Jirafalandia

**Zoológico digital interactivo dedicado al fascinante mundo de las jirafas.**

Explora hábitats, descubre especies, juega y vive una aventura adorable.

</div>

---

## Sobre el proyecto

Jirafalandia es una web interactiva construida con Angular y SSR donde puedes:

- **Conocer las especies**: galería con las grandes especies de jirafas, sus patrones de pelaje y su personalidad.
- **Explorar el mapa interactivo**: recorre los hábitats africanos y sus zonas del zoológico.
- **Jugar**: minijuegos de manchas y de alimentación, álbum de cromos y curiosidades visuales.
- **Disfrutar de ilustraciones SVG**: retratos, crías, panoramas de sabana y más, dibujados a mano en código.

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior
- npm

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (opcional)
cp .env.example .env.local

# 3. Arrancar el servidor de desarrollo en el puerto 3000
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Scripts disponibles

| Comando         | Descripción                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo (puerto 3000)          |
| `npm start`     | `ng serve` por defecto                       |
| `npm run build` | Build de producción (browser + SSR)          |
| `npm run watch` | Build en modo watch (desarrollo)             |
| `npm test`      | Ejecución de tests                           |
| `npm run lint`  | Análisis estático con ESLint                 |

## Stack técnico

- **Angular 21** con Angular Material y CDK
- **SSR** vía `@angular/ssr` + Express
- **Tailwind CSS 4** con PostCSS
- **Motion** para animaciones
- **TypeScript 5.9**, **ESLint** (angular-eslint) y **Vitest**

## Estructura

```
src/
├── app/
│   ├── components/   # Hero, galerías, mapas, juegos, piezas SVG
│   ├── services/     # Datos de jirafas, álbum, sonido
│   ├── app.ts        # Componente raíz
│   └── app.routes.ts # Enrutamiento
├── index.html        # HTML inicial, meta SEO y Google Fonts
├── styles.css        # Estilos globales
└── server.ts         # Servidor Express para SSR
public/               # Favicon y estáticos
```

## Licencia

Proyecto propio. Todos los derechos reservados.
