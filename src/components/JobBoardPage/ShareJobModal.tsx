import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";

type TShareJobModalProps = {
  link: string;
  isShareJobModalOpen: boolean;
  setIsShareJobModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ShareJobModal: React.FC<TShareJobModalProps> = ({
  link,
  isShareJobModalOpen,
  setIsShareJobModalOpen,
}) => {
  
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const socialMedias = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-xl md:text-2xl" />,
      bgColor: "bg-[#3b5998]",
      shareLink: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl md:text-2xl" />,
      bgColor: "bg-[#E1306C]",
      shareLink: `https://www.instagram.com/`, // Instagram does not support direct URL sharing
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-xl md:text-2xl" />,
      bgColor: "bg-[#1DA1F2]",
      shareLink: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link
      )}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="text-xl md:text-2xl" />,
      bgColor: "bg-[#0077b5]",
      shareLink: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        link
      )}`,
    },
    {
      name: "TikTok",
      icon: <FaTiktok className="text-xl md:text-2xl" />,
      bgColor: "bg-black",
      shareLink: `https://www.tiktok.com/`, // TikTok doesn't support direct URL sharing either
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl md:text-3xl" />,
      bgColor: "bg-[#25D366]",
      shareLink: `https://wa.me/?text=${encodeURIComponent(link)}`,
    },
  ];

  return (
    <div
      className={`${
        isShareJobModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 font-Nunito`}
    >
      <div
        className={`${
          isShareJobModalOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } w-[90%] sm:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[25%] dark:bg-slate-800 bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 transition-all duration-300 relative`}
      >
        <RxCross1
          className="text-lg dark:text-[#abc2d3]/70 cursor-pointer absolute top-5 right-4"
          onClick={() => setIsShareJobModalOpen(false)}
        />

        <div className="w-full flex flex-col items-center gap-6">
          <h1 className="text-neutral-900 dark:text-white text-lg font-semibold text-center">
            Share this job via
          </h1>

          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {socialMedias.map((social, idx) => (
              <a
                key={idx}
                href={social.shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.bgColor} size-8 md:size-12 rounded-full text-white flex items-center justify-center
        transform transition-transform duration-500
        hover:-translate-y-2 hover:opacity-90`}
                title={`Share on ${social.name}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copy link box */}
          <div className="flex items-center w-full bg-neutral-50/30 border border-neutral-50/30 rounded-md px-3 py-2 justify-between">
            <span className="text-sm truncate text-gray-700 dark:text-gray-300">
              {link}
            </span>
            <button
              onClick={handleCopy}
              className={`ml-2 px-3 py-1 text-xs rounded hover:bg-primary-10/90 transition duration-300 cursor-pointer ${
                copied
                  ? "bg-green-50 text-green-600"
                  : "bg-primary-10 text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareJobModal;
