// Categorías completas oficiales de Dilo Digital MX
export const CATEGORIES = [
  {
    id: "branding",
    slug: "branding-diseno",
    number: "01",
    title: "Branding & Diseño",
    shortTitle: "Branding",
    concept: "Creamos tu marca. Construimos su identidad. Te ayudamos a protegerla.",
    color: "#FF5A1F",
    gradient: "linear-gradient(135deg, #FF5A1F 0%, #FF8A00 100%)",
    bgSoft: "#FFF8F4",
    accentGlow: "rgba(255, 90, 31, 0.15)",
    icon: "sparkles",
    tagline: "Identidad visual de alto impacto que perdura y conecta con audiencias reales.",
    hasPurchaseFlow: true, // Special e-commerce purchase flow for IMPI and Branding
    subSections: [
      {
        id: "branding-core",
        title: "Branding Estratégico",
        description: "Construcción de marcas con personalidad, voz única y diferenciación en el mercado.",
        items: [
          "Naming y concepto de marca",
          "Diseño de logotipo (Isotipo, Logotipo, Imagotipo)",
          "Identidad visual integral",
          "Manual de identidad corporativa y guías de estilo",
          "Rebranding y evolución de marcas existentes",
          "Branding corporativo B2B y B2C",
          "Desarrollo de concepto creativo y storytelling",
          "Tagline, tono de voz y pilares de comunicación"
        ]
      },
      {
        id: "diseno-grafico",
        title: "Diseño & Contenido Visual",
        description: "Expresiones gráficas coherentes para todos los puntos de contacto comerciales.",
        items: [
          "Diseño gráfico publicitario y comercial",
          "Diseño editorial para redes sociales (Grid, Carousels, Stories)",
          "Presentaciones corporativas y Pitch Decks ejecutivos",
          "Brochures, catálogos y memorias corporativas",
          "Papelería corporativa premium (Tarjetas, Hojas, Carpetas)",
          "Packaging, empaques y etiquetas de producto",
          "Materiales para ferias, stands y retail"
        ]
      },
      {
        id: "registro-impi",
        title: "Registro y Protección de Marca ante el IMPI",
        isHighlight: true,
        highlightTag: "Trámite 100% Online",
        description: "Blindaje legal de tu activo más valioso en México con seguimiento en tiempo real.",
        items: [
          "Búsqueda fonética y de disponibilidad de marca ante el IMPI",
          "Análisis de viabilidad legal y dictamen previo",
          "Clasificación correcta de productos y servicios (Clases NIZA 1 a 45)",
          "Gestión integral y acompañamiento del trámite",
          "Contestación de impedimentos u oficios de anterioridad",
          "Seguimiento automatizado hasta la obtención del título de marca"
        ],
        ctaText: "Registrar Marca Online (Estilo EasyLex)",
        actionRoute: "registro-marca"
      }
    ],
    stats: [
      { value: "+140", label: "Marcas registradas ante IMPI" },
      { value: "98.4%", label: "Tasa de viabilidad positiva" },
      { value: "4 Semanas", label: "Sprint de identidad visual" }
    ]
  },
  {
    id: "marketing",
    slug: "marketing-digital",
    number: "02",
    title: "Marketing Digital & Performance",
    shortTitle: "Marketing Digital",
    concept: "Estrategia que vende, no solo se ve.",
    color: "#FF5A1F",
    gradient: "linear-gradient(135deg, #FF5A1F 0%, #FF8A00 100%)",
    bgSoft: "#FFF8F4",
    accentGlow: "rgba(255, 90, 31, 0.15)",
    icon: "trending-up",
    tagline: "Campañas de rendimiento basadas en datos, ROAS optimizado y captación de clientes de alto valor.",
    hasPurchaseFlow: false,
    subSections: [
      {
        id: "estrategia-mkt",
        title: "Estrategia & Consultoría",
        description: "Roadmaps comerciales para conectar tu oferta con la demanda cualificada.",
        items: [
          "Estrategia de Marketing Digital 360°",
          "Consultoría y auditoría de adquisición",
          "Planeación y calendarización de campañas",
          "Estrategias B2B (Inbound & Outbound)",
          "Estrategias B2C de alta frecuencia",
          "Generación constante de Leads calificados",
          "Sistemas avanzados de Remarketing y retargeting multicanal"
        ]
      },
      {
        id: "publicidad-pauta",
        title: "Pauta Digital & Performance Ads",
        description: "Inversión inteligente en medios con métricas claras de retorno sobre la inversión.",
        items: [
          "Google Ads (Search, Shopping, Display, Performance Max)",
          "Meta Ads (Facebook & Instagram Ads de conversión)",
          "TikTok Ads para audiencias dinámicas y ecommerce",
          "LinkedIn Ads para prospección corporativa y B2B",
          "YouTube Ads y video marketing de captación",
          "Campañas directas a WhatsApp Business con flujos automáticos",
          "Optimización diaria de pujas y segmentación por IA"
        ]
      },
      {
        id: "social-media-automation",
        title: "Social Media & Automatización",
        description: "Comunidades activas, automatizaciones de correo y analítica en tiempo real.",
        items: [
          "Gestión integral de Redes Sociales y Community Management",
          "Estrategia de contenidos y calendarios de publicación",
          "Email Marketing & Newsletters automatizadas",
          "Automatización de leads y funnels de conversión CRM",
          "Dashboards interactivos en vivo y reportes de desempeño mensual",
          "CRO (Conversion Rate Optimization) en landing pages"
        ]
      }
    ],
    stats: [
      { value: "4.8x", label: "ROAS promedio en pauta Meta & Google" },
      { value: "+380K", label: "Leads comerciales captados" },
      { value: "$12M+", label: "Ventas generadas para clientes" }
    ]
  },
  {
    id: "web-ecommerce",
    slug: "desarrollo-web-ecommerce",
    number: "03",
    title: "Desarrollo Web & Ecommerce",
    shortTitle: "Desarrollo Web",
    concept: "Tu sitio no debería ser un folleto. Debería ser parte de tu equipo de ventas.",
    color: "#0F172A",
    gradient: "linear-gradient(135deg, #0F172A 0%, #334155 100%)",
    bgSoft: "#F8FAFC",
    accentGlow: "rgba(15, 23, 42, 0.12)",
    icon: "code-2",
    tagline: "Desarrollo web corporativo y plataformas de comercio electrónico de velocidad extrema y conversión.",
    hasPurchaseFlow: false,
    subSections: [
      {
        id: "diseno-web-ux",
        title: "Diseño Web & UX/UI",
        description: "Interfaces seductoras pensadas desde el primer clic para guiar a la compra.",
        items: [
          "Diseño y desarrollo web corporativo a medida",
          "Landing pages de alta conversión para pauta",
          "Micrositios para lanzamientos de producto y eventos",
          "Arquitectura de información y diseño UX/UI en Figma",
          "Diseño 100% Responsive con experiencia móvil nativa",
          "Rediseño y modernización de sitios obsoletos",
          "Optimización Core Web Vitals y velocidad de carga ultrarrápida"
        ]
      },
      {
        id: "ecommerce-platforms",
        title: "Ecommerce B2B & B2C",
        description: "Tiendas online robustas con pasarelas de pago seguras e inventarios sincronizados.",
        items: [
          "Desarrollo de tiendas online B2C y catálogos mayoristas B2B",
          "Integración de pasarelas de pago México (Stripe, Mercado Pago, PayPal)",
          "Configuración automatizada de envíos (Skydropx, Envia.com)",
          "Sistemas de reservaciones, membresías y suscripciones recurrentes",
          "Catálogos inteligentes con filtros dinámicos y búsqueda instantánea"
        ]
      },
      {
        id: "headless-integrations",
        title: "Wix Studio, Headless & APIs",
        description: "Arquitectura moderna que combina la agilidad de Wix Headless con la libertad de Vite y React.",
        items: [
          "Wix Studio & Wix Headless APIs",
          "Desarrollo con Velo y custom code",
          "Integración con WordPress, WooCommerce y Shopify",
          "Cotizadores online y formularios avanzados con lógica condicional",
          "Integraciones API con CRMs, ERPs y bases de datos personalizadas",
          "Mantenimiento proactivo, copias de seguridad y seguridad SSL"
        ]
      }
    ],
    stats: [
      { value: "0.8s", label: "Tiempo promedio de carga FCP" },
      { value: "99.9%", label: "Uptime en infraestructura Headless" },
      { value: "+120", label: "Websites y tiendas online lanzadas" }
    ]
  },
  {
    id: "seo",
    slug: "seo-posicionamiento",
    number: "04",
    title: "SEO & Posicionamiento",
    shortTitle: "SEO Orgánico",
    concept: "Haz que te encuentren justo cuando te están buscando.",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
    bgSoft: "#F0FDF4",
    accentGlow: "rgba(5, 150, 105, 0.15)",
    icon: "search",
    tagline: "Posicionamiento orgánico en Google, Search Console y los nuevos motores de búsqueda basados en IA.",
    hasPurchaseFlow: false,
    subSections: [
      {
        id: "seo-tecnico",
        title: "Estrategia & SEO Técnico",
        description: "Bases sólidas para que Google indexe, comprenda y premie tu contenido.",
        items: [
          "Auditorías SEO técnicas profundas y corrección de errores 404/301",
          "Investigación exhaustiva de palabras clave (Keyword Intent)",
          "Arquitectura de URL siloing y enlazado interno",
          "Datos estructurados Schema.org para rich snippets (estrellas, FAQ, producto)",
          "Indexación acelerada en Google Search Console y Bing",
          "SEO Local y optimización completa de Google Business Profile"
        ]
      },
      {
        id: "seo-ia-content",
        title: "Content SEO & Búsqueda IA (GEO)",
        description: "Dominio en resultados generativos de Google Gemini, Search GPT y Perplexity.",
        items: [
          "Generative Engine Optimization (GEO / Optimización para IA)",
          "Estrategia de redacción de artículos de blog orientados a intención de compra",
          "SEO por ciudades y zonas en México (CDMX, GDL, MTY, etc.)",
          "Estrategia de Link Building ético y menciones de autoridad de dominio",
          "Monitoreo semanal de posiciones y analítica de tráfico cualificado"
        ]
      }
    ],
    stats: [
      { value: "+210%", label: "Crecimiento de tráfico orgánico medio" },
      { value: "Top 3", label: "Rankings para términos de alta intención" },
      { value: "100%", label: "Alineación con directrices Google EEAT" }
    ]
  },
  {
    id: "produccion",
    slug: "produccion-digital",
    number: "05",
    title: "Producción Audiovisual & UGC",
    shortTitle: "Producción Digital",
    concept: "Contenido que conecta. Producción que convierte.",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
    bgSoft: "#FAF5FF",
    accentGlow: "rgba(124, 58, 237, 0.15)",
    icon: "video",
    tagline: "Fotografía publicitaria, video comercial cinematográfico, tomas con drone y creadores UGC para pauta.",
    hasPurchaseFlow: false,
    subSections: [
      {
        id: "video-comercial",
        title: "Producción de Video & Post",
        description: "Piezas cinematográficas que elevan el valor percibido de tu empresa.",
        items: [
          "Videos corporativos e institucionales de alto impacto",
          "Comerciales y video ads optimizados para Meta y TikTok Ads",
          "Reels, TikToks y videos de formato vertical con alto enganche",
          "Entrevistas, testimoniales de clientes reales y casos de éxito",
          "Edición profesional, color grading cinemático y sound design",
          "Motion Graphics y animaciones de logotipo en 2D/3D"
        ]
      },
      {
        id: "foto-drone",
        title: "Fotografía & Drone Aéreo",
        description: "Capturas de producto, retrato ejecutivo e instalaciones de categoría internacional.",
        items: [
          "Fotografía corporativa y retratos de equipo directivo",
          "Fotografía de producto en estudio para ecommerce y catálogos",
          "Fotografía lifestyle y tomas publicitarias de ambientación",
          "Tomas con drone en 4K (Pilotos certificados)",
          "Fotografía aérea para desarrollos inmobiliarios, naves y eventos"
        ]
      },
      {
        id: "creadores-ugc",
        title: "Contenido UGC (User Generated Content)",
        description: "La palanca número 1 de conversión para marcas en TikTok e Instagram Ads.",
        items: [
          "Red de creadores UGC seleccionados por vertical de producto",
          "Desarrollo de guiones publicitarios (Hooks, Problema, Solución, CTA)",
          "Unboxings, reviews y demostraciones de uso real",
          "Testimoniales genuinos con estética nativa de redes",
          "Adaptación de variantes de inicio (Hooks A/B testing) para pauta publicitaria"
        ]
      }
    ],
    stats: [
      { value: "4K 60fps", label: "Estándar de filmación cinematográfica" },
      { value: "+500", label: "Piezas de contenido UGC producidas" },
      { value: "3.2x", label: "Mayor CTR en anuncios con formato UGC" }
    ]
  },
  {
    id: "tecnologia",
    slug: "tecnologia-soluciones",
    number: "06",
    title: "Tecnología & Soluciones Digitales",
    shortTitle: "Tecnología & IA",
    concept: "La tecnología que separa a Dilo de una agencia tradicional.",
    color: "#0284C7",
    gradient: "linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)",
    bgSoft: "#F0F9FF",
    accentGlow: "rgba(2, 132, 199, 0.15)",
    icon: "cpu",
    tagline: "Automatización de procesos comerciales, integraciones CRM, arquitectura Headless y herramientas digitales a la medida.",
    hasPurchaseFlow: false,
    subSections: [
      {
        id: "automatizacion-crm",
        title: "Automatización de Ventas & CRM",
        description: "Sistemas que responden, cualifican y agendan prospectos en segundos sin intervención humana.",
        items: [
          "Funnels de captación conectados a WhatsApp CRM (Kommo, ManyChat)",
          "Integración de CRMs líderes (HubSpot, Zoho, Salesforce, Pipedrive)",
          "Calificación automática de leads y asignación a asesores comerciales",
          "Webhooks y automatizaciones con Make, Zapier y n8n",
          "Notificaciones instantáneas por Slack, Telegram y correo corporativo"
        ]
      },
      {
        id: "soluciones-custom",
        title: "Soluciones a Medida & Headless",
        description: "Desarrollo tecnológico que automatiza operaciones y escala negocios.",
        items: [
          "Arquitectura Headless desacoplada para ecommerce y portales",
          "Cotizadores interactivos en tiempo real con pasarela integrada",
          "Portales de clientes y áreas privadas de miembros",
          "Dashboards de inteligencia de negocios (BI) con Google Looker Studio",
          "Soluciones de automatización con agentes de IA y flujos conversacionales"
        ]
      }
    ],
    stats: [
      { value: "< 30s", label: "Tiempo de respuesta automatizada a leads" },
      { value: "85%", label: "Reducción de tareas operativas manuales" },
      { value: "100%", label: "Sincronización bidireccional de datos" }
    ]
  }
];
