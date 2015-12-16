fallback.load({
	jQuery: [
'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
'js/jquery.min.js'
	],

	jQueryui: [
'//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js',
'js/jquery-ui/jquery-ui.min.js'
	],

	jscolor: [
'js/jscolor/jscolor.js'
	],

	jQueryeventdrag: [
'//cdn.jsdelivr.net/jquery.event.drag/2.2/jquery.event.drag.min.js',
'js/jquery.event.drag-2.0.js'
	],

	nouislider: [
'//cdnjs.cloudflare.com/ajax/libs/noUiSlider/8.2.1/nouislider.min.js',
'js/noUiSlider.8.1.0/nouislider.min.js'
	],

	handlebars: [
'//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.3/handlebars.min.js',
'js/handlebars.min.js'
	],



	recorder: [
'js/recorderjs/recorder.js'
	],

	recorderWorker: [
'js/recorderjs/recorderWorker.js'
	],

	gest: [
'js/gest/src/gest.js'
	],

	THREE: [
'//cdnjs.cloudflare.com/ajax/libs/three.js/r73/three.js',
'js/three/build/three.js'
	],



	'script.js': 'js/script.js'
},


{
	//mag je pas inladen als vorige is ingeladen
	shim: {

		'jQueryui': ['jQuery'],	
		'jscolor': ['jQuery'],
		'jQueryeventdrag': ['jQuery'],
		'THREE': ['jQuery'],
		// 'nouislider': ['jQuery'],
		// 'recorder': ['jQuery'],
		// 'recorderWorker': ['recorder'],			
		
		'script.js': ['jQuery', 'THREE'],
		

	}

});

