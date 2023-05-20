
"use client"
import { useState } from "react";
import Pagination from "./Pagination";
import { User } from "@prisma/client";


interface UserTableProps {
    users: User[]
}
 
const UserTable: React.FC<UserTableProps> = ({users}) => {
    const [currentPage, setCurrentPage] = useState(1);
   
    return (
      <>
        <Pagination currentPage={currentPage} total={users.length} limit={1} onPageChange={(page) => setCurrentPage(page)} />;
      </>
    );
}
 
export default UserTable;