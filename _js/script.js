'use strict';

let scene, camera, renderer, controls;
let player;
let Players, userPlayers;
let collie, userInput;
let context;
let audiotracks;
let audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;

let idCollection, idCollectionUS;
let mediaStream, rec;
let recIndex = 1;
let recording;
let col = '#FFFFFF';
let gesturesOn;
let filename, filenameNoForm;



let OrbitControls = require('three-orbit-controls')(THREE);


var navigator = window.navigator;
navigator.getUserMedia = (
  navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
);

import {
	Player, SphereSound, CubeSound, AudioSound
}
from './modules/sound/';

// import {
// 	MathUtil
// }
// from './modules/util/';

import {
	CubeCollection,
	SphereCollection,
	AudioCollection
}
from './modules/svg/';


const init = () => {

	

	window.URL = window.URL || window.webkitURL;
	let currentGesture = null;

	context = new AudioContext();
    window.AudioContext =
    window.AudioContext ||
    window.webkitAudioContext;


	collie = [];
	audiotracks = [];
	userInput = [];
	userPlayers = [];
	Players = [];
	idCollection = 0;
	idCollectionUS = 0;
	recording = false;
	player = new Player();

	$('#mic').on('click', toggleRecording);

	$('#audio').on('change', addAudioFile);


	navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, gotStream, function(e) {
            alert('Error getting audio');
           
        });

	window.onresize = resize;

	

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75, (window.innerWidth-420) / (window.innerHeight-200), 0.1, 1000
	);


	renderer = new THREE.WebGLRenderer({
		 preserveDrawingBuffer: true });
	renderer.setSize(
		window.innerWidth - 420,
		window.innerHeight - 200
	);

	let colorPicker = document.createElement('INPUT');
	let picker = new jscolor(colorPicker);
		colorPicker.addEventListener('change', function(){
			  	col = picker.toHEXString()
			  	renderer.setClearColor( col);
			  	//_self.parameters.fill = '#' + _self.colorPicker.value;
			  	
			  	//_self.emit('changeParam');

		});
		
        //this.picker.fromHSV(332, 53, 100);
		//this.colorPicker.value = '#82DEFF';
		$('.pic').append(colorPicker);


	renderer.setClearColor(col);

  //renderer.setClearColorHex( 0xffffff, 1 );

  	controls = new OrbitControls(camera, renderer.domElement);
  	

	setupAddItems();

	

	document.querySelector('main').appendChild(renderer.domElement);

	document.getElementById('download').addEventListener('click', function() {
	//e.preventDefault();
	let canvas = document.getElementsByTagName('canvas')[0];

	let cv = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
	var dataURLl = canvas.toDataURL();

	
	let link = document.getElementById('download');
	let filename = "file";
	link.href = dataURLl;
    link.download = filename;

	});

	gest.start();
	$('.controlsOnOff').on('click',function(){
		if(gesturesOn){
			
		gest.stop();
		$(this).html('Turn on')

		gesturesOn = false;
	}else{
		gest.start();
		$(this).html('Turn off')
		
		gesturesOn = true;
	}
	})
	gesturesOn = true;
	//gest.options.debug(true);
	gest.options.subscribeWithCallback(function(gesture) {

	
	tellGesture(gesture)
		
    controls.onGesture(gesture);
});


  
	render();
	editor();
};

// const toggleGest = () => {
// 	if(gesturesOn){
// 		gest.stop();
// 		gesturesOn = false;
// 	}else{
// 		gest.start();
// 		gesturesOn = true;
// 	}
// }

const tellGesture = (gesture) =>{

	
	switch ( gesture.direction ) {

                case 'Up' || 'Long up':

                $('.directions').removeClass('activeDirection')
                $('.up').addClass('activeDirection');
                
                    
                    break;

                case 'Down' || 'Long down':

                $('.directions').removeClass('activeDirection')
                $('.down').addClass('activeDirection');
               
                    
                    break;

                case 'Left':

                $('.directions').removeClass('activeDirection')
                $('.left').addClass('activeDirection');
                
                    
                    break;

                case 'Right':

                $('.directions').removeClass('activeDirection')
                $('.right').addClass('activeDirection');
                
                    
                    break;

            }

           setTimeout(function(){
	$('.directions').removeClass('activeDirection')


	},1500);
}

const addAudioFile = () => {
  
  let collAudios = new AudioCollection(idCollectionUS);
    let AudioPlayer = new AudioSound(context);

    userPlayers.push(AudioPlayer);
    collAudios.on('changeParam', () => {
      //renderScene();
    });

    collAudios.on('delete', () => {
      userInput[collAudios.id] = undefined;
      userPlayers[collAudios.id].stop();
      userPlayers[collAudios.id] = undefined;
      //renderScene();
    });

    userInput.push(collAudios);
    //renderScene();
   
    $('.addtrack').attr('disabled', 'true')


  	

  var sound = document.getElementById('sound'+idCollectionUS);
  var obj = document.getElementById('audio');
    	console.log('addaudio');
  

  var reader = new FileReader();
  reader.onload = (function(audio) {
 
    return function(e) {
      audio.src = e.target.result;
    };
  })(sound);
  reader.addEventListener('load', function() {
    //console.log(document.getElementById('sound'+idCollectionUS));
    sound.play();

    
  });
  reader.readAsDataURL(obj.files[0]);


  setTimeout(function(){
    audiotracks.push(sound.src);
    let fileName = $('#audio').val().split("\\");
      	filenameNoForm = fileName[fileName.length-1].split('.')[0]
        	console.log(filenameNoForm);
      
  
  collAudios.setName(filenameNoForm)

    


  }, 200);

  let addTracks = [];
  let track = new AudioSound(context);
  track.addSource(audiotracks);

 idCollectionUS++;

};


