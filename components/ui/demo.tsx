"use client";

import { WorksWheel, type WorksWheelItem } from "./works-wheel";

// Portfolio art tailored to Dilo Digital Insignia Cases
const WORKS: WorksWheelItem[] = [
  {
    title: "Aurora Joyería Contemporánea",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=branding",
  },
  {
    title: "Lúmina Studio Arquitectura",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=web-ecommerce",
  },
  {
    title: "FitFuel Nutrition México",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=marketing",
  },
  {
    title: "Altus Logística & Cargo",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=seo",
  },
  {
    title: "Residencial Bosque del Valle",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=produccion",
  },
  {
    title: "Nexus Capital Private Wealth",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=tecnologia",
  },
  {
    title: "Nómada Coffee Roasters",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=branding",
  },
  {
    title: "Vesta Living Mobiliario 3D",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    href: "#/portafolio?cat=web-ecommerce",
  },
];

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Casos '26" action="Ver Caso" />
    </div>
  );
}
