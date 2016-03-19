
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

function drawGridLineHorizontalAxis(ctx, trans, x_value, y_min, y_max) {
    var x_trans = trans.xCoordinate(x_value);
    var y_min_trans = trans.yCoordinate(y_min);
    var y_max_trans = trans.yCoordinate(y_max);
    ctx.beginPath();
    ctx.moveTo(x_trans, y_min_trans);
    ctx.lineTo(x_trans, y_max_trans);
    ctx.stroke();
 }

function drawTicsHorizontalAxis(ctx, trans, tic_values, axis_value) {
    for ( i = 0; i < tic_values.length; i++) {
        drawSingleTicHorizontalAxis(ctx, trans, tic_values[i], axis_value);
    }    
}

function drawGridLinesHorizontalAxis(ctx, trans, tic_values, axis_value, axis_value_opposite) {
    ctx.strokeStyle = '#708090';
    ctx.setLineDash([2, 5]);
    for ( i = 1; i < tic_values.length - 1; i++) {
	drawGridLineHorizontalAxis(ctx, trans, tic_values[i], axis_value, axis_value_opposite)
    }    
    ctx.setLineDash([]);
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

function drawGridLineVerticalAxis(ctx, trans, x_min, x_max, y_value) {
    var x_min_trans = trans.xCoordinate(x_min);
    var x_max_trans = trans.xCoordinate(x_max);
    var y_trans = trans.yCoordinate(y_value);
    ctx.beginPath();
    ctx.moveTo(x_min_trans, y_trans);
    ctx.lineTo(x_max_trans, y_trans);
    ctx.stroke();
 }

function drawTicsVerticalAxis(ctx, trans, tic_values, axis_value) {
    for ( i = 0; i < tic_values.length; i++) {
        drawSingleTicVerticalAxis(ctx, trans, axis_value, tic_values[i]);
    }    
}

function drawGridLinesVerticalAxis(ctx, trans, tic_values, axis_value, axis_value_opposite) {
    ctx.strokeStyle = '#708090';
    ctx.setLineDash([2, 5]);
    for ( i = 1; i < tic_values.length - 1; i++) {
	drawGridLineVerticalAxis(ctx, trans, axis_value, axis_value_opposite, tic_values[i]);
    }    
   ctx.setLineDash([]);
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
    drawGridLinesHorizontalAxis(ctx, trans, x_tics_untransformed, y_min, y_max);
    drawTicsVerticalAxis(ctx, trans, y_tics_untransformed, x_min);
    drawGridLinesVerticalAxis(ctx, trans, y_tics_untransformed, x_min, x_max);
}

function drawOnCanvas(canvas, xArray, yArray) {
//    var canvas=document.getElementById("subplot_4_4_0");
    var ctx=canvas.getContext("2d");
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;
    var frame_width = canvas.width * 0.1;
    var frame_height = canvas.height * 0.1;

    min_x = Numerics.getMinOfArray(xArray);
    max_x = Numerics.getMaxOfArray(xArray);
    min_y = Numerics.getMinOfArray(yArray);
    max_y = Numerics.getMaxOfArray(yArray);

    var trans = new Transform(min_x, max_x, min_y, max_y, canvas_width, canvas_height);
    var x_values = trans.xCoordinateArray(xArray);
    var y_values = trans.yCoordinateArray(yArray);

    drawTics(ctx, trans, xArray, yArray);
    drawFrame(ctx, canvas_width, canvas_height, canvas_width * 0.1, canvas_height * 0.1)
    drawLine(ctx, x_values, y_values)
}


function getLineDataX(plot_list, line_index) {
    var data_array = plot_list[line_index]["data"];
    return getXData(data_array);
}

function getLineDataY(plot_list, line_index) {
    var data_array = plot_list[line_index]["data"];
    return getYData(data_array);
}

function makeGlobalArrayX(plot_list) {
    globalArrayX = [];
    for ( line_index = 0; line_index < plot_list.length; line_index++) {
	globalArrayX = globalArrayX.concat(getLineDataX(plot_list, line_index));
    }
}

function makeGlobalArrayY(plot_list) {
    globalArrayY = [];
    for ( line_index = 0; line_index < plot_list.length; line_index++) {
	globalArrayY = globalArrayY.concat(getLineDataY(plot_list, line_index));
    }
}

function getGlobalMinMax(plot_list) {
    min_x = Numerics.getMinOfArray(makeGlobalArrayX(plot_list));
    max_x = Numerics.getMinOfArray(makeGlobalArrayX(plot_list));
    min_y = Numerics.getMinOfArray(makeGlobalArrayY(plot_list));
    max_y = Numerics.getMinOfArray(makeGlobalArrayY(plot_list));
}

function plotLineInList(canvas, plot_list, line_index) {
    // var data_array = plot_list[line_index]["data"];
    // var xArray = getXData(data_array);
    // var yArray = getYData(data_array);
    var xArray = getLineDataX(plot_list, line_index);
    var yArray = getLineDataY(plot_list, line_index);
    
    drawOnCanvas(canvas, xArray, yArray);
}

function sternplotOnCanvas(canvas, plot_list) {
    getGlobalMinMax(plot_list);
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
