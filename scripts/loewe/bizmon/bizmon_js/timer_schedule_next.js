var print = jbiz.writeLine;

var currentServiceInfo = dataModel.de.loewe.sl2.vstr.tvservice.play.main;
var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;
var nextEv = dataModel.de.loewe.sl2.vstr.tvservice.eit.main_next

var timerTable = dataModel.de.loewe.sl2.timer.list.table;
var firstQuery = 0 

var addAction = dataModel.de.loewe.sl2.timer.list.entry.add;
addAction.onResult.connect(this, onActionAddResult);
addAction.onError.connect(this, onActionAddError);



var gQuery;
var START_TIME =  sysTime.getValue() + 60*60

// Start execution

addTimer()





function addTimer() {
    print(nextEv.getValue())
    print("addTimer")
    var title                      = nextEv.getValue()[4]
    var timerType                  = "1"
    var startTime                  = parseInt(nextEv.getValue()[2]) 
    var endTime                    = parseInt(nextEv.getValue()[3])
    var uniqueID                   = ""
    var source_UUID                = currentServiceInfo.getValue()[1]
    var destination_Rec_URI        = "0"
    var descramblingTime           = "0"
    var CRID                       = ""
    var parentalLockPin            = "0"
    var CAMLockPin                 = "0"
    var varAttrs                   = "4096"
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
    print("\tonActionAddResult: (id: "+ actionCallId+" arg count: "+ results.length +")");
   // getTimers()
   jbiz.exit();
}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n");
    jbiz.exit();
}


