import { Injectable } from '@angular/core';

export interface GiraffeSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  tagline: string;
  cardQuote: string;
  status: 'En peligro' | 'Vulnerable' | 'Preocupación menor' | 'Peligro crítico';
  statusColor: string;
  accentColor: string;
  bgCard: string;
  patternType: string;
  patternDescription: string;
  patternSvgType: 'reticulated' | 'masai' | 'northern' | 'southern';
  height: string;
  weight: string;
  lifespan: string;
  distribution: string;
  countries: string[];
  habitat: string;
  imageUrl: string;
  imageAlt: string;
  imageAttribution: string;
  curiousFact: string;
  funDetail: string;
}

export interface ParkZone {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  atmosphere: string;
  icon: string;
  color: string;
  bgLight: string;
  borderColor: string;
  residents: string[];
  activityTitle: string;
  activityTip: string;
  stickerId?: string;
  x: number; // percentage in SVG map
  y: number; // percentage in SVG map
}

export interface MomentPhoto {
  id: string;
  title: string;
  caption: string;
  location: string;
  imageUrl: string;
  alt: string;
  attribution: string;
  tag: string;
}

export interface CuriosityFact {
  id: string;
  title: string;
  statNumber: string;
  statLabel: string;
  description: string;
  funFact: string;
  icon: string;
  color: string;
  bgColor: string;
  comparisonTitle: string;
  comparisonDesc: string;
}

export interface SpotPatternQuizItem {
  id: string;
  speciesName: string;
  patternName: string;
  hint: string;
  patternType: 'reticulated' | 'masai' | 'northern' | 'southern';
  explanation: string;
}

