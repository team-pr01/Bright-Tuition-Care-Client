import { useState } from "react";
import AdminTestimonialCard from "../../../../components/Admin/TestimonialManagementPage/AdminTestimonialCard/AdminTestimonialCard";
import { FiStar } from "react-icons/fi";
import AddTestimonialModal from "../../../../components/Admin/TestimonialManagementPage/AddTestimonialModal/AddTestimonialModal";

const TestimonialManagement = () => {
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedTestimonialId, setSelectedTestimonialId] = useState<
    string | null
  >(null);
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] =
    useState<boolean>(false);

  const testimonials = [
    {
      _id: "1",
      userName: "John Doe",
      userImage: "https://i.pravatar.cc/40?img=5",
      location: "New York, USA",
      rating: 4,
      review: "Great service! Highly recommended.",
    },
    {
      _id: "2",
      userName: "Jane Smith",
      userImage: "https://i.pravatar.cc/40?img=6",
      location: "London, UK",
      rating: 5,
      review: "Amazing experience and friendly staff.",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-neutral-30/20 pb-3">
        <h3 className="text-xl font-semibold">Total Testimonials (2)</h3>
        <button
          onClick={() => {
            setModalType("add");
            setIsTestimonialModalOpen(true);
            setSelectedTestimonialId(null);
          }}
          className={`bg-primary-10 hover:bg-primary-20 hover:text-primary-10 transition duration-300 font-semibold text-white rounded-lg flex items-center gap-2 px-3 py-2 pointer cursor-pointer`}
        >
          Add Testimonial <FiStar className="text-lg" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <AdminTestimonialCard
            key={testimonial?._id}
            userName={testimonial.userName}
            userImage={testimonial.userImage}
            location={testimonial.location}
            rating={testimonial.rating}
            review={testimonial.review}
            onEdit={() => {
              setModalType("edit");
              setIsTestimonialModalOpen(true);
              setSelectedTestimonialId(testimonial?._id);
            }}
            onDelete={() => console.log("Delete", testimonial?._id)}
          />
        ))}
      </div>

      <AddTestimonialModal
        isTestimonialModalOpen={isTestimonialModalOpen}
        setIsTestimonialModalOpen={setIsTestimonialModalOpen}
        modalType={modalType}
        setModalType={setModalType}
      />
    </div>
  );
};

export default TestimonialManagement;
