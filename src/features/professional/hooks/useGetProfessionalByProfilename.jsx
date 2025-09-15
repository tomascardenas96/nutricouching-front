import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HOST } from "../../../api/data";

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
      const response = await fetch(`${HOST}/professional/profilename/${slug}`);

      if (!response.ok) throw new Error();

      const data = await response.json();

      console.log(data)

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
