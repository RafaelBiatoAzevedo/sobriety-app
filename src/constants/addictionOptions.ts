export interface AddictionOption {
  label: string;
  value: string;
}

export const ADDICTION_OPTIONS: AddictionOption[] = [
  { label: "Álcool", value: "alcohol" },
  { label: "Drogas", value: "drugs" },
  { label: "Álcool + Drogas", value: "alcohol_drugs" },
  { label: "Cigarro", value: "cigarette" },
  { label: "Jogos de Azar e Apostas", value: "gambling" },
  { label: "Cafeína", value: "caffeine" },
  { label: "Compras / Consumismo", value: "shopping" },
  { label: "Jogos", value: "games" },
  { label: "Sexo e Pornografia", value: "sex_porn" },
  { label: "Comida", value: "food" },
  { label: "Doces", value: "sweets" },
  { label: "Outro", value: "other" },
];
