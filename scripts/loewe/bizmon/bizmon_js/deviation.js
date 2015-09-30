var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.uptimeoffset
var saveEnd = dataModel.de.loewe.sl2.i64.datetime.daylight.saving.end.utc
var saveBegin = dataModel.de.loewe.sl2.i64.datetime.daylight.saving.begin.utc

var print = jbiz.writeLine;
var exit = jbiz.exit;

var ONE_DAY = 60*60*24
sysTime.setValue(Math.round(new Date().getTime() / 1000))
//sysTime.setValue(saveEnd.getValue() + ONE_DAY*13)
//sysTime.setValue(saveBegin.getValue() + ONE_DAY*3)
//sysTime.setValue(1416841053) //1413935940
//sysTime.setValue(1403621355)

saveBegin.setValue(sysTime.getValue() - ONE_DAY)
saveEnd.setValue(sysTime.getValue() + ONE_DAY*2)

//var v = new Date(2014, 6, 26)
//var d = Math.round(v.getTime() / 1000)
//saveEnd.setValue(v)
//print(d + ONE_DAY)
//saveEnd.setValue(d - ONE_DAY*60)
//saveBegin.setValue(d + ONE_DAY*6)
//sysTime.setValue(d + ONE_DAY)
exit()

//main()

function main() {
    var queryDef  =  {
        //     FIELD_COND_CONTAINS     =  2,
        selections:   [
            { field: 0, conditionType: 1, condition: SD_CHANNEL_NAME }
            
        ],
        
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_NAME = 0,                       /**< delivers the name of the channel */
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_URI = 2,                        /**< delivers the URI of the service */
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_GCN = 7,                        /**< delivers the unique identifier of the service */
        
        fields:       [0, 2, 7],
        
        orders:       []
    }
    query = serviceListTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onServiceListQueryReady);
    query.onRows.connect(this, onSdServiceListRows);
    query.execute();
}

function onServiceListQueryReady(count){
    print("onServiceListQueryReady: " + count)
    if(count == 0) {
        print("Service " + SD_CHANNEL_NAME + " not found")	
        exit()
    }
    query.readAllRows();
}



function onSdServiceListRows(id, rows){
    print("onSdServiceListRows. Set of " + rows.length)
    var row = rows[0];
    print(row)
    // Extract dvb-triplet from uri
    var data = row[1].match(/[-+]?[0-9]*\.?[0-9]+/g);
    print(data)
    var queryDef  =  {
        selections:   [
            { field: 2000, conditionType: 1, condition: data[7]}, //service ID
            { field: 2001, conditionType: 1, condition: data[8]}, //transport stream ID
            { field: 2002, conditionType: 1, condition: data[6]}, //network id
        ],
        fields:       [2003, 2004, 2007, 2008, 2022],

        orders:       [
            {field: 2007, direction: 1}
        ]
    }
    query = epgTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onEpgQueryReady);
    query.onRows.connect(this, onSdEpgRows);
    query.execute();
}

function onEpgQueryReady(count){
    print("onEpgQueryReady: " + count)
    if(count == 0) {
        print("Empty EPG response")	
        exit()
    }  
    query.readAllRows();
}

function onSdEpgRows(id, rows){
    print("onSdEpgRows");
    for(var i=0;i<rows.length;i++){
	print(row)
        var row = rows[i];
        if(row[1] != SD_EVENT_NAME) {
            print("onSdEpgRows: skip event " + row[1]);
            continue;
        }
        // parse linkage string
        var links = row[4].match(/.{17}/g)
	print("onSdEpgRows: Links: " + links)
        for(var j=0;j<links.length;j++){
            link = links[j].match(/.{4}|.{1}/g)
            print(link)
            if (link[4] == '0') {
                print("onSdEpgRows: skip link with zero flag");
                continue
            }
            var HD_NID = parseInt(link[0],16)
            var HD_TSID = parseInt(link[1],16)
            HD_SID = parseInt(link[2],16)
            HD_EVENT_ID = parseInt(link[3],16)

            HD_LCN = HD_SID

            print("HD_NID: " + HD_NID)
            print("HD_TSID: " + HD_TSID )
            print("HD_SID: " + HD_SID )
	    print("Linked event id: " + HD_EVENT_ID)


            var favQueryDef  =  {
                selections:   [
                    { field: 0, conditionType: 1, condition: FREEVIEW_LIST_NAME }
                ],

                fields:       [0, 1],

                orders:       [
                    {field: 0, direction: 1}
                ]
            }

            favQuery = favListTable.createQuery(favQueryDef);
            favQuery.onQueryReady.connect(this,onFavQueryReady);
            favQuery.onRows.connect(this, onFavListRows);
            favQuery.execute();
            break
        }
    }
}

