import { Sparkles, WandSparkles } from "lucide-react";

export default function HeroCard({ title, subtitle, quote }) {
  return (
    <section className="hero-card">
      <img
        src="/hero-illustration.svg"
        alt="Decorative calendar artwork"
        className="hero-card__image"
      />
      <div className="hero-card__overlay">
        <div className="hero-chip">
          <Sparkles size={14} />
          <span>Seasonal Moodboard</span>
        </div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <blockquote>
          <WandSparkles size={14} />
          {quote}
        </blockquote>
      </div>
    </section>
  );
}