@Injectable({
  providedIn: 'root'
})
export class GiraffeData {
  readonly species: GiraffeSpecies[] = [
    {
      id: 'reticulata',
      commonName: 'Jirafa Reticulada',
      scientificName: 'Giraffa reticulata',
      tagline: 'El mosaico geométrico perfecto de África',
      cardQuote: '¡Mira esas manchas! Parece que alguien dibujó con regla un precioso mosaico sobre su pelaje.',
      status: 'En peligro',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      accentColor: '#D97706',
      bgCard: 'bg-[#FFF9E8]',
      patternType: 'Mosaico poligonal de líneas blancas nítidas',
      patternDescription: 'Grandes polígonos de color castaño rojizo separados por líneas blancas muy finas y continuas que parecen una red perfecta.',
      patternSvgType: 'reticulated',
      height: '4.3 - 5.8 metros',
      weight: '800 - 1,200 kg',
      lifespan: '20 - 25 años',
      distribution: 'Norte y este de Kenia, sur de Somalia y sur de Etiopía.',
      countries: ['Kenia', 'Somalia', 'Etiopía'],
      habitat: 'Matorrales semiáridos y sabanas abiertas de acacias.',
      imageUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Jirafa reticulada con su característico patrón geométrico en la sabana',
      imageAttribution: 'Unsplash - Fotografía de fauna en vida libre',
      curiousFact: 'Sus manchas no solo son camuflaje: debajo de cada mancha existe una compleja red de vasos sanguíneos que actúa como un sistema térmico de refrigeración.',
      funDetail: 'Es la especie más fácilmente reconocible en todo el mundo por la asombrosa regularidad de sus líneas blancas.'
    },
    {
      id: 'tippelskirchi',
      commonName: 'Jirafa Masái',
      scientificName: 'Giraffa tippelskirchi',
      tagline: 'La gigante de manchas estrelladas',
      cardQuote: 'Entre sabanas y acacias del Serengueti, cada día es una aventura entre copas de árboles.',
      status: 'En peligro',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      accentColor: '#78350F',
      bgCard: 'bg-[#FFFDF5]',
      patternType: 'Bordes dentados como hojas de roble',
      patternDescription: 'Manchas de tono marrón chocolate muy oscuro con bordes irregulares, estrellados o aserrados, semejantes a hojas marchitas.',
      patternSvgType: 'masai',
      height: '4.5 - 5.9 metros (la más alta)',
      weight: '850 - 1,400 kg',
      lifespan: '20 - 27 años',
      distribution: 'Kenia y Tanzania (el Serengueti y Masái Mara son sus grandes hogares).',
      countries: ['Tanzania', 'Kenia'],
      habitat: 'Sabanas arboladas, valles ribereños y llanuras abiertas.',
      imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Jirafa masái con manchas estrelladas comiendo ramas altas',
      imageAttribution: 'Unsplash - Vida salvaje en Masái Mara',
      curiousFact: 'Las jirafas masái son generalmente las más altas de todas las especies de jirafa; algunos machos han registrado casi 6 metros de altura.',
      funDetail: 'Su patrón dentado es tan único que los biólogos identifican a cada ejemplar por las marcas de su cuello como una huella digital.'
    },
    {
      id: 'camelopardalis',
      commonName: 'Jirafa del Norte',
      scientificName: 'Giraffa camelopardalis',
      tagline: 'El tesoro ancestral del Sahel y el Nilo',
      cardQuote: 'Heredera de los relatos antiguos, sus patas blancas contrastan con sus suaves manchas pardas.',
      status: 'Peligro crítico',
      statusColor: 'bg-rose-100 text-rose-800 border-rose-300',
      accentColor: '#B45309',
      bgCard: 'bg-[#FFF9E8]',
      patternType: 'Manchas rectangulares con patas inferiores sin marcas',
      patternDescription: 'Manchas de color marrón canela o café claro, de formas cuadradas y bordes suaves; la parte inferior de sus patas es blanca casi sin manchas.',
      patternSvgType: 'northern',
      height: '4.2 - 5.5 metros',
      weight: '700 - 1,150 kg',
      lifespan: '22 - 26 años',
      distribution: 'Poblaciones aisladas en Níger, Chad, Camerún, República Centroafricana, Sudán del Sur y Uganda.',
      countries: ['Níger', 'Chad', 'Uganda', 'Camerún', 'Sudán del Sur'],
      habitat: 'Zonas áridas del Sahel, sabanas de matorral espinoso y valles fluviales.',
      imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Jirafa del norte caminando con porte elegante en el Parque Nacional Murchison',
      imageAttribution: 'Unsplash - Fotografía de conservación',
      curiousFact: 'Incluye la famosa subespecie de África Occidental (en Níger), que fue salvada de tener apenas 50 individuos gracias a intensos programas comunitarios.',
      funDetail: 'Sus "calcetines blancos" en las patas son su seña de identidad más tierna y visible.'
    },
    {
      id: 'giraffa',
      commonName: 'Jirafa del Sur',
      scientificName: 'Giraffa giraffa',
      tagline: 'La gran caminante de las llanuras australes',
      cardQuote: 'En las colinas del Parque Kruger y el desierto de Namibia, camina con paso sereno y majestuoso.',
      status: 'Preocupación menor',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      accentColor: '#4D7C0F',
      bgCard: 'bg-[#FFFDF5]',
      patternType: 'Manchas redondeadas que bajan hasta las pezuñas',
      patternDescription: 'Manchas con tonos canela y motas estrelladas que a menudo se extienden por todas las extremidades hasta llegar a las pezuñas.',
      patternSvgType: 'southern',
      height: '4.4 - 5.6 metros',
      weight: '800 - 1,300 kg',
      lifespan: '20 - 25 años',
      distribution: 'Sudáfrica, Namibia, Botsuana, Zimbabue y sur de Mozambique.',
      countries: ['Sudáfrica', 'Namibia', 'Botsuana', 'Zimbabue'],
      habitat: 'Sabanas de acacias y mopane, llanuras semiáridas y cuencas arenosas del Kalahari.',
      imageUrl: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Jirafa del sur en las llanuras africanas con el cielo abierto',
      imageAttribution: 'Unsplash - Parque Nacional Kruger',
      curiousFact: 'Es la especie con poblaciones más estables y numerosas gracias a los parques protegidos de Sudáfrica, Botsuana y Namibia.',
      funDetail: 'En el desierto de Namibia pueden viajar decenas de kilómetros entre lechos de ríos secos buscando vainas de acacia sin beber agua durante semanas.'
    }
  ];

