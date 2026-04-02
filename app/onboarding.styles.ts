import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const Card = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 20px;
  border-radius: 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  background-color: #fff;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 12px;
`;

interface ButtonProps {
  disabled?: boolean;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ theme, disabled }) =>
    disabled ? "#94a3b8" : theme.colors.primary};

  padding: 14px;
  border-radius: 6px;
  align-items: center;

  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

interface OptionProps {
  selected: boolean;
}

export const ButtonDate = styled.TouchableOpacity`
  background-color: #fff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const OptionsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const OptionButton = styled.TouchableOpacity<OptionProps>`
  padding: 10px 12px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.primary : "#1e293b"};
`;

export const DropdownButton = styled.TouchableOpacity`
  background-color: #fff;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const OptionsList = styled.ScrollView`
  max-height: 200px;
  background-color: #1e293b;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const OptionItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #334155;
`;

export const OptionText = styled.Text`
  color: #fff;
`;
