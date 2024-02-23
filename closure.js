/*
Create a function that takes a callback function and a number representing the maximum number of times the callback function can be invoked as its arguments, and restricts the callback function to being invoked that many times. Once the callback function has been invoked maximum number of times, each subsequent call to the restricted function should return a string of "Maximum calls reached."
*/

function restrictThisFunction(funcToRestrict, maxCalls) {
    let callCounter = 0;
    function restricter() {
    if (callCounter < maxCalls) {
        funcToRestrict();
    } else {
        return "Maximum calls reached.";
    }
        callCounter++;
    }
    return restricter;
}

module.exports = restrictThisFunction;
