import React, { createContext, useContext, useState } from 'react';

type VolunteerContextType = {
  isVolunteer: boolean;
  setVolunteerStatus: (status: boolean) => void;
};

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export function VolunteerProvider({ children }: { children: React.ReactNode }) {
  const [isVolunteer, setIsVolunteer] = useState(false);

  const setVolunteerStatus = (status: boolean) => {
    setIsVolunteer(status);
  };

  return (
    <VolunteerContext.Provider value={{ isVolunteer, setVolunteerStatus }}>
      {children}
    </VolunteerContext.Provider>
  );
}

export function useVolunteer() {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error('useVolunteer must be used within a VolunteerProvider');
  }
  return context;
}
