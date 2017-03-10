
var AudioAnalyser = function ()
{
	this.context = new (window.AudioContext || window.webkitAudioContext)();
	this.analyser = this.context.createAnalyser();
	this.analyser.fftSize = 256;

	this.streamSource = audioStreamSource.create({
		context: this.context,
		loop: true,
	});

	this.numPoints = this.analyser.frequencyBinCount | 0;
	this.dataArray = new Uint8Array(this.numPoints);

	this.startMusic = function () {
		this.streamSource.play();
		this.streamSource.getSource().connect(this.analyser);
		this.analyser.connect(this.context.destination);
	}

	// this.streamSource.on('error', function(e) {
	// 	console.error("audio error:", e);  // eslint-disable-line
	// });

	// var self = this;
	// this.streamSource.on('newSource', function(/* source */) {
	// 	self.startMusic();
	// });

	// this.streamSource.setSource('audio/jetsetradio.mp3');
}