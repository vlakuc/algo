

var print = jbiz.writeLine;

var mainInterval = 2000

var title                      = "Der russische Präsident im Gespräch mit Jörg Schönenborn"
var timerType                  = "4"
// Timer start time
var startTime = 1365192000
var endTime = 1365192900

var serviceListTable = dataModel.de.loewe.sl2.timer.list.table;

var firstQuery = 0 

var removeAction = dataModel.de.loewe.sl2.timer.list.entry.remove;
removeAction.onResult.connect(this, onActionDeleteResult);
removeAction.onError.connect(this, onActionDeleteError);

var addAction = dataModel.de.loewe.sl2.timer.list.entry.add;
addAction.onResult.connect(this, onActionAddResult);
addAction.onError.connect(this, onActionAddError);




//var timerIds = new Array()
var timerIds = {};
var SERVICE_URI = ""
var STATE = {
  TIMER_LIST_INIT : {value: 0, name: "Timer list init"},
  TIMER_LIST_UPDATED : {value: 0, name: "Timer list updated"}, 
  TIMER_ADDED: {value: 0, name: "Timer added"}, 
  TIMER_START_DELETE : {value: 0, name: "Timer start delete"},
  TIMER_CHECK_DELETE : {value: 0, name: "Timer check delete"},
  TIMER_READY_TO_ADD : {value: 0, name: "Timer ready to add"},
  TIMER_CHECK_ADD : {value: 0, name: "Timer check add"},
  TIMER_CHECK_ADD_STARTED : {value: 0, name: "Timer check add started"},
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
    getTimers()
    currentState.value = currentState.value + 1
    print("Iteration: " + currentState.value)
    currentState = STATE.TIMER_LIST_UPDATED
    break
case STATE.TIMER_LIST_UPDATED:
    var ids = new Array()
    for(var p in timerIds)
    {
        ids.push(p)
    }
    print("Going to delete: " + ids)
    deleteTimers(ids)
    currentState = STATE.TIMER_START_DELETE
    break
case STATE.TIMER_START_DELETE:
    getTimers()
    currentState = STATE.TIMER_CHECK_DELETE
    break
case STATE.TIMER_CHECK_DELETE:
    //print("TATE.TIMER_CHECK_DELETE timerIds.length " + timerIds.length)
    if(getTimerCount() == 0 )
    {
        currentState = STATE.TIMER_READY_TO_ADD
    }
    else
    {
        currentState = STATE.TIMER_LIST_UPDATED
    }
    break
case STATE.TIMER_READY_TO_ADD:
    SERVICE_URI = ""
    print("SERVICE_URI = " + SERVICE_URI)
    addTimer()
    currentState = STATE.TIMER_CHECK_ADD
    break
case STATE.TIMER_CHECK_ADD:
    getTimers()
    currentState = STATE.TIMER_CHECK_ADD_STARTED
    break
case STATE.TIMER_CHECK_ADD_STARTED:
    print("\tTimers: " + getTimerCount())
    getTimers()
    //currentState.value = currentState.value - 1
    //print("Attempt: " + currentState.value)
    //if(currentState.value == 0)
    currentState = STATE.TIMER_CHECK_RESULTS
    break
case STATE.TIMER_CHECK_RESULTS:
    var tc = getTimerCount()
    print("SERVICE_URI = " + SERVICE_URI)
    print("Num of timers = " + tc)

    if(tc != 1 || SERVICE_URI == "")
	currentState = STATE.TIMER_CHECK_RESULTS_FAIL
    else
        currentState = STATE.TIMER_CHECK_RESULTS_PASSED
    break
case STATE.TIMER_CHECK_RESULTS_FAIL:
    jbiz.exit()
		break
case STATE.TIMER_CHECK_RESULTS_PASSED:
    currentState = STATE.TIMER_LIST_INIT
    //jbiz.exit()
		break

}
}

function getTimerCount()
{
    var res = 0
    for(var p in timerIds)
    {
         res++
    }
    return res
}


function getTimers()
{
    //timerIds = new Array()
    timerIds = {};
    if(firstQuery == 0)
    {
     //print("getTimers create new query")
    var queryDef  =  {
                                selections:   [
                                    //{ field: 4, conditionType: 0, condition: 28721},

                                              ],
        fields:       [0, 4, 13],
                                orders:       [
                                           //         {field: 1, direction: 1}
                                              ]
                             }
    gQuery = serviceListTable.createQuery(queryDef);
    gQuery.onQueryReady.connect(this,onQueryReady);
    firstQuery = 1;
    }
    gQuery.execute();
}

function onQueryReady(count){
    gQuery.onRows.connect(this,onRows);
    gQuery.readAllRows();
    
}

function onRows(id, rows){
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        var tid = row[0]
        var start_time = row[1]
        var service_uri = row[2]
        if(tid in timerIds)
            {
                continue
            }
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(start_time);
        print("\tFound timer id " + tid + " Start time: " + d + " URI: " + service_uri )
        timerIds[tid] = start_time
        SERVICE_URI = service_uri
    }
}


function deleteTimers(timer_ids)
{
    if(timer_ids.length == 0)
    {

        return
    }
    var result = removeAction.call(timer_ids)
 
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

/*******************ADD TIMER*********************/

function addTimer() {

var uniqueID                   = ""

var source_UUID                = "fffba1671e705637320"
var destination_Rec_URI        = "0"


var descramblingTime           = "0"

var CRID                       = ""
var parentalLockPin            = "0"
var CAMLockPin                 = "0"
var varAttrs                   = "0"
var source_ancestor_UUID       = ""
var source_URI                 = ""
var channel_Name               = ""
var arg_15                     = "false"
var arg_16                     = "false"
var arg_17                     = "false"
var EPG_EVENT_ID               = "6335"

var result = addAction.call([uniqueID,
                          title,
                          source_UUID,
                          destination_Rec_URI,
                          startTime,
                          endTime,
                          descramblingTime,
                          timerType,
                          CRID,
                          parentalLockPin,
                          CAMLockPin,
                          varAttrs,
                          source_ancestor_UUID,
                          source_URI,
                          channel_Name,
                          arg_15,
                          arg_16,
                          arg_17,
                          EPG_EVENT_ID
                        ])
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


