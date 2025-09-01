import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

interface BotaoChaveamentoProps {
  label?: string;
  onPress: () => void;
}

export default function BotaoChaveamento({
  label = "Chaveamento",
  onPress,
}: BotaoChaveamentoProps) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.texto}>{label}</Text>
    </TouchableOpacity>
  );
}
