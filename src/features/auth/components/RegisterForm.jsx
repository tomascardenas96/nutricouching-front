import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "../api/authApi";
import "./AuthForm.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

function validate(formData) {
  const errors = {};

  if (formData.name.trim().length < 2)
    errors.name = "El nombre debe tener al menos 2 caracteres.";

  if (formData.lastname.trim().length < 2)
    errors.lastname = "El apellido debe tener al menos 2 caracteres.";

  if (!EMAIL_REGEX.test(formData.email))
    errors.email = "Ingresá un email válido.";

  if (!PASSWORD_REGEX.test(formData.password))
    errors.password = "Mínimo 8 caracteres, una mayúscula y un número.";

  return errors;
}

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      await authApi.register(formData);
      toast.success("Cuenta creada. Revisá tu email para confirmarla.");
      navigate("/login");
    } catch {
      toast.error("Error al crear la cuenta. Intentá de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Crear cuenta</h1>
          <p className="auth-card__subtitle">Completá tus datos para registrarte</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__row">
            <div className="auth-field">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Juan"
                className={errors.name ? "auth-field--error" : ""}
                autoComplete="given-name"
              />
              {errors.name && <span className="auth-field__error">{errors.name}</span>}
            </div>

            <div className="auth-field">
              <label htmlFor="lastname">Apellido</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Pérez"
                className={errors.lastname ? "auth-field--error" : ""}
                autoComplete="family-name"
              />
              {errors.lastname && <span className="auth-field__error">{errors.lastname}</span>}
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={errors.email ? "auth-field--error" : ""}
              autoComplete="email"
            />
            {errors.email && <span className="auth-field__error">{errors.email}</span>}
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? "auth-field--error" : ""}
              autoComplete="new-password"
            />
            {errors.password && <span className="auth-field__error">{errors.password}</span>}
          </div>

          <button type="submit" className="auth-form__submit" disabled={isLoading}>
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
