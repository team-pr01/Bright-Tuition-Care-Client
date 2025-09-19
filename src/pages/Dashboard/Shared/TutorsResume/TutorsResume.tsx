import { IMAGES } from "../../../../assets";

const TutorsResume = () => {
    return (
        <div className="bg-white shadow rounded-xl max-w-[1000px] mx-auto p-5 font-Nunito">
            <div className="flex gap-5">
                <img src={IMAGES.dummyAvatar} alt="" className="size-56 object-cover rounded-xl" />
                <div>
                    <h1 className="text-xl lg:text-2xl font-semibold text-neutral-10">John Smith</h1>
                    <p className="text-neutral-10 mt-1"><strong>Tutor Id:</strong> 123456</p>
                    <p className="text-neutral-20 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui natus incidunt eum asperiores quisquam omnis facilis voluptates iste dolorum nam cumque esse sit doloribus temporibus fugit a commodi, dicta error ratione! Esse tempore asperiores nam. Eos et quas possimus mollitia itaque! Aliquam cum dolor laboriosam praesentium cumque omnis, rerum accusamus?</p>
                </div>
            </div>
        </div>
    );
};

export default TutorsResume;