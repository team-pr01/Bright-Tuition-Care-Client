
const AuthHeading = ({title, description} : {title: string; description: string}) => {
  return (
    <div>
      <h1
        className={`text-2xl lg:text-[30px] font-semibold lg:font-bold text-primary-10 leading-8 lg:leading-12 capitalize text-center`}
      >
        {title}
      </h1>
      <p className="text-sm text-neutral-10 text-center max-w-full lg:max-w-[600px] mx-auto">
        {description}
      </p>
    </div>
  );
};

export default AuthHeading;
