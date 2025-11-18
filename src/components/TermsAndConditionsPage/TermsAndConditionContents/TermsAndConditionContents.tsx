import { termsData } from "../../../data/termsAndConditions";
import Container from "../../Reusable/Container/Container";

const TermsAndConditionContents = () => {
  return (
    <Container>
      <div className="font-Nunito">
        {termsData.title && (
          <p className="text-neutral-5 text-3xl font-Nunito font-semibold">
            {termsData.title}
          </p>
        )}
        {termsData.sections.map((sec, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">{sec.heading}</h2>

            {/* Points */}

            {sec.description && <p>{sec.description}</p>}
            {sec.points && (
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                {sec.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            )}
            {/* Requirements */}
            {sec.requirements && (
              <>
                <h3 className="font-semibold mt-4">Requirements</h3>
                <ul className="list-disc ml-6 space-y-1">
                  {sec.requirements.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            {/* Must */}
            {sec.must && (
              <>
                <h3 className="font-semibold mt-4">You Must</h3>
                <ul className="list-disc ml-6 space-y-1">
                  {sec.must.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </>
            )}
            {/* Tutor/Guardian Ban Lists */}
            {sec.tutorBan && (
              <>
                <h3 className="font-semibold mt-4">
                  A tutor may be banned for:
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  {sec.tutorBan.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </>
            )}
            {sec.guardianBan && (
              <>
                <h3 className="font-semibold mt-4">
                  A guardian/student may be banned for:
                </h3>
                <ul className="list-disc ml-6 space-y-1">
                  {sec.guardianBan.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </>
            )}
            {/* Subsections */}
            {sec.subsections && (
              <div className="space-y-6 mt-4">
                {sec.subsections.map((sub, j) => (
                  <div key={j}>
                    <h3 className="text-xl font-semibold mb-2">
                      {sub.subheading}
                    </h3>
                    {sub.description && <p>{sub.description}</p>}
                    {sub.subSubSection && (
                      <div className="space-y-6 mt-4">
                        {sub.subSubSection.map((ss, j) => (
                          <div key={j}>
                            <h3 className="text-xl font-semibold mb-2">
                              {ss.title}
                            </h3>
                            {ss.description && <p>{ss.description}</p>}
                            {ss.points && (
                              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                                {ss.points.map((p, k) => (
                                  <li key={k}>{p}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    {sub.points && (
                      <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {sub.points.map((p, k) => (
                          <li key={k}>{p}</li>
                        ))}
                      </ul>
                    )}

                    {sub.conditions && (
                      <ul className="list-disc ml-6 space-y-1 text-gray-700">
                        {sub.conditions.map((p, k) => (
                          <li key={k}>{p}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            {sec.description2 && <p>{sec.description2}</p>}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default TermsAndConditionContents;
