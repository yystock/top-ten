import getUserById from "@/app/(admin)/actions/getUserById";
import UserForm from "@/components/UserForm";

interface IParams {
  userId: string;
}

const EditUser = async ({ params }: { params: IParams }) => {
  const userId = params.userId;
  const user = await getUserById(userId);
  if (!user) {
    return null;
  }
  return (
    <div>
      <UserForm user={user} />
    </div>
  );
};

export default EditUser;
