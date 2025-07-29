import Container from "../../Reusable/Container/Container";
import { ICONS } from "../../../assets";
import { useState } from "react";
import MultiSelectDropdown from "../../Reusable/MultiSelectDropdown/MultiSelectDropdown";

const Filters = () => {
  const [isAccordingOpen, setIsAccordingOpen] = useState<boolean>(false);

  const [selectedArts, setSelectedArts] = useState<string[]>([]);

  return (
    <Container>
      <div className="flex items-center justify-between mt-16">
        <div className="flex items-center gap-3">
          <img src={ICONS.liveJobs} alt="" className="size-8" />
          <h1 className="text-4xl font-semibold leading-11 text-primary-50">
            1024 Live Jobs
          </h1>
        </div>
        <button
          onClick={() => setIsAccordingOpen(!isAccordingOpen)}
          className="flex items-center gap-[10px] px-3 py-2 bg-white border border-primary-30 rounded-lg cursor-pointer"
        >
          <img src={ICONS.filter} alt="" className="size-5" />
          <h1 className="font-medium leading-6 text-primary-50">
            1024 Live Job
          </h1>
        </button>
      </div>

      <div
        className={`w-full bg-primary-65 border border-primary-10/20 rounded-xl p-6 transition-all duration-300 ease-in-out ${
          isAccordingOpen
            ? "grid-rows-[1fr] opacity-100 mt-4"
            : "grid-rows-[0fr] opacity-0"
        } `}
      >
        <MultiSelectDropdown
          label="Tuition Type"
          name="tuitionType"
          options={[
            "Painting",
            "Sculpture",
            "Photography",
            "Drawing",
            "Digital Art",
          ]}
          value={selectedArts}
          onChange={setSelectedArts}
          isRequired={false}
        />
      </div>
    </Container>
  );
};

export default Filters;
