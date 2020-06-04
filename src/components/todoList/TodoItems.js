import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import {
    Item,
    Text,
    View,
    Button
  } from 'native-base';
  import Icon from 'react-native-vector-icons/Feather';
  import { SwipeRow } from 'react-native-swipe-list-view';

const TodoItems= (props) => (
    <Item style={styles.listWrapper}>
        <View style={styles.swipecontainer}>
            <View style={styles.standalone}>
                <SwipeRow 
                // leftOpenValue={75}
                rightOpenValue={-90} 
                >
                    <View style={styles.standaloneRowBack}>
                        <Button
                            transparent 
                            light 
                            onPress={props.update}
                            style={styles.editBtn}
                            onPress={() => {
                                props.editTodoRow(props)
                              }}
                        >
                            <Text>Edit</Text>
                        </Button>
                        <Button 
                            transparent 
                            light 
                            style={{ marginLeft: 'auto' }}
                            onPress={props.delete}
                            style={styles.deleteBtn}
                            >
                            <Text>Delete</Text>
                        </Button>
                    </View>
                    <View style={styles.standaloneRowFront}>
                        <TouchableOpacity onPress={() => props.setChecked()}>
                            <Icon
                                name={props.checked ? "check-circle" : "circle"}
                                size={30}
                                color="#5E2BFF"
                                style={{marginRight: 10}}
                            />
                        </TouchableOpacity>
                        <View style={{paddingLeft: 0, width: '100%'}}>
                            <Text 
                                style={(props.checked == true) ? styles.done : styles.notDone}
                            >
                                {/* {props.id} */}
                                {props.text}
                            </Text>
                        </View>
                    </View>
                </SwipeRow>
            </View>
        </View>
    </Item>
)
export default TodoItems

const styles = StyleSheet.create({
    listWrapper: {
        width: '100%',
        minHeight: 0,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 0,
        paddingBottom: 0,
    },
    done: {
        textDecorationLine:'line-through',
        color: '#555',
        paddingTop: 4,
        
    },
    notDone: {
        fontWeight: 'bold',
        paddingTop: 4,
    },
    swipecontainer: {
        backgroundColor: 'white',
        flex: 1,
    },
    standalone: {
        paddingTop: 5,
        paddingBottom: 5
    },
    standaloneRowFront: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        minHeight: 50,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 10,
    },
    standaloneRowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    editBtn: {
        textAlign: 'center',
        backgroundColor: '#378FFF',
        color: '#FFF',
    },
    deleteBtn: {
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#FFF',
    },
    backTextWhite: {
        color: '#FFF',
    },

})


// code source https://github.com/taniarascia/react-hooks
// https://medium.com/@hartaniyassir/build-a-todo-app-in-react-native-using-hooks-9953f1066d67
// https://github.com/jemise111/react-native-swipe-list-view