import { useEffect, useMemo } from "react";
import { Table } from "../components/leaderboard/Table";
import { useRecordContext } from "../components/context/useRecordContext";
import "../components/styles/LeaderboardPage.scss";

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
        <div>
            <h1 style={{textAlign: "center"}}>All the results</h1>
            <div className="leaderboard_page_view" style={{flexDirection: "column"}}>
                <Table records={memoizedData}/>
            </div>
        </div>
    );
};
