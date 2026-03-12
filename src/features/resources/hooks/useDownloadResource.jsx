import { useState } from "react";
import { toast } from "sonner";
import apiClient from "../../auth/api/apiClient";

function useDownloadResource() {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadResource = async (resourceId) => {
    setDownloadLoading(true);

    try {
      const { data } = await apiClient.get(`/resource/${resourceId}/download`);

      // Convertir la respuesta a un Blob (archivo binario)
      const { downloadUrl } = data;

      // Crear un enlace temporal para descargar el archivo
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `resource-${resourceId}.pdf`; // Nombre del archivo
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      toast.error("Ocurrio un error al descargar el recurso");
    } finally {
      setDownloadLoading(false);
    }
  };

  return { handleDownloadResource, downloadLoading };
}

export default useDownloadResource;
