import React, { useState, useContext, useMemo } from 'react';

const ProfileContext = React.createContext({});

function ProfileProvider(props) {
  const [ profile, setProfile ] = useState({});

  const value = useMemo(() => {
    return { 
      profile, 
      setProfile
    }
  }, [ profile ]);

  return <ProfileContext.Provider value={value} {...props} />;
}

function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  const { profile, setProfile } = context;

  function addProfileData(data) {
    setProfile({
      ...profile,
      ...data 
    });
  }

  return {
    profile,
    addProfileData
  }
}

export {
  ProfileProvider,
  useProfile
};
