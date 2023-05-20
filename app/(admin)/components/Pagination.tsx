
import PaginationItem from "./PaginationItem";
import { useCallback } from "react";


interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}
 const range = (start: number, end: number) => {
   return Array.from({ length: end }, (_, index) => index + start);
 };

 type PageCutProps = {
    pagesCount: number;
    pagesCutCount: number;
    currentPage: number;
 }

 const getPagesCut = ({ pagesCount, pagesCutCount, currentPage }: PageCutProps) => {
   const ceiling = Math.ceil(pagesCutCount / 2);
   const floor = Math.floor(pagesCutCount / 2);

   if (pagesCount < pagesCutCount) {
     return { start: 1, end: pagesCount + 1 };
   } else if (currentPage >= 1 && currentPage <= ceiling) {
     return { start: 1, end: pagesCutCount + 1 };
   } else if (currentPage + floor >= pagesCount) {
     return { start: pagesCount - pagesCutCount + 1, end: pagesCount + 1 };
   } else {
     return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
   }
 };

const Pagination: React.FC<PaginationProps> = ({ currentPage, total, limit, onPageChange }) => {
  

  const pagesCount = Math.ceil(total / limit);
  const pagesCut = getPagesCut({ pagesCount, pagesCutCount: 5, currentPage });
  const pages = range(pagesCut.start, pagesCut.end);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  return (
    <>
      <div className="flex gap-2">
        <PaginationItem page="First" currentPage={currentPage} onPageChange={() => onPageChange(1)} isDisabled={isFirstPage} />
        <PaginationItem page="Prev" currentPage={currentPage} onPageChange={() => onPageChange(currentPage - 1)} isDisabled={isFirstPage} />
        {pages.map((page) => (
          <PaginationItem page={page} key={page} currentPage={currentPage} onPageChange={onPageChange} />
        ))}
        <PaginationItem page="Next" currentPage={currentPage} onPageChange={() => onPageChange(currentPage + 1)} isDisabled={isLastPage} />
        <PaginationItem page="Last" currentPage={currentPage} onPageChange={() => onPageChange(pages.length)} isDisabled={isLastPage} />
      </div>
    </>
  );
};

export default Pagination;
