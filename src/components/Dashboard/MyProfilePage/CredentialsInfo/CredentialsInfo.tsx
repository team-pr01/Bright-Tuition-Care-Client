import { useState } from "react";
import ProfileTabHeading from "../../../Reusable/ProfileTabHeading/ProfileTabHeading";
import Modal from "../../../Reusable/Modal/Modal";
import UpdateCredentialsInfoModal from "./UpdateEducationalInfoModal";
import ProgressBars from "../EducationalInfo/ProgrerssBar";
import TutorsIdentityInfo from "../../../Shared/TutorsIdentityInfo/TutorsIdentityInfo";
import type { TIdentityInformation } from "../../../../types/tutor.types";

type TCredentialsInfoProps = {
  identityInformation: TIdentityInformation[];
  isProfileLocked: boolean;
};

const CredentialsInfo: React.FC<TCredentialsInfoProps> = ({
  identityInformation,
  isProfileLocked,
}) => {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);


  const credentialStatusBars = [
    {
      label: "Credential 1",
      isFilled: identityInformation?.length > 0 ? true : false,
    },
    {
      label: "Credential 2",
      isFilled: identityInformation?.length > 1 ? true : false,
    },
    {
      label: "Credential 3",
      isFilled: identityInformation?.length > 2 ? true : false,
    },
  ];

  const uploadedFileTypes = identityInformation?.map(
    (item: TIdentityInformation) => item?.fileType
  );

  return (
    <div className="font-Nunito flex flex-col gap-5">
      <ProfileTabHeading
        heading="Credentials Information"
        onClick={() => setIsFormModalOpen(!isFormModalOpen)}
        isProfileLocked={isProfileLocked}
        btnText={
          identityInformation?.length < 1
            ? "Add Credentials Info"
            : "Add More Credentials"
        }
      />

      <ProgressBars bars={credentialStatusBars} />

      <TutorsIdentityInfo identityInformation={identityInformation} variant="tutor" />

      {/* Add/Update Credentials Modal */}
      <Modal
        heading="Add / Update Credential Information"
        isModalOpen={isFormModalOpen}
        setIsModalOpen={setIsFormModalOpen}
        width="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%] max-h-[600px] overflow-y-auto"
      >
        <UpdateCredentialsInfoModal
          setIsFormModalOpen={setIsFormModalOpen}
          uploadedFileTypes={uploadedFileTypes as string[]}
        />
      </Modal>
    </div>
  );
};

export default CredentialsInfo;
