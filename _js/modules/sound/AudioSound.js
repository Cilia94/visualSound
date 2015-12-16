'use strict';


import BufferLoader from './BufferLoader';
import {sets, settings} from './../../data/';
let beatList = new Array();

export default class AudioSound {

    constructor(context) {
        // éénmalig inladen per cube
        this.context = context;


    }

    changeVolume(element) {
      var volume = element.value;
      var fraction = parseInt(element.value) / parseInt(element.max);
      // Let's use an x*x curve (x-squared) since simple linear (x) does not
      // sound as good.
      //this.gainNode.gain.value = fraction * fraction;
    };

    stop(src) {
 
    }


    addSource(src){
      let Things = document.querySelectorAll('#sound');

      for (var i = 0; i < Things.length; i++) {
        for (var j = 0; j < src.length; j++) {
          Things[i].src = src[j];
        };
      };
    }

}
