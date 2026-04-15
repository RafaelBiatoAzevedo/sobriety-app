import { Modal } from "react-native";
import {
  Button,
  ButtonClose,
  ButtonText,
  Container,
  Content,
  Footer,
  Overlay,
} from "./styles";

interface CustomModalProps {
  visible: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  confirmText?: string;
  children: React.ReactNode;
  disableConfirm?: boolean;
  loading?: boolean;
}

export function CustomModal({
  visible,
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  children,
  disableConfirm = false,
  loading = false,
}: CustomModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Overlay onPress={onClose} />

      <Container>
        <Content>
          {children}
          <Footer>
            {!!onClose && (
              <ButtonClose onPress={onClose}>
                <ButtonText>Fechar</ButtonText>
              </ButtonClose>
            )}

            <Button onPress={onConfirm} disabled={disableConfirm || loading}>
              <ButtonText>{loading ? "Salvando..." : confirmText}</ButtonText>
            </Button>
          </Footer>
        </Content>
      </Container>
    </Modal>
  );
}
