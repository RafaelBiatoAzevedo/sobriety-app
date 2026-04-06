import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  padding: 40px 0px 20px 0px;
`;

interface CardProps {
  unlocked: boolean;
}

export const Card = styled.View<CardProps>`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 12px;

  background-color: ${({ theme, unlocked }) =>
    unlocked ? theme.colors.card : "#1e293b80"};

  border: 1px solid
    ${({ unlocked, theme }) =>
      unlocked ? theme.colors.primary : "transparent"};

  opacity: ${({ unlocked }) => (unlocked ? 1 : 0.5)};
`;

export const IconContainer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 4px;
`;

interface CardTitleProps {
  color: string;
}

export const CardTitle = styled.Text<CardTitleProps>`
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: ${({ color }) => color};
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: 24px;
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-top: 4px;
`;

export const ProgressBarContainer = styled.View`
  height: 8px;
  width: 100%;
  background-color: #1e293b;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 8px;
`;

interface ProgressProps {
  progress: number;
  color: string;
}

export const ProgressBarFill = styled.View<ProgressProps>`
  height: 100%;
  width: ${({ progress }) => `${progress * 100}%`};
  background-color: ${({ color }) => color};
`;
