import { MILESTONES } from "@/src/constants/milestone";
import { useSobriety } from "@/src/context/sobriety/SobrietyContext";
import {
  getMilestoneProgress,
  getUnlockedMilestones,
} from "@/src/utils/milestones";

import {
  Card,
  CardTitle,
  Container,
  Description,
  ProgressBarContainer,
  ProgressBarFill,
  Subtitle,
  Title,
} from "./milestones.styles";

export default function MilestonesScreen() {
  const { totalDays } = useSobriety();

  const list = getUnlockedMilestones(MILESTONES, totalDays);

  return (
    <Container>
      <Title> 🎯 Conquistas</Title>
      {list.map((item) => {
        const daysLeft = Math.max(item.days - totalDays, 0);
        const progress = getMilestoneProgress(item.days, totalDays);
        return (
          <Card key={item.id} unlocked={item.unlocked}>
            <CardTitle>{item.title}</CardTitle>
            <Description>{item.description}</Description>

            <Subtitle>
              {item.unlocked
                ? "Conquistado 🎉"
                : `Meta: ${item.days} dia${item.days > 1 ? "s" : ""} - faltam ${daysLeft} dia${daysLeft > 1 ? "s" : ""}`}
            </Subtitle>
            <ProgressBarContainer>
              <ProgressBarFill progress={progress} color={item.color} />
            </ProgressBarContainer>
          </Card>
        );
      })}
    </Container>
  );
}
