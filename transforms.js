/*
 * Created By Gustaf Sterner 2012-11-29
 */

/*
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}
*/

function Transform(xarray, yarray, canvasWidth, canvasHeight) {
    this.minX = Numerics.getMinOfArray(xarray);
    this.maxX = Numerics.getMaxOfArray(xarray);
    this.minY = Numerics.getMinOfArray(yarray);
    this.maxY = Numerics.getMaxOfArray(yarray);

    this.frameX = canvasWidth * 0.1;
    this.frameY = canvasHeight * 0.1;

    this.width = canvasWidth;
    this.height = canvasHeight;
}

Transform.translationToPlotCoordinate = function(plotLength, realLength, translation, frameStart) {
    return plotLength / realLength * translation + frameStart;
}

Transform.xToPlotCoordinate = function(width, xmax, xmin, xval, frameStart, frameEnd ) {
    return Transform.translationToPlotCoordinate(width - frameStart - frameEnd, xmax - xmin, xval - xmin, frameStart); 
}

Transform.yToPlotCoordinate = function(height, ymax, ymin, yval , frameStart, frameEnd ) {
    return Transform.translationToPlotCoordinate(height - frameStart - frameEnd, ymax - ymin, ymax - yval,  frameStart); 
}

Transform.prototype.xCoordinate = function(xval) {
    return Transform.xToPlotCoordinate(this.width, this.maxX, this.minX, xval, this.frameX, this.frameX);
}

Transform.prototype.yCoordinate = function(yval) {
    return Transform.yToPlotCoordinate(this.height, this.maxY, this.minY, yval, this.frameY, this.frameY);
}

/*******************************************/
function transformToPlotCoordinates(plotLength, realLength, translation, frameStart ) {
    return plotLength / realLength * translation + frameStart;
}


function transformX(width, xmax, xmin, xval, frameStart, frameEnd ) {
    return transformToPlotCoordinates (width - frameStart - frameEnd, xmax - xmin, xval - xmin, frameStart); 
}

function transformY(height, ymax, ymin, yval , frameStart, frameEnd ) {
    return transformToPlotCoordinates (height - frameStart - frameEnd, ymax - ymin, ymax - yval,  frameStart); 
}

function transformArrayToCoord(array, canvasWidth, transform, frameStart, frameEnd) {
    var vmin = Numerics.getMinOfArray(array);
    var vmax = Numerics.getMaxOfArray(array);
    var coordArray = [];
    for (i in array) {
        coordArray.push(transform(canvasWidth, vmax, vmin, array[i], frameStart, frameEnd));
    }
    return coordArray
}


function transformXArrayToCoord(xRealArray, canvasWidth) {
    var xmin = Numerics.getMinOfArray(xRealArray);
    var xmax = Numerics.getMaxOfArray(xRealArray);
    var xCoordArray = [];
    for (i in xRealArray) {
        xCoordArray.push(transformX(canvasWidth, xmax, xmin, xRealArray[i]));
    }
    return xCoordArray
}

function transformYArrayToCoord(yRealArray, canvasHeight) {
    var ymin = Numerics.getMinOfArray(yRealArray);
    var ymax = Numerics.getMaxOfArray(yRealArray);
    var yCoordArray = [];
    for (i in yRealArray) {
        yCoordArray.push(transformY(canvasHeight, ymax, ymin, yRealArray[i]));
    }
    return yCoordArray
}
