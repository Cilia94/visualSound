'use strict';


import BufferLoader from './BufferLoader';
import {sets, settings} from './../../data/';
let beatList = new Array();

export default class CubeSound {

    constructor(context) {
        // éénmalig inladen per cube
        this.context = context;
        this.playMute = false;
        this.start = true;
        this.tempo;
        this.sample;
        this.mute= false;

        this.source = this.context.createOscillator();

        this.gain = this.context.createGain();
        this.beatVolume = this.context.createGain();
        this.soundVolume = this.context.createGain();

        this.convolver = this.context.createConvolver();
        this.buffer = this.context.createBufferSource();
        this.sound = this.context.createBufferSource();
        this.beat = this.context.createBufferSource();

        this.buffer.loop = true;
        this.sound.loop = true;
        this.beat.loop = true;

        let setting = settings[0];
        let sound = settings[3];
        let beat = settings[4];

        this.check = new BufferLoader(this.context);
        this.check.load(sets[sound.set])
        .then(data => this.checkData(sound, data));

        this.loader = new BufferLoader(this.context);
        this.loader.load(sets[setting.set])
        .then(data => this.sendData(setting, data));

        this.beats = new BufferLoader(this.context);
        this.beats.load(sets[beat.set])
        .then(data => this.beatData(setting, data));

        this.sound.start(0);
        this.buffer.start(0);
        this.source.start(0);
        this.beat.start(0);

    }

    changeVolume(element) {
      var volume = element.value;
      var fraction = parseInt(element.value) / parseInt(element.max);
      // Let's use an x*x curve (x-squared) since simple linear (x) does not
      // sound as good.
      this.gainNode.gain.value = fraction * fraction;
    };

    stop() {
        this.source.stop();
        this.buffer.stop();
        this.sound.stop();
        this.beat.stop();
    }

    muteSound(){

    this.mute = true;
        
        
    }

    unMute(){

    this.mute = false;
        
    }


    beatData(setting, data=[]){


      console.log(data.length);

      this.sample = Math.floor((Math.random() * data.length) + 0);

      this.beat.buffer = data[this.sample];
      beatList.push(this.sample);

      console.log(beatList);

    }

    sendData(setting, data=[]){
      let {amount} = setting;

      amount = amount || data.length;

      for (let i = 0; i < amount; i++){
        this.sample = data[i];
      }

      this.sound.buffer = this.sample;
    }

    checkData(setting, data=[]){
      let {amount} = setting;

      amount = amount || data.length;

      for (let i = 0; i < amount; i++){
        this.sample = data[i];
      }

      this.buffer.buffer = this.sample;
    }

    play(params) {

        //ingeladen wanneer parameters aangepast zijn

        this.sound.playbackRate.value = params.amountRadius/10;
        this.buffer.playbackRate.value = params.amount/20;
        // this.beatVolume.value = Math.pow(params.width/10, 2);

        console.log(this.beatVolume.gain.value);

        let valRecalc = params.amountRadius * 5;

        let noiseBuffer = this.context.createBuffer(2, 0.5 * this.context.sampleRate, this.context.sampleRate),
        left = noiseBuffer.getChannelData(0),
        right = noiseBuffer.getChannelData(1);
        for (let i = 0; i < noiseBuffer.length; i++) {
            left[i] = Math.random() * 2 - 1;
            right[i] = Math.random() * 2 - 1;
        }

        this.convolver.buffer = noiseBuffer;

        this.beat.connect(this.beatVolume);
        this.beatVolume.connect(this.context.destination);

        let fraction = Math.pow(params.width/10, 2);

        if(this.mute){
            this.beatVolume.gain.value = 0;
                  console.log('mute cube');
            

        }else{
                  console.log('demute cube');
            

        this.beatVolume.gain.value = fraction;
    }

        let fractionSound = Math.pow(params.height/10, 2);

        if(this.mute){
            this.soundVolume.gain.value = 0;
                  console.log('mute cube');
            

        }else{
                  console.log('demute cube');
            

        this.soundVolume.gain.value = fractionSound;
    }

        this.sound.connect(this.soundVolume);
        this.soundVolume.connect(this.context.destination);
        this.buffer.connect(this.context.destination);

        this.source.connect(this.gain);
        this.gain.connect(this.context.destination);

        if (params.widthSegments < 4 || params.heightSegments < 4) {
            this.source.type = 'square';
        } else if(params.widthSegments > 10 || params.heightSegments > 10) {
          this.source.type = 'triangle';
        }else {
            this.source.type = 'sine';
        }

        this.source.frequency.value = valRecalc; // value in hertz
        this.source.detune.value = 100; // value in cents

    }

}
