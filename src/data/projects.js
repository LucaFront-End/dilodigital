// Casos de éxito y portafolio seleccionado de Dilo Digital MX
export const PROJECTS = [
  {
    id: "case-aurora",
    slug: "aurora-joyeria",
    title: "Aurora Joyería Contemporánea",
    category: "branding",
    categoryName: "Branding & Diseño",
    client: "Aurora Fine Jewelry",
    location: "CDMX / Polanco",
    year: "2025",
    timeline: "12 Semanas",
    serviceType: "Rebranding, Packaging & Blindaje Legal IMPI",
    website: "aurorafinejewelry.mx",
    summary: "Rebranding completo, diseño de packaging sostenible y registro de marca exitoso ante el IMPI.",
    challenge: "Aurora competía en un segmento de joyería fina de alta gama donde su identidad visual inicial carecía de diferenciación de lujo y su nombre no contaba con registro de marca ante el IMPI, exponiéndose a contingencias legales y plagio.",
    solution: "Diseñamos una identidad editorial sofisticada con sistema tipográfico propio, manual de marca de 60 páginas y empaque ecológico con acabados en hot-stamping oro mate. Paralelamente, nuestro equipo legal gestionó la búsqueda fonética y registro en Clase 14 ante el IMPI sin objeciones.",
    resultsSummary: "Incremento del 185% en ventas durante el primer trimestre, posicionamiento en retail de alta gama en Polanco y titularidad de marca registrada por 10 años.",
    metrics: [
      { label: "Crecimiento de ventas", value: "+185%", note: "Primer trimestre pos-lanzamiento" },
      { label: "Tiempo de registro IMPI", value: "4 Meses", note: "Dictamen favorable Clase 14" },
      { label: "Percepción de valor", value: "Tier Alto", note: "Validado en focus group de lujo" }
    ],
    tags: ["Identidad Visual", "Packaging", "Registro IMPI", "Manual de Marca", "Dirección de Arte"],
    coverImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Diseño de logotipo, imagotipo y submarcas",
      "Manual de identidad de marca de 60 páginas",
      "Packaging y unboxing con hot-stamping oro mate",
      "Búsqueda fonética y dictamen favorable IMPI en Clase 14",
      "Material corporativo, etiquetas de tela y certificados de autenticidad"
    ],
    testimonial: {
      quote: "El proceso de registro de marca ante el IMPI y el rediseño de empaques fue impecable. Ver nuestra marca blindada legalmente y con una presentación de lujo transformó nuestro negocio.",
      author: "Sofía Delgado",
      role: "Directora Creativa & Fundadora",
      company: "Aurora Fine Jewelry"
    }
  },
  {
    id: "case-lumina",
    slug: "lumina-arquitectura",
    title: "Lúmina Studio Arquitectura",
    category: "web-ecommerce",
    categoryName: "Desarrollo Web & Ecommerce",
    client: "Lúmina Arquitectos",
    location: "Guadalajara, Jal.",
    year: "2025",
    timeline: "6 Semanas",
    serviceType: "Desarrollo Web Headless, UX/UI & Cotizador Interactivo",
    website: "luminaarquitectos.mx",
    summary: "Sitio web corporativo en arquitectura Headless con renderizado ultrarrápido y cotizador dinámico de proyectos.",
    challenge: "El estudio de arquitectura contaba con un sitio web tradicional lento (FCP > 4.2s), sin capacidad de cotizar proyectos en línea y con una tasa de rebote del 68% en dispositivos móviles que limitaba la atracción de proyectos residenciales de lujo.",
    solution: "Reescribimos la plataforma completa en arquitectura Headless con Vite y CSS modular, alcanzando un First Contentful Paint de 0.7 segundos y puntuación 99/100 en Google Lighthouse. Integramos un cotizador interactivo paramétrico por m² de construcción conectado directamente al WhatsApp del equipo comercial.",
    resultsSummary: "Aumento del 240% en cotizaciones calificadas recibidas y reducción de la tasa de rebote al 19%, convirtiendo el sitio en la principal fuente de clientes privados del estudio.",
    metrics: [
      { label: "Velocidad de carga", value: "0.7s FCP", note: "99/100 en Lighthouse" },
      { label: "Aumento de cotizaciones", value: "+240%", note: "Leads calificados residenciales" },
      { label: "Performance Score", value: "99/100", note: "Core Web Vitals en verde" }
    ],
    tags: ["Headless Vite", "UX/UI Editorial", "Cotizador Interactivo", "Performance 99", "WhatsApp CRM"],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Diseño UX/UI responsive en Figma con grilla suiza",
      "Desarrollo frontend a medida en Vite con micro-animaciones",
      "Cotizador paramétrico interactivo de m² de obra y acabados",
      "Integración directa con WhatsApp Business API y CRM",
      "Optimización integral de Core Web Vitals y hosting en CDN global"
    ],
    testimonial: {
      quote: "La velocidad y elegancia de nuestro nuevo sitio web nos posicionó como el referente de nuestro sector en México y Estados Unidos. Los clientes llegan ya convencidos de nuestra calidad.",
      author: "Arq. Roberto Alcocer",
      role: "Socio Director",
      company: "Lúmina Arquitectos"
    }
  },
  {
    id: "case-fitfuel",
    slug: "fitfuel-nutrition",
    title: "FitFuel Nutrition México",
    category: "marketing",
    categoryName: "Marketing Digital & Performance",
    client: "FitFuel MX",
    location: "Nacional (México)",
    year: "2025",
    timeline: "Continuo (8 Meses)",
    serviceType: "Meta Ads, TikTok Ads, UGC Creatives & Funnels WhatsApp",
    website: "fitfuelnutrition.com.mx",
    summary: "Estrategia integral de Meta Ads, TikTok Ads y funnels automatizados de WhatsApp para ecommerce D2C.",
    challenge: "La marca de nutrición deportiva enfrentaba un costo por adquisición (CPA) elevado que erosionaba los márgenes y una dependencia excesiva de promociones de descuento para generar compras repetidas.",
    solution: "Implementamos una arquitectura publicitaria Full-Funnel combinando creadores de contenido UGC para anuncios nativos de alta retención, pauta escalada en TikTok Ads y funnels automatizados de nutrición y recompra por WhatsApp Business API.",
    resultsSummary: "ROAS promedio sostenido de 5.4x, reducción del 38% en costo por adquisición y una facturación mensual superior a $1.8M MXN en su tienda digital.",
    metrics: [
      { label: "ROAS Promedio", value: "5.4x", note: "Retorno sobre inversión publicitaria" },
      { label: "Costo por Adquisición", value: "-38%", note: "Optimización continua de pauta" },
      { label: "Facturación mensual", value: "$1.8M MXN", note: "Canal directo D2C" }
    ],
    tags: ["Meta Ads", "TikTok Ads", "Funnels WhatsApp", "UGC Creadores", "Klaviyo"],
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Estructura de pauta Full-Funnel (TOFU, MOFU, BOFU) en Meta y TikTok",
      "Producción de 24 creatividades mensuales con creadores UGC",
      "Funnels de recompra vía WhatsApp y secuencias de email",
      "Dashboard en tiempo real con Looker Studio para atribución multicanal",
      "Pruebas A/B continuas de copy, ofertas y landing pages"
    ],
    testimonial: {
      quote: "Dilo Digital transformó por completo la presencia comercial de nuestra empresa. Nuestro ROAS pasó de 1.8 a más de 5.2x en solo 90 días con creatividades que realmente conectan.",
      author: "Ing. Mauricio Treviño",
      role: "CEO & Co-fundador",
      company: "FitFuel Nutrition"
    }
  },
  {
    id: "case-altus",
    slug: "altus-logistica",
    title: "Altus Logística & Supply Chain",
    category: "seo",
    categoryName: "SEO & Posicionamiento",
    client: "Altus Cargo Internacional",
    location: "CDMX / Querétaro",
    year: "2025",
    timeline: "16 Semanas",
    serviceType: "SEO Técnico B2B, Silos Temáticos & Optimización GEO / IA",
    website: "altuscargo.com.mx",
    summary: "Posicionamiento orgánico en Google para términos de alta intención logística B2B y optimización para IA (GEO).",
    challenge: "Altus dependía casi por completo de prospección telefónica tradicional en frío; su sitio no aparecía en los primeros 50 resultados de búsqueda de Google para términos comerciales clave de transporte de carga y aduanas.",
    solution: "Reestructuramos la arquitectura de información en silos semánticos, corregimos errores técnicos de enlazado, implementamos marcado estructurado Schema B2B y redactamos contenido técnico especializado orientado a directores de compras corporativos, optimizado también para motores de búsqueda de IA.",
    resultsSummary: "Crecimiento del 320% en tráfico orgánico calificado, 48 términos clave en Top 3 de Google México y 85 prospectos B2B orgánicos al mes.",
    metrics: [
      { label: "Tráfico Orgánico", value: "+320%", note: "Visitas orgánicas mensuales B2B" },
      { label: "Keywords Top 3", value: "48 Términos", note: "Posición #1 a #3 en Google" },
      { label: "Leads B2B Orgánicos", value: "85 / mes", note: "Sin presupuesto publicitario" }
    ],
    tags: ["SEO Técnico", "GEO / Búsqueda IA", "Schema B2B", "Content Strategy", "Silos Semánticos"],
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Auditoría técnica exhaustiva y limpieza de canibalizaciones",
      "Arquitectura de silos temáticos para servicios de flete y aduanas",
      "Optimización de entidad de negocio para Google Gemini y ChatGPT",
      "Artículos técnicos de profundidad dirigidos a directores de compras",
      "Monitoreo semanal de indexación y rendimiento en Search Console"
    ],
    testimonial: {
      quote: "Pasamos de depender de llamadas en frío a que los directores de logística de grandes empresas nos encuentren en Google y nos coticen directamente.",
      author: "Lic. Fernando Zavala",
      role: "Director de Operaciones",
      company: "Altus Cargo"
    }
  },
  {
    id: "case-valle",
    slug: "bosque-del-valle",
    title: "Residencial Bosque del Valle",
    category: "produccion",
    categoryName: "Producción Audiovisual & UGC",
    client: "Inmobiliaria Bosques",
    location: "Valle de Bravo, EdoMéx",
    year: "2025",
    timeline: "5 Semanas",
    serviceType: "Producción Cinematográfica 4K, Drone & Reels para Pauta",
    website: "bosquedelvalle.mx",
    summary: "Producción audiovisual cinematográfica con drone 4K y serie de Reels comerciales para desarrollo campestre de lujo.",
    challenge: "El desarrollo inmobiliario de lujo necesitaba transmitir la magia y exclusividad de su entorno natural a compradores de alto patrimonio en la CDMX que no podían visitar físicamente los terrenos de manera inmediata.",
    solution: "Desplegamos un equipo de filmación en locación con drones 4K de cine, cámaras con lentes de cine de alta resolución y diseño de audio envolvente. Creamos un spot institucional de 60 segundos y 12 cápsulas verticales de alto impacto para pauta digital.",
    resultsSummary: "Más de 1.2 millones de reproducciones con una retención promedio del 78% y la colocación del 92% de los lotes en la primera fase de preventa.",
    metrics: [
      { label: "Vistas orgánicas", value: "+1.2M", note: "Reproducciones en Instagram & TikTok" },
      { label: "Lotes en preventa", value: "92%", note: "Colocación en primera fase" },
      { label: "Retención de video", value: "78%", note: "Tasa promedio de visualización" }
    ],
    tags: ["Drone 4K", "Video Cinematográfico", "Reels Campaña", "Sound Design", "Color Grading"],
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Filmación aérea con pilotos de drone certificados",
      "Spot comercial cinematográfico institucional de 60 segundos",
      "12 cápsulas verticales optimizadas para pauta de Meta Ads y Reels",
      "Fotografía arquitectónica y de paisaje en golden hour",
      "Color grading profesional y diseño de sonido envolvente"
    ],
    testimonial: {
      quote: "El material audiovisual transmitió con total fidelidad la experiencia de vivir en el bosque. El 90% de los compradores cerraron el trato tras ver los videos.",
      author: "Mariana Barrenechea",
      role: "Directora Comercial",
      company: "Inmobiliaria Bosques"
    }
  },
  {
    id: "case-nexus",
    slug: "nexus-capital",
    title: "Nexus Capital CRM & Headless Portal",
    category: "tecnologia",
    categoryName: "Tecnología & Soluciones Digitales",
    client: "Nexus Private Wealth",
    location: "CDMX / Santa Fe",
    year: "2025",
    timeline: "10 Semanas",
    serviceType: "Portal Headless Privado, Integración CRM & Firma Digital",
    website: "nexusprivatewealth.com",
    summary: "Plataforma privada de cotización y onboarding para inversionistas con automatización de expediente y firma electrónica.",
    challenge: "El proceso de alta de inversionistas era manual y requería más de 5 días hábiles con intercambio de documentos por correo, generando fricción y abandono en la fase contractual final.",
    solution: "Desarrollamos un portal interactivo en Vite con autenticación segura, carga inteligente de expedientes, integración mediante webhooks hacia HubSpot Enterprise y generación automática de contratos con validez legal mediante firma electrónica.",
    resultsSummary: "El tiempo de onboarding pasó de 5 días a solo 12 minutos, incrementando la conversión al 44% y garantizando auditoría digital 100% compliant.",
    metrics: [
      { label: "Tiempo onboarding", value: "12 Min", note: "De 5 días a 12 minutos" },
      { label: "Tasa conversión", value: "44%", note: "Onboarding completado" },
      { label: "Firma digital", value: "100% Legal", note: "NOM-151 compliant" }
    ],
    tags: ["Automatización CRM", "Headless API", "Onboarding Digital", "Fintech", "Firma Electrónica"],
    coverImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Portal interactivo en Vite con autenticación segura de usuarios",
      "Integración de webhook hacia HubSpot Enterprise y validación de datos",
      "Generación automática de contratos y anexos en formato PDF",
      "Módulo de firma digital certificada con sello de tiempo",
      "Alertas automáticas en tiempo real a los asesores financieros"
    ],
    testimonial: {
      quote: "Nuestros inversionistas ahora completan su contrato en minutos desde su teléfono. La tecnología de Dilo Digital eliminó semanas de fricción administrativa.",
      author: "Rodrigo Palacios",
      role: "Managing Partner",
      company: "Nexus Private Wealth"
    }
  },
  {
    id: "case-nomada",
    slug: "nomada-coffee",
    title: "Nómada Coffee Specialty Roasters",
    category: "branding",
    categoryName: "Branding & Ecommerce",
    client: "Nómada Coffee Co.",
    location: "Monterrey, N.L.",
    year: "2025",
    timeline: "14 Semanas",
    serviceType: "Branding Editorial, Packaging Sostenible & Shopify Headless",
    website: "nomadacoffee.mx",
    summary: "Identidad editorial, packaging biodegradable con foil dorado y plataforma Shopify Headless de suscripción de café.",
    challenge: "La tostaduría de café de especialidad quería escalar su venta a nivel nacional mediante un modelo de suscripción recurrente, pero su empaque era genérico y no contaba con registro de marca IMPI en Clase 30.",
    solution: "Creamos un sistema de identidad visual editorial, empaques compostables con sello hermético y estampación foil dorada, gestionamos el registro de marca mixta ante el IMPI y construimos una tienda Headless de suscripción mensual con cobro recurrente vía Stripe.",
    resultsSummary: "Crecimiento del 190% en suscriptores activos en el primer semestre y un incremento del 62% en el Lifetime Value (LTV) de sus clientes.",
    metrics: [
      { label: "Suscripciones", value: "+190%", note: "Crecimiento recurrente mensual" },
      { label: "Sesión Promedio", value: "3m 45s", note: "Alta retención en tienda" },
      { label: "LTV de Cliente", value: "+62%", note: "Valor del cliente en el tiempo" }
    ],
    tags: ["Branding Café", "Packaging", "Shopify Headless", "Suscripción", "Foil Dorado"],
    coverImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Diseño de bolsas y empaques compostables con foil dorado",
      "Tienda de suscripción mensual con pasarela Stripe y Shopify Headless",
      "Estrategia de dirección de arte y contenido visual para redes",
      "Registro de marca mixta IMPI Clase 30 sin oposiciones",
      "Papelería corporativa y tarjetas de cata coleccionables"
    ],
    testimonial: {
      quote: "El diseño del empaque nos abrió las puertas de los mejores hoteles boutique y restaurantes de México. La tienda de suscripción funciona en piloto automático.",
      author: "Esteban Quiroga",
      role: "Maestro Tostador & Co-Fundador",
      company: "Nómada Coffee Co."
    }
  },
  {
    id: "case-vesta",
    slug: "vesta-living",
    title: "Vesta Living Mobiliario Contemporáneo",
    category: "web-ecommerce",
    categoryName: "E-Commerce 3D & Performance",
    client: "Vesta Living",
    location: "Puebla / Cholula",
    year: "2025",
    timeline: "8 Semanas",
    serviceType: "E-Commerce Headless, Visualizador 3D & Performance Ads",
    website: "vestaliving.mx",
    summary: "Showroom digital con visualizador 3D de muebles en tiempo real y campañas integradas de Google Shopping y Meta Ads.",
    challenge: "La marca de mobiliario de diseño requería que los compradores pudieran apreciar texturas, dimensiones y acabados de piezas de alto valor ($25,000+ MXN) antes de comprar por internet, reduciendo las dudas previas a la compra.",
    solution: "Desarrollamos un showroom digital con visualizador WebGL 3D interactivo en tiempo real que permite personalizar maderas y tapices, con tiempo de carga inferior a 0.8s e integración de pagos con hasta 12 Meses sin Intereses.",
    resultsSummary: "Calificación PageSpeed de 100/100, tasa de conversión en ecommerce del 3.8% y un incremento del 210% en ventas totales de catálogo.",
    metrics: [
      { label: "PageSpeed", value: "100/100", note: "Optimización WebGL y Vite" },
      { label: "Conversión", value: "3.8%", note: "Ticket promedio $26,500 MXN" },
      { label: "Ventas Catálogo", value: "+210%", note: "Comparativa interanual" }
    ],
    tags: ["Visualizador 3D", "PageSpeed 100", "Google Shopping", "Meta Ads", "MSI Stripe"],
    coverImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80"
    ],
    deliverables: [
      "Configurador 3D interactivo en WebGL para selección de tapices y maderas",
      "Integración de pasarela de pagos con Meses sin Intereses (MSI)",
      "Feed automatizado para Google Merchant Center y Shopping Ads",
      "Optimización SEO para categorías de alta intención de compra",
      "Campañas de retargeting dinámico en Meta y Google Ads"
    ],
    testimonial: {
      quote: "El configurador 3D le dio a nuestros clientes la seguridad que necesitaban para comprar salas completas por internet. Superó nuestras metas del año en el primer trimestre.",
      author: "Valeria Montero",
      role: "Directora Comercial",
      company: "Vesta Living"
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "Dilo Digital transformó por completo la presencia comercial de nuestra empresa. Nuestro ROAS pasó de 1.8 a más de 5.2x en solo 90 días.",
    author: "Ing. Mauricio Treviño",
    role: "CEO & Co-fundador",
    company: "FitFuel Nutrition",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    quote: "El proceso de registro de marca ante el IMPI fue transparente y sin fricciones. Poder ver el estatus de nuestro expediente online nos dio una enorme tranquilidad.",
    author: "Sofía Delgado",
    role: "Directora Creativa",
    company: "Aurora Fine Jewelry",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    quote: "La velocidad y elegancia de nuestro nuevo sitio web en Wix Headless nos posicionó como el referente de nuestro sector en México y Estados Unidos.",
    author: "Arq. Roberto Alcocer",
    role: "Socio Director",
    company: "Lúmina Arquitectos",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];