function onFavQueryReady(count){
    print("onFavQueryReady: " + count)
    if(count == 0) {
        print("Favorite list not found")	
        exit()
    }
    favQuery.readAllRows();
}

function onFavListRows(id, rows){
    print("onFavListRows")
    print(rows[0])
    var listUuid = rows[0][1]

    var queryDef  =  {
        selections:   [
            { field: 1, conditionType: 1, condition: listUuid }, // OK
            { field: 32, conditionType: 1, condition: HD_LCN }
            
        ],

        fields:       [0, 2, 6, 7],

        orders:       [
            {field: 6, direction: 1}
        ]
    }

    query = serviceListTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onServiceListQueryReady);
    query.onRows.connect(this, onHdServiceListRows);
    query.execute();
}

function onHdServiceListRows(id, rows){
    print("onHdServiceListRows. Set of " + rows.length)
    var row = rows[0];
    print(row)
    HD_SERVICE_NAME = row[0]
    HD_SERVICE_UUID = row[3]
    var data = row[1].match(/[-+]?[0-9]*\.?[0-9]+/g);
    print(data)
    var queryDef  =  {
        selections:   [
            { field: 2000, conditionType: 1, condition: data[7]}, //service ID
            { field: 2001, conditionType: 1, condition: data[8]}, //transport stream ID
            { field: 2002, conditionType: 1, condition: data[6]}, //network id
        ],
        fields:       [2003, 2004, 2007, 2008, 2022],

        orders:       [
            {field: 2007, direction: 1}
        ]
    }

    query = epgTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onEpgQueryReady);
    query.onRows.connect(this, onHdEpgRows);
    query.execute();
}

function onHdEpgRows(id, rows){
    print(" onEpgRows ");
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        var event_id = parseInt(row[0])
        if (event_id == HD_EVENT_ID) {
            print(row)
            HD_EVENT_TITLE = row[1]
            HD_EVENT_START_TIME = parseInt(row[2])
            HD_EVENT_END_TIME = parseInt(row[3])
            addTimer()
            break;
        }
    }
}

var ADD_TIMER_DONE = 0

function addTimer()
{
    if (ADD_TIMER_DONE != 0) {
        return
    }
    ADD_TIMER_DONE = 1

    addTimerAction.onResult.connect(this, onActionAddResult);
    addTimerAction.onError.connect(this, onActionAddError);

    var timerType                  = 1 // ENUM_TIMER_LIST_RECORDING_TYPE_ONCE
    var title                      = HD_EVENT_TITLE
    var uniqueID                   = ""
    var source_UUID                = HD_SERVICE_UUID
    var destination_Rec_URI        = "0"
    var startTime                  = HD_EVENT_START_TIME
    var endTime                    = HD_EVENT_END_TIME
    var descramblingTime           = "0"
    var CRID                       = ""
    var parentalLockPin            = "0"
    var CAMLockPin                 = "0"
    var varAttrs                   = "2" //AutoTimeControl
    var source_ancestor_UUID       = ""
    var source_URI                 = ""
    var channel_Name               = HD_SERVICE_NAME
    var arg_15                     = "false"
    var arg_16                     = "false"
    var arg_17                     = "false"
    var EPG_EVENT_ID               = HD_EVENT_ID

    var result = addTimerAction.call([uniqueID,
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
}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n", 1 ,31,0);
    jbiz.exit();
}

