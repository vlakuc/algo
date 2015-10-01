

var print = jbiz.writeLine;


var directoryTable = dataModel.de.loewe.sl2.table.directory
var volumeTable = dataModel.de.loewe.sl2.volume.table.main

var recRemoveAction = dataModel.de.loewe.sl2.hdr.action.archive.remove
recRemoveAction.onResult.connect(this, onRecRemoveActionResult)
recRemoveAction.onError.connect(this, onRecRemoveActionError)




var HDR_ID = ""


var recIds = [];



// var HDR_TYPE = "USB1" // use # for integrated hdr 

var HDR_TYPE = "#"

getHdrId()

function getHdrId() {
    var volumeQueryDef  =  {
        selections:   [

            { field: 1, conditionType: 2, condition: HDR_TYPE},
            { field: 0, conditionType: 2, condition: "FSL2"}
            
        ],
        fields:       [0],
        orders:       []
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
    HDR_ID = rows[0][0]
    print(HDR_ID)
    getRecs()
}

function getRecs()
{
    var queryDef  =  {
                                selections:   [

                                    { field: 25, conditionType: 1, condition: HDR_ID},
                                    { field: 2, conditionType: 1, condition: 68},
                                    { field: 3, conditionType: 1, condition: 12}
 
                                              ],
                                fields:       [29],
                                orders:       []
  
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
            recIds.push(rec_id)
        }
    }
    recRemoveAction.call(recIds)
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
	//  setTimeout(function(){action.call([(0,id),(1,"2")])}, 1000);
    //print("Confirm action sent")

}

function onRecRemoveActionError(actionCallId, errorCode){
    print("onRecRemoveActionError: "+ errorCode+"\n", 1 ,31,0);
	 jbiz.exit();
}

