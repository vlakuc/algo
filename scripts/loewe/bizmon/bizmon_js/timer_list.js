//Example - DB query

// Conditions: loewe/common/biz/api/include/model/iterator.h
// Timer values: loewe/common/biz/api/include/model/values/values-timer-list.h


var serviceListTable = dataModel.de.loewe.sl2.timer.list.table;
var print = jbiz.writeLine;
var queryDef  =  {
                                selections:   [
                                              ],
                                fields:       [0, 1, 2, 4, 5, 7, 8, 11, 14, 18, 21],
                                orders:       [
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
        var row = rows[i];
        for(var j=0;j<row.length;j++){
						switch(j){
							case 0:
                 print("Timer ID   :\t" + row[j] );
                 break;
              case 1:
                 print("Rec name   :\t" + row[j] );
                 break;
              case 2:
                 print("UUID       :\t" + row[j] );
                 break;
              case 3:
                 var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                 d.setUTCSeconds(row[j]);
                 print("Start time :\t" + d );
                 break;
              case 4:
                 var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                 d.setUTCSeconds(row[j]);
                 print("End time   :\t" + d );
                 break;
              case 5:
                 print("Type       :\t" + row[j] );
                 break;
              case 6:
                 print("CRID       :\t" + row[j] );
                 break;
              case 7:
                 print("Attrs      :\t" + row[j] );
                 break;
              case 8:
                 print("Chan name  :\t" + row[j] );
                 break;
              case 9:
                 print("Event Id   :\t" + row[j] );
                 break;
              case 10:
                 print("Series tag :\t" + row[j] );
                 break;
            }
        }
        print("\n");
    }
	  jbiz.exit();
}
