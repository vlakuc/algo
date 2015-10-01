// Purpose: remove all existed timers

var print = jbiz.writeLine;


var timerListTable = dataModel.de.loewe.sl2.timer.list.table;

var removeAction = dataModel.de.loewe.sl2.timer.list.entry.remove;
removeAction.onResult.connect(this, onActionDeleteResult);
removeAction.onError.connect(this, onActionDeleteError);


var timerIds = {};

function getTimers()
{
    timerIds = {};
    var queryDef  =  {
        selections:   [
            //{ field: 4, conditionType: 0, condition: 28721},

        ],
        fields:       [0, 4],
        orders:       [
            //         {field: 1, direction: 1}
        ]
    }
    gQuery = timerListTable.createQuery(queryDef);
    gQuery.onQueryReady.connect(this,onQueryReady);
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

function removeAll()
{
    var ids = new Array()
    for(var p in timerIds)
    {
        ids.push(p)
    }
    print("Going to delete: " + ids)
    deleteTimers(ids)
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
        print(" Result "+ i);
        print("   "+ results[i], 1 ,33,0);
        print("");
    }
}

function onActionDeleteError(actionCallId, errorCode){
    print("onActionError: "+ errorCode+"\n", 1 ,31,0);
    //jbiz.exit();
}



getTimers()
setTimeout(function(){ removeAll() }, 1000)