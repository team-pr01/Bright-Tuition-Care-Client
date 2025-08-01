type TTutorialCardProps = {
  title: string;
  description: string;
  videoUrl: string;
};
const TutorialCard: React.FC<TTutorialCardProps> = ({
  title,
  description,
  videoUrl,
}) => {
  return (
    <div className="bg-white rounded-xl font-Nunito shadow-tutorial-card">
      <div className="w-full aspect-video">
        <iframe
          className="w-full h-full rounded-t-xl"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="py-4 px-5">
        <h1 className="text-neutral-5 text-xl font-bold leading-6">
          {title}
        </h1>
        <p className="text-neutral-5 text-sm mt-2">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TutorialCard;
