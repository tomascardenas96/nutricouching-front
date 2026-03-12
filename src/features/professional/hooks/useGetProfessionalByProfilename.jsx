import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../auth/api/apiClient";

function useGetProfessionalByProfilename() {
  const [professional, setProfessional] = useState({});
  const [professionalLoading, setProfessionalLoading] = useState(true);
  const [professionalError, setProfessionalError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;
    getProfessionalInformation();
  }, [slug]);

  const getProfessionalInformation = async () => {
    try {
      const { data } = await apiClient.get(`/professional/profilename/${slug}`);
      setProfessional(data);
    } catch (error) {
      setProfessionalError(true);
    } finally {
      setProfessionalLoading(false);
    }
  };

  return {
    professional,
    setProfessional,
    professionalLoading,
    professionalError,
  };
}

export default useGetProfessionalByProfilename;
