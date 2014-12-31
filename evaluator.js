/*
 * Created By Gustaf Sterner 2012-11-29
 */


function Evaluator(expression, symbol){
	this.VAR_AS_STRING = "var "
	this.EQUALS =  "= "
	this.symbol = symbol
	this.expression = expression
    this.evaluate = function(value)
    {
		var value_expression = this.VAR_AS_STRING + this.symbol + this.EQUALS + value.toString()
		eval(value_expression)
		return eval(this.expression)
    }
}

function evaluateEvaluatorValues(xVals, fEval) {
    var yVals = [];
    for (var i = 0; i < xVals.length; i++) {
        yVals.push(fEval.evaluate(xVals[i]));
    }
    return yVals;
}

