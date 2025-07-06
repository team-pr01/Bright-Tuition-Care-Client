import AboutUs from "../../components/HomePage/AboutUS/AboutUs";
import Counter from "../../components/HomePage/Counter/Counter";
import DownloadApp from "../../components/HomePage/DownloadApp/DownloadApp";
import Hero from "../../components/HomePage/Hero/Hero";
import TuitionMethods from "../../components/HomePage/TuitionMethods/TuitionMethods";

const Home = () => {
    return (
        <div className="flex flex-col h-full w-full items-center justify-center ">
           <Hero/>
           <Counter/>
           <AboutUs/>
           <TuitionMethods/>
           <DownloadApp/>
        </div>
    );
};

export default Home;