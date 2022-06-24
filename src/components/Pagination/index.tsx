import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onPageChange: any;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
}) => {
  return (
    <div>
      <ReactPaginate
        className={styles.paginate}
        breakLabel='...'
        nextLabel='>'
        onPageChange={(event) => onPageChange(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel='<'
      />
    </div>
  );
};

export default Pagination;
