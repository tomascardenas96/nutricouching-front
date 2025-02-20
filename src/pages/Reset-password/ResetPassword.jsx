import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useResetPassword from "../../hooks/useResetPassword";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");

  const { handleResetPassword } = useResetPassword();

  return (
    <section>
      <form onSubmit={(e) => handleResetPassword(e, tokenParam, newPassword)}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input type="submit" value="Guardar" />
      </form>
    </section>
  );
}

export default ResetPassword;
