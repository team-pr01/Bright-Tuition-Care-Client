import { useState } from "react";
import { BiLogoTelegram } from "react-icons/bi";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

const ShareThisApp = () => {
  const link = "https://example.com";
  const socialMedias = [
    {
      name: "Facebook",
      icon: <FaFacebookF className="text-xl md:text-2xl" />,
      bgColor: "bg-[#1877F2]",
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
      bgColor: "bg-[#0077B5]",
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
      name: "Telegram",
      icon: <BiLogoTelegram className="text-xl md:text-2xl" />,
      bgColor: "bg-[#30A3D9]",
      shareLink: `https://t.me/share/url?url=${encodeURIComponent(
        link
      )}&text=${encodeURIComponent("Check this out!")}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="text-xl md:text-3xl" />,
      bgColor: "bg-[#25D366]",
      shareLink: `https://wa.me/?text=${encodeURIComponent(link)}`,
    },
  ];

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };
  return (
    <div
      className={`bg-white border border-primary-40/10 rounded-2xl shadow-xs py-8 px-5`}
    >
      <div className="w-full flex flex-col items-center gap-10">
        <div>
          <h1
            className={`text-2xl lg:text-3xl font-Nunito font-semibold lg:font-bold text-neutral-10 text-center`}
          >
            Share with your Friends and Family
          </h1>

          <p
            className={`mt-4 text-neutral-20 text-lg leading-[24px] max-w-[749px] mx-auto`}
          >
            Help your friends and family find the perfect tutor. Share our
            platform and earn rewards!
          </p>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {socialMedias.map((social, idx) => (
            <a
              key={idx}
              href={social.shareLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.bgColor} size-8 md:size-12 rounded-full text-white flex items-center justify-center transform transition-transform duration-500 hover:-translate-y-2 hover:opacity-90`}
              title={`Share on ${social.name}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copy link box */}
        <div className="flex items-center gap-5 w-fit bg-neutral-50/30 border border-neutral-50/30 rounded-md px-3 py-2 justify-between">
          <span className="text-sm truncate text-gray-700 dark:text-gray-300">
            {link}
          </span>
          <button
            onClick={handleCopy}
            className={`ml-2 px-3 py-1 text-xs rounded hover:bg-primary-10/90 transition duration-300 cursor-pointer ${
              copied ? "bg-green-50 text-green-600" : "bg-primary-10 text-white"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareThisApp;
