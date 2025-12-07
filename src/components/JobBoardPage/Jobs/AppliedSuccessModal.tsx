import Button from "../../Reusable/Button/Button";

const AppliedSuccessModal = () => {
    return (
       <div className="w-full flex items-center justify-center flex-col text-center">
          <div className="bg-green-50 p-5 rounded-2xl">
            <h1 className="text-green-600 text-xl md:text-4xl font-black leading-7 md:leading-11">
            Applied <br /> Successfully!
          </h1>
          </div>
          <p className="text-neutral-20 text-sm md:text-lg leading-6 mt-3">
           Note: Our Executive review your profile , we contact with you  if your profile matches this tuition job requirement
          </p>
          <div className="mt-4 lg:mt-8 flex justify-center gap-5">
            <Button
              label="Undo Application"
              variant="secondary"
              iconBg="#0D99FF"
              className="border border-neutral-55"
            />
          </div>
        </div>
    );
};

export default AppliedSuccessModal;