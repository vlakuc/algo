var print = jbiz.writeLine;

var getSolutionAction = dataModel.de.loewe.sl2.timer.list.conflict.get.current.solution


getSolutionAction.onResult.connect(this, onActionResult);
getSolutionAction.onError.connect(this, onActionError);

getSolutionAction.call()


function onActionResult(actionCallId, results){
    print("\tonActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        print(" Result "+ i);
        print("   "+ results[i], 1 ,33,0);
        print("");
    }
}

function onActionError(actionCallId, errorCode){
    print("onActionError: "+ errorCode+"\n", 1 ,31,0);
    jbiz.exit();
}

jbiz.exit();