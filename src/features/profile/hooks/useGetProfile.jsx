import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useParams } from "react-router-dom";

function useGetProfile() {
  const [professionalProfile, setProfessionalProfile] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;
    getProfileInformation();
  }, [slug]);

  const getProfileInformation = async () => {
    try {
      const response = await fetch(`${HOST}/professional/${slug}`);

      if (!response.ok) throw new Error();

      const data = await response.json();

      setProfessionalProfile(data);
    } catch (error) {
      setProfileError(true);
    } finally {
      setProfileLoading(false);
    }
  };

  return { professionalProfile, profileLoading, profileError };
}

export default useGetProfile;
