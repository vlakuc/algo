
//var action = dataModel.de.loewe.sl2.timer.list.conflict.get.pair
var action = dataModel.de.loewe.sl2.timer.list.conflict.get.list
action.onResult.connect(this, onActionResult);
action.onError.connect(this, onActionError);




var print = jbiz.writeLine;

var result = action.call([0])
print("Calling action with some arguments... (call id: "+ result.id+  ", call status: "+ result.status +")")



function onActionResult(actionCallId, results){
    print("onActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")\n", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        print(" Result "+ i);
        print("   "+ results[i], 1 ,33,0);
        print("");
    }
    jbiz.exit();	

}

function onActionError(actionCallId, errorCode){
    print("onActionError: "+ errorCode+"\n", 1 ,31,0);
	 jbiz.exit();
}
