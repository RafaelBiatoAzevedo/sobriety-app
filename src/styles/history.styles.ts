import styled from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 40px 16px 16px 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Card = styled.View`
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.card};
`;

export const Title = styled.Text`
  font-size: 16px;
  margin-bottom: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;
