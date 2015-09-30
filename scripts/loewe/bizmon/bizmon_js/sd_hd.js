
var serviceListTable = dataModel.de.loewe.sl2.table.servicelist.list
var epgTable = dataModel.de.loewe.sl2.epg;
var addTimerAction = dataModel.de.loewe.sl2.timer.list.entry.add;

var print = jbiz.writeLine;

var onEpgRequestReady;
var onServiceListRequestReady;
var HD_EVENT_ID = 0
var HD_EVENT_TITLE = ""
var HD_SERVICE_UUID = ""
var HD_SERVICE_NAME = ""

main()

function main() {
    var queryDef  =  {
        //     FIELD_COND_CONTAINS     =  2,
        selections:   [
            { field: 0, conditionType: 2, condition: "SD 1" }
            
        ],
        
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_NAME = 0,                       /**< delivers the name of the channel */
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_URI = 2,                        /**< delivers the URI of the service */
        //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_GCN = 7,                        /**< delivers the unique identifier of the service */
        
        fields:       [0, 2, 7],
        
        orders:       []
    }
    onEpgRequestReady = onSdEpgQueryReady
    onServiceListRequestReady = onServiceListQueryReady
    searchServiceList(queryDef)
}


function searchServiceList(queryDef)
{
    query = serviceListTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onServiceListRequestReady);
    query.execute();

}

function onServiceListQueryReady(count){
    query.onRows.connect(this, onServiceListRows);
    query.readAllRows();
}

function onServiceListRows(id, rows){
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        for(var j=0;j<row.length;j++){
            if(j == 0) {
                HD_SERVICE_NAME = row[j]
            }
            if(j == 1) {
                // Extract dvb-triplet from uri
                var data = row[j].match(/[-+]?[0-9]*\.?[0-9]+/g);
                var EPG_QUERY_DEF  =  {
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
                queryEPG(EPG_QUERY_DEF)
            }
            if(j == 2) {
                HD_SERVICE_UUID = row[j]
            }
        }
    }
}

function queryEPG(queryDef)
{
    query = epgTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onEpgRequestReady);
    query.execute();
}

function onSdEpgQueryReady(count){
    print("EPG ready " + count)
    query.onRows.connect(this, onSdEpgRows);
    query.readAllRows();
}

function onSdEpgRows(id, rows){
    print(" onEpgRows ");
    for(var i=0;i<rows.length;i++){
        var row = rows[i];
        if(row[1] != "One") {
            continue;
        }
        // parse linkage string
        var links = row[4].match(/.{17}/g)
        for(var j=0;j<links.length;j++){
            link = links[j].match(/.{4}|.{1}/g)
            if (link[4] == '0') {
                continue
            }
            print(link)
            var HD_NID = parseInt(link[0],16)
            var HD_TSID = parseInt(link[1],16)
            var HD_SID = parseInt(link[2],16)
            HD_EVENT_ID = parseInt(link[3],16)
            var queryDef  =  {
                // SL2_TVAPI_TABLE_SERVICELIST_FIELD_SERVICE_ID = 8,                 /**< delivers the service identifier (only DVB) */
                // SL2_TVAPI_TABLE_SERVICELIST_FIELD_TRANSPORT_STREAM_ID = 9,        /**< delivers the transport stream identifier (only DVB) */
                // SL2_TVAPI_TABLE_SERVICELIST_FIELD_ORIGINAL_NETWORK_ID = 10,       /**< delivers the original network identifier (only DVB) */
                selections:   [
                    { field: 8, conditionType: 1, condition: HD_SID },
                    { field: 9, conditionType: 1, condition: HD_TSID },
                    { field: 10, conditionType: 1, condition: HD_NID }
                    
                ],
                
                //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_NAME = 0,                       /**< delivers the name of the channel */
                //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_URI = 2,                        /**< delivers the URI of the service */
                //     SL2_TVAPI_TABLE_SERVICELIST_FIELD_GCN = 7,                        /**< delivers the unique identifier of the service */
                
                fields:       [0, 2, 7],
                
                orders:       []
            }
            onEpgRequestReady = onHdEpgQueryReady
            searchServiceList(queryDef)

        }
    }
}

function onHdEpgQueryReady(count){
    print("EPG ready " + count)
    query.onRows.connect(this, onHdEpgRows);
    query.readAllRows();
}

function onHdEpgRows(id, rows){
    print(" onEpgRows ");
    for(var i=0;i<rows.length;i++){
        print(" Row "+ i);
        var row = rows[i];
        var event_id = parseInt(row[0])
        print("Event id " + event_id)
        if (event_id == HD_EVENT_ID) {
            for(var j=0;j<row.length;j++){
                print("  Column "+j);
                print("       "+ row[j])
            }
            HD_EVENT_TITLE = row[1]
            HD_EVENT_START_TIME = parseInt(row[2])
            HD_EVENT_END_TIME = parseInt(row[3])
            //addTimer()
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

