import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024", // Fundo principal preto
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    backgroundColor: '#29292E', // Cor de fundo dos botões de filtro
    borderRadius: 6,
    marginRight: 5,
  },
  filterButtonSelected: {
    backgroundColor: '#00FF7F', // Verde brilhante para o botão selecionado
  },
  filterButtonText: {
    color: '#fff', // Texto branco
    fontSize: 15,
    fontWeight: 'bold',
  },
  filterButtonTextSelected: {
    color: '#000', // Texto preto no botão selecionado
  },
  cardContainer: {
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#29292E', // Cor de fundo do input
    color: '#fff', // Texto branco
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
