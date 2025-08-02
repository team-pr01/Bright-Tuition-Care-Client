import Container from "../../components/Reusable/Container/Container";
import { useState } from "react";
import SignupForm from "../../components/AuthPage/SignupPage/SignupForm/SignupForm";
import AuthSteps from "../../components/AuthPage/AuthSteps/AuthSteps";

const Signup = () => {
  const [activeTab, setActiveTab] = useState<string>("Guardian/Student");
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-10 mb-72 lg:mb-96">
        <div className="w-full lg:w-[40%]">
          <AuthSteps activeTab={activeTab} />
        </div>
        <div className="w-full lg:w-[60%]">
          <SignupForm activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </Container>
  );
};

export default Signup;