const downloadCanvas = (link, canvasId, filename) => {
    link.href = document.getElementsByTagName(canvasId)[0].toDataURL();
    link.download = filename;
}

const editor = () => {
	$('.audioSection').css('display', 'none');

	$('.as').on('click', function(){
		$('.as').addClass('activeSection');
		$('.vs').removeClass('activeSection');
		$('.visualSection').css('display', 'none');
		$('.audioSection').css('display', 'block');
	})

	$('.vs').on('click', function(){
		$('.vs').addClass('activeSection');
		$('.as').removeClass('activeSection');
		$('.visualSection').css('display', 'block');
		$('.audioSection').css('display', 'none');
	})

	


}

const resize = () => {

	document.querySelector('main').removeChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		75, (window.innerWidth-420) / (window.innerHeight-200), 0.1, 1000
	);

	renderer = new THREE.WebGLRenderer({
		 preserveDrawingBuffer: true} );
	renderer.setSize(
		window.innerWidth-420,
		window.innerHeight - 200
	);
	renderer.setClearColor(col);
	renderScene();

	controls = new OrbitControls(camera, renderer.domElement);
	document.querySelector('main').appendChild(renderer.domElement);





}

const toggleRecording = () => {
     if (recording) {

      	$('#mic').css('fill','#E6E6E6');
    
         audioRecorder.stop();

         audioRecorder.getBuffers(gotBuffers);
         recording = false;
     } else {
     		
        audioRecorder.clear();
        audioRecorder.record();
        $('#mic').css('fill','#F64D4A');
        recording = true;
    }
}

const gotStream = (stream) => {

	inputPoint = player.context.createGain();

    realAudioInput = player.context.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    audioRecorder = new Recorder( inputPoint );
    
}



const saveWAV = () => {
	
    audioRecorder.exportWAV( doneEncoding );

}

const gotBuffers = ( buffers ) => {
	  	
    audioRecorder.exportWAV( doneEncoding );
}

const doneEncoding = ( blob ) => {
	
    Recorder.setupDownload( blob, "Recording" + "_"  + recIndex + ".wav" );
    recIndex++;
}


const setupAddItems = () => {

	$('#audio').on('click', function(e) {

    //console.log('add audio');

    // let collAudios = new AudioCollection(idCollectionUS, filenameNoForm);
    // let AudioPlayer = new AudioSound(context);

    // userPlayers.push(AudioPlayer);
    // collAudios.on('changeParam', () => {
    //   //renderScene();
    // });

    // collAudios.on('delete', () => {
    //   userInput[collAudios.id] = undefined;
    //   userPlayers[collAudios.id].stop();
    //   userPlayers[collAudios.id] = undefined;
    //   //renderScene();
    // });

    // userInput.push(collAudios);
    // //renderScene();
    // idCollectionUS++;
    // $('.addtrack').attr('disabled', 'true')
  });


	$('.addCollection').on('click', function() {
		switch ($(this).attr('data-type')) {
			case 'cubes':
        
        let collCubes = new CubeCollection(idCollection);
        let CubePlayer = new CubeSound(context);
        Players.push(CubePlayer);
        collCubes.on('changeParam', () => {

          renderScene();

        });

        collCubes.on('delete', () => {

          collie[collCubes.id] = undefined;
          Players[collCubes.id].stop();
          Players[collCubes.id] = undefined;
          renderScene();

        });

        idCollection++;

        collie.push(collCubes);
        renderScene();

        break;

			case 'spheres':
				
				let collSpheres = new SphereCollection(idCollection);
        let spherePlayer = new SphereSound(context);
        Players.push(spherePlayer);
				collSpheres.on('changeParam', () => {

					renderScene();

				});

				collSpheres.on('delete', () => {

					collie[collSpheres.id] = undefined;
					Players[collSpheres.id].stop();
					Players[collSpheres.id] = undefined;
					renderScene();

				});

				idCollection++;

				collie.push(collSpheres);
				renderScene();

				break;
		}

   

	});
};


const renderScene = () => {

	scene = new THREE.Scene();

	for (let i = 0; i < collie.length; i++) {

		if(collie[i] !== undefined){

		let arr = collie[i]._create();

		for (let h = 0; h < arr.length; h++) {

			scene.add(arr[h].render());

			}
		}
	}

	for (let j = 0; j < Players.length; j++) {

		if(Players[j] !== undefined){
			

			if(!collie[j].mute){

			Players[j].unMute()
			Players[j].play(collie[j].parameters);

	}else{

		Players[j].muteSound();
		Players[j].play(collie[j].parameters);

	}

		}
	}

	camera.position.z = 150;

};



const render = () => {

	renderer.render(scene, camera);
	requestAnimationFrame(() => render());

};





init();
