var print = jbiz.writeLine

var recordingTable = dataModel.de.loewe.sl2.table.directory
var volumeTable = dataModel.de.loewe.sl2.volume.table.main
var copyAction = dataModel.de.loewe.sl2.timer.list.entry.add.copy.instruction
copyAction.onResult.connect(this, onCopyActionResult)
var INT_HDR_ID = ""
var EXT_HDR_ID = ""
var RECS = []

getIntHdrId()

function getIntHdrId() {
    var volumeQueryDef  =  {
        selections:   [

            { field: 1, conditionType: 2, condition: "#"},
            { field: 0, conditionType: 2, condition: "FSL2"}
            
        ],
        fields:       [0],
        orders:       [
            //    {field: 1, direction: 1}
        ]
    }

    query = volumeTable.createQuery(volumeQueryDef);
    query.onQueryReady.connect(this,onVolumeQueryReady);
    query.execute();
}

function getExtHdrId() {
    var volumeQueryDef  =  {
        selections:   [

            { field: 1, conditionType: 2, condition: "USB1"},
            { field: 0, conditionType: 2, condition: "FSL2"}
            
        ],
        fields:       [0],
        orders:       [
            //    {field: 1, direction: 1}
        ]
    }

    query = volumeTable.createQuery(volumeQueryDef);
    query.onQueryReady.connect(this,onVolumeQueryReady);
    query.execute();
}

function onVolumeQueryReady(count){
    print("onQueryReady count=" + count)
    query.onRows.connect(this,onVolumeRows);
    query.readAllRows();

}

function onVolumeRows(id, rows){
    print("onRows rows=" + rows.length)
    if (INT_HDR_ID == "") {
        INT_HDR_ID = rows[0][0]
        print(INT_HDR_ID)
        getExtHdrId()
    } else {
        EXT_HDR_ID = rows[0][0]
        print(EXT_HDR_ID)
        getRecordings()
    }
}

function getRecordings() {
    var queryDef  =  {
        selections:   [

            { field: 25, conditionType: 1, condition: INT_HDR_ID},
            { field: 2, conditionType: 1, condition: 4},
            { field: 3, conditionType: 1, condition: 12}
            
        ],
        fields:       [29, 31],
        orders:       [
            //{field: 2, direction: 1}
        ]
    }
    query = recordingTable.createQuery(queryDef);
    query.onQueryReady.connect(this,onRecordingQueryReady);
    query.execute();

}

function onRecordingQueryReady(count){
    print("onQueryReady count=" + count)
    query.onRows.connect(this,onRecordingRows);
    query.readAllRows();
}

function onRecordingRows(id, rows){
    print("onRows rows=" + rows.length)
    for(var i=0;i<rows.length;i++){
        print(" Row "+ i);
        var row = rows[i];
        for(var j=0;j<row.length;j++){
        //for(var j=0;j<1;j++){
            print("  Column "+j);
            print("       "+ row[j])
        }
        var rec = [ row[1], row[0] ]
        RECS.push(rec)
        //copyAction.call([row[1], row[0], EXT_HDR_ID, "DR+", "USB1"])
    }
    var rec = RECS.pop()
    copyItem(rec[0], rec[1])
    query = 0

}

function onCopyActionResult(actionCallId, results){
    print("onCopyActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);

    if (RECS.length > 0) {
       var rec = RECS.pop()
       copyItem(rec[0], rec[1])
    } else {
        jbiz.exit()
    }

}

function copyItem(service_name, rec_id) {
    copyAction.call([service_name, rec_id, EXT_HDR_ID, "DR+", "USB1"])
}