  readonly parkZones: ParkZone[] = [
    {
      id: 'sabana-dorada',
      name: 'Sabana Dorada',
      subtitle: 'El corazón cálido de Jirafalandia',
      description: 'Una pradera infinita de pastos dorados y cielo despejado. Aquí las familias de jirafas caminan en fila y disfrutan del calor matutino del sol.',
      atmosphere: 'Brisa tibia, luz dorada, suave crujido de hierba seca.',
      icon: 'wb_sunny',
      color: '#F9BE36',
      bgLight: '#FFF1A8',
      borderColor: '#FFD54F',
      residents: ['Jirafa Masái', 'Jirafa del Sur'],
      activityTitle: 'Exploración de pastizales',
      activityTip: 'Fíjate en cómo caminan: mueven las dos patas de un lado y luego las del otro (paso de ambladura).',
      x: 28,
      y: 46
    },
    {
      id: 'bosque-acacias',
      name: 'Bosque de Acacias',
      subtitle: 'El comedor más alto del mundo',
      description: 'Un bosque de acacias sombrilla rebosante de hojas tiernas. Aquí se reúnen las jirafas más glotonas para alcanzar las copas más altas.',
      atmosphere: 'Sombra refrescante, aroma a flores de acacia y masticar de ramas tiernas.',
      icon: 'forest',
      color: '#557A55',
      bgLight: '#E8F3E5',
      borderColor: '#A7C99A',
      residents: ['Jirafa Reticulada', 'Jirafa del Norte'],
      activityTitle: 'Festín en las alturas',
      activityTip: '¡Visita el minijuego de alimentar a la jirafa para darles un tentempié de hojas!',
      x: 68,
      y: 32
    },
    {
      id: 'rincon-crias',
      name: 'Rincón de las Crías',
      subtitle: 'La guardería más tierna',
      description: 'Un espacio protegido donde las pequeñas jirafitas de pocos meses juegan, dan pequeños saltitos y aprenden a estirar sus cuellitos junto a sus madres.',
      atmosphere: 'Risas, ternura, carreras juguetonas y siestas protegidas bajo árboles.',
      icon: 'favorite',
      color: '#E11D48',
      bgLight: '#FFE4E6',
      borderColor: '#FDA4AF',
      residents: ['Crías de Masái', 'Crías de Reticulada'],
      activityTitle: 'Guardería de la sabana',
      activityTip: 'Al nacer, ¡un bebé jirafa ya mide casi 1.80 metros y se pone de pie en menos de una hora!',
      stickerId: 'guardian-crias',
      x: 35,
      y: 72
    },
    {
      id: 'sendero-manchas',
      name: 'Sendero de las Manchas',
      subtitle: 'El paseo de los mosaicos naturales',
      description: 'Un sendero botánico educativo donde los carteles interactivos y los paneles de madera muestran cómo cada especie tiene un dibujo de pelaje completamente diferente.',
      atmosphere: 'Curiosidad científica, lupas de madera y paneles táctiles de texturas.',
      icon: 'scatter_plot',
      color: '#D97706',
      bgLight: '#FEF3C7',
      borderColor: '#FCD34D',
      residents: ['Muestrario de las 4 especies'],
      activityTitle: 'Laboratorio de patrones',
      activityTip: 'Pon a prueba tus ojos en el minijuego de descubrir manchas más abajo.',
      x: 75,
      y: 68
    },
    {
      id: 'mirador-atardecer',
      name: 'Mirador del Atardecer',
      subtitle: 'Siluetas de ensueño en el crepúsculo',
      description: 'Una colina elevada desde donde se contempla toda Jirafalandia teñida de naranja y púrpura cuando el sol cae sobre el horizonte africano.',
      atmosphere: 'Calma absoluta, brisa fresca de la tarde y el canto de las cigarras.',
      icon: 'wb_twilight',
      color: '#7C3AED',
      bgLight: '#EDE9FE',
      borderColor: '#C4B5FD',
      residents: ['Jirafas contemplativas al ocaso'],
      activityTitle: 'Observatorio panorámico',
      activityTip: 'Disfruta de la vista de las sombras alargadas de los cuellos proyectadas en la pradera.',
      stickerId: 'mirador-atardecer',
      x: 52,
      y: 18
    }
  ];

