import {MatchEntity} from "types";
import React, {createContext, ReactNode, useContext, useState} from "react";

interface RecordContextProps {
    allRecords: MatchEntity[];
    fetchRecords: () => Promise<void>;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}


export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const [allRecords, setAllRecords] = useState<MatchEntity[]>([]);

    const fetchRecords = async () => {
        try {
            const response = await fetch('http://localhost:3001/match');
            const data = await response.json();
            setAllRecords(data.sortedData);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const contextValue: RecordContextProps = {
        allRecords,
        fetchRecords,
    };

    return (
        <RecordContext.Provider value={contextValue}>
            {children}
        </RecordContext.Provider>
    )
}

export const useRecordContext = (): RecordContextProps => {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error('useRecordContext must be used within a RecordProvider');
    }
    return context;
};
