var print = jbiz.writeLine

var recordingTable = dataModel.de.loewe.sl2.table.directory
var volumeTable = dataModel.de.loewe.sl2.volume.table.main
var copyAction = dataModel.de.loewe.sl2.timer.list.entry.add.copy.instruction
copyAction.onResult.connect(this, onCopyActionResult)


function onCopyActionResult(actionCallId, results){
    print("onCopyActionResult: (id: "+ actionCallId+" arg count: "+ results.length +")", 1 ,31,0);
    jbiz.exit()

}


copyAction.call(['04 НТВ Москва. Три вокзала-6',
                  'UUID_HDR_6ce8c9ae-338c-429e-ae30-84d0d65deabc_00000032', 
                  'FSL2://753A-965D',
                  "DR+",
                  'Feat.Drive', '', '1'])

