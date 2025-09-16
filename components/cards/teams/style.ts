import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 365,
    height: 280,
    borderWidth: 1,
    borderColor: '#000000ff',
    borderRadius: 16,
    marginLeft: 40,
    marginTop: 50,
  },

  label: {
    backgroundColor: '#9A9A9A',
    width: 100,
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 32,
    marginTop: 17,
    marginLeft: 16,
  },

  labelText: {
    color: '#FFF',
    fontWeight: 600,
    fontSize: 16,
  },

  teamsContainer: {
    marginTop: 25,
    width: '100%',
    height: 169,
    alignItems: 'center',
  },

  teams: {
    width: 295,
    height: 159,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 22,
  },

  teamsSection: {
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  teamsIcons: {
    borderRadius: '100%',
    backgroundColor: '#D9D9D9',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nameTeams: {
    fontSize: 12,
    fontWeight: 500,
    color: '#9A9A9A',
  },

  scoreText: {
    fontSize: 32,
    fontWeight: 500,
  },
  score: {
    width: '100%',
    alignItems: 'center',
  },
});

export default styles;
