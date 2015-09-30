var print = jbiz.writeLine;

var addCopy = dataModel.de.loewe.sl2.timer.list.entry.add.copy.instruction


// biz[727]: [14648.854517] INF: timerlist-biz: {
// biz[727]: [14648.854602] INF: timerlist-biz:   Argument[0]: 'ZDF HD hallo deutschland'
// biz[727]: [14648.854687] INF: timerlist-biz:   Argument[1]: 'UUID_HDR_46173421-5dbb-4358-b36a-e896f91b2dec_00000021'
// biz[727]: [14648.854765] INF: timerlist-biz:   Argument[2]: 'FSL2://2625-62CE'
// biz[727]: [14648.854844] INF: timerlist-biz:   Argument[3]: 'DR+'
// biz[727]: [14648.854920] INF: timerlist-biz:   Argument[4]: 'USB1'
// biz[727]: [14648.855611] INF: timerlist-biz: }


//biz[727]: [16102.157591] INF: timerlist-biz:   Argument[0]: 'Das Erste HD Brisant'
//biz[727]: [16102.157718] INF: timerlist-biz:   Argument[1]: 'UUID_HDR_46173421-5dbb-4358-b36a-e896f91b2dec_00000022'
//biz[727]: [16102.157800] INF: timerlist-biz:   Argument[2]: 'FSL2://2625-62CE'
//biz[727]: [16102.157877] INF: timerlist-biz:   Argument[3]: 'DR+'
//biz[727]: [16102.157953] INF: timerlist-biz:   Argument[4]: 'USB1'
//biz[727]: [16102.158030] INF: timerlist-biz: }



// Start execution


addCopyTask()

function addCopyTask() {
    addCopy.call(["ZDF HD hallo deutschland",
                    "UUID_HDR_46173421-5dbb-4358-b36a-e896f91b2dec_00000021",
                    "FSL2:\/\/2625-62CE",
                    "DR+",
                    "USB1"
                   ])
    addCopy.call(["Das Erste HD Brisant",
                    "UUID_HDR_46173421-5dbb-4358-b36a-e896f91b2dec_00000022",
                    "FSL2:\/\/2625-62CE",
                    "DR+",
                    "USB1"
                   ])
	 jbiz.exit()
}
