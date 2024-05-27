import { useContext } from "react";
import { RecordContext, RecordContextProps } from "./RecordProvider";

export const useRecordContext = (): RecordContextProps => {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error('useRecordContext must be used within a RecordProvider');
    }
    return context;
};
