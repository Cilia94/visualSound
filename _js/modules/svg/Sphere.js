'use strict';


import {SoundUtil} from '../util/';

import EventEmitter from 'eventemitter2';

export default class Sphere extends EventEmitter {

	constructor(position, parameters){

		super();

		this.position = position;
		//this.name = "testn";
		this.fill = '#90FFFF';
    //this.fill = this.effect.color;
    this.scalingStep = 5;
    this.scalingSpeed = 1.3;
    //this._onFrame();
		this.parameters = parameters;

	}

	_onFrame(){

	//requestAnimationFrame(() => this._onFrame());

	}

	setParameters(parameters){

		this.parameters = parameters;

	}

   _soundParam(){
      // this.parameters.push({effect:SoundUtil.randomEffect()});

      this.parameters.effect = SoundUtil.randomEffect();
    }

	setRadius(parameter){

		this.parameters.radius = parameter;
		this.render();

	}

	setPhiLength(parameter){

		this.parameters.phiLength = parameter;
		this.render();

	}

	setWidthSegments(parameter){

		this.parameters.widthSegments = parameter;
		this.render();

	}

	setHeightSegments(parameter){

		this.parameters.heightSegments = parameter;
		this.render();

	}

	render(){

		let {x, y, z} = this.position;

		//let {radius, fill} = this;

    //console.log(x, y, z, fill, radius);

		let geometry = new THREE.SphereGeometry(this.parameters.radius, this.parameters.widthSegments, this.parameters.heightSegments);

		let material = new THREE.MeshBasicMaterial({
			color: this.parameters.fill,
			wireframe: true
		});

    //console.log('sphere_render');

		this.shape = new THREE.Mesh(geometry, material);

		this.shape.name = this.name;
		this.shape.position.x = this.position.x;
		this.shape.position.y = this.position.y;
		this.shape.position.z = this.position.z;

		return this.shape;

	}

	renderAnimate(){

		let {x, y, z} = this.position;

		//let {radius, fill} = this;

    //console.log(x, y, z, fill, radius);
    //this.animate();


		let geometry = new THREE.SphereGeometry(this.parameters.rad, this.parameters.widthSegments, this.parameters.heightSegments);

		let material = new THREE.MeshNormalMaterial({
			//color: this.parameters.fill,
			vertexColors: THREE.VertexColors,
			wireframe: true
		});

   // console.log('Omtrek cirkel = ', this.radius * Math.PI);


		this.shape = new THREE.Mesh(geometry, material);
		this.shape.name = this.name;
		this.shape.position.x = this.position.x;
		this.shape.position.y = this.position.y;
		this.shape.position.z = this.position.z;


            //var scaleX = Math.abs(Math.sin(this.scalingStep / 4));
            //var scaleY = Math.abs(Math.cos(this.scalingStep / 5));
            //var scaleZ = Math.abs(Math.sin(this.scalingStep / 7));
            //this.shape.scale.set(scaleX, scaleY, scaleZ);

		return this.shape;

	}

	animate(){
		 this.scalingStep++;
		 console.log(this.scalingStep);


	}


}

