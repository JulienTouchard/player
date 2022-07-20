/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import { playlist } from '../playlist';
import NavBtn from './NavBtn';
import Sound from 'react-native-sound';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';



class Player extends Component {
    constructor(props) {
        super(props);
        Sound.setCategory('Playback');
    }
    state = {
        currentTrack: 0,
        playlist: playlist,
        playPause: false,
        gestureName: 'none',
        tranxAnim: new Animated.Value(0),
    }

    mp3 = this.initSound();
    initSound(index = this.state.currentTrack) {
        console.log("index : " + index);
        const sound = new Sound(this.state.playlist[index].mp3, Sound.MAIN_BUNDLE, (error) => {
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
        let playPauseTmp = !this.state.playPause;
        this.setState({ playPause: playPauseTmp });
        if (!this.state.playPause) {
            // Play the sound with an onEnd callback
            this.mp3.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        } else {
            // Pause
            this.mp3.pause();
        }
    }
    prev() {
        console.log("prev");
        this.setState({ playPause: true });
        this.mp3.pause();
        let index;
        // j'ai besoin de detecter si this.state.currentTrack - 1 < 0 ???
        if (this.state.currentTrack - 1 < 0) {
            index = this.state.playlist.length - 1;
        } else {
            index = this.state.currentTrack - 1;
        }
        this.setState({ currentTrack: index });
        this.mp3 = this.initSound(index);
        setTimeout(() => {
            this.mp3.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }, 100);
    }
    next() {
        this.transOut();
        console.log("next");
        this.setState({ playPause: true });
        this.mp3.stop();
        this.mp3.release();
        let index;
        if (this.state.currentTrack === this.state.playlist.length - 1) {
            index = 0;
        } else {
            index = this.state.currentTrack + 1;
        }
        this.setState({ currentTrack: index });
        this.mp3 = this.initSound(index);
        setTimeout(() => {
            this.mp3.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        }, 100);

    }
    // gestion swipe
    onSwipeLeft(gestureState) {
        console.log("next");
        this.next();
    }

    onSwipeRight(gestureState) {
        console.log("prev");
        this.prev();
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
    }
    transOut = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(this.state.tranxAnim, {
            toValue: 500,
            duration: 500
        }).start();
    };
    render() {
        return (
            <View style={{ width: '100%' }}>
                <GestureRecognizer
                    onSwipe={(direction, state) => this.onSwipe(direction, state)}
                    onSwipeLeft={(state) => this.onSwipeLeft(state)}
                    onSwipeRight={(state) => this.onSwipeRight(state)}
                >
                    <Animated.Image
                        source={{ uri: 'asset:/img/cover/' + this.state.playlist[this.state.currentTrack].cover }}
                        style={[
                            styles.slider,
                            {
                                // Bind padding to animated value
                                paddingLeft: this.state.tranxAnim
                            }
                        ]}
                    />
                </GestureRecognizer>
                <View style={styles.navigation}>
                    <NavBtn action={() => { this.prev(); }} icone={"/img/step-backward-solid.png"} />
                    <NavBtn action={() => { this.playMp3(); }} icone={this.state.playPause ? "/img/pause-solid.png" : "/img/play-circle-solid.png"} />
                    <NavBtn action={() => { this.next(); }} icone={'/img/step-forward-solid.png'} />
                </View>
                <View style={styles.info}>
                    <Text>{this.state.playlist[this.state.currentTrack].artist}</Text>
                    <Text>{this.state.playlist[this.state.currentTrack].title}</Text>
                    <Text>{this.state.playlist[this.state.currentTrack].annee}</Text>
                    <Text>{this.state.playlist[this.state.currentTrack].genre}</Text>
                    <Text>{this.state.playlist[this.state.currentTrack].description}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    navigation: {
        width: '100%',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 5,

    },
    slider: {
        width: '100%',
        height: 400,
        backgroundColor: 'skyblue',
    },
    info: {
        width: '100%',
        margin: 5,
    }
});
export default Player;
