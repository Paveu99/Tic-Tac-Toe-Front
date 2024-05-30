import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MatchEntity } from "types";
import { SingleElement } from "./SingleElement";
import "../styles/Pagination.scss";
import "../styles/LeaderboardPage.scss"

interface Props {
    records: MatchEntity[]
}

export const Table = ({ records }: Props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const offset = currentPage * itemsPerPage;
    const currentRecords = records.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(records.length / itemsPerPage);

    return (
        <div className="table">
            <div className="records">
                {currentRecords.map((el,index) => (
                    <SingleElement index={itemsPerPage*(currentPage)+(index+1)} record={el} key={el.id} />
                ))}
            </div>
            <ReactPaginate
                previousLabel={"\u2190"}
                nextLabel={"\u2192"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </div>
    );
};
