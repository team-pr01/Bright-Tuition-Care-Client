import { IMAGES } from "../../../assets";
import Container from "../../Reusable/Container/Container";
import Heading from "../../Reusable/Heading/Heading";
import ServiceCard from "./ServiceCard";

const categories = [
  {
    image:IMAGES.service1, // use your actual path
    title: "Admission Test",
    description:
      "Get expert tutors for Dakhil, Alim, and academic Islamic studies.",
  },
  {
    image:IMAGES.service2,
    title: "Madrasa Medium",
    description:
      "Get expert tutors for Dakhil, Alim, and academic Islamic studies.",
  },
  {
    image: IMAGES.service3,
    title: "English Medium",
    description:
      "Tutors for Edexcel, Cambridge (O/A Levels), and IB curriculum.",
  },
];

const Services = () => {
  return (
     <div className="w-full py-[50px]"
     style={{
        background: "linear-gradient(101deg, #FFF -7.84%, #E8F3FF 74.03%)",
      }}>
        <Container>
            <div className=" text-center">
        <Heading
            titleParts={[
              { text: "Education Service Categories" },
            ]}
            description="We provide expert tutors across all major education systems — whether you're in Bangla, English, Madrasa medium, or preparing for admission tests."
            align="center"
            className="w-[60%] mx-auto"
          />
        

        <div className="flex flex-row justify-center gap-8 mt-17">
          {categories.map((category, index) => (
            <ServiceCard
              key={index}
              image={category.image}
              title={category.title}
              description={category.description}
            />
          ))}
        </div>
      </div>
        </Container>
      
    </div>
  );
};

export default Services;
