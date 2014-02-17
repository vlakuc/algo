// USB medium accepted from targe

var scanSource = dataModel.de.loewe.sl2.i32.channel.search.source;
var scanFrequency = dataModel.de.loewe.sl2.i32.search.frequency;
var scanLowBand = dataModel.de.loewe.sl2.i32.search.frequency.low;
var scanHighBand = dataModel.de.loewe.sl2.i32.search.frequency.high;
var location = dataModel.de.loewe.sl2.datetime.timezone;
var selectableScrambled = dataModel.de.loewe.sl2.i32.channel.search.scrambling.selectable;
var scrambled = dataModel.de.loewe.sl2.i32.channel.search.scrambled;
var selectableNetworkID = dataModel.de.loewe.sl2.i32.channel.search.networkid.selectable;
var acceptNerworkLCN = dataModel.de.loewe.sl2.i32.channel.search.lcn.accepted;
// and so on to get all setting of scaning


var deleteServiceList = dataModel.de.loewe.sl2.table.servicelist.list.clear;
// find variable to verify that services is deleted
var startSearch = dataModel.de.loewe.sl2.action.channel.search.initial.search;
var searchingState = dataModel.de.loewe.sl2.i32.channel.search.searching.progress;
var sortingState = dataModel.de.loewe.sl2.i32.channel.search.sorting.progress;
var servicesFound = dataModel.de.loewe.sl2.i32.channel.search.found.services;
var radioServicesFound = dataModel.de.loewe.sl2.i32.channel.search.found.radio.services;

var print = jbiz.writeLine;
var mainInterval = 500;
var i_startSearch=0;
var i_searchProcess=0;
var i_startSort=0;
var i_sortProcess=0;
var i_scanFinCheck=0;
var i_scanProcessCheck=0;

var STATE = {
  INITIAL : {value: 1, name: "Initila state"},
	SERVICES_DELETED : {value: 2, name: "All services are deleted"},
	SCAN_STARTED : {value: 3, name: "scan started"},
	SCAN_NOT_STARTED : {value: 4, name: "scan not started"},
	SEARCH_IS_ON : {value: 5, name: "Scaning process is on"},
	SORT_IS_ON : {value: 6, name: "Sorting process is on"},
  SORT_IS_FINISHED : {value: 7, name: "Package is found"},
  EXIT : {value: 8, name: "Stop"},

};


function getSearchingState(){	
	var searchState = searchingState.getValue();
	window.searchState = searchState;
}


function getSortingState(){	
	var sortState = sortingState.getValue();
	window.sortState = sortState;
}


function getScanFrequency (){
	var frequency = scanFrequency.getValue();
	print("Frequency:" +frequency +"MHz")
}

function getScrambled (){
	var isscrambled = scrambled.getValue();
	if (isscrambled == 1){
	print("Scrambled services included: YES")
 	}else{
	print("Scrambled services included: NO")
	}

}

function getAcceptLCN (){
	var lcn = acceptNerworkLCN .getValue();
	if (lcn == 1){
	print("LCN acceppted: YES")
 	}else{
	print("LCN acceppted: NO")
	}
}


function getScanSource(){	
	var source = scanSource.getValue();
		if (source == 12 || source == 13 || source == 10 || source == 11)
			switch(source)
			{	case 10:
				print("Front-end: ANALOG")
				break
				case 11:
				print("Front-end: DVBT")
				break
				case 12:
				print("Front-end: DVBC")
				break
				case 13:
				print("Front-end: DVBS front-end will be scaned")
			  break
			}
		else
	    	{
				print("Unexpected value for scan source -" +source +". Test will be terminated to prevent executing the illegal operations ")
				currentState = STATE.EXIT
	    	}
}

function ifScanStarted(){	
		getSearchingState()
	if(inSearchState != searchState){
	window.previousSearchState = searchState;
	currentState = STATE.SCAN_STARTED
	}
}

function ifScanIsOn(){	
	getSearchingState()
	if (previousSearchState != searchState){
	print("Scaning is on, current state is " +searchState)
	previousSearchState = searchState
// zeroing of previosly scan stop cheking
	window.i_scanProcessCheck = i_scanProcessCheck+1
	i_scanFinCheck = 0
 	}else{
	window.i_scanFinCheck = i_scanFinCheck+1;
	ifSortStarted()
	}
}


function ifSortStarted(){	
		getSortingState()
		if (previousSortState != sortState){
		if (sortState !=0){
		print("Sorting is on, current sorting stutus is " +sortState)}
		previousSortState = sortState
		if(sortState != 0 ){
		currentState = STATE.SORT_STARTED
		}
	}
}


var currentState = STATE.INITIAL;
setInterval(function(){ main() }, mainInterval)

function main(){
	switch(currentState)
	{
		case STATE.INITIAL:
			getSearchingState()
			window.inSearchState = searchState;
			getSortingState()
			window.inSortingState = sortState;
			window.previousSortState = inSortingState;
			print("Current Scan Settings:")
			getScanSource()
			getScanFrequency()
			getScrambled()
			getAcceptLCN()
			print("------------------------")
//add other scan parameters
			deleteServiceList.call()
			print("Services are deleted from lists")
//	add verification	isListDeleted()
     	currentState = STATE.SERVICES_DELETED
    	break
		case STATE.SERVICES_DELETED:
			startSearch.call()
			ifScanStarted()
    	break
		case STATE.	SCAN_NOT_STARTED:
    	if (i_startSearch < 120)
    	{
        i_startSearch = i_startSearch+1
				print(i_startSearch)
				ifScanStarted()
    	}
    	else
    	{
				print("Scan is not started during 1 min")
       	currentState = STATE.EXIT
    	}
			break

		case STATE.SCAN_STARTED:
    	if (i_scanProcessCheck < 1200 && i_scanFinCheck< 360 )
    	{
				ifScanIsOn()
    	}
    	else
    	{
    	if (i_scanProcessCheck == 1200){
				print("Scaning is not finished during 10 min test will be termanated for malual verification"+ i_scanProcessCheck)}
    	if (i_scanFinCheck == 360){
				print("Scaning is finished but sorting is not started in next 3 min")}
       	currentState = STATE.EXIT
    	}
			break
    	break



		case STATE.	SORT_STARTED:
    	if (i_sortProcess < 360)
    	{
				i_sortProcess = i_sortProcess+1
				getSortingState()
		    	if (sortState = 100){
				print("Sorting is fineshed")
       	currentState = STATE.SORT_IS_FINISHED
		    	}
		    	else {
				print("Sorting is not fineshed during 3 min")
       	currentState = STATE.EXIT
    			}
		}
			break


		case STATE.SORT_IS_FINISHED:
		var numberServices = servicesFound.getValue()
		var numberRadioServices = radioServicesFound.getValue()
			print("During scanind " +numberServices +" TV services and " +numberRadioServices +" Radio services were found.")
       currentState = STATE.EXIT
    	break


		case STATE.EXIT:
			jbiz.exit()
    	break
}
}