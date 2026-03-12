import { useState } from "react";
import SectionTitle from "../../../common/section-title/SectionTitle";
import { TESTIMONIALS, VIDEO_COUNT } from "../data/testimonials";
import "./Testimonials.css";

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () =>
    setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  return (
    <div className="testimonials__container">
      <SectionTitle title="Algunos Testimonios" />

      {/* Wave carousel */}
      <div className="testimonials__wave-section">
        <svg
          className="testimonials__wave-svg"
          viewBox="0 0 1440 430"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,75 C180,18 380,115 580,68 C780,21 980,95 1180,52 C1330,18 1400,58 1440,62
               L1440,388
               C1280,428 1080,372 880,402 C680,432 480,378 280,406 C140,425 55,392 0,398 Z"
            fill="rgba(107, 128, 112, 0.28)"
          />
        </svg>

        <div className="testimonials__slide">
          <button
            className="testimonials__arrow"
            onClick={prev}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div className="testimonials__card">
            <div className="testimonials__photo-wrapper">
              <img
                src={t.photo}
                alt={t.name}
                className="testimonials__photo"
              />
            </div>

            <h2 className="testimonials__name">{t.name}</h2>
            <p className="testimonials__text">{t.text}</p>
            <p className="testimonials__occupation">{t.occupation}</p>

            <div className="testimonials__dots">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot${i === current ? " testimonials__dot--active" : ""}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className="testimonials__arrow"
            onClick={next}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>
      </div>

      {/* Video thumbnails */}
      <div className="testimonials__videos">
        {Array.from({ length: VIDEO_COUNT }).map((_, i) => (
          <div key={i} className="testimonials__video-card">
            <div className="testimonials__play-btn">
              <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
