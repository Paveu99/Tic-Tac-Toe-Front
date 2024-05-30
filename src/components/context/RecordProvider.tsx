import { MatchEntity } from "types";
import React, { createContext, ReactNode, useState } from "react";

export interface RecordContextProps {
    allRecords: MatchEntity[];
    loading: boolean;
    error: string | null;
    fetchRecords: () => Promise<void>;
}

export const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const [allRecords, setAllRecords] = useState<MatchEntity[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRecords = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://192.168.68.107:3001/match');
            const data = await response.json();
            setAllRecords(data.sortedData);
        } catch (error) {
            console.error('Error fetching records:', error);
            setError('Failed to fetch records');
        } finally {
            setLoading(false);
        }
    };

    const contextValue: RecordContextProps = {
        allRecords,
        loading,
        error,
        fetchRecords,
    };

    return (
        <RecordContext.Provider value={contextValue}>
            {children}
        </RecordContext.Provider>
    );
};
