'use strict';


import BufferLoader from './BufferLoader';
import {sets, settings} from './../../data/';

export default class SphereSound {

    constructor(context) {
        // éénmalig inladen
        this.context = context;
        this.playMute = false;
        this.start = true;
        this.tempo;
        this.sample;
        this.mute = false;

        this.source = this.context.createOscillator();
        this.gain = this.context.createGain();
        this.convolver = this.context.createConvolver();
        this.buffer = this.context.createBufferSource();
        this.sound = this.context.createBufferSource();

        this.zeroGain = this.context.createGain();
        this.zeroGain.gain.value = 0;
        

        this.buffer.loop = true;
        this.sound.loop = true;

        let setting = settings[0];
        let sound = settings[3];


         this.check = new BufferLoader(this.context);
        this.check.load(sets[sound.set])
        .then(data => this.checkData(sound, data));

        this.loader = new BufferLoader(this.context);
        this.loader.load(sets[setting.set])
        .then(data => this.sendData(setting, data));

        this.sound.start(0);
        this.buffer.start(0);
        this.source.start(0);
  }

  muteSound(){

    this.mute = true;
        
        
    }

    unMute(){

        this.mute = false;
        
    }

    stop() {
        this.source.stop();
        this.buffer.stop();
        this.sound.stop();
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

      console.log(this.sample);

      this.buffer.buffer = this.sample;

    }

    play(params) {


        this.sound.playbackRate.value = params.radius/10; //drums
        //console.log(this.buffer.playbackRate.value);

        this.buffer.playbackRate.value = params.amount/10; //sound

        let valRecalc = params.amountRadius * 5;

        let noiseBuffer = this.context.createBuffer(2, 0.5 * this.context.sampleRate, this.context.sampleRate),
        left = noiseBuffer.getChannelData(0),
        right = noiseBuffer.getChannelData(1);
        for (let i = 0; i < noiseBuffer.length; i++) {
            left[i] = Math.random() * 2 - 1;
            right[i] = Math.random() * 2 - 1;
        }

        this.convolver.buffer = noiseBuffer;

        this.sound.connect(this.context.destination);
        this.buffer.connect(this.context.destination);

        this.gain.connect(this.context.destination);

            this.gain.connect(this.context.destination);
            this.source.connect(this.gain);
        
        if(this.mute){
            this.gain.disconnect(this.context.destination);
            this.source.disconnect(this.gain);
            this.buffer.disconnect(this.context.destination);
            this.sound.disconnect(this.context.destination);
            //this.zeroGain.connect(this.context.destination);
            //this.source.connect(this.zeroGain);

        
        //console.log('mute spehere');  

        }
        this.gain.value = 0.0001;
        
        this.source.type = 'sine';

        this.source.frequency.value = valRecalc; // value in hertz
        this.source.detune.value = 100; // value in cents

    }

}
