"use client"
import Button from "@/app/components/Button";
import StarModal from "@/app/components/modals/StarModal";
import useStarModal from "@/app/hooks/useStarModal";

interface starheaderProps {

    
}
 
const starheader: React.FC<starheaderProps> = () => {
    const starModal = useStarModal();
    return (
      <div className="flex gap">
        <StarModal />
        <div className="bg-primary w-2/3"></div>
        <div className="w-1/3">
          <Button label="AddStar" onClick={starModal.onOpen} />
        </div>
      </div>
    );
}
 
export default starheader;