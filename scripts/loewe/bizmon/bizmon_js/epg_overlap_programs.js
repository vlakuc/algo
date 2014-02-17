//Example - DB query

//  loewe/common/biz/api/include/model/iterator.h
//
//   /**
//    * Different types of conditions for database query
//    */
//   typedef enum {
//       FIELD_COND_NONE         =  0,
//       FIELD_COND_EQUAL        =  1,
//       FIELD_COND_CONTAINS     =  2,
//       FIELD_COND_LESS         =  3,
//       FIELD_COND_LESSEQUAL    =  4,
//       FIELD_COND_GREATER      =  5,
//       FIELD_COND_GREATEREQUAL =  6,
//       FIELD_COND_ALL_BITS_SET =  7,
//       FIELD_COND_ALL_BITS_CLEARED = 8,
//       //FIELD_COND_ALL_BITS_ZERO = 8,
//       FIELD_COND_ANY_BIT_SET  = 9,
//       FIELD_COND_ANY_BIT_CLEARED  = 10,
//       FIELD_COND_NOT_EQUAL        =  17,
//       FIELD_COND_END = 0xffff
//   } FieldCond;

// loewe/common/biz/api/include/model/values/values-epg.h
//
// enum ENUM_SL2_TVAPI_EPG_FIELD
//
//   TABLE_FIELD_EPG_SERVICE_ID                      = 2000, /**< service ID */
//   TABLE_FIELD_EPG_TRANSPORT_STREAM_ID             = 2001, /**< transport stream ID */
//   TABLE_FIELD_EPG_ORIGINAL_NETWORK_ID             = 2002, /**< original network ID */
//
//   TABLE_FIELD_EPG_EVENT_ID                        = 2003, /**< event ID, -CHL- = This field can be used for channel list
//                                                            query */
//   TABLE_FIELD_EPG_TITLE                           = 2004, /**< event title, -CHL- */
//   TABLE_FIELD_EPG_SHORT_TEXT                      = 2005, /**< event short description, -CHL- */
//   TABLE_FIELD_EPG_DESCRIPTION                     = 2006, /**< event long description, -CHL- */
//   TABLE_FIELD_EPG_START_TIME_UTC                  = 2007, /**< event start time (in local format), -CHL- */
//   TABLE_FIELD_EPG_END_TIME_UTC                    = 2008, /**< event end time (in local format), -CHL- */
//   TABLE_FIELD_EPG_RUNNING_STATE                   = 2009, /**< This indicates the status of the service as
//                                                            defined in #ENUM_SL2_TVAPI_EPG_RUNNING_STATE,
//                                                            -CHL- */
//
//   TABLE_FIELD_EPG_FREE_CAMODE                     = 2010, /**< This 1-bit field, when set to "0" indicates
//                                                            that all the component streams of the service
//                                                            are not scrambled. When set to "1" it indicates
//                                                            that access to one or more streams may be
//                                                            controlled by a CA system., -CHL- */
//
//   TABLE_FIELD_EPG_RATING                          = 2011, /**< parental rating, -CHL- */
//   TABLE_FIELD_EPG_THEMES                          = 2012, /**< EPG themes as flags, see #ENUM_SL2_TVAPI_EPG_THEMES,
//                                                            one EPG event may belong to more than one theme, -CHL- */
//
//   TABLE_FIELD_EPG_CRIDS                           = 2013, /**< content reference indicator (CRID), see WIKI for details */
//
//   TABLE_FIELD_EPG_SERVICE_NAME                    = 2014, /**< service name */
//   TABLE_FIELD_EPG_SERVICE_THUMBNAIL               = 2015, /**< related link to thumbnail */
//   TABLE_FIELD_EPG_SERVICE_LINK                    = 2016, /**< related link to web */
//   TABLE_FIELD_EPG_SERVICE_ATTRIBUTES              = 2017, /**< attributes as flags, see #ENUM_SL2_TVAPI_EPG_ATTRIBUTES */
//   TABLE_FIELD_EPG_SERVICE_FAVORITE_NO             = 2018, /**< favorite ID */
//   TABLE_FIELD_EPG_SERVICE_SERVICE_UUID            = 2019, /**< service UUID */
//   TABLE_FIELD_EPG_TIMER_LIST_ENTRY_RECORDING_UUID = 2020, /**< the associated timer list entry ID if
//                                                            #ENUM_EPG_ATTRIBUTES_RECORDING is set */
//   TABLE_FIELD_EPG_TIMER_LIST_ENTRY_MEMORIZED_UUID = 2021  /**< the associated timer list entry ID if
//                                                            #ENUM_EPG_ATTRIBUTES_MEMORIZED is set */
//
//;

var serviceListTable = dataModel.de.loewe.sl2.epg;
var print = jbiz.writeLine;

var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;
var startTime = sysTime.getValue()

var firstChannelProgs  = new Array()
var secondChannelProgs = new Array()


var STATE = {
  STATE_INIT                        : {value: 0, name: "Init satate"},
  STATE_REQUEST_FIRST_CHANNEL       : {value: 0, name: "Send request for programms from the first channel"},
  STATE_REQUEST_FIRST_CHANNEL_CHECK : {value: 0, name: "Check request for programms from the first channel"},
  STATE_REQUEST_FIRST_CHANNEL_READY : {value: 0, name: "Request for programms from the first channel is done OK"},
  STATE_REQUEST_SECOND_CHANNEL       : {value: 0, name: "Send request for programms from the second channel"},
  STATE_REQUEST_SECOND_CHANNEL_CHECK : {value: 0, name: "Check request for programms from the second channel"},
  STATE_REQUEST_SECOND_CHANNEL_READY : {value: 0, name: "Request for programms from the second channel is done OK"},

  STATE_RESULTS_FAIL : {value: 0, name: "Test results: FAIL"},
    STATE_RESULTS_PASSED : {value: 0, name: "Test results: PASSED"},

};

var currentState = STATE.STATE_INIT
var mainInterval = 2000


setInterval(function(){ main() }, mainInterval)

function main(){
print("State: " + currentState.name)

switch(currentState)
{
case STATE.STATE_INIT:
    //firstChannelProgs.clear()
    //secondChannelProgs.clear()
    currentState.value = currentState.value + 1
    print("Iteration: " + currentState.value)
    currentState = STATE.STATE_REQUEST_FIRST_CHANNEL
    break
case STATE.STATE_REQUEST_FIRST_CHANNEL:
    getFirstChannelProgs()
    currentState = STATE.STATE_REQUEST_FIRST_CHANNEL_CHECK
    break
case STATE.STATE_REQUEST_FIRST_CHANNEL_CHECK:
    if(firstChannelProgs.length > 0)
    {
        currentState = STATE.STATE_REQUEST_FIRST_CHANNEL_READY
    }
    break
case STATE.STATE_REQUEST_FIRST_CHANNEL_READY:
    currentState = STATE.STATE_REQUEST_SECOND_CHANNEL
    break
case STATE.STATE_REQUEST_SECOND_CHANNEL:
    getSecondChannelProgs()
    currentState = STATE.STATE_REQUEST_SECOND_CHANNEL_CHECK
    break
case STATE.STATE_REQUEST_SECOND_CHANNEL_CHECK:
    if(secondChannelProgs.length > 0)
    {
        currentState = STATE.STATE_REQUEST_SECOND_CHANNEL_READY
    }
    break
case STATE.STATE_REQUEST_SECOND_CHANNEL_READY:
    currentState = STATE.STATE_RESULTS_PASSED
    break

case STATE.STATE_RESULTS_FAIL:
    jbiz.exit()
    break
case STATE.STATE_RESULTS_PASSED:
    jbiz.exit()
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

// KIKA      rec://plain/dvbs?frontend=8&satid=4&modcod=13&frequency=11346723&symbolrate=21998&inversion=2&polarization=1&band=1&onid=1&sid=11160&tsid=1010


function getFirstChannelProgs()
{
    // KIKA      rec://plain/dvbs?frontend=8&satid=4&modcod=13&frequency=11346723&symbolrate=21998&inversion=2&polarization=1&band=1&onid=1&sid=11160&tsid=1010
    getChannelProgs(11160, 1, 1010)
}

function getSecondChannelProgs()
{
    // ZDFinfoHD rec://plain/dvbs?frontend=8&satid=4&modcod=13&frequency=11346756&symbolrate=21999&inversion=2&polarization=1&band=1&onid=1&sid=11170&tsid=1010
    getChannelProgs(11170, 1, 1010)
}

function getChannelProgs(serv_id, net_id, ts_id)
{
    var queryDef  =  {
        selections:   [
            { field: 2000, conditionType: 1, condition: 11160},
            { field: 2002, conditionType: 1, condition: 1},
            //{ field: 2004, conditionType: 2, condition: "heute"},
            //{ field: 2004, conditionType: 2, condition: "Tagesschau"},
            //{ field: 2007, conditionType: 6, condition: startTime},
            //{ field: 2008, conditionType: 6, condition: startTime},
            { field: 2001, conditionType: 1, condition: 1010}
        ],
        //fields:       [2000,2001,2002,2003,2004,2007],
        fields:       [2000,2003,2004, 2019],
        orders:       [
            {field: 2007, direction: 1}
        ]
    }
    query = serviceListTable.createQuery(queryDef);
    query.onQueryReady.connect(this, onFirstQueryReady);
    query.execute();
}

function onFirstQueryReady(count){
    query.onRows.connect(this, onFirstRows);
    query.readAllRows();
}

function onFirstRows(id, rows){
    for(var i=0;i<rows.length;i++){
        print(" Row "+ i);
        var row = rows[i];
        for(var j=0;j<row.length;j++){
            print("  Column "+j);
            print("       "+ row[j])
        }
        firstChannelProgs.push(row)
    }
    //jbiz.exit();
}