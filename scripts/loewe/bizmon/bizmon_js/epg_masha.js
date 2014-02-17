var serviceListTable = dataModel.de.loewe.sl2.epg;
var uri = dataModel.de.loewe.sl2.tvservice.uri.main.getValue();
var onid = /\d+(?=.sid)/.exec(uri);
var sid = /\d+(?=.tsid)/.exec(uri);
var tsid = /\d+(?=$)/.exec(uri);
var print = jbiz.writeLine;
print(sid + ", " + tsid + ", " + onid)
var queryDef  =  {
                                selections:   [
                                                    { field: 2000, conditionType: 1, condition: sid},
                                                    { field: 2001, conditionType: 1, condition: tsid},
                                                    { field: 2002, conditionType: 1, condition: onid}
                                              ],
                                fields:       [2004, 2007],
                                orders:       [
                                                    {field: 2004, direction: 1}
                                              ]
                             }
query = serviceListTable.createQuery(queryDef);
query.onQueryReady.connect(this,onQueryReady);
query.execute();
function onQueryReady(count){
                print("found: " + count);
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
