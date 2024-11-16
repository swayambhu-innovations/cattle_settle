import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import { useEffect, useState, createContext, useContext, ReactNode } from "react";

const client = generateClient<Schema>();

export interface VolunteerData {
  type: 'Casualty' | 'Donation' | 'Flocking' | 'Garbage' | 'Adoption';
  data: any;
}

interface VolunteerContextType {
  data: VolunteerData[];
  loading: boolean;
  error: Error | null;
}

const VolunteerContext = createContext<VolunteerContextType | undefined>(undefined);

export function VolunteerProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<VolunteerData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casualties, donations, flockings, garbages, adoptions] = await Promise.all([
          client.models.Casualty.list(),
          client.models.Donation.list(),
          client.models.Flocking.list(),
          client.models.Garbage.list(),
          client.models.Adoption.list(),
        ]);

        const formattedData: VolunteerData[] = [
          ...casualties.data.map(item => ({ type: 'Casualty' as const, data: item })),
          ...donations.data.map(item => ({ type: 'Donation' as const, data: item })),
          ...flockings.data.map(item => ({ type: 'Flocking' as const, data: item })),
          ...garbages.data.map(item => ({ type: 'Garbage' as const, data: item })),
          ...adoptions.data.map(item => ({ type: 'Adoption' as const, data: item })),
        ];

        setData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <VolunteerContext.Provider value={{ data, loading, error }}>
      {children}
    </VolunteerContext.Provider>
  );
}

export const useVolunteerData = () => {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error('useVolunteerData must be used within a VolunteerProvider');
  }
  return context;
};
