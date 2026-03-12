import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../auth/api/apiClient";

function useGetProfileByName() {
  const [profile, setProfile] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    if (!slug) return;
    getProfileInformation();
  }, [slug]);

  const getProfileInformation = async () => {
    try {
      const { data } = await apiClient.get(`/profile/name/${slug}`);
      setProfile(data);
    } catch (error) {
      setProfileError(true);
    } finally {
      setProfileLoading(false);
    }
  };

  return { profile, setProfile, profileLoading, profileError };
}

export default useGetProfileByName;
