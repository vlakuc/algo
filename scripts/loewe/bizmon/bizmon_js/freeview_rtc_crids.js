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
//0     1                  2             3       4                5       6    7    8    9    10   11  12  13    14      15  16  17     18
['', 'One',      'fffd034425643d3e786', '0', '1262606520', '1262606640', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739154'],
['', 'Two',      'fffd034425643d3e786', '0', '1262606640', '1262606760', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739155'],
['', 'Three',    'fffd034425643d3e786', '0', '1262606760', '1262606775', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739156'],
['', 'Four',     'fffd034425643d3e786', '0', '1262606775', '1262606790', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739157'],
['', 'Five',     'fffd034425643d3e786', '0', '1262606790', '1262606805', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739158'],
['', 'Six',      'fffd034425643d3e786', '0', '1262606805', '1262606820', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739159'],
['', 'Seven',    'fffd034425643d3e786', '0', '1262606820', '1262606940', '0', '1', '1', '0', '0', '0', '', '', 'RCT 60', '', '', '', '3739160'],
['', 'Eight',    'fffd034425643d3e781', '0', '1262606520', '1262606640', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166300'],
['', 'NINE',     'fffd034425643d3e781', '0', '1262606640', '1262606760', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166301'],
['', 'TEN',      'fffd034425643d3e781', '0', '1262606760', '1262606880', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166302'],
['', 'ELEVEN',   'fffd034425643d3e781', '0', '1262606880', '1262606895', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166303'],
['', 'TWELVE',   'fffd034425643d3e781', '0', '1262606895', '1262606910', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166304'],
['', 'THIRTEEN', 'fffd034425643d3e781', '0', '1262606910', '1262606925', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166305'],
['', 'FOURTEEN', 'fffd034425643d3e781', '0', '1262606925', '1262606940', '0', '1', '1', '0', '0', '0', '', '', 'RCT 61', '', '', '', '2166306'],
['', 'FIFTEEN',  'fffd034425643d3e780', '0', '1262606520', '1262606940', '0', '1', '0', '0', '0', '0', '', '', 'RCT 62', '', '', '', '1642022']


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
