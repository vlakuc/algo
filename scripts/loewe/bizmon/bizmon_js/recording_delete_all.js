

var print = jbiz.writeLine;

var mainInterval = 2000


var directoryTable = dataModel.de.loewe.sl2.table.directory


var recRemoveAction = dataModel.de.loewe.sl2.hdr.action.archive.remove
recRemoveAction.onResult.connect(this, onRecRemoveActionResult);
recRemoveAction.onError.connect(this, onRecRemoveActionError);



var recIds = {};

var STATE = {
  TIMER_LIST_INIT : {value: 0, name: "Timer list init"},
  TIMER_LIST_CLEAN_RECS_START : {value: 0, name: "Recs deleting"},
  TIMER_LIST_CLEAN_RECS_CHECK : {value: 0, name: "Recs deleting in prog..."},
  TIMER_LIST_CLEAN_RECS_DONE : {value: 0, name: "Recs deleting done"},
  TIMER_LIST_UPDATED : {value: 0, name: "Timer list updated"}, 

  TIMER_CHECK_RESULTS : {value: 0, name: "Timer check results"},
  TIMER_CHECK_RESULTS_FAIL : {value: 0, name: "Timer check results: FAIL"},
  TIMER_CHECK_RESULTS_PASSED : {value: 0, name: "Timer check results: PASSED"}
};

var currentState = STATE.TIMER_LIST_INIT

setInterval(function(){ main() }, mainInterval)

function main(){
print("State: " + currentState.name)

switch(currentState)
{
case STATE.TIMER_LIST_INIT:
    currentState.value = currentState.value + 1
    print("Iteration: " + currentState.value)
    currentState = STATE.TIMER_LIST_CLEAN_RECS_START
    break
case STATE.TIMER_LIST_CLEAN_RECS_START:
    getRecs()
    currentState = STATE.TIMER_LIST_CLEAN_RECS_CHECK
    break
case STATE.TIMER_LIST_CLEAN_RECS_CHECK:
    if(getRecCount() == 0)
    {
        //currentState = STATE.TIMER_LIST_CLEAN_RECS_DONE
        currentState = STATE.TIMER_CHECK_RESULTS_PASSED
    }
    else
    {
        deleteOneRec()
        currentState = STATE.TIMER_LIST_CLEAN_RECS_START
    }
    break

case STATE.TIMER_CHECK_RESULTS:
    if(getRecCount() != 1)
				currentState = STATE.TIMER_CHECK_RESULTS_FAIL
		else
        currentState = STATE.	TIMER_CHECK_RESULTS_PASSED
        //currentState = STATE.TIMER_LIST_INIT
		break
case STATE.TIMER_CHECK_RESULTS_FAIL:
    jbiz.exit()
		break
case STATE.TIMER_CHECK_RESULTS_PASSED:
    //currentState = STATE.TIMER_LIST_INIT
    jbiz.exit()
		break

}
//print("Hello: new state " + currentState.name)

}

function deleteOneRec(){
    for(var p in recIds)
    {
        print("\tGoing to delete recording " + p)
        recRemoveAction.call(p)
        //print("Remove action sent for " + p)
        break
    }
}


function getRecCount()
{
    var res = 0
    for(var p in recIds)
    {
         res++
    }
    return res
}

function getRecs()
{
    recIds = {};
    // SPB var HDR_ID = "FSL2://fe4bb369-cbe0-4449-8520-c65b16c54064"
     var HDR_ID = //"FSL2://78db14a6-645a-4bee-a9de-fc5a4738321f"
"FSL2://5b0eb671-4eb4-4792-b1e1-d60ef5a541b1"
    var queryDef  =  {
                                selections:   [

                                    { field: 25, conditionType: 1, condition: HDR_ID},
                                    { field: 2, conditionType: 1, condition: 4},
                                    { field: 3, conditionType: 1, condition: 12}
 
                                              ],
                                fields:       [29],
                                orders:       [
                                                    //{field: 2, direction: 1}
                                              ]
  
                             }
    query = directoryTable.createQuery(queryDef);
    query.onQueryReady.connect(this,onDirQueryReady);
    query.execute();
    print("getRecs request sent")
}

function onDirQueryReady(count){
    print("onDirQueryReady " + count)
    query.onRows.connect(this,onDirRows);
    query.readAllRows();
}

function onDirRows(id, rows){
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        for(var j=0;j<row.length;j++){
           var rec_id = row[j]
            if(rec_id in recIds)
            {
                continue
            }
            print("\tFound rec id " + rec_id)
            recIds[rec_id] = true
        }
    }
}


function onActionDeleteResult(actionCallId, results){
    print("\tonActionDeleteResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        //print(" Result "+ i);
        //print("   "+ results[i], 1 ,33,0);
        //print("");
    }
}

function onActionDeleteError(actionCallId, errorCode){
    print("onActionError: "+ errorCode+"\n", 1 ,31,0);
    //jbiz.exit();
}




function onActionAddResult(actionCallId, results){
    print("\tonActionAddResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        //print(" Result "+ i);
        //print("   "+ results[i], 1 ,33,0);
        //print("");
    }

}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n", 1 ,31,0);
	 jbiz.exit();
}

function onRecRemoveActionResult(actionCallId, results){
    print("\tonRecRemoveActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        //print(" Result "+ i);
        //print("   "+ results[i], 1 ,33,0);
        //print("");
    }
    var mes_id = dataModel.de.loewe.sl2.messages.messageid
    var id = mes_id.getValue();
    //print(id);
    var action = dataModel.de.loewe.sl2.messages.action.confirm;
    //action.call([(0,id),(1,2)])
    //print("Sending confirm action")
	  setTimeout(function(){action.call([(0,id),(1,"2")])}, mainInterval/3);
    //print("Confirm action sent")

}

function onRecRemoveActionError(actionCallId, errorCode){
    print("onRecRemoveActionError: "+ errorCode+"\n", 1 ,31,0);
	 jbiz.exit();
}

