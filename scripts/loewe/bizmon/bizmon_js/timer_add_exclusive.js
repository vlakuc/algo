var print = jbiz.writeLine;

var currentServiceInfo = dataModel.de.loewe.sl2.vstr.tvservice.play.main;
var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;

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
    print("addTimer")
    var title                      = "Test"
    var timerType                  = "1"
    var startTime                  = START_TIME 
    var endTime                    = startTime + 60*60*3;
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
    getTimers()
}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n");
    jbiz.exit();
}

function getTimers()
{
    print("getTimers")
    var queryDef  =  {
        selections:   [],
        fields:       [0, 4, 11],
        orders:       []
    }
    gQuery = timerTable.createQuery(queryDef);
    gQuery.onQueryReady.connect(this,onQueryReady);
    gQuery.onUpdate.connect(this, onUpdate);
    gQuery.onRows.connect(this,onRows);

    gQuery.execute();
}

function onUpdate()
{
    print("TIMER TABLE UPDATE!!!")
  //  getTimers()
}

function onQueryReady(count){
    gQuery.readAllRows();
}

function onRows(id, rows){
    print("onRows: count=" + rows.length)
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        var tid = row[0]
        var start_time = row[1]
        var attrs = parseInt(row[2])
        
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(start_time);
        print("\tFound timer id " + tid + " Start time: " + d + " Attrs: " + attrs)
        if (attrs & 0x0080) {
            print("\tTimer with id " + tid + " is active")
        }
    }
   addTimer()
}
