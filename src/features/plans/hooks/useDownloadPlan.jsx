import React, { useState } from "react";
import { HOST } from "../../../api/data";
import { toast } from "sonner";

function useDownloadPlan() {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadPlan = async (planId) => {
    const token = localStorage.getItem("authToken");
    setDownloadLoading(true);

    try {
      const response = await fetch(`${HOST}/plan/${planId}/download`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al descargar el archivo");
      }

      // Convertir la respuesta a un Blob (archivo binario)
      const { downloadUrl } = await response.json();

      // Crear un enlace temporal para descargar el archivo
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `plan-${planId}.pdf`; // Nombre del archivo
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error("Ocurrio un error al descargar el plan");
    } finally {
      setDownloadLoading(false);
    }
  };

  return { handleDownloadPlan, downloadLoading };
}

export default useDownloadPlan;
