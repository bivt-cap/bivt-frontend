import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PollingItems from './PollingItems';
import PollingStyle from './PollingStyle';
import {TouchableOpacity} from 'react-native';
import {Container, Content, View} from 'native-base';
import JwtKeyChain from '../../../utils/jwtKeyChain';
import {getActivePollList} from '../../../redux';
import HexagonBtn from '../../../utils/HexagonBtn';
import AsyncStorage from '@react-native-community/async-storage';
import pollData from './pollDb';

const PollingList = ({navigation}) => {
  /*
   * Start of state declerations and fetch state from store
   */
  const bootstrapState = useSelector((state) => state.bootstrap);
  //const poolingList = useSelector((state) => state.pollInfo);
  //console.log(poolingList);
  //console.log(bootstrapState);
  const [pollings, setPollings] = useState(Object.values(pollData));
  const dispatch = useDispatch();

  const fetchActivePooling = async () => {
    const token = await JwtKeyChain.read();
    //console.log(token);
    const circleId = bootstrapState.circles[0].id;

    dispatch(getActivePollList(token, circleId));
  };

  useEffect(() => {
    console.log('All polls', pollings);

    // const saveToAsync = async () => {
    //   const jsonValue = JSON.stringify(pollings);
    //   await AsyncStorage.setItem('storage_Key', jsonValue);
    // };
    // saveToAsync();
    // //fetchActivePooling();

    // const getData = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem('storage_Key');
    //     if (value !== null) {
    //       var obj = JSON.parse(value);
    //       console.log(obj);
    //       // setPollings(obj);
    //     }
    //   } catch (e) {
    //     // error reading value
    //   }
    // };
    // getData();
  }, [pollings]);

  const handleAddNewPoll = (poll) => {
    //console.log('poll -->', poll);
    poll.id = pollings.length + 1;
    console.log('newPoll', poll);
    setPollings([...pollings, poll]);
    //console.log(pollings);
  };

  const handleAddVote = (qId, option) => {
    console.log(qId, option);
    let ansIndex = 0;
    if (option === 'first') {
      ansIndex = 0;
    } else if (option === 'second') {
      ansIndex = 1;
    } else {
      ansIndex = 2;
    }
    let _pollId = parseInt(qId) - 1;
    setPollings((prevState) => {
      return Object.values({
        ...prevState,
        [_pollId]: {
          ...prevState[_pollId],
          answer: Object.values({
            ...prevState[_pollId].answer,
            [ansIndex]: {
              ...prevState[_pollId].answer[ansIndex],
              value: prevState[_pollId].answer[ansIndex].value + 1,
            },
          }),
        },
      });
    });
  };

  return (
    <Container style={PollingStyle.container}>
      <Content style={PollingStyle.content}>
        {pollings.map((list) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PollingDetail', {
                qstValue: list.qst,
                qstid: list.id,
                enabled: list.enabled,
                btn1: list.answer
                  .filter((n, index) => index === 0)
                  .map(function (n) {
                    return n.name;
                  }),
                btn2: list.answer
                  .filter((n, index) => index === 1)
                  .map(function (n) {
                    return n.name;
                  }),
                btn3: list.answer
                  .filter((n, index) => index === 2)
                  .map(function (n) {
                    return n.name;
                  }),
                value1: list.answer
                  .filter((n, index) => index === 0)
                  .map(function (n) {
                    return n.value;
                  }),
                value2: list.answer
                  .filter((n, index) => index === 1)
                  .map(function (n) {
                    return n.value;
                  }),
                value3: list.answer
                  .filter((n, index) => index === 2)
                  .map(function (n) {
                    return n.value;
                  }),
                handleAddVote: handleAddVote,
                pollings: {pollings},
              });
            }}>
            <PollingItems
              id={list.id}
              qst={list.qst}
              vote={list.answer.reduce((totalVal, i) => totalVal + i.value, 0)}
              answer={list.answer.map((item) => item.name)}
            />
          </TouchableOpacity>
        ))}
      </Content>

      <View style={PollingStyle.addBtnWrap}>
        <TouchableOpacity
          style={PollingStyle.addBtnPst}
          onPress={() => {
            navigation.navigate('AddPolling', {
              handleAddNewPoll: handleAddNewPoll,
            });
          }}>
          <HexagonBtn />
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PollingList;
