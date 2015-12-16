'use strict';

import {
	MathUtil
}
from '../util/';

import {
	sliderParameters,
	sphereSliderParameters
}
from '../../data/';

import {
	Sphere
}
from '../../modules/svg/';

import {sets, settings} from './../../data/';

import EventEmitter from 'eventemitter2';

export default class SphereCollection extends EventEmitter {

	constructor(id) {

		super();
		this.id = id;
		this.paramA = 0;

		this.parameters = {};
		this.parameters.type = 'sphere';

		this.parameters.radius = 15;
		this.parameters.widthSegments = 8;
		this.parameters.heightSegments = 8;
		this.parameters.amount = 10;
		this.parameters.amountRadius = 50;
		this.parameters.fill = '#FF78B7';
		this.parameters.rad = 0;
		this.mute = false;
		//332°, 53%, 100%


		this.wrapParams = document.createElement('div');
		this.wrapParams.className = 'wrapParams id_' + this.id;
		this.nameSpan = document.createElement('span');
		this.nameSpan.className = 'nameColl';
		this.nameSpan.innerHTML = ('Spheres ' + (this.id + 1)).toUpperCase();;

		let _self = this;

		this.colorPicker = document.createElement('INPUT');
		this.colorPicker.addEventListener('change', function(){
			  	console.log(_self.colorPicker.value);
			  	_self.parameters.fill = '#' + _self.colorPicker.value;
			  	console.log(_self.parameters.fill);
			  	_self.emit('changeParam');

		});
		this.picker = new jscolor(this.colorPicker);
        this.picker.fromHSV(332, 53, 100);
		this.colorPicker.value = '#82DEFF';
		this.colorPicker.className = 'jscolor color_' + this.id;

		this.deleteButtonSphere = document.createElement('i');
		this.deleteButtonSphere.className = 'deleteButton glyphicon glyphicon-remove ' + 'deleteId_' + this.id;
		$(this.deleteButtonSphere).on('click', function() {


		$(this.parentElement).remove();
		_self.emit('delete');

    // -----------------------------
    this.setting = settings[0];
    this.loadSetting(this.setting);
    // -----------------------------

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
		this.muteButton.className = 'muteButton glyphicon glyphicon-volume-off';
		
			$(this.muteButton).on('click', function() {

				if(_self.mute === false){
				_self.mute = true;
				$(this).addClass('muteButtonActive')
				 
				  }else{
				  	$(this).removeClass('muteButtonActive')
				  	
				  	_self.mute = false;

				  }
				
				_self.emit('changeParam');
			});

		this.wrapParams.appendChild(this.nameSpan);
		this.wrapParams.appendChild(this.foldButtonSphere);
		this.wrapParams.appendChild(this.deleteButtonSphere);
		this.wrapParams.appendChild(this.muteButton);
		this.wrapParams.appendChild(this.colorPicker);

		this._createParams();
		this._create();


	}

	_createParams() {

		for (let h = 0; h < sphereSliderParameters.length; h++) {

			this.wrapDiv = document.createElement('div');
			this.wrapDiv.className = 'wrapDiv';
			this.sliderspan = document.createElement('span');
			this.sliderspan.className = 'name';
			this.sliderspan.id = 'sphere_name_' + this.id + h;
			this.sliderspan.innerHTML = sphereSliderParameters[h].name;

			this.sliderspanvalue = document.createElement('span');
			this.sliderspanvalue.className = 'value';
			this.sliderspanvalue.id = 'sphere_val_' + this.id + h;
			this.sliderspanvalue.innerHTML = sphereSliderParameters[h].value;

			this.sliderdiv = document.createElement('div');
			this.sliderdiv.className = 'param';
			$(this.sliderdiv).attr('data-paramType', sphereSliderParameters[h].name);
			this.sliderdiv.id = 'sphere_param_' + this.id + h;

			

		

			this.wrapDiv.appendChild(this.sliderspan);

			this.wrapDiv.appendChild(this.sliderdiv);
			this.wrapDiv.appendChild(this.sliderspanvalue);
			this.wrapParams.appendChild(this.wrapDiv);



			$('#sphere_sliders').append(this.wrapParams);
			let _self = this;
			//console.log(this.parameters);
			$('#sphere_param_' + this.id + h).slider({

				min: sphereSliderParameters[h].min,
				max: sphereSliderParameters[h].max,
				step: sphereSliderParameters[h].step,
				value: sphereSliderParameters[h].value,

				slide: function(event, ui){


		$('#sphere_val_' + _self.id + _self.h).html(ui.value);


		let paramType = $(event.target).attr('data-paramType');

		switch (paramType) {

			case 'Amount':
				_self.parameters.amount = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;
				break;

			case 'Radius Position':
				_self.parameters.amountRadius = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;
				break;

			case 'Width Segments':
				_self.parameters.widthSegments = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;
				break;

				case 'Height Segments':
				_self.parameters.heightSegments = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;
				break;

			case 'Radius':
				_self.parameters.radius = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;
        break;

			case 'Width':
				_self.parameters.width = ui.value;
				document.querySelector('#sphere_val_' + _self.id + h).innerHTML = ui.value;

				break;




		}

			_self.emit('changeParam');

				}

			});

		}
	}

	_create() {

		this.sphereArray = [];

		let angle = 0;
		let step = (2 * Math.PI) / this.parameters.amount;

		for (let i = 0; i < this.parameters.amount; i++) {
 let cosRange = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.radius / 2);

      let zPos = MathUtil.randomBetween(0, cosRange, true, true);
      let xPos = Math.round(this.parameters.amountRadius * Math.cos(angle) - this.parameters.radius / 2);
      let yPos = Math.round(this.parameters.amountRadius * Math.sin(angle) - this.parameters.radius / 2);

      // if(this.parameters.rad < this.parameters.radius){
      //   this.parameters.rad+=0.01;
      // }

      	let sphere = new Sphere({
      			x: xPos,
      			y: yPos,
      			z: zPos
      		},
      		this.parameters
      	);

			//this.paramA+=0.03;
			  	//console.log(this.paramA);


			angle += step;

			this.sphereArray.push(sphere);

		}

		return this.sphereArray;

	}

	_onFrame() {

		//requestAnimationFrame(() => this._onFrame());

	}



}
