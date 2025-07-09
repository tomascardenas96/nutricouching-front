import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useParams } from "react-router-dom";

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
      const response = await fetch(`${HOST}/profile/name/${slug}`);

      if (!response.ok) throw new Error();

      const data = await response.json();

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
