

var print = jbiz.writeLine;

var mainInterval = 2000

var title                      = "Test"
var timerType                  = "1"
// Timer start time
var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;
var seconds = Math.round(new Date().getTime() / 1000) - 3600;
//var startTime = seconds;
var startTime = sysTime.getValue() 
var endTime = startTime + 60;

var serviceListTable = dataModel.de.loewe.sl2.timer.list.table;
var directoryTable = dataModel.de.loewe.sl2.table.directory
var firstQuery = 0 

var removeAction = dataModel.de.loewe.sl2.timer.list.entry.remove;
removeAction.onResult.connect(this, onActionDeleteResult);
removeAction.onError.connect(this, onActionDeleteError);

var addAction = dataModel.de.loewe.sl2.timer.list.entry.add;
addAction.onResult.connect(this, onActionAddResult);
addAction.onError.connect(this, onActionAddError);

var recRemoveAction = dataModel.de.loewe.sl2.hdr.action.archive.remove
recRemoveAction.onResult.connect(this, onRecRemoveActionResult);
recRemoveAction.onError.connect(this, onRecRemoveActionError);



//var timerIds = new Array()
var timerIds = {};
var recIds = {};
var TIMER_CHECK_ATTEMPTS = 3
var STATE = {
  TIMER_LIST_INIT : {value: 0, name: "Timer list init"},
  TIMER_LIST_CLEAN_RECS_START : {value: 0, name: "Recs deleting"},
  TIMER_LIST_CLEAN_RECS_CHECK : {value: 0, name: "Recs deleting in prog..."},
  TIMER_LIST_CLEAN_RECS_DONE : {value: 0, name: "Recs deleting done"},
  TIMER_LIST_UPDATED : {value: 0, name: "Timer list updated"}, 
  TIMER_ADDED: {value: 0, name: "Timer added"}, 
  TIMER_START_DELETE : {value: 0, name: "Timer start delete"},
  TIMER_CHECK_DELETE : {value: 0, name: "Timer check delete"},
  TIMER_READY_TO_ADD : {value: 0, name: "Timer ready to add"},
  TIMER_CHECK_ADD : {value: 0, name: "Timer check add"},
  TIMER_CHECK_ADD_STARTED : {value: TIMER_CHECK_ATTEMPTS, name: "Timer check add started"},
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
    currentState = STATE.TIMER_LIST_CLEAN_RECS_START
    STATE.TIMER_CHECK_ADD_STARTED.value = TIMER_CHECK_ATTEMPTS
    break
case STATE.TIMER_LIST_CLEAN_RECS_START:
    getRecs()
    currentState = STATE.TIMER_LIST_CLEAN_RECS_CHECK
    break
case STATE.TIMER_LIST_CLEAN_RECS_CHECK:
    if(getRecCount() == 0)
    {
        //currentState = STATE.TIMER_LIST_CLEAN_RECS_DONE
        currentState = STATE.TIMER_LIST_UPDATED
    }
    else
    {
        deleteOneRec()
        currentState = STATE.TIMER_LIST_CLEAN_RECS_START
    }
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
    if(getTimerCount() == 0 && getRecCount() == 0)
    {
        currentState = STATE.TIMER_READY_TO_ADD
    }
    else
    {
        currentState = STATE.TIMER_LIST_UPDATED
    }
    break
case STATE.TIMER_READY_TO_ADD:
		print("Start Time = " + startTime)
    addTimer()
    currentState = STATE.TIMER_CHECK_ADD
    break
case STATE.TIMER_CHECK_ADD:
    getTimers()
    getRecs()
    currentState = STATE.TIMER_CHECK_ADD_STARTED
    break
case STATE.TIMER_CHECK_ADD_STARTED:
    print("\tTimers: " + getTimerCount())
    print("\tRecs: " + getRecCount())
    getTimers()
    currentState.value = currentState.value - 1
    print("Attempt: " + currentState.value)
		if(currentState.value == 0)
        currentState = STATE.TIMER_CHECK_RESULTS
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
    currentState = STATE.TIMER_LIST_INIT
    //jbiz.exit()
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

function getTimerCount()
{
    var res = 0
    for(var p in timerIds)
    {
         res++
    }
    return res
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
                                fields:       [0, 4],
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

function getRecs()
{
    recIds = {};
    var HDR_ID = "FSL2://fe4bb369-cbe0-4449-8520-c65b16c54064"
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
    //print("getRecs request sent")
}

function onDirQueryReady(count){
    //print("onDirQueryReady " + count)
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



function onQueryReady(count){
    gQuery.onRows.connect(this,onRows);
    gQuery.readAllRows();
    
}

function onRows(id, rows){
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        var tid = row[0]
        var start_time = row[1]
        if(tid in timerIds)
            {
                continue
            }
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(start_time);
        print("\tFound timer id " + tid + " Start time: " + d)
        timerIds[tid] = start_time
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

var currentServiceInfo = dataModel.de.loewe.sl2.vstr.tvservice.play.main;

var uniqueID                   = ""

var source_UUID                = currentServiceInfo.getValue()[1]
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
var EPG_EVENT_ID               = ""

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

