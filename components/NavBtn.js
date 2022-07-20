/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import SvgUri from 'react-native-svg-uri';

const NavBtn = (props) => {
    console.log(props.icone);
    return (
        <TouchableHighlight onPress={props.action}>
            <Image
                source={{ uri: 'asset:' + props.icone }}
                style={styles.imgIcone}
            />
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    imgIcone: {
        width: 60,
        height: 60,
        backgroundColor: '#333333',
    }
})

export default NavBtn;