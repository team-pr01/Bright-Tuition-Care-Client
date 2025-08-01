import { IMAGES } from "../../assets";
import ContactUsForm from "../../components/ContactUsPage/ContactUsForm/ContactUsForm";
import Container from "../../components/Reusable/Container/Container";
import Heading from "../../components/Reusable/Heading/Heading";

const ContactUs = () => {
  return (
    <Container>
      <div className="mt-10 mb-72 lg:mb-96">
        <Heading
          titleParts={[{ text: "Contact Us" }]}
          description="Have a question, feedback, or need help? Our team is here to assist you."
          align="center"
          headingClassName="text-center"
        />
        <div className="flex flex-col gap-10 lg:flex-row mt-20">
            <ContactUsForm/>
            <div className="p-10 md:p-20 lg:p-10 xl:p-20 w-full lg:w-[40%] flex items-center justify-center">
                <img src={IMAGES.contactUs} alt="" className="" />
            </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
