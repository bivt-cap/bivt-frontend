import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PollingItems from './PollingItems';
import PollingStyle from './PollingStyle';
import {TouchableOpacity} from 'react-native';
import {Svg, Path, G, Rect, Text as Svgtext} from 'react-native-svg';
import {Container, Content, Button, Text, View} from 'native-base';
import JwtKeyChain from '../../../utils/jwtKeyChain';
import {getActivePollList} from '../../../redux';
const PollingList = ({navigation}) => {
  const defaultPolling = [
    {
      id: 1,
      qst: "Will you go to Harry's Party?",
      answer: [
        {name: 'Yes', value: 10},
        {name: 'No', value: 2},
        {name: 'Maybe', value: 5},
      ],
    },
    {
      id: 2,
      qst: 'What are going to do this weekend?',
      answer: [
        {name: 'Study', value: 1},
        {name: 'Picnic', value: 1},
        {name: 'Shopping', value: 1},
      ],
    },
  ];
  /*
   * Start of state declerations and fetch state from store
   */
  const bootstrapState = useSelector((state) => state.bootstrap);
  const poolingList = useSelector((state) => state.pollInfo);
  console.log(poolingList);
  console.log(bootstrapState);
  const [pollings, setPollings] = useState(defaultPolling);
  const dispatch = useDispatch();

  const fetchActivePooling = async () => {
    const token = await JwtKeyChain.read();
    console.log(token);
    const circleId = bootstrapState.circles[0].id;

    dispatch(getActivePollList(token, circleId));
  };
  useEffect(() => {
    fetchActivePooling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNewPoll = (poll) => {
    poll.id = pollings.length + 1;
    setPollings([...pollings, poll]);
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
                btn1: list.answer
                  .filter((n, index) => index == 0)
                  .map(function (n) {
                    return n.name;
                  }),
                btn2: list.answer
                  .filter((n, index) => index == 1)
                  .map(function (n) {
                    return n.name;
                  }),
                btn3: list.answer
                  .filter((n, index) => index == 2)
                  .map(function (n) {
                    return n.name;
                  }),
                value1: list.answer
                  .filter((n, index) => index == 0)
                  .map(function (n) {
                    return n.value;
                  }),
                value2: list.answer
                  .filter((n, index) => index == 1)
                  .map(function (n) {
                    return n.value;
                  }),
                value3: list.answer
                  .filter((n, index) => index == 2)
                  .map(function (n) {
                    return n.value;
                  }),
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
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="51.293"
            height="59.5"
            viewBox="0 0 51.293 59.5">
            <G
              id="Group_1529"
              data-name="Group 1529"
              transform="translate(-164 -5075)">
              <G
                id="Polygon_2"
                data-name="Polygon 2"
                transform="translate(215.293 5075) rotate(90)"
                fill="#a53bba">
                <Path
                  d="M 42.89691925048828 50.2931022644043 L 16.60308074951172 50.2931022644043 C 15.89247035980225 50.2931022644043 15.2295503616333 49.91123962402344 14.87302017211914 49.29653930664062 L 1.738019943237305 26.64998054504395 C 1.379040002822876 26.03104019165039 1.379040002822876 25.26205062866211 1.738019943237305 24.64310073852539 L 14.87302017211914 1.996561169624329 C 15.2295503616333 1.381861090660095 15.89247989654541 1.000001072883606 16.60309028625488 1.000001072883606 L 42.89691925048828 1.000001072883606 C 43.60752868652344 1.000001072883606 44.27045059204102 1.381861090660095 44.62697982788086 1.996571183204651 L 57.76198959350586 24.64312171936035 C 58.1209716796875 25.26206207275391 58.1209716796875 26.03104019165039 57.76198959350586 26.64998054504395 L 44.62697982788086 49.29653930664062 C 44.27045059204102 49.91123962402344 43.60752868652344 50.2931022644043 42.89691925048828 50.2931022644043 Z"
                  stroke="none"
                />
                <Path
                  d="M 16.60308837890625 2 C 16.24777984619141 2 15.91630935668945 2.190929412841797 15.7380485534668 2.498279571533203 L 2.603050231933594 25.14483070373535 C 2.423561096191406 25.45430183410645 2.423561096191406 25.83879089355469 2.603050231933594 26.14826202392578 L 15.73805999755859 48.79482269287109 C 15.91632080078125 49.1021728515625 16.24777984619141 49.2931022644043 16.60308074951172 49.2931022644043 L 42.89691162109375 49.2931022644043 C 43.25222015380859 49.2931022644043 43.58367919921875 49.1021614074707 43.76194763183594 48.7948112487793 L 56.89694976806641 26.14826202392578 C 57.07643890380859 25.83880043029785 57.07643890380859 25.45430183410645 56.89694976806641 25.14484024047852 L 43.76195907592773 2.498291015625 C 43.58369064331055 2.190929412841797 43.25222015380859 2 42.89691162109375 2 L 16.60308837890625 2 M 16.60308837890625 0 L 42.89691162109375 0 C 43.96659088134766 0 44.95532989501953 0.569549560546875 45.49201202392578 1.494842529296875 L 58.62701034545898 24.14140129089355 C 59.1668815612793 25.07221031188965 59.1668815612793 26.22089195251465 58.62701034545898 27.15170097351074 L 45.49201202392578 49.79825210571289 C 44.95532989501953 50.72355270385742 43.96659088134766 51.2931022644043 42.89691162109375 51.2931022644043 L 16.60308074951172 51.2931022644043 C 15.53340911865234 51.2931022644043 14.54465866088867 50.72355270385742 14.00799179077148 49.79825210571289 L 0.8729896545410156 27.15170097351074 C 0.3331108093261719 26.22088050842285 0.3331108093261719 25.07221031188965 0.8729896545410156 24.14139175415039 L 14.00799179077148 1.494842529296875 C 14.54467010498047 0.569549560546875 15.53342056274414 0 16.60308837890625 0 Z"
                  stroke="none"
                  fill="#a53bba"
                />
              </G>
              <G
                id="Group_1528"
                data-name="Group 1528"
                transform="translate(-421.5 79)">
                <G
                  id="Rectangle_234"
                  data-name="Rectangle 234"
                  transform="translate(610 5017)"
                  fill="#fff"
                  stroke="#fff"
                  stroke-width="1">
                  <Rect width="2" height="17" rx="1" stroke="none" />
                  <Rect
                    x="0.5"
                    y="0.5"
                    width="1"
                    height="16"
                    rx="0.5"
                    fill="none"
                  />
                </G>
                <G
                  id="Rectangle_235"
                  data-name="Rectangle 235"
                  transform="translate(619.5 5024.5) rotate(90)"
                  fill="#fff"
                  stroke="#fff"
                  stroke-width="1">
                  <Rect width="2" height="17" rx="1" stroke="none" />
                  <Rect
                    x="0.5"
                    y="0.5"
                    width="1"
                    height="16"
                    rx="0.5"
                    fill="none"
                  />
                </G>
              </G>
            </G>
          </Svg>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default PollingList;