  readonly moments: MomentPhoto[] = [
    {
      id: 'm1',
      title: 'Una tarde dorada',
      caption: 'El sol de la sabana tiñe el pelaje de un tono miel mientras el viento mece la hierba alta.',
      location: 'Parque Nacional Serengueti, Tanzania',
      imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Jirafa en la sabana africana al atardecer',
      attribution: 'Unsplash - Wildlife Serengueti',
      tag: 'Atardecer'
    },
    {
      id: 'm2',
      title: 'Pasitos enormes',
      caption: 'Una pequeña cría de pocas semanas acompaña a su madre explorando sus primeros árboles de acacia.',
      location: 'Reserva Nacional Masái Mara, Kenia',
      imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1200&q=80',
      alt: 'Madre jirafa y su cría en la sabana',
      attribution: 'Unsplash - Naturaleza familiar',
      tag: 'Crías y Familia'
    },
    {
      id: 'm3',
      title: 'Hora de merendar',
      caption: 'Con su lengua prensil de color azul oscuro, alcanza las hojas más tiernas y evita las espinas.',
      location: 'Samburu, Kenia',
      imageUrl: 'https://images.unsplash.com/photo-1547721064-da6cfb341d50?auto=format&fit=crop&w=1200&q=80',
      alt: 'Jirafa alimentándose con delicadeza en una copa de acacia',
      attribution: 'Unsplash - Vida silvestre',
      tag: 'Alimentación'
    },
    {
      id: 'm4',
      title: 'Amigas de altura',
      caption: 'Dos jóvenes machos frotan sus cuellos en una suave danza ritual llamada "necking" que refuerza sus lazos.',
      location: 'Parque Nacional Kruger, Sudáfrica',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      alt: 'Dos jirafas juntas en el paisaje sudafricano',
      attribution: 'Unsplash - Kruger Safari',
      tag: 'Comportamiento'
    },
    {
      id: 'm5',
      title: 'Reflejo en la laguna',
      caption: 'Abrir las patas delanteras para agacharse a beber agua es toda una proeza gimnástica.',
      location: 'Delta del Okavango, Botsuana',
      imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      alt: 'Jirafa bebiendo agua en una charca natural',
      attribution: 'Unsplash - Delta del Okavango',
      tag: 'Hábitat'
    },
    {
      id: 'm6',
      title: 'La marcha de la manada',
      caption: 'Una torre de jirafas (así se llama un grupo de jirafas) cruza serenamente la llanura africana.',
      location: 'Parque Nacional Amboseli, Kenia',
      imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
      alt: 'Manada de jirafas caminando con el monte Kilimanjaro de fondo',
      attribution: 'Unsplash - Amboseli Wildlife',
      tag: 'Manada'
    }
  ];

