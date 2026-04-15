import styled from "styled-components/native";

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: 85%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const ButtonClose = styled.TouchableOpacity`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  margin: 0 4px;
  align-items: center;

  background-color: #64748b;
`;

export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  margin: 0 4px;
  align-items: center;

  background-color: ${({ theme, disabled }) =>
    disabled ? "#64748b" : theme.colors.primary};

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;
