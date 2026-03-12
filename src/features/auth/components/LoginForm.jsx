import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./AuthForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <h1 className="auth-card__title">Bienvenido</h1>
          <p className="auth-card__subtitle">Iniciá sesión para continuar</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              autoComplete="email"
            />
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
              autoComplete="current-password"
            />
          </div>

          {error && <p className="auth-form__global-error">{error}</p>}

          <button type="submit" className="auth-form__submit" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-card__footer">
          ¿No tenés cuenta?{" "}
          <Link to="/register">Registrate gratis</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
