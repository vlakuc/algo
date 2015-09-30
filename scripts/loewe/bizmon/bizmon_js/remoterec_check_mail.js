  var act = dataModel.de.loewe.sl2.action.remoterec.checkEmail
  var type = dataModel.de.loewe.sl2.i32.remoterec.email.configurationType
  
  setInterval(function(){

     var typeVal = type.getValue()
     if (typeVal == 1)
     {
          type.setValue(0)
     } else
     {
          type.setValue(1)
     }
     act.call()

  }, 1000)