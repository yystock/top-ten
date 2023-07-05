import getStarById from "@/app/actions/getStarById";
import StarForm from "@/components/StarForm";

interface IParams {
  starId: string;
}

const EditStar = async ({ params }: { params: IParams }) => {
  const starId = params.starId;
  const star = await getStarById(parseInt(starId));
  if (!star) {
    return null;
  }
  return (
    <div>
      <StarForm star={star} />
    </div>
  );
};

export default EditStar;
