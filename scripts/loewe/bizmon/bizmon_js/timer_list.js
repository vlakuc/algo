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

// loewe/common/biz/api/include/model/values/values-timer-list.h
//enum ENUM_TIMER_LIST_TABLE_FIELD
//{
//    ENUM_TIMER_LIST_TABLE_FIELD_ENTRY_UUID = 0,
//    /**< universally unique ID (UUID), use this for instance to delete or edit
//     *   an entry in the timer list */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_ENTRY_TITLE  = 1,
//    /**< title of the entry */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_CHANNEL_UUID = 2,
//    /**< source channel UUID */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_DESTINATION_RECORDER_ID  = 3,
//    /**< destination recorder ID (c.f., #ENUM_TIMER_LIST_RECORDERS_ID) */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_START_TIME_UTC = 4,
//    /**< expected start time in UTC epoch time [seconds] */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_END_TIME_UTC = 5,
//    /**< expected end time in UTC epoch time [seconds] */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_DESCRAMBLING_AT = 6,
//    /**< descramble time in UTC epoch time [seconds] */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_RECORDING_TYPE = 7,
//    /**< see #ENUM_TIMER_LIST_RECORDING_TYPE for different recording types.
//     *   Decimal (unsigned) representation, e.g.,
//     *   ENUM_TIMER_LIST_RECORDING_TYPE_COPY evaluates to "128" */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_CRID = 8,
//    /**< Content Reference Identifier */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_LOCK_PIN = 9,
//    /**< PIN for child lock */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_PROGRAM_PIN = 10,
//    /**< CI/CI+ CAM PIN */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_ATTRIBUTES = 11,
//    /**< recording attributes (decimal representation of bit mask),
//     * see #ENUM_TIMER_LIST_RECORDING_ATTRIBUTES   */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_CHANNEL_ANCESTOR_UUID = 12,
//    /**< denotes the favorite list of a channel */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_CHANNEL_URI = 13,
//    /**< c.f. #ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_CHANNEL_UUID. */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_CHANNEL_NAME = 14,
//    /**< source channel (service name, e.g., "BBC") */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_MEDIA_ITEM_LOCATOR = 15,
//    /**< source (item locator as used, e.g., for copy instructions */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_DESTINATION_RECORDER_URI = 16,
//    /**< Not supported yet. Will complement the recorder UUID in the future. */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_DESTINATION_VOLUME_ID = 17,
//    /**< ID of the target volume. Used, e.g., for copy instructions. */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_EPG_EVENT_ID = 18,
//    /**< Unique ID of an EPG event. Needed, e.g., for recordings (c.f.,
//     *   #ENUM_TIMER_LIST_RECORDING_ATTR_AUTO_TIME_CONTROL) or User Memos. */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_SOURCE_MEDIA_ITEM_LOCATOR_NAME = 19,
//    /**< media item locator friendly name */
//
//    ENUM_TIMER_LIST_TABLE_FIELD_DESTINATION_VOLUME_ID_NAME = 20,
//    /**< volume friendly name */
//
//
//
//    ENUM_TIMER_LIST_TABLE_FIELD_NUMBER_COLUMNS = 21
//    /**< for internal use only */
//
//
//
//};

var serviceListTable = dataModel.de.loewe.sl2.timer.list.table;
var print = jbiz.writeLine;
var queryDef  =  {
                                selections:   [
                                    //{ field: 4, conditionType: 0, condition: 28721},

                                              ],
                                fields:       [0, 1, 2, 4, 5, 7, 8, 11, 14, 18 ],
                                orders:       [
                                           //         {field: 1, direction: 1}
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
						switch(j){
							case 0:
                 print("Timer ID " + row[j] );
                 break;
              case 1:
                 print("Rec name " + row[j] );
                 break;
              case 2:
                 print("uuid " + row[j] );
                 break;
              case 3:
                 var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                 d.setUTCSeconds(row[j]);
                 print("Start time " + d );
                 break;
              case 4:
                 var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                 d.setUTCSeconds(row[j]);
                 print("End time " + d );
                 break;
              case 5:
                 print("Type " + row[j] );
                 break;
              case 6:
                 print("crid " + row[j] );
                 break;
              case 7:
                 print("attrs " + row[j] );
                 break;
              case 8:
                 print("Rec chan name " + row[j] );
                 break;
              case 9:
                 print("event id " + row[j] );
                 break;

            }

        }
    }
	  jbiz.exit();
}