  readonly curiosities: CuriosityFact[] = [
    {
      id: 'c1',
      title: 'Altura Colosal',
      statNumber: '5.8 m',
      statLabel: 'de altura máxima',
      description: 'Una jirafa macho adulta puede medir casi 6 metros de altura. ¡Solo su cuello ya supera los 2 metros!',
      funFact: 'Al nacer, un bebé jirafa cae desde 1.5 metros de altura al suelo... ¡y en 30 minutos ya camina!',
      icon: 'height',
      color: '#D97706',
      bgColor: 'bg-amber-50',
      comparisonTitle: '¿Cuánto es eso?',
      comparisonDesc: 'Es tan alta como una casa de dos pisos o tres humanos adultos puestos uno encima de los hombros del otro.'
    },
    {
      id: 'c2',
      title: 'Lengua Protectora',
      statNumber: '50 cm',
      statLabel: 'lengua prensil azulada',
      description: 'Su larguísima lengua es de un color morado o azul negruzco debido a la alta concentración de melanina.',
      funFact: 'La melanina actúa como un protector solar natural para que no se queme con el abrasador sol africano.',
      icon: 'face',
      color: '#4F46E5',
      bgColor: 'bg-indigo-50',
      comparisonTitle: 'Agarre milimétrico',
      comparisonDesc: 'Es prensil: puede enrollarse con delicadeza milimétrica alrededor de ramas llenas de espinas afiladas para arrancar solo las hojas.'
    },
    {
      id: 'c3',
      title: 'Corazón de Campeón',
      statNumber: '11 kg',
      statLabel: 'peso de su corazón',
      description: 'Para enviar sangre a 2 metros de altura contra la gravedad hasta el cerebro, su corazón bombea con el doble de presión que el humano.',
      funFact: 'Tienen una red especial de válvulas que evita que se desmayen cuando bajan la cabeza para beber agua.',
      icon: 'favorite',
      color: '#E11D48',
      bgColor: 'bg-rose-50',
      comparisonTitle: 'Fuerza descomunal',
      comparisonDesc: 'Tiene paredes musculares de 7 centímetros de grosor y late hasta 170 veces por minuto.'
    },
    {
      id: 'c4',
      title: 'Siestas Relámpago',
      statNumber: '30 min',
      statLabel: 'de sueño total al día',
      description: 'Las jirafas duermen menos que casi cualquier otro mamífero. Toman siestas brevísimas de entre 2 y 5 minutos seguidos.',
      funFact: 'Casi siempre duermen de pie para estar preparadas ante cualquier león o hiena en caso de peligro.',
      icon: 'bedtime',
      color: '#0D9488',
      bgColor: 'bg-teal-50',
      comparisonTitle: 'Alerta constante',
      comparisonDesc: 'Solo en raras ocasiones se acuestan curvando el cuello hacia atrás sobre sus ancas para dormir 5 minutos profundamente.'
    },
    {
      id: 'c5',
      title: 'Huella Dactilar Única',
      statNumber: '100%',
      statLabel: 'patrón irrepetible',
      description: 'No existen dos jirafas en todo el planeta con el mismo diseño de manchas, igual que nuestras huellas dactilares.',
      funFact: 'Heredan ciertas características del patrón de sus madres, lo que ayuda a los biólogos a rastrear familias.',
      icon: 'fingerprint',
      color: '#B45309',
      bgColor: 'bg-orange-50',
      comparisonTitle: 'Firma de la naturaleza',
      comparisonDesc: 'El color de las manchas también oscurece con la edad, especialmente en los machos adultos de jirafa masái y del sur.'
    },
    {
      id: 'c6',
      title: 'Patas de Gigante',
      statNumber: '1.8 m',
      statLabel: 'longitud de sus patas',
      description: 'Sus patas son más largas que la estatura de la mayoría de las personas adultas. ¡Pueden correr a 55 km/h!',
      funFact: 'Una sola patada de jirafa es tan potente que puede disuadir e incluso abatir a un león adulto.',
      icon: 'directions_run',
      color: '#15803D',
      bgColor: 'bg-emerald-50',
      comparisonTitle: 'Velocidad elegante',
      comparisonDesc: 'Aunque parecen moverse a cámara lenta debido a su enorme tamaño, avanzan hasta 4.5 metros en cada zancada.'
    }
  ];

  readonly quizItems: SpotPatternQuizItem[] = [
    {
      id: 'q-reticulata',
      speciesName: 'Jirafa Reticulada',
      patternName: 'Red geométrica con líneas blancas nítidas',
      hint: 'Parece una cuadrícula o red perfecta dibujada a mano.',
      patternType: 'reticulated',
      explanation: '¡Excelente! La jirafa reticulada tiene polígonos regulares separados por líneas blancas rectas muy marcadas.'
    },
    {
      id: 'q-tippelskirchi',
      speciesName: 'Jirafa Masái',
      patternName: 'Manchas estrelladas y dentadas como hojas',
      hint: 'Sus bordes no son rectos, tienen picos y formas recortadas.',
      patternType: 'masai',
      explanation: '¡Exacto! Las manchas de la jirafa masái parecen hojas de roble o estrellas con bordes dentados muy oscuros.'
    },
    {
      id: 'q-camelopardalis',
      speciesName: 'Jirafa del Norte',
      patternName: 'Manchas rectangulares suaves y patas blancas',
      hint: 'Sus patas inferiores son limpias y casi no tienen manchas.',
      patternType: 'northern',
      explanation: '¡Genial! La jirafa del norte tiene tonos canela suaves y sus patas inferiores son de un blanco característico.'
    },
    {
      id: 'q-giraffa',
      speciesName: 'Jirafa del Sur',
      patternName: 'Manchas moteadas que bajan hasta las pezuñas',
      hint: 'Las manchas se extienden por todas sus patas hasta el suelo.',
      patternType: 'southern',
      explanation: '¡Fantástico! En la jirafa del sur las manchas moteadas continúan hacia abajo cubriendo las extremidades.'
    }
  ];
}
