import { useEffect, useMemo } from "react";
import { Table } from "../components/leaderboard/Table";
import { useRecordContext } from "../components/context/useRecordContext";

export const LeaderboardPage = () => {
    const { allRecords, loading, error, fetchRecords } = useRecordContext();

    useEffect(() => {
        fetchRecords();
    }, []);

    const memoizedData = useMemo(() => allRecords, [allRecords]);

    if (loading) {
        return <div className="page_view">Loading...</div>;
    }

    if (error) {
        return <div className="page_view">Error: {error}</div>;
    }

    return (
        <div className="page_view">
            <Table records={memoizedData} />
        </div>
    );
};
