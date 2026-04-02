import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 32px;
  font-weight: bold;
`;

export const NextMilestoneText = styled.Text`
  margin-top: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;
