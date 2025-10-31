import { useState } from "react";
import ProfileTabHeading from "../../../Reusable/ProfileTabHeading/ProfileTabHeading";
import Modal from "../../../Reusable/Modal/Modal";
import UpdateCredentialsInfoModal from "./UpdateEducationalInfoModal";

type TCredential = {
  documentType: string;
  imageUrl: string;
};

// Props type
type TCredentialsInfoProps = {
  identityInformation: TCredential[];
};

const CredentialsInfo: React.FC<TCredentialsInfoProps> = ({
  identityInformation,
}) => {
  console.log(identityInformation);
   const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  return (
    <div className="font-Nunito">
      <ProfileTabHeading
        heading="Credentials Information"
        onClick={() => setIsFormModalOpen(!isFormModalOpen)}
      />

      <h2 className="text-red-500 text-sm md:text-base mt-4">
        No Credentials Uploaded.
      </h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {
            identityInformation?.length === 0 ? <h2 className="text-red-500 text-sm md:text-base">No Credentials Found</h2> :
        identityInformation?.map((info:TCredential) => (
          <div key={info?.documentType}>
            <h2 className="text-neutral-5 font-semibold lg:font-bold text-sm lg:text-lg mb-2">
              {info?.documentType}
            </h2>
            <div className="border border-neutral-45/30 border-dashed rounded-2xl p-2 h-[300px]">
              <img src={info?.imageUrl} alt={info?.documentType} className="h-full w-full object-contain" />
            </div>
          </div>
        ))
        }
      </div> */}

      <Modal
        heading="Add/Update Credential Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[90%] md:w-[35%] max-h-[600px] overflow-y-auto"
      >
        <UpdateCredentialsInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
          defaultValues={identityInformation}
        />
      </Modal>
    </div>
  );
};

export default CredentialsInfo;
