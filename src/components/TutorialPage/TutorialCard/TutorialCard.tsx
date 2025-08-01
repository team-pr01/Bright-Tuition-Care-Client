const TutorialCard = () => {
  return (
    <div className="bg-white rounded-xl font-Nunito shadow-tutorial-card">
       <div className="w-full aspect-video">
        <iframe
          className="w-full h-full rounded-t-xl"
          src="https://www.youtube.com/embed/FzOGKQK-1PU?si=EYGmNjIx97WWJ6Tr&controls=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="py-4 px-5">
        <h1 className="text-neutral-5 text-xl font-bold leading-6">
          How to send tutor request
        </h1>
        <p className="text-neutral-5 text-sm mt-2">
          Whether you're a parent looking for the perfect tutor for your child,
          or a student seeking guidance in a specific subject — here’s exactly
          how you can post a detailed tutor request and get matched with the
          right educator.
        </p>
      </div>
    </div>
  );
};

export default TutorialCard;
