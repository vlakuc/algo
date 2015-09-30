var print = jbiz.writeLine;

var currentServiceInfo = dataModel.de.loewe.sl2.vstr.tvservice.play.main;

var sysTime = dataModel.de.loewe.sl2.i64.datetime.time.utc;

var addAction  = dataModel.de.loewe.sl2.timer.list.entry.add.multiroom.playback

addAction.onResult.connect(this, onActionAddResult);
addAction.onError.connect(this, onActionAddError);



// Start execution

addTimer()


function addTimer() {
    print("addTimer")
    var title                      = "Test"
    var startTime                  = sysTime.getValue() + 60
    var endTime                    = startTime + 120
    var source_UUID                = currentServiceInfo.getValue()[1]

    var source_ancestor_UUID       = "ancestor_uuid"


    var result = addAction.call([
                                 title,
                                 source_UUID,
                                 source_ancestor_UUID,
                                 startTime,
                                 endTime,
                                 "dest1",
                                 "dest2",
                                 "dest3"
                                ])
}



function onActionAddResult(actionCallId, results){
    print("\tonActionAddResult: (id: "+ actionCallId+" arg count: "+ results.length +")");
    jbiz.exit()
}

function onActionAddError(actionCallId, errorCode){
    print("onActionAddError: "+ errorCode+"\n");
    jbiz.exit();
}

function onUpdate()
{
    print("TIMER TABLE UPDATE")
}


