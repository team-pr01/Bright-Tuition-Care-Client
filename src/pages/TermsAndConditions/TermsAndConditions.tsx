import Container from "../../components/Reusable/Container/Container";
import TermsAndConditionContents from "../../components/TermsAndConditionsPage/TermsAndConditionContents/TermsAndConditionContents";
import TermsAndConditionHero from "./../../components/TermsAndConditionsPage/TermsAndConditionHero/TermsAndConditionHero";
const TermsAndConditions = () => {
  return (
    <div>
      <TermsAndConditionHero />
      <Container>
        <div className="py-[60px] mt-10 mb-72 lg:mb-96">
          <TermsAndConditionContents />
          
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
