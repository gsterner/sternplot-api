
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

function drawSingleTicHorizontalAxis(ctx, trans, x_value, y_value) {
    var x_trans = trans.xCoordinate(x_value);
    var y_trans = trans.yCoordinate(y_value);
    ctx.strokeStyle = '#708090';
    ctx.beginPath();
    ctx.moveTo(x_trans, y_trans + 5);
    ctx.lineTo(x_trans,y_trans - 5);
    ctx.stroke();
    ctx.font="14px Arial";
    var text_shift_away = 10 + 14;
    var text_shift_center = 14;
    ctx.fillText(x_value.toPrecision(4), x_trans - text_shift_center, y_trans + text_shift_away);
}

function drawTicsHorizontalAxis(ctx, trans, tic_values, axis_value) {
    for ( i = 0; i < tic_values.length; i++) {
        drawSingleTicHorizontalAxis(ctx, trans, tic_values[i], axis_value);
    }    
}

function drawSingleTicVerticalAxis(ctx, trans, x_value, y_value) {
    var x_trans = trans.xCoordinate(x_value);
    var y_trans = trans.yCoordinate(y_value);
    ctx.strokeStyle = '#708090';
    ctx.beginPath();
    ctx.moveTo(x_trans + 5, y_trans);
    ctx.lineTo(x_trans - 5,y_trans);
    ctx.stroke();
    ctx.font="14px Arial";
    var text_shift_away = 20 + 7 * 4;
    var text_shift_center = 4;
    ctx.fillText(y_value.toPrecision(4), x_trans - text_shift_away, y_trans + text_shift_center);
}

function drawTicsVerticalAxis(ctx, trans, tic_values, axis_value) {
    for ( i = 0; i < tic_values.length; i++) {
        drawSingleTicVerticalAxis(ctx, trans, axis_value, tic_values[i]);
    }    
}

function drawTics(ctx, trans, x_array, y_array) {
    var x_max = Numerics.getMaxOfArray(x_array);
    var x_min = Numerics.getMinOfArray(x_array);
    var y_max = Numerics.getMaxOfArray(y_array);
    var y_min = Numerics.getMinOfArray(y_array);

    var x_tic_step = (x_max - x_min)/5;
    var x_tics_untransformed = range(x_min, x_max, x_tic_step);
    var y_tic_step = (y_max - y_min)/5;
    var y_tics_untransformed = range(y_min, y_max, y_tic_step);

    drawTicsHorizontalAxis(ctx, trans, x_tics_untransformed, y_min);
    drawTicsVerticalAxis(ctx, trans, y_tics_untransformed, x_min);
}

function drawOnCanvas(canvas, xArray, yArray) {
//    var canvas=document.getElementById("subplot_4_4_0");
    var ctx=canvas.getContext("2d");
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;
    var frame_width = canvas.width * 0.1;
    var frame_height = canvas.height * 0.1;

    var x_values = transformArrayToCoord(xArray, canvas_width, transformX, frame_width, frame_width)
    var y_values = transformArrayToCoord(yArray, canvas_height, transformY, frame_height, frame_height)

    //testing Transform refactoring
    var trans = new Transform(xArray, yArray, canvas_width, canvas_height);
    // var xtest = trans.xCoordinate(x_tics_untransformed[0]);
    // var ytest = trans.yCoordinate(y_min);	
    //***	
//    ctx.clearRect(0, 0, canvas_width, canvas_width);
    drawTics(ctx, trans, xArray, yArray);
    drawFrame(ctx, canvas_width, canvas_height, canvas_width * 0.1, canvas_height * 0.1)
    drawLine(ctx, x_values, y_values)
}

function plotLineInList(canvas, plot_list, line_index) {
    var data_array = plot_list[line_index]["data"];
    var xArray = getXData(data_array);
    var yArray = getYData(data_array);
    drawOnCanvas(canvas, xArray, yArray);
}

function sternplotOnCanvas(canvas, plot_list) {
    for ( line_index = 0; line_index < plot_list.length; line_index++) {
        plotLineInList(canvas, plot_list, line_index);
    }
}

function sternplot(container, plot_list) {
    var canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);
    sternplotOnCanvas(canvas, plot_list)
    // for ( line_index = 0; line_index < plot_list.length; line_index++) {
    //     plotLineInList(canvas, plot_list, line_index);
    // }
    
    // var data_array = plot_list[0]["data"];
    // var xArray = getXData(data_array);
    // var yArray = getYData(data_array);
    // drawOnCanvas(container, xArray, yArray);
}
