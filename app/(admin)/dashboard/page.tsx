import getUsers from "../actions/getUsers";
import UserTable from "../components/UserTable";
const Dashboard = async () => {
  
  const users = await getUsers()
  return (
    <div className="container">
        <UserTable users={users}/>
    </div>
  );
};

export default Dashboard;
