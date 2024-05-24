import {useRecordContext} from "../components/context/RecordProvider.tsx";
import {useEffect, useMemo} from "react";
import {Table} from "../components/leaderboard/Table.tsx";

export const LeaderboardPage = () => {

    const {allRecords, fetchRecords} = useRecordContext();

    useEffect(() => {
        fetchRecords();
    }, []);

    const memoizedData = useMemo(() => allRecords, [allRecords]);
    
    return <div>
        <Table records={memoizedData}/>
    </div>
}