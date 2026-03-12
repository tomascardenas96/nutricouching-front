import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDownloadPlan() {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadPlan = async (planId) => {
    setDownloadLoading(true);

    try {
      const { data } = await apiClient.get(`/plan/${planId}/download`);

      // Convertir la respuesta a un Blob (archivo binario)
      const { downloadUrl } = data;

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
