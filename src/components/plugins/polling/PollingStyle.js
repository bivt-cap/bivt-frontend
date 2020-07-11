import {StyleSheet} from 'react-native';

const PollingStyle = StyleSheet.create({
  //PollingList.js
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  Content: {},
  newBtn: {
    textAlign: 'center',
  },
  graphWrap: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  addBtnWrap: {
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnPst: {
    textAlign: 'center',
  },
  //PollingItem.js
  cardStyle: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F1F1F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 10,
  },
  pollingItem: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingBottom: 10,
  },
  //PollingDetail.js
  topTitle: {
    fontSize: 30,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionBtnWrap: {
    width: '100%',
    height: 70,
    marginBottom: 10,
  },
  optionsBtn: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F1F1F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    color: '#333333',
  },
  optionsBtnOn: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#A53BBA',
    color: '#333333',
    height: 70,
  },
  submitBtnWrap: {
    padding: 15,
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    width: '100%',
    marginTop: 20,
    backgroundColor: '#A53BBA',
    height: 55,
    borderRadius: 6,
  },
  addOptionBtn: {
    width: '30%',
    marginTop: 20,
    marginLeft: '70%',
    backgroundColor: '#A53B',
    height: 55,
    borderRadius: 6,
  },
  seeResultBtn: {
    width: '30%',
    marginTop: 20,
    marginLeft: '35%',
    backgroundColor: 'skyblue',
    height: 55,
    borderRadius: 6,
  },
  btnText: {
    width: '100%',
    textAlign: 'center',
  },
  //AddPolling.js
  inputStyle: {
    marginTop: 5,
    marginBottom: 15,
  },
  //PollingGraph
  graphFont: {
    fontSize: 15,
  },
  graphWrap: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#F1B7FD',
    marginBottom: 10,
  },
});

export default PollingStyle;
