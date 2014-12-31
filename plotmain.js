
function range(start, end, step)
{
    var returnArray = [];
    var tempSum = start;
    while(tempSum <= end) {
        returnArray.push(tempSum);
        tempSum += step;
    }    
    return returnArray;
}

function drawFrame(ctx, canvas_width, canvas_height, framex, framey) {
    ctx.strokeStyle = '#708090';
    ctx.strokeRect(framex,
	           framey,
                   canvas_width - 2 * framex,
		   canvas_height - 2 * framey) 	
}

function addExpression(ctx, expr, texty) {
    ctx.font="14px Arial";
    ctx.fillText(expr,10,texty);
}

function getDataAsArray(data_array, sub_index) {
    var return_array = [];
    for ( i = 0; i < data_array.length; i++) {
        return_array.push(data_array[i][sub_index]);
    }
    return return_array;
}

function getXData(data_array) {
    return getDataAsArray(data_array, 0);
}

function getYData(data_array) {
    return getDataAsArray(data_array, 1);
}

function drawLine(ctx, x_values, y_values) {
    ctx.strokeStyle = '#00f';
    ctx.lineWidth   = 2;
    ctx.beginPath();
    ctx.moveTo(x_values[0],y_values[0]);
    for ( i = 1; i < x_values.length; i++) {
        ctx.lineTo(x_values[i],y_values[i]);
    }
    ctx.stroke();
}

function drawOnCanvas(canvas, xArray, yArray) {
    // var canvas=document.getElementById("plotCanvas");
    var ctx=canvas.getContext("2d");
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;
    var frame_width = canvas.width * 0.1;
    var frame_height = canvas.height * 0.1;

    var x_values = transformArrayToCoord(xArray, canvas_width, transformX, frame_width, frame_width)
    var y_values = transformArrayToCoord(yArray, canvas_height, transformY, frame_height, frame_height)

    //testing Transform refactoring
    var trans = new Transform(xArray, yArray, canvas_width, canvas_height);
    var xtest = trans.xCoordinate(5);
    var ytest = trans.yCoordinate(100);	
    //***	
//    ctx.clearRect(0, 0, canvas_width, canvas_width);	
    drawFrame(ctx, canvas_width, canvas_height, canvas_width * 0.1, canvas_height * 0.1)
    drawLine(ctx, x_values, y_values)
}

function plotLineInList(container, plot_list, line_index) {
    var data_array = plot_list[line_index]["data"];
    var xArray = getXData(data_array);
    var yArray = getYData(data_array);
    drawOnCanvas(container, xArray, yArray);
}

function sternplot(container, plot_list) {
    for ( line_index = 0; line_index < plot_list.length; line_index++) {
        plotLineInList(container, plot_list, line_index);
    }
    
    // var data_array = plot_list[0]["data"];
    // var xArray = getXData(data_array);
    // var yArray = getYData(data_array);
    // drawOnCanvas(container, xArray, yArray);
}
