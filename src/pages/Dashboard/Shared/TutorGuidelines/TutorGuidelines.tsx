import { TutorGuideline } from "../../../../data/tutor-guidelines";

const TutorGuidelines = () => {
  return (
    <div className="bg-white border border-primary-40/10 rounded-2xl py-8 px-5 font-Nunito">
  
      <h1 className="text-3xl font-bold mb-6">{TutorGuideline.title}</h1>

      {TutorGuideline.sections.map((sec, i) => (
        <div key={i} className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">{sec.heading}</h2>

          {/* Paragraph Content */}
          {sec.content && (
            <div className="space-y-2 text-gray-700 mb-4">
              {sec.content.map((c, j) => (
                <p key={j}>{c}</p>
              ))}
            </div>
          )}

          {/* Bullet Points */}
          {sec.points && (
            <ul className="list-disc ml-6 space-y-2 text-gray-700">
              {sec.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
          )}

          {/* Special Note */}
          {sec.specialNote && (
            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-gray-800 rounded">
              <strong>Special Note:</strong> {sec.specialNote}
            </div>
          )}
        </div>
      ))}
 
    </div>
  );
};

export default TutorGuidelines;
