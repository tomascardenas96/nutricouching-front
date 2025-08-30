import { useState } from "react";
import { toast } from "sonner";
import { HOST } from "../../../api/data";

function useDownloadResource() {
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownloadResource = async (resourceId) => {
    const token = localStorage.getItem("authToken");
    setDownloadLoading(true);

    try {
      const response = await fetch(`${HOST}/resource/${resourceId}/download`, {
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
