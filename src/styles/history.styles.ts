import styled from "styled-components/native";

export const Overlay = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 1;
`;

export const Container = styled.View`
  position: relative;
  flex: 1;
  height: 100%;
  padding: 40px 16px 16px 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView``;

export const AddButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  margin-bottom: 10px;
`;

export const Card = styled.View`
  position: relative;
  padding: 14px;
  border-radius: 12px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.card};
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const CardTitleWrapper = styled.View`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Subtitle = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
`;

export const MenuButton = styled.TouchableOpacity`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 6px;
`;

export const MenuContainer = styled.View`
  position: absolute;
  top: 35px;
  right: 10px;

  background-color: #1e293b;
  border-radius: 8px;
  padding: 6px;
  z-index: 10;

  elevation: 5;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 8px 12px;
`;

export const MenuText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
