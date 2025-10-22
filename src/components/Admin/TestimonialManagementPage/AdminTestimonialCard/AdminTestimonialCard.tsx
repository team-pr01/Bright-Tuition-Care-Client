import { FiEdit2, FiStar, FiTrash2 } from "react-icons/fi";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import { useDeleteTestimonialMutation } from "../../../../redux/Features/Testimonial/testimonialApi";
import toast from "react-hot-toast";

type TAdminTestimonialCardProps = {
  _id: string;
  userName: string;
  userImage: string;
  location: string;
  role : string;
  rating: number;
  review: string;
  onEdit: () => void;
};

const AdminTestimonialCard: React.FC<TAdminTestimonialCardProps> = ({
  _id,
  userName,
  userImage,
  location,
  role,
  rating,
  review,
  onEdit,
}) => {
  const [deleteTestimonial] = useDeleteTestimonialMutation();

  const handleDeleteTestimonial = async () => {
    try {
      await toast.promise(deleteTestimonial(_id).unwrap(), {
        loading: "Loading...",
        success: "Testimonial deleted successfully!",
        error: "Failed to delete testimonial. Please try again.",
      });
    } catch (err) {
      console.error("Error deleting testimonial:", err);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        // full star
        stars.push(<IoIosStar key={i} className="text-yellow-400" />);
      } else if (rating + 0.5 >= i) {
        // half star
        stars.push(<IoIosStarHalf key={i} className="text-yellow-400" />);
      } else {
        // empty star
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col gap-2 border border-gray-100">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userImage}
            alt={userName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold capitalize">
              {userName}{" "}
              <span className="bg-primary-10 text-white rounded px-2 py-[2px] text-xs font-normal">
                {role}
              </span>
            </p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
          >
            <FiEdit2 />
          </button>
          <button
            onClick={handleDeleteTestimonial}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1">{renderStars()}</div>

      <p className="text-gray-700">{review}</p>
    </div>
  );
};

export default AdminTestimonialCard;
