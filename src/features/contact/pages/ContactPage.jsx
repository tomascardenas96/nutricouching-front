import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import "./ContactPage.css";

const SOCIAL_LINKS = [
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
  { icon: <FaFacebookF />, href: "#", label: "Facebook" },
  { icon: <FaTiktok />, href: "#", label: "TikTok" },
  { icon: <FaXTwitter />, href: "#", label: "X / Twitter" },
];

const INFO = [
  {
    num: "01",
    label: "Email",
    value: "contacto@cohesivasalud.com",
    href: "mailto:contacto@cohesivasalud.com",
  },
  {
    num: "02",
    label: "Teléfono",
    value: "+54 11 0000-0000",
    href: "tel:+541100000000",
  },
  {
    num: "03",
    label: "Ubicación",
    value: "Buenos Aires, Argentina",
    href: null,
  },
  {
    num: "04",
    label: "Horarios",
    value: "Lun – Vie · 9:00 – 18:00",
    href: null,
  },
];

const EMPTY = { name: "", email: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setForm(EMPTY);
    toast.success("Mensaje enviado. ¡Te responderemos pronto!");
  };

  return (
    <div className="cp">
      <Helmet>
        <title>Contacto | Cohesiva Salud</title>
      </Helmet>

      {/* ── Panel izquierdo ── */}
      <aside className="cp__panel">
        <div className="cp__panel-inner">
          <span className="cp__eyebrow">Cohesiva Salud · Contacto</span>

          <h1 className="cp__title">Hablemos.</h1>

          <p className="cp__lead">
            Contanos en qué podemos acompañarte. Estamos disponibles para
            responder tus consultas en menos de 24 horas.
          </p>

          <ul className="cp__info">
            {INFO.map(({ num, label, value, href }) => (
              <li key={num} className="cp__info-item">
                <span className="cp__info-num">{num}</span>
                <div>
                  <p className="cp__info-label">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="cp__info-value cp__info-value--link"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="cp__info-value">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <div className="cp__divider" />

          <div className="cp__social">
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="cp__social-icon"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </aside>

      {/* ── Panel derecho (formulario) ── */}
      <section className="cp__form-section">
        <div className="cp__form-inner">
          <header className="cp__form-header">
            <p className="cp__form-eyebrow">Formulario de contacto</p>
            <h2 className="cp__form-title">Envianos tu consulta</h2>
          </header>

          <form className="cp__form" onSubmit={handleSubmit}>
            <div className="cp__row">
              <div className="cp__field" style={{ "--delay": "0.05s" }}>
                <label htmlFor="cp-name">Nombre</label>
                <div className="cp__input-wrap">
                  <input
                    id="cp-name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="cp__field" style={{ "--delay": "0.1s" }}>
                <label htmlFor="cp-email">Email</label>
                <div className="cp__input-wrap">
                  <input
                    id="cp-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="cp__field" style={{ "--delay": "0.15s" }}>
              <label htmlFor="cp-subject">Asunto</label>
              <div className="cp__input-wrap">
                <input
                  id="cp-subject"
                  name="subject"
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="cp__field" style={{ "--delay": "0.2s" }}>
              <label htmlFor="cp-message">Mensaje</label>
              <div className="cp__input-wrap">
                <textarea
                  id="cp-message"
                  name="message"
                  rows={5}
                  placeholder="Contanos con detalle tu consulta..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`cp__submit${sending ? " cp__submit--sending" : ""}`}
              disabled={sending}
              style={{ "--delay": "0.25s" }}
            >
              <span className="cp__submit-text">
                {sending ? "Enviando..." : "Enviar mensaje"}
              </span>
              <span className="cp__submit-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
