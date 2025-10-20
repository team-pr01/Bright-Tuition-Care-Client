import { useLocation } from "react-router-dom";
import { IMAGES } from "../../../assets";
import ResetPasswordForm from "../../../components/AuthPage/ResetPasswordPage/ResetPasswordForm/ResetPasswordForm";
import Container from "../../../components/Reusable/Container/Container";

const ResetPassword = () => {
  const location = useLocation();

  // Access the state
  const navigatedFrom = location.state?.navigateFrom;
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-20 mb-72 lg:mb-96">
        <div className="w-full lg:w-[50%] min-h-full flex items-center justify-center">
          <img src={IMAGES.resetPassword} />
        </div>
        <div className="w-full lg:w-[50%]">
          <ResetPasswordForm isNavigatedFromVerifyOtp={navigatedFrom=="verify-otp"?true:false} />
        </div>
      </div>
    </Container>
  );
};

export default ResetPassword;
