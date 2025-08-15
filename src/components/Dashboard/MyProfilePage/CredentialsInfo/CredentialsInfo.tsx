type TCredential = {
  documentType: string;
  imageUrl: string;
};

// Props type
type TCredentialsInfoProps = {
  credentialInfo: TCredential[];
};

const CredentialsInfo: React.FC<TCredentialsInfoProps> = ({ credentialInfo }) => {
  return (
    <div className="font-Nunito">
      <h1 className="text-neutral-5 font-semibold text-2xl">
        Credentials Information
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {
            credentialInfo?.length === 0 ? <h2 className="text-red-500">No Credentials Found</h2> :
        credentialInfo?.map((info:TCredential) => (
          <div key={info?.documentType}>
            <h2 className="text-neutral-5 font-bold text-lg mb-2">
              {info?.documentType}
            </h2>
            <div className="border border-neutral-45/30 border-dashed rounded-2xl p-2 h-[300px]">
              <img src={info?.imageUrl} alt={info?.documentType} className="h-full w-full object-contain" />
            </div>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default CredentialsInfo;
