import { useSobriety } from "@/src/context/sobriety/SobrietyContext";
import { Container, Subtitle, Title } from "./index.styles";

export default function Home() {
  const { time } = useSobriety();
  return (
    <Container>
      <Title>Você está sóbrio há</Title>
      <Subtitle>
        {time.years > 0 && `${time.years} ano${time.years > 1 ? "s" : ""} `}
        {time.months > 0 && `${time.months} mês${time.months > 1 ? "es" : ""} `}
        {`${time.days} dia${time.days > 1 ? "s" : ""}`}
      </Subtitle>
    </Container>
  );
}
