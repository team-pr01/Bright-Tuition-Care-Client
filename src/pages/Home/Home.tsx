import Counter from "../../components/HomePage/Counter/Counter";
import Hero from "../../components/HomePage/Hero/Hero";

const Home = () => {
    return (
        <div className="flex flex-col h-full w-full items-center justify-center ">
           <Hero/>
           <Counter/>
        </div>
    );
};

export default Home;