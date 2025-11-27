import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";

const TermsAndConditionHero = () => {
  return (
    <div className="w-full h-[400px] relative font-Nunito">
      <img
        src={IMAGES.termsAndConditionHero}
        alt=""
        className="w-full h-full top-0 left-0 absolute bottom-0 right-0 object-cover"
      />
      <div className="bg-primary-50 opacity-20 w-full h-full top-0 left-0 absolute bottom-0 right-0"></div>
      <div className="w-full h-full flex items-center justify-center">
        <Container>
          <div className="flex flex-col items-center justify-center relative z-10 h-full">
            <h1
              className={`text-2xl lg:text-[44px] font-semibold lg:font-bold text-white leading-8 lg:leading-12 text-center`}
            >
              Terms and Conditions
            </h1>
            <p
              className={`mt-4 text-neutral-50 text-lg leading-[24px] max-w-[749px] text-center mx-auto`}
            >
              Please read our terms and conditions, as they outline the official rules and important guidelines for using our website, services.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TermsAndConditionHero;
