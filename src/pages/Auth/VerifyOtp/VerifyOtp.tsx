import { IMAGES } from "../../../assets";
import VerifyOtpForm from "../../../components/AuthPage/VerifyOtpPage/VerifyOtpForm/VerifyOtpForm";
import Container from "../../../components/Reusable/Container/Container";


const VerifyOtp = () => {
    return (
        <Container>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-10 lg:mt-20 mb-72 lg:mb-96">
        <div className="w-full lg:w-[50%] min-h-full flex items-center justify-center">
          <img src={IMAGES.verifyOtp} />
        </div>
        <div className="w-full lg:w-[50%]">
          <VerifyOtpForm/>
        </div>
      </div>
    </Container>
    );
};

export default VerifyOtp;