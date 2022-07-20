/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { playlist } from '../playlist';
import NavBtn from './NavBtn';
import  Sound  from 'react-native-sound';


class Player extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        currentTrack: 0,
        playlist: playlist,
    }
    mp3 = this.initSound();
    initSound() {
        //const sound = new Audio(this.state.playlist[this.state.currentTrack].mp3);
        Sound.setCategory('Playback');
        const sound = new Sound(this.state.playlist[this.state.currentTrack].mp3, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + sound.getDuration() + 'number of channels: ' + sound.getNumberOfChannels());
        });
        return sound;
    }
    playMp3() {
        console.log('playMP3');
        console.dir(this.mp3);
        // Play the sound with an onEnd callback
        this.mp3.play((success) => {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });

        /* if (this.mp3.paused) {
            this.play();
        } else {
            this.pause();
        } */
    }
    /* play() {
        this.mp3.play();
    }
    pause() {
        this.mp3.pause();
    } */
    prev(){
        this.mp3.pause();
        this.setState({currentTrack:this.state.currentTrack - 1});
        this.mp3 = this.initSound();
        this.play();
    }
    next(){
        let index;
        if (this.state.currentTrack === this.state.playlist.length - 1){
            index = 0;
        } else {
            index = this.setState.currentTrack + 1;
        }
        this.mp3.pause();
        this.setState({currentTrack:index});
        this.mp3 = this.initSound();
        this.play();
    }
    render() {
        return (
            <View style={{ width: '100%' }}>
                <Text>{this.state.playlist[this.state.currentTrack].cover}</Text>
                <Image 
                    source={{ uri: 'asset:/img/cover/' + this.state.playlist[this.state.currentTrack].cover }}
                    style={styles.slider}
                />
                <View style={styles.navigation}>
                    <NavBtn action={()=>{this.prev();}} icone={"/img/step-backward-solid.png"}/>
                    <NavBtn action={() => { this.playMp3(); }} icone={"/img/play-circle-solid.png"}/>
                    <NavBtn action={()=>{this.next();}} icone={'/img/step-forward-solid.png'}/>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    navigation: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    slider: {
        width: '100%',
        height: 300,
        backgroundColor: 'skyblue',
    },
});
export default Player;
