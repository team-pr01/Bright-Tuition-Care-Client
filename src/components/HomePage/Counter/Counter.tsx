import Container from "../../Reusable/Container/Container";
import { stats } from "./counter.dt";
import CounterCard from "./CounterCard";

const Counter = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row justify-center font-Nunito lg:items-center gap-10 items-start lg:gap-5 xl:gap-20 py-[50px] bg-primary-30/50 p-5 lg:p-10 xl:p-16 rounded-2xl">
        {stats.map((stat, index) => (
          <CounterCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Counter;
