
var assets = {};
var assetsIsLoaded = false;

function loadAssets (files)
{
	loadFiles(
		files, 
		function (error, content) { 
		assets = content;
		assetsIsLoaded = true;
		addHeaderToShaders();
	});
}

function addHeaderToShaders ()
{
	for (var key in assets) {
		var k = key.split(".");
		if (assets.hasOwnProperty(key) && (k[1] === "vert" || k[1] === "frag")) {
			assets[key] = assets["utils.glsl"] + assets[key];
		}
	}
};