import Container from "../../Reusable/Container/Container";
import { stats } from "./counter.dt";
import CounterCard from "./CounterCard";

const Counter = () => {
  return (
    <Container>
      <div className="flex flex-wrap justify-center font-Nunito items-center gap-25 py-[50px]  ">
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
