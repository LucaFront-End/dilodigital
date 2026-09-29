"use client";
import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-xs w-full bg-card"
                  key={i}
                >
                  <div className="text-sm leading-relaxed text-foreground/90">{text}</div>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover border"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-sm">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-xs">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

export const testimonials: TestimonialItem[] = [
  {
    text: "Pasamos de 1.8x a más de 5.4x de ROAS en 90 días con sus funnels automatizados de WhatsApp y Meta Ads.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    name: "Mauricio Treviño",
    role: "CEO · FitFuel",
  },
  {
    text: "El rediseño de identidad y el registro ante el IMPI nos dieron presencia internacional inmediata sin trabas.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=80",
    name: "Sofía Delgado",
    role: "Fundadora · Aurora Jewelry",
  },
  {
    text: "Velocidad récord de 0.7s FCP y diseño editorial. Nuestras solicitudes de cotización aumentaron un 240%.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    name: "Roberto Aguilar",
    role: "Director de Operaciones · Lúmina",
  },
  {
    text: "Top 3 en Google para fletes internacionales y logística aduanal en menos de 6 meses. Leads constantes.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    name: "Valeria Morales",
    role: "Directora Comercial · Altus Logística",
  },
  {
    text: "La producción de video 4K y reels redujo nuestro ciclo de venta inmobiliario de 6 meses a solo 45 días.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    name: "Carlos Villaseñor",
    role: "Socio Fundador · Bosque del Valle",
  },
  {
    text: "El onboarding digital de clientes pasó de 5 días a solo 12 minutos con contratos y firma electrónica.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80",
    name: "Fernanda Castillo",
    role: "Head of Growth · Nexus Wealth",
  },
  {
    text: "Sensibilidad estética de clase mundial sin perder la solidez ejecutiva que exigen nuestros clientes B2B.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80",
    name: "Alejandro Gómez",
    role: "Managing Director · Kroma Studio",
  },
  {
    text: "Los videos UGC triplicaron nuestro CTR en TikTok e Instagram. La recompra en tienda online nunca estuvo tan alta.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=240&q=80",
    name: "Mariana Orozco",
    role: "Directora E-commerce · Terra Viva",
  },
  {
    text: "Blindaron 4 de nuestras marcas en clases NIZA con un rigor legal impecable. Atención personalizada de 10.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80",
    name: "Santiago Ramos",
    role: "Chief Investment Officer · Apex Capital",
  },
];

export const firstColumn = testimonials.slice(0, 3);
export const secondColumn = testimonials.slice(3, 6);
export const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="border border-border/80 py-1 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Testimonios
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mt-5">
            Lo que dicen quienes confían en Dilo
          </h2>
          <p className="text-center mt-3 text-sm md:text-base opacity-75">
            Fundadores y líderes de negocios que transformaron su presencia digital.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
