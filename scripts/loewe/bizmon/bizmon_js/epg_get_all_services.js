


var serviceListTable = dataModel.de.loewe.sl2.table.servicelist.list
var epgTable = dataModel.de.loewe.sl2.epg;

var print = jbiz.writeLine;


// enum ENUM_SL2_TVAPI_TABLE_SERVICELIST_LIST_FIELDS
// {
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_NAME = 0,                       /**< delivers the name of the channel */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_ID = 1,                         /**< delivers the unique identifier of the requested list*/
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_URI = 2,                        /**< delivers the URI of the service */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_ATTR = 3,                       /**< delivers the attributes for this favorite list
//                                                                          see ServiceAttributes in <model/type.h> */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FRONTEND = 4,                   /**< delivers the frontend of the service */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_SATELLITE = 5,                  /**< delivers the satellite identifier */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_NO = 6,                         /**< delivers the channel number/logical channel number */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_GCN = 7,                        /**< delivers the unique identifier of the service */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_SERVICE_ID = 8,                 /**< delivers the service identifier (only DVB) */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_TRANSPORT_STREAM_ID = 9,        /**< delivers the transport stream identifier (only DVB) */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_ORIGINAL_NETWORK_ID = 10,       /**< delivers the original network identifier (only DVB) */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_PRESENT_EVENT_START_UTC = 11,       /**< delivers the present EPG event start time */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_PRESENT_EVENT_STOP_UTC = 12,        /**< delivers the present EPG event stop time*/
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_PRESENT_EVENT_NAME = 13,        /**< delivers the present EPG event name */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_PRESENT_EVENT_SHORTINFO = 14,   /**< delivers the present EPG event short info */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_PRESENT_EVENT_LONGINFO = 15,    /**< delivers the present EPG event long info */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FOLLOWING_EVENT_START_UTC = 16,     /**< delivers the following EPG event start time */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FOLLOWING_EVENT_STOP_UTC = 17,      /**< delivers the following EPG event stop time */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FOLLOWING_EVENT_NAME = 18,      /**< delivers the following EPG event name */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FOLLOWING_EVENT_SHORTINFO = 19, /**< delivers the following EPG event short info */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_FOLLOWING_EVENT_LONGINFO = 20,  /**< delivers the following EPG event long info */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_TYPE = 21,                      /**< item type (see directory) */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_SUBTYPE = 22,                    /**< item subtype (see directory) */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_CNI = 23,                    /**< CNI for analog channels */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_SERVICE_VISIBLE    = 24,     /**< Service visibility flag */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_SERVICE_SELECTABLE = 25,     /**< Service selectable flag */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_CISLOT_CONFIG     = 26,      /**< ci slot config for DVB services */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_TTX_PREVIEW_PAGE  = 27,      /**< Teletext preview page */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_TTX_SUBTITLE_PAGE = 28,      /**< Teletext subtitle page */ 
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_TTX_ENCODING      = 29,      /**< Teletext encoding */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_ORIGINAL_ANCESTOR_UUID = 30, /**< Original ancestor uuid */
//     SL2_TVAPI_TABLE_SERVICELIST_FIELD_ORIGINAL_UUID = 31,          /**< Original uuid */
// };


var queryDef  =  {
                                selections:   [
                                    // { field: 2000, conditionType: 1, condition: 256},
                                    // { field: 2001, conditionType: 1, condition: 4134},
                                    // { field: 2002, conditionType: 1, condition: 9018},
                                    //{ field: 2004, conditionType: 1, condition: "ZDF-Morgenmagazin"},
                                    //{ field: 2004, conditionType: 2, condition: "Tagesschau"},
                                    //{ field: 2007, conditionType: 5, condition: 1355402114},
                                    //{ field: 2019, conditionType: 1, condition: "fff7a1671e77e93b16c"},
                                    
                                              ],
                                fields:       [2],
                                  //  fields:       [2000,2003,2004,2007],

                                orders:       [
                                                    // {field: 2007, direction: 1}
                                              ]
                             }
query = serviceListTable.createQuery(queryDef);
query.onQueryReady.connect(this,onQueryReady);
query.execute();
function onQueryReady(count){
    query.onRows.connect(this,onRows);
    query.readAllRows();
}
function onRows(id, rows){
    for(var i=0;i<rows.length;i++){
        print(" Row "+ i);
        var row = rows[i];
        for(var j=0;j<row.length;j++){
            print("  Column "+j);
            print("       "+ row[j])
        }
    }
	  jbiz.exit();
}