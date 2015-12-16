'use strict';


//let parameters;
// let test;

import EventEmitter from 'eventemitter2';

export default class AudioCollection extends EventEmitter {

  constructor(id) {

    super();

    //console.log(id);

    this.id = id;

    this.parameters = {};
    this.parameters.type = 'audio';
    

  
    

    this.parameters.width = 15;
    this.parameters.height = 15;
    this.parameters.widthSegments = 8;
    this.parameters.heightSegments = 8;
    this.parameters.depth = 15;
    this.parameters.depthSegments = 6;
    this.parameters.amount = 10;
    this.parameters.amountRadius = 50;
    this.parameters.fill = '#82DEFF';


    this.wrapParams = document.createElement('div');
    this.wrapParams.className = 'wrapParams id_' + (this.id + 1);
    this.nameSpan = document.createElement('span');
    this.nameSpan.className = 'nameColl';
    this.nameSpan.innerHTML = 'My Audio' + (this.id + 1) + ' ';

    this.colorPicker = document.createElement('INPUT');
    this.colorPicker.addEventListener('change', function(){
          //console.log(_self.colorPicker.value);
          _self.parameters.fill = '#' + _self.colorPicker.value;
          //console.log(_self.parameters.fill);
          _self.emit('changeParam');

    });

    let _self = this;

    // this.picker = new jscolor(this.colorPicker);
    //     this.picker.fromHSV(332, 53, 100);
    // this.colorPicker.value = '#82DEFF';
    // this.colorPicker.className = 'jscolor color_' + this.id;


    this.deleteButtonSphere = document.createElement('i');
    this.deleteButtonSphere.className = 'deleteButton glyphicon glyphicon-remove ' + 'deleteId_' + this.id;
    $(this.deleteButtonSphere).on('click', function() {


    $(this.parentElement).remove();
    _self.emit('delete');


    });

    this.foldButtonSphere = document.createElement('i');
    this.foldButtonSphere.className = 'glyphicon glyphicon-chevron-up fold ' + 'foldId_' + this.id;
    $(this.foldButtonSphere).on('click', function() {

      if ($(this).parent().find('.wrapDiv').css('display') === 'none') {

        $(this).parent().find('.wrapDiv').css('display', 'block');
        $(this).removeClass('glyphicon-chevron-down');
        $(this).addClass('glyphicon-chevron-up');

      } else {

        $(this).removeClass('glyphicon-chevron-up');
        $(this).addClass('glyphicon-chevron-down');
        $(this).parent().find('.wrapDiv').css('display', 'none');
      }

    });

    this.wrapParams.appendChild(this.nameSpan);
    this.wrapParams.appendChild(this.foldButtonSphere);
    this.wrapParams.appendChild(this.deleteButtonSphere);



    // this.wrapParams.appendChild(this.colorPicker);
    this._createParams();
    //this._create();


  }

  _createParams() {

    // for (let h = 0; h < cubeSliderParameters.length; h++) {

      this.wrapDiv = document.createElement('div');
      this.wrapDiv.className = 'wrapDiv';

      this.sliderspan = document.createElement('span');
      this.sliderspan.className = 'name';
      this.sliderspan.id = 'audio_name_' + (this.id + 1);
      this.sliderspan.innerHTML = 'audio';

      this.innerAudio = document.createElement('audio');
      this.innerAudio.id = 'sound' + this.id;
          console.log('id set');
      
      // this.innerAudio.src = ;
      this.innerAudio.controls = 'true';

      //console.log(this.innerAudio);

      // this.wrapDiv.appendChild(this.sliderspan);

      this.wrapDiv.appendChild(this.innerAudio);
      this.wrapParams.appendChild(this.wrapDiv);

      $('#audio_sliders').append(this.wrapParams);
      let _self = this;
      //console.log(this.parameters);

    // }
  }



  setName(name){

    this.nameSpan.innerHTML = (name).toUpperCase();

  }


  _create() {


    // this.cubeArray = [];

    // let angle = 0;
    // let step = (2 * Math.PI) / this.parameters.amount;

    // for (let i = 0; i < this.parameters.amount; i++) {

    //   let cosRange = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.width / 2);

    //   let zPos = this.randomBetween(0, cosRange, true, true);

    //   let xPos = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.width / 2);
    //   let yPos = Math.round(this.parameters.amountRadius * Math.sin(angle) - this.parameters.width / 2);

    //   // let cube = new Cube({
    //   //     x: xPos,
    //   //     y: yPos,
    //   //     z: zPos
    //   //   },
    //   //   this.parameters

    //   //);

    //   angle += step;

    //   // this.cubeArray.push(cube);

    // }

    // return this.cubeArray;

  }

  _onFrame() {

    requestAnimationFrame(() => this._onFrame());

  }



}
