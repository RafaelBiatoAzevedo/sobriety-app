import { getHistory } from "@/src/storage/sobrietyStorage";
import { useEffect, useState } from "react";

import {
  Card,
  Container,
  Subtitle,
  Title,
} from "../../src/styles/history.styles";

import { formatPeriod } from "@/src/utils/format";
import { calculateIntervals, getBestStreak } from "@/src/utils/history";

export default function History() {
  const [data, setData] = useState<any[]>([]);
  const [bestStreak, setBestStreak] = useState(0);

  useEffect(() => {
    async function load() {
      const history = await getHistory();

      const intervals = calculateIntervals(history);

      setData(intervals);
      setBestStreak(getBestStreak(intervals));
    }

    load();
  }, []);

  return (
    <Container>
      <Title>
        🏆 Maior tempo limpo: {bestStreak} dia{bestStreak > 1 ? "s" : ""}
      </Title>
      {data.map((item, index) => (
        <Card key={index}>
          <Title>{formatPeriod(item)}</Title>

          <Subtitle>
            Ficou limpo por {item.daysClean} dia
            {item.daysClean > 1 ? "s" : ""}
          </Subtitle>
        </Card>
      ))}
    </Container>
  );
}
