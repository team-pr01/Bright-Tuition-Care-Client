import { details } from "framer-motion/client";
import { GuardianGuideline } from "../../../../data/guardian-guidelines";

const GuardianGuidelines = () => {
  return (
    <div className="bg-white border border-primary-40/10 rounded-2xl py-8 px-5 font-Nunito">

      <h1 className="text-3xl font-bold mb-6">{GuardianGuideline.title}</h1>

      {GuardianGuideline.sections.map((sec, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{sec.heading}</h2>
          {sec.details && <p>{sec.details}</p>}
          {/* Paragraph Content */}
          {sec.content && (
            <div className="space-y-2 text-gray-700 mb-4">
              {sec.content.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          )}

          {/* Subsections */}
          {sec.subsections && (
            <div className="pl-5 space-y-6 mt-4">
              {sec.subsections.map((sub, j) => (
                <div key={j} className="pl-5">
                  <h3 className=" text-xl font-semibold mb-2">{sub.subheading}</h3>

                  {sub.content && (
  <ul className="list-disc ml-6 space-y-2 text-gray-700 mb-2">
    {sub.content.map((line, k) => (
      <li key={k}>{line}</li>
    ))}
  </ul>
)}


                  {/* Special Note */}
                  {sub.note && (
                    <div className="mt-2 bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-gray-800">
                      <strong>Note:</strong> {sub.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

 
    </div>
  );
};

export default GuardianGuidelines;
