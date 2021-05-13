// update config 
// dollar sign needs JQuery, which already added in index.html
console.log("Getting config ...");


// select shader
for(let i = 0; i<3; ++i)
{
	$("#shader_select"+(i+1).toString()).on("change", function() {
	    let val = $("#shader_select"+(i+1).toString()).val();
	    console.log(val);
	    drawModelConfig["models"][i]["shader"] = val;
	    // console.log(teapotAngle);
	});
}

// select model (load model here!!)
for(let i = 0; i<=3; ++i)
{
	$("#model_select"+(i+1).toString()).on("change", function() {
	    let val = $("#model_select"+(i+1).toString()).val();
	    console.log("model number: "+(i+1).toString());
	    console.log(val);
	    loadModel(val);
	    drawModelConfig["models"][i]["model"] = val;
	});	
}

strList = ["X", "Y", "Z"]
// Position
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<3;j++)
	{
		$("#position" + strList[j] +(i+1).toString()).on("change", function() {
		    let val = $("#position" + strList[j] +(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["models"][i]["position"][j] = val;
		});
	}
}
// Rotation
for(let i = 0; i<=3; ++i)
{
	for(let j=0;j<3;j++)
	{
		$("#rotation" + strList[j] +(i+1).toString()).on("change", function() {
		    let val = $("#rotation" + strList[j] +(i+1).toString()).is(':checked');
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    if (val){
		    	drawModelConfig["models"][i]["rotate"]["direction"][j] = 1;
		    }
		    else{
		    	drawModelConfig["models"][i]["rotate"]["direction"][j] = 0;	
		    }
		});
	}
}
// Scale 
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<3;j++)
	{
		$("#scale" + strList[j] + "_slider"+(i+1).toString()).on("change", function() {
		    let val = $("#scale" + strList[j] + "_slider"+(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["models"][i]["scale"][j] = val;
		});
	}
	
}
// Shear 
shearList = ["XY", "XZ", "YX", "YZ", "ZX", "ZY"]
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<6;++j)
	{
		$("#shear" + shearList[j] + "_slider"+(i+1).toString()).on("change", function() {
		    let val = $("#shear" + shearList[j] + "_slider"+(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["models"][i]["shear"][j] = val;
		});
	}
}

// shader constants 
shaderConstList = ["ka", "kd", "ks"]
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<4;j++)
	{
		$("#shaderConstant" + shaderConstList[j] +(i+1).toString()).on("change", function() {
		    let val = $("#shaderConstant" + shaderConstList[j] +(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["models"][i]["constant"][shaderConstList[j]] = val;
		});
	}
}

// light source color and position 
// light position 
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<3;j++)
	{
		$("#lightPosition" + strList[j] +(i+1).toString()).on("change", function() {
		    let val = $("#lightPosition" + strList[j] +(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["light"][i]["position"][j] = val;
		});
	}
}
// light color 
colorList = ["R", "G", "B"];
for(let i = 0; i<3; ++i)
{
	for(let j=0;j<3;++j)
	{
		$("#lightColor" + colorList[j] +(i+1).toString()).on("change", function() {
		    let val = $("#lightColor" + colorList[j] +(i+1).toString()).val();
		    console.log("model number: "+(i+1).toString());
		    console.log(val);
		    drawModelConfig["light"][i]["color"][j] = val;
		});
	}
}


['x', 'y', 'z'].forEach((c) => {
	console.log(c);
});