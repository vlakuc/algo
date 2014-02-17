//Example - DB query

// loewe/common/biz/api/include/model/values/values-directory.h
// enum ENUM_SL2_TVAPI_TABLE_DIRECTORY {
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ANCESTOR = 0,  /**< ancestor */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_CAPTION = 1,   /**< item name */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_TYPE = 2,      /**< item type (e.g. tv, video, ...), see #ENUM_SL2_TVAPI_TABLE_DIRECTORY_FIELD_TYPE for different values */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_SUBTYPE = 3,   /**< item subtype, see #ENUM_SL2_TVAPI_TABLE_DIRECTORY_FIELD_SUBTYPE for different values */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_LOCATOR = 4,   /**< item URL */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_THUMBNAIL_URL=5,/**< item thumbnail URL */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_TITLE = 6,     /**< item title (music) */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ARTIST = 7,    /**< item artist */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_PRODUCER = SL2_TVAPI_TABLE_DIRECTORY_FIELD_ARTIST,  /**< DEPRECATED */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ALBUM = 8,     /**< item album */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_GENRE = 9,    /**< item genre */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_DATE = 10,     /**< item date */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ACTOR = 11,    /**< item actor */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_DIRECTOR = 12, /**< item director */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_PLAYTIME = 13, /**< playtime */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_INDEX = 14,    /**< item index in a list */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ATTRIBUTES = 15,/**< item attributes, see #ENUM_SL2_TVAPI_TABLE_DIRECTORY_FIELD_ATTRIBUTES for different flags*/
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_FILE_SIZE = 16,/**< file size */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_COMMENT = 17,  /**< comment */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_DESCRIPTION=18,/**< item description (PVR recordings: this is the epg short info) */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_NEWS = 19,     /**< optional news info (e.g. used in dashboard for series recordings items of DR+ archive */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_UUID = 20,     /**< uuid of medialist item */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_LONG_INFO = 21,/**< detailed description (PVR recordings: this is the epg long info) */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_START_TIME = 22,/**< for PVR recordings: start time calculated out of dateNumeric. */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_MAX_POS = 23,  /**< for PVR recordings: this is the percentage of the maximum position ever seen in playback. */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_RESOLUTION = 24,/**< item resolution, only for photo such as 1920*1080 */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_VOLUME_ID = 25, /**< volumeId */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_UNIQUE = 26, /**< expects "EQUALS" <any field id>: Returns unique things like all albums etc. */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_TRACK_NUMBER = 27, /**< Track number of the item in a CD or similar */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_IS_ACTIVE = 28, /**< Wether the medium is active */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ORIGINAL_UUID = 29, /**< original UUID */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ORIGINAL_VOLUME_ID = 30, /**< original volumeId */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_STATION_NAME = 31, /**< for PVR recordings: station name needed as specified. */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_DATE_NUMERIC = 32, /**< modification time (UTC timestamp) */
//     SL2_TVAPI_TABLE_DIRECTORY_FIELD_ALBUM_UUID = 33 /**< album ID */
// };

var serviceListTable = dataModel.de.loewe.sl2.table.directory
var print = jbiz.writeLine;
var uuid_array = new Array()
// "FSL2://c1e2e2f5-10da-4bd1-b99f-8023599eebd2"
var HDR_ID = "FSL2://06b32824-c818-4c81-a7ec-1fc978f1718f"
var queryDef  =  {
                                selections:   [

                                    { field: 25, conditionType: 1, condition: HDR_ID},
                                    { field: 2, conditionType: 1, condition: 4},
                                    { field: 3, conditionType: 1, condition: 12}
 
                                              ],
                                fields:       [29, 1, 6, 13],
                                orders:       [
                                                    //{field: 2, direction: 1}
                                              ]
                             }
var seekToContentSelection = queryDef.selections;


query = serviceListTable.createQuery(queryDef);
query.onQueryReady.connect(this,onQueryReady);

query.onIteratorReady.connect(function(result){
											jbiz.writeLine("onIteratorReady("+result+")");
									});
//query.onQueryReady.connect(function(newValue){
//											jbiz.writeLine("onQueryReady("+newValue+")");
//									});

query.execute();

setTimeout(function (){
	query.seekToContent(seekToContentSelection, 0, 0, 10);	
},3000);

query.onSeekToContent.connect(function(newValue){
											jbiz.writeLine("onSeekToContent("+newValue+")");
									});

//setInterval(function(){checkUuids()},2000);
setTimeout(function(){checkUuids()},10000);
//setTimeout(function(){deleteOne()},4000);
//jbiz.exit()

function checkUuids()
{
     print("checkUuids")
	  for(var key in uuid_array)
    {
				var uuid = uuid_array[key]
        //action.call(uuid)
        print("Content " + key + " " + uuid)
    }
     print("checkUuids done")
}

function onQueryReady(count){
    print("onQueryReady count=" + count)
    query.onRows.connect(this,onRows);
    query.readAllRows();
    print("onQueryReady done")
}
function onRows(id, rows){
     print("onRows rows=" + rows.length)
    for(var i=0;i<rows.length;i++){
        print(" Row "+ i);
        var row = rows[i];
        for(var j=0;j<row.length;j++){
            print("  Column "+j);
            print("       "+ row[j])
            if(j == 4)
            {
                uuid_array.push(row[j])
            }
        }
    }

}
function deleteOne(){
      var action = dataModel.de.loewe.sl2.hdr.action.archive.remove
     action.onResult.connect(this, onActionResult);
    action.onError.connect(this, onActionError);
	  for(var key in uuid_array)
    {
				var uuid = uuid_array[key]
        //action.call(uuid)
        print("Going to delete recording " + uuid)
        setTimeout(function(){action.call(uuid)},2000);
        print("Remove action sent for " + uuid)
        break
        //action.call(uuid_array[0])
    }
    //jbiz.exit();	
}

function onActionResult(actionCallId, results){
    print("onActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")\n", 1 ,31,0);
    for(var i=0;i<results.length;i++){
        print(" Result "+ i);
        print("   "+ results[i], 1 ,33,0);
        print("");
    }
    var mes_id = dataModel.de.loewe.sl2.messages.messageid
    var id = mes_id.getValue();
    print(id);
    var action = dataModel.de.loewe.sl2.messages.action.confirm;
    //action.call([(0,id),(1,2)])
    print("Sending confirm action")
	  setTimeout(function(){action.call([(0,id),(1,"2")])},1000);
    print("Confirm action sent")

}

function onActionError(actionCallId, errorCode){
    print("onActionError: "+ errorCode+"\n", 1 ,31,0);
	 jbiz.exit();
}
