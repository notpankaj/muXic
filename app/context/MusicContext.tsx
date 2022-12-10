import React, {Component, createContext} from 'react';
import {PermissionsAndroid, NativeModules} from 'react-native';
import TrackPlayer, {Event, Track} from 'react-native-track-player';
const {AudioModule} = NativeModules;

type PropType = {
  children: React.ReactNode;
};
type StateType = {
  isReady: boolean;
  isMusicPlaying: boolean;
  musicStorage: AudioType[];
  activeSongIndex: number;
  activeSongObj: AudioType | null;
  progresValue: number;
  totalNumOfSong: number;
};

type IntervalType = null | number;

interface MusicContextInterface extends StateType {
  seekTo: (arg: number) => void;
  nextSong: Function;
  prevSong: Function;
  playSong: Function;
  pauseSong: Function;
  stopSong: Function;
  updateState: (arg: object) => void;
  playSongFormIdx: (arg: number) => void;
  toggleIsMusicPlaying: (arg: boolean) => void;
}

export const MusicContext = createContext<MusicContextInterface | null>(null);

class MusicProvider extends Component<PropType, StateType> {
  INTERVAL: IntervalType = null;

  constructor(props: PropType) {
    super(props);
    this.state = {
      isReady: false,
      isMusicPlaying: false,
      musicStorage: [],
      activeSongIndex: 0,
      activeSongObj: null,
      progresValue: 0,
      totalNumOfSong: 0,
    };

    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
    this.playSongFormIdx = this.playSongFormIdx.bind(this);
    this.toggleIsMusicPlaying = this.toggleIsMusicPlaying.bind(this);

    this.nextSong = this.nextSong.bind(this);
  }
  async getSongsFormDevice() {
    console.log('getSongsFormDevice()');
    try {
      const res = await AudioModule.getAllAudioFiles();
      const media = JSON.parse(res);

      this.updateState({
        musicStorage: media?.map((item: AudioType, idx: number) => {
          return {...item, url: item.uri, idx};
        }),
        totalNumOfSong: media.length,
      });

      this.setupTrackPlayer();
    } catch (error) {
      console.error(error);
    }
  }

  updateState(newState: object) {
    this.setState({
      ...this.state,
      ...newState,
    });
  }

  toggleIsMusicPlaying = (bool: boolean) => {
    this.updateState({isMusicPlaying: bool});
  };

  //  printing
  printStamp = async () => {
    console.log('PrintStamp()');
    const position = await TrackPlayer.getPosition();
    this.updateState({progresValue: position});
  };

  printEnable = () => {
    console.log('printEnable()');
    this.INTERVAL = setInterval(this.printStamp, 100);
  };

  printDisable = () => {
    console.log('printDisable()');
    if (!this?.INTERVAL) return;
    this.updateState({progresValue: 0});
    clearInterval(this.INTERVAL);
  };

  // handle music start
  async nextSong() {
    console.log('nextSong()');
    try {
      await TrackPlayer?.skipToNext();
    } catch (error) {
      console.log(error);
    }
  }
  async prevSong() {
    await TrackPlayer?.skipToPrevious();
  }

  async playSongFormIdx(songIdx: number) {
    console.log(`playSongFormIdx(${songIdx})`);
    if (songIdx === null || songIdx === undefined) return;

    try {
      const res1 = await TrackPlayer.skip(songIdx);
      console.log({res1}, 'playSongFormIdx');
      this.playSong();
    } catch (error: any) {
      console.error(error?.error, 'playSongFormIdx');
    }
  }
  playSong() {
    TrackPlayer?.play();
    console.log('playSong()');
    // this.printEnable();
  }

  pauseSong() {
    TrackPlayer?.pause();
    console.log('pauseSong()');
    this.printDisable();
  }

  stopSong() {}

  seekTo(val: number) {
    console.log('seekTo()', val);
    TrackPlayer.seekTo(val);
  }
  async getQueue() {
    try {
      const q = await TrackPlayer.getQueue();
      console.log({q});
      return q;
    } catch (error: any) {
      console.error(error.message, 'getQueue(');
    }
  }

  // handle music end

  async checkDevicePermissions() {
    console.log('checkDevicePermissions()');
    let granted = false;
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Example App',
          message: 'Example App access to your storage ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('STORAGE PERMISSION GRANTED');
        granted = true;
      } else {
        console.log('STORAGE PERMISSION denied');
        granted = false;
      }
    } catch (error: any) {
      console.error(error);
    }

    return granted;
  }

  async setupTrackPlayer() {
    try {
      const setupTrackPlayer = await TrackPlayer.setupPlayer();
      console.log({setupTrackPlayer});
      this.loadSongToTrackPlayer();
    } catch (error: any) {
      console.error(error.message, ' ===> setupTrackPlayer');
    }
  }

  async loadSongToTrackPlayer() {
    try {
      // @ts-ignore
      const addedSongsToTP = await TrackPlayer.add(this.state.musicStorage);
      console.log({addedSongsToTP});
      this.addListeners();
      this.updateState({isReady: true}); //will add here in the end
    } catch (error: any) {
      console.error(error.message, ' ===> loadSongToTrackPlayer');
    }
  }

  async boot() {
    console.log('boot()');
    const hasPermission = await this.checkDevicePermissions();
    if (!hasPermission) {
      // will show not permission scrren
      return;
    }

    this.getSongsFormDevice();
    this.updateState({isReady: true});
  }

  // listeners
  addListeners() {
    console.log('addListeners()');
    try {
      TrackPlayer.addEventListener(Event.PlaybackQueueEnded, event => {
        console.log('Event.PlaybackQueueEnded', event);
        console.log('Q ENDED');
      });

      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, event => {
        console.log('Event.PlaybackTrackChanged', event);

        this.setState({
          ...this.state,
          activeSongIndex: event?.nextTrack,
          activeSongObj: this.state.musicStorage[event?.nextTrack],
        });
        console.log('Track Change');
      });
    } catch (error) {
      console.error(error, 'addListener()');
    }
  }

  removeListeners() {}
  // listeners

  componentDidMount() {
    this.boot();
  }

  componentWillUnmount() {}

  render() {
    console.log(this.state);
    const {
      seekTo,
      nextSong,
      prevSong,
      playSong,
      pauseSong,
      stopSong,
      updateState,
      playSongFormIdx,
      toggleIsMusicPlaying,
    } = this;

    const valuePayload = {
      seekTo,
      nextSong,
      prevSong,
      playSong,
      pauseSong,
      stopSong,
      updateState,
      playSongFormIdx,
      toggleIsMusicPlaying,
    };

    return (
      <MusicContext.Provider value={{...this.state, ...valuePayload}}>
        {this.props.children}
      </MusicContext.Provider>
    );
  }
}

export default MusicProvider;
