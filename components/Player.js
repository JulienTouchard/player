/* eslint-disable prettier/prettier */
import React,{ Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
        console.log("playMP3")
        console.dir(this.mp3)
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
        this.setState({currentTrack:this.state.currentTrack-1});
        this.mp3 = this.initSound();
        this.play(); 
    }
    next(){
        let index;
        if(this.state.currentTrack === this.state.playlist.length - 1){
            index = 0;
        } else {
            index = this.setState.currentTrack +1;
        }
        this.mp3.pause();
        this.setState({currentTrack:index});
        this.mp3 = this.initSound();
        this.play();
    }
    render() {
        return (
            <View style={{ width: '100%' }}>
                <Image source={{
                    //require(this.state.playlist[this.state.currentTrack].cover)
                    uri: this.state.playlist[this.state.currentTrack].cover
                }}
                    style={styles.slider}
                />
                <View style={styles.navigation}>
                    <NavBtn action={()=>{this.prev()}} icone={"https://images-ext-1.discordapp.net/external/9F4vUDN1FrkadHp6j5uZS2_JcboV0WcxEhM4d-dmYuM/https/img.icons8.com/ios-glyphs/500/skip-to-start--v1.png"} />
                    <NavBtn action={() => { this.playMp3() }} icone={"https://images-ext-2.discordapp.net/external/oiYxOTwUG0RKUDkKJKnUDwhZMIl83ZxoXPMTsQ9wzo8/https/img.icons8.com/fluency-systems-filled/500/play.png"} />
                    <NavBtn action={()=>{this.next()}} icone={"https://images-ext-1.discordapp.net/external/NxBV6i6f7MdvoXwKUB6sgVuR7tFrO81d6dJb6jGCOsc/https/img.icons8.com/ios-glyphs/500/end--v1.png"} />
                </View>

            </View>
        )
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
        backgroundColor: 'skyblue'
    }
})
export default Player;