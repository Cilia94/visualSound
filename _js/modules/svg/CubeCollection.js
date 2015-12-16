'use strict';

import {
  cubeSliderParameters
}
from '../../data/';

import {
  Cube
}
from '../../modules/svg/';


//let parameters;
// let test;

import EventEmitter from 'eventemitter2';

export default class CubeCollection extends EventEmitter {

  constructor(id) {

    console.log(cubeSliderParameters);

    super();
    this.id = id;

    this.parameters = {};
    this.parameters.type = 'cube';

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
    this.wrapParams.className = 'wrapParams id_' + this.id;
    this.nameSpan = document.createElement('span');
    this.nameSpan.className = 'nameColl';
    this.nameSpan.innerHTML = ('Cubes ' + (this.id + 1)).toUpperCase();

    this.colorPicker = document.createElement('INPUT');
    this.colorPicker.addEventListener('change', function(){
          console.log(_self.colorPicker.value);
          _self.parameters.fill = '#' + _self.colorPicker.value;
          console.log(_self.parameters.fill);
          _self.emit('changeParam');

    });

    let _self = this;

    this.picker = new jscolor(this.colorPicker);
        this.picker.fromHSV(332, 53, 100);
    this.colorPicker.value = '#82DEFF';
    this.colorPicker.className = 'jscolor color_' + this.id;


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

    this.muteButton = document.createElement('i');
      this.muteButton.className = 'glyphicon glyphicon-volume-off';
      $(this.muteButton).on('click', function() {

        if(_self.mute === false){
        _self.mute = true;
            //console.log('mute');
          }else{
            _self.mute = false;

          }
        
        _self.emit('changeParam');
      });



    this.wrapParams.appendChild(this.nameSpan);
    this.wrapParams.appendChild(this.foldButtonSphere);
    this.wrapParams.appendChild(this.muteButton);
    this.wrapParams.appendChild(this.deleteButtonSphere);



    this.wrapParams.appendChild(this.colorPicker);
    this._createParams();
    this._create();


  }

  _createParams() {

    for (let h = 0; h < cubeSliderParameters.length; h++) {

      this.wrapDiv = document.createElement('div');
      this.wrapDiv.className = 'wrapDiv';
      this.sliderspan = document.createElement('span');
      this.sliderspan.className = 'name';
      this.sliderspan.id = 'cube_name_' + this.id + h;
      this.sliderspan.innerHTML = cubeSliderParameters[h].name;

      this.sliderspanvalue = document.createElement('span');
      this.sliderspanvalue.className = 'value';
      this.sliderspanvalue.id = 'cube_val_' + this.id + h;
      this.sliderspanvalue.innerHTML = cubeSliderParameters[h].value;

      this.sliderdiv = document.createElement('div');
      this.sliderdiv.className = 'param';
      $(this.sliderdiv).attr('data-paramType', cubeSliderParameters[h].name);
      this.sliderdiv.id = 'cube_param_' + this.id + h;

      this.wrapDiv.appendChild(this.sliderspan);

      this.wrapDiv.appendChild(this.sliderdiv);
      this.wrapDiv.appendChild(this.sliderspanvalue);
      this.wrapParams.appendChild(this.wrapDiv);


      $('#cube_sliders').append(this.wrapParams);
      let _self = this;
      //console.log(this.parameters);
      $('#cube_param_' + this.id + h).slider({

        min: cubeSliderParameters[h].min,
        max: cubeSliderParameters[h].max,
        step: cubeSliderParameters[h].step,
        value: cubeSliderParameters[h].value,

        slide: function(event, ui){


    $('#cube_val_' + _self.id + _self.h).html(ui.value);


    let paramType = $(event.target).attr('data-paramType');

    switch (paramType) {

      case 'Amount':
        _self.parameters.amount = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;
        break;

      case 'Radius Position':
        _self.parameters.amountRadius = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;
        break;

      case 'Width Segements':
        _self.parameters.widthSegments = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;
        break;

      case 'Height':
        _self.parameters.height = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;
        break;

      case 'Width':
        _self.parameters.width = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;

        break;

      case 'Depth':
        _self.parameters.depth = ui.value;
        document.querySelector('#cube_val_' + _self.id + h).innerHTML = ui.value;
        break;


    }

      _self.emit('changeParam');

        }

      });

    }
  }

  randomBetween(min, max, round=true, signed=false) {
    let rand = min + Math.random() * (max-min);
    if(rand) rand = Math.round(rand);
    if(signed && this.randomBool()){
      return rand - (rand*2);
    }
    return rand;
  }

  randomBool() {
    return Boolean(Math.round(Math.random()));
  }


  _create() {


    this.cubeArray = [];

    let angle = 0;
    let step = (2 * Math.PI) / this.parameters.amount;

    for (let i = 0; i < this.parameters.amount; i++) {

      let cosRange = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.width / 2);

      let zPos = this.randomBetween(0, cosRange, true, true);

      let xPos = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.width / 2);
      let yPos = Math.round(this.parameters.amountRadius * Math.sin(angle) - this.parameters.width / 2);

      let cube = new Cube({
          x: xPos,
          y: yPos,
          z: zPos
        },
        this.parameters

      );

      angle += step;

      this.cubeArray.push(cube);

    }

    return this.cubeArray;

  }

  _onFrame() {

    requestAnimationFrame(() => this._onFrame());

  }



}
