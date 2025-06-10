import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';


interface HistoryItem {
  id: string;
  text: string;
}

const generateRandomText = (): string => {
  const words = [
    'Sol', 'Lua', 'Estrela', 'Céu', 'Mar', 'Vento', 'Árvore', 'Caminho',
    'Sonho', 'Luz', 'Sombra', 'Tempo', 'Vida', 'Amor', 'Paz', 'Aventura'
  ];
  const sentenceLength = Math.floor(Math.random() * 5) + 3;
  let sentence = '';
  for (let i = 0; i < sentenceLength; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    sentence += randomWord + ' ';
  }
  return sentence.trim();
};

export default function App() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const generateText = () => {
    const newText = generateRandomText();
    setHistory([{ id: Date.now().toString(), text: newText }, ...history]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerador de Texto</Text>
      <View style={styles.buttonContainer}>
        <Button title="Gerar Texto" onPress={generateText} />
        <Button title="Limpar Histórico" onPress={clearHistory} color="#ff4444" />
      </View>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.historyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  historyList: {
    flex: 1,
  },
  historyItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  historyText: {
    fontSize: 16,
  },
});