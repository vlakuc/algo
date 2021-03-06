
var print = jbiz.writeLine;

var currentServiceInfo = dataModel.de.loewe.sl2.vstr.tvservice.play.main;
var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;

var timerTable = dataModel.de.loewe.sl2.timer.list.table;
var firstQuery = 0 

var addAction = dataModel.de.loewe.sl2.timer.list.entry.add;
addAction.onResult.connect(this, onActionAddResult);
addAction.onError.connect(this, onActionAddError);


var gQuery;
var timers =
[
//0     1                  2             3       4                5       6    7    8    9    10   11  12  13      14       15  16  17     18
['', 'EVENT 1',  'fffddf4425643d3e7fe', '0', '1160654580', '1160654760', '0', '1', '1', '0', '0', '0', '', '', 'Channel 1', '', '', '', '4129770'],
['', 'EVENT 4',  'fffddf4425643d3e8fe', '0', '1160654730', '1160654910', '0', '1', '1', '0', '0', '0', '', '', 'Channel 2', '', '', '', '3868627'],
['', 'Set-up',   'fffddf4425643d3e8fe', '0', '1160654400', '1160655600', '0', '1', '0', '0', '0', '0', '', '', 'Channel 2', '', '', '', '3868625'],
//['', 'EVENT 12', 'fffddf4425643d3e7fe', '0', '1160655360', '1160655600', '0', '1', '0', '0', '0', '2', '', '', 'Channel 1', '', '', '', '4129774'],
//['', 'EVENT 6',  'fffddf4425643d3e8fe', '0', '1160655300', '1160655480', '0', '1', '1', '0', '0', '2', '', '', 'Channel 2', '', '', '', '3868631'],
//['', 'EVENT 8',  'fffddd4425661c3e9fe', '0', '1160655240', '1160655480', '0', '1', '0', '0', '0', '2', '', '', 'Channel 3', '', '', '', '1641405']

]



var indx = 0


// Start execution

addTimer(indx)

//setInterval(function(){ addTimer() }, 2000)



function addTimer(pos) {

    var result = addAction.call(timers[pos])

}



function onActionAddResult(actionCallId, results){
    print("\tonActionAddResult: (id: "+ actionCallId+" arg count: "+ results.length +")");
    //getTimers()
    indx++
    if (indx == timers.length)
    {
     //   indx = 0
        jbiz.exit();
    }
    addTimer(indx)

}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n");
    indx++
    if (indx == timers.length)
    {
      //  indx = 0
        jbiz.exit();
    }
    addTimer(indx)
}

function getTimers()
{
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
    getTimers()
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

}
