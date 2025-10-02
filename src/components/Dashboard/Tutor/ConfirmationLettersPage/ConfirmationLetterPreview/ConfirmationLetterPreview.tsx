import { FiDownload } from "react-icons/fi";
import SignatureField from "./SignatureField ";
import { pdf } from "@react-pdf/renderer";
import ConfirmationLetterPdf from "./DownloadConfirmationLetterPdf";


const ConfirmationLetterPreview = () => {


  const handleDownloadConfirmationLetterPdf = async () => {
    const blob = await pdf(<ConfirmationLetterPdf />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "confirmation-letter.pdf";
    link.click();
  };
    
  return (
    <div className="">
      {/* Header */}
      <h2 className="text-xl font-bold text-center mb-4 underline">
        Confirmation Letter
      </h2>

      {/* Greeting */}
      <p className="text-neutral-10 mb-2">
        Dear <span className="font-bold">Tutor</span> &{" "}
        <span className="font-bold">Guardian/Student</span>,
      </p>

      <p className="text-neutral-10 mb-6">
        Congratulations! We are pleased to let you know that{" "}
        <span className="font-bold">Bright Tuition Care</span> has successfully
        connected both of you for this tuition. (Job ID: 12345)
      </p>

      {/* Tuition Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-neutral-5 mb-2">Tuition Details</h3>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <p>Subject: Mathematics</p>
          <p>Class: 8</p>
          <p>Schedule: Mon, Wed, Fri - 6 PM</p>
          <p>Location: Dhaka</p>
        </div>
      </div>

      {/* User Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm text-neutral-10">
          <h4 className="font-semibold text-neutral-5 mb-1">
            Guardian/Student
          </h4>
          <p>Name: John Doe</p>
          <p>ID: G-102</p>
          <p>Phone: 0123456789</p>
        </div>
        <div className="border border-neutral-55/50 rounded-md p-3 text-sm">
          <h4 className="font-semibold text-neutral-5 mb-1">Tutor</h4>
          <p>Name: Jane Smith</p>
          <p>ID: T-501</p>
          <p>Phone: 0987654321</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <SignatureField label="Guardian/Student Signature" />
        <SignatureField label="Tutor Signature" />
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">
        <button onClick={handleDownloadConfirmationLetterPdf} className="flex items-center gap-2 px-4 py-2 bg-primary-10 text-white text-sm rounded-lg hover:bg-primary-40 transition cursor-pointer">
          <FiDownload /> Download PDF
        </button>
      </div>

      <p className="text-primary-10 text-xs text-center mt-4">Note: You can sign digitally or manually download the PDF, print it and sign with date.  </p>
    </div>
  );
};

export default ConfirmationLetterPreview;
