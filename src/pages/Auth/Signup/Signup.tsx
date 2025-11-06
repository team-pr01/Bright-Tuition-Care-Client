import { useState } from "react";
import Container from "../../../components/Reusable/Container/Container";
import AuthSteps from "../../../components/AuthPage/AuthSteps/AuthSteps";
import SignupForm from "../../../components/AuthPage/SignupPage/SignupForm/SignupForm";


const Signup = () => {
  const [activeTab, setActiveTab] = useState<string>("Tutor");
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row items-stretch gap-10 mt-10 mb-72 lg:mb-96 min-h-[600px]">
        <div className="w-full lg:w-[40%] min-h-full flex items-center justify-center rounded-2xl bg-gradient-to-r from-slate-50 to-blue-100/60 border border-neutral-45/10 p-8">
          <AuthSteps activeTab={activeTab} />
        </div>
        <div className="w-full lg:w-[60%] min-h-full">
          <SignupForm activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </Container>
  );
};

export default Signup;
