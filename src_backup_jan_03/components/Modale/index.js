import React, { Component, useState } from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

import {styles} from '../styles/signUpIn';
    
const logOutModal = () => {
    
    return(
        <Modal isVisible = {true}>
                <View style={styles.container2}>
                <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title}>How To Play</Text>
                        <View style= {{flex:1, alignItems: 'flex-end'}}>
                                <Text style={[styles.fieldTitle, {marginLeft: 0}]}>Remember?</Text>
                                <Text style={styles.accent} >Sign In</Text>
                        </View>      
                </View>
                </View>
        </Modal>
        );
}
    
export default logOutModal;
