import { IMAGES } from "../../../assets";
import ForgotPasswordForm from "../../../components/AuthPage/ForgotPasswordPage/ForgotPasswordForm/ForgotPasswordForm";
import Container from "../../../components/Reusable/Container/Container";

const ForgotPassword = () => {
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-20 mb-72 lg:mb-96">
        <div className="w-full lg:w-[50%] min-h-full flex items-center justify-center">
          <img src={IMAGES.forgotPassword} />
        </div>
        <div className="w-full lg:w-[50%]">
          <ForgotPasswordForm />
        </div>
      </div>
    </Container>
  );
};

export default ForgotPassword;
