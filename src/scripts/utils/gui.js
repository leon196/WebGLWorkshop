
var UIParameters = function ()
{
  this.grassColor = [ 36,130,83,1 ];
  this.scanlineSpeed = 0.1;
  this.transitionSpeed = 1.0;
  this.pixel = 32;
};


var uiParamaters = new UIParameters();
var gui;

function updateUniform (property, value)
{
  // color
  if (value.constructor === Array && value.length == 4) {
    scene.uniforms['u_'+property] = [value[0]/255., value[1]/255., value[2]/255., 1.];
  } else {
    scene.uniforms['u_'+property] = value;
  }
}

window.onload = function ()
{
  gui = new dat.GUI();
  gui.addColor(uiParamaters, 'grassColor').onChange(function(value){updateUniform(this.property, value)});
  gui.add(uiParamaters, 'transitionSpeed').onChange(function(value){updateUniform(this.property, value)});
  gui.add(uiParamaters, 'scanlineSpeed').onChange(function(value){updateUniform(this.property, value)});
  gui.add(uiParamaters, 'pixel').onChange(function(value){updateUniform(this.property, value)});
  
};