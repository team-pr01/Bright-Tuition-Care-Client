import { useState } from 'react';
import Container from '../../../components/Reusable/Container/Container';
import AuthSteps from '../../../components/AuthPage/AuthSteps/AuthSteps';
import SignInForm from '../../../components/AuthPage/SignInPage/SignInForm/SignInForm';

const SignIn = () => {
      const [activeTab, setActiveTab] = useState<string>("Guardian/Student");
    return (
        <Container>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-10 mt-10 mb-72 lg:mb-96">
        <div className="w-full lg:w-[40%]">
          <AuthSteps activeTab={activeTab} />
        </div>
        <div className="w-full lg:w-[60%]">
          <SignInForm activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </Container>
    );
};

export default SignIn;