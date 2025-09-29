import { FiEdit2, FiStar, FiTrash2 } from "react-icons/fi";
import { IoIosStarHalf } from "react-icons/io";

type TAdminTestimonialCardProps = {
  userName: string;
  userImage: string;
  location: string;
  rating: number;
  review: string;
  onEdit: () => void;
  onDelete: () => void;
};

const AdminTestimonialCard: React.FC<TAdminTestimonialCardProps> = ({
  userName,
  userImage,
  location,
  rating,
  review,
  onEdit,
  onDelete,
}) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FiStar key={i} className="text-yellow-400" />);
      } else if (rating + 0.5 >= i) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-400" />);
      } else {
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
            <p className="font-semibold">
              {userName}{" "}
              <span className="bg-primary-10 text-white rounded px-2 py-[2px] text-sm font-normal">
                Tutor
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
            onClick={onDelete}
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
