import { MILESTONES } from "@/src/constants/milestone";
import { useSobriety } from "@/src/context/sobriety/SobrietyContext";
import { getUser } from "@/src/storage/userStorage";
import { getFirstName } from "@/src/utils/format";
import {
  getDaysToNextMilestone,
  getNextMilestone,
} from "@/src/utils/milestones";
import { useEffect, useState } from "react";
import {
  Container,
  Name,
  NextMilestoneText,
  Subtitle,
  Title,
} from "../../src/styles/index.styles";

export default function Home() {
  const { time } = useSobriety();
  const { totalDays } = useSobriety();

  const nextMilestone = getNextMilestone(MILESTONES, totalDays);
  const daysLeft = getDaysToNextMilestone(nextMilestone, totalDays);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getUser();
      setUser(data);
    }

    load();
  }, []);

  return (
    <Container>
      {user && <Name>{getFirstName(user.name)}</Name>}
      <Title>Você está sóbrio há</Title>
      <Subtitle>
        {time.years > 0 && `${time.years} ano${time.years > 1 ? "s" : ""} `}
        {time.months > 0 && `${time.months} mês${time.months > 1 ? "es" : ""} `}
        {`${time.days} dia${time.days > 1 ? "s" : ""}`}
      </Subtitle>
      {nextMilestone ? (
        <NextMilestoneText>
          Faltam {daysLeft} dia{daysLeft > 1 ? "s" : ""} para sua próxima
          conquista 🎯
        </NextMilestoneText>
      ) : (
        <NextMilestoneText>
          Você conquistou todas as fichas 🏆
        </NextMilestoneText>
      )}
    </Container>
  );
}
