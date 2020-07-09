/**
 * Calendar styles
 *
 * @version 0.0.1
 * @author Eduardo Pereira do Carmo (https://github.com/eduardopcarmo)
 */

import {StyleSheet} from 'react-native';

// Form
const formBaseStyles = StyleSheet.create({
  timeAndDate: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#B5B5B5',
    fontSize: 17,
    color: '#B5B5B5',
    borderRadius: 5,
    padding: 10,
    paddingBottom: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  imagesListItem: {
    borderBottomWidth: 0,
  },
  imagesThumbnail: {
    marginRight: 10,
  },
  imagesButton: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#CA60E3',
    width: 34,
    height: 34,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagesButtonIcon: {
    fontSize: 28,
    color: '#CA60E3',
    alignSelf: 'center',
  },
  participantsModal: {
    backgroundColor: '#fff',
  },
  participantsModalTitle: {
    textAlign: 'center',
    backgroundColor: '#CA60E3',
    padding: 40,
    color: '#FFF',
  },
  participantsModalListItem: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
  participantsModalClose: {
    borderWidth: 0,
    width: 100,
    alignSelf: 'flex-end',
    margin: 15,
  },
  participantsModalCloseText: {
    color: '#848484',
    fontWeight: 'bold',
    textAlign: 'right',
    width: '100%',
  },
});

// Form
const calendarBaseStyles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: '#CA60E3',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
  },
  list: {
    margin: 0,
  },
  listItemHeader: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
  },
  listItem: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CA60E3',
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  listItemText: {
    color: '#CA60E3',
  },
});

// Export
export {formBaseStyles, calendarBaseStyles};
