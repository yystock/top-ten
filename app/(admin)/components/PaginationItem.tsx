
interface PaginationItemProps {
  page: number | string;
  currentPage: number;
  isDisabled?: boolean;
  onPageChange: (page: number) => void;

}

export default function PaginationItem({page, currentPage, onPageChange, isDisabled}: PaginationItemProps) {
  return (
    <>
      <li className={`
      ${page == currentPage? "text-blue" : "text-slate-500"}`} 
        onClick={() => onPageChange}>
        <span className="page-link">{page}</span>
      </li>

    </>
  );
}
