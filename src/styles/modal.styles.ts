import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
`;

export const Card = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 16px;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-bottom: 24px;
`;

export const ButtonPrimary = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.danger};
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 12px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ButtonCancel = styled.TouchableOpacity`
  padding: 12px;
  align-items: center;
`;

export const ButtonCancelText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
`;
