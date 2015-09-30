  // var act = dataModel.de.loewe.sl2.action.remoterec.checkEmail
  // var type = dataModel.de.loewe.sl2.i32.remoterec.email.configurationType

var valEnabled = dataModel.de.loewe.sl2.i32.remoterec.enabled
valEnabled.setValue(0)
var valTest = dataModel.de.loewe.sl2.i32.remoterec.test.perform
valTest.setValue(0)
var valReset = dataModel.de.loewe.sl2.i32.remoterec.reset
valReset.setValue(1)
valEnabled.setValue(1)
jbiz.exit()

// # Disable mobile recording
// mr = self.tvm.SetIntValue("de.loewe.sl2.i32.remoterec.enabled", 0)
// time.sleep(3)

// # Stop test
// mr = self.tvm.SetIntValue("de.loewe.sl2.i32.remoterec.test.perform", 0)
// time.sleep(3)

// # Reset mobile recording settings
// mr = self.tvm.SetIntValue("de.loewe.sl2.i32.remoterec.reset", 1)
// time.sleep(5)

// # Activate mobile recording
// mr = self.tvm.SetIntValue("de.loewe.sl2.i32.remoterec.enabled", 1)
// time.sleep(3)

//   setInterval(function(){

//      var typeVal = type.getValue()
//      if (typeVal == 1)
//      {
//           type.setValue(0)
//      } else
//      {
//           type.setValue(1)
//      }
//      act.call()

//   }, 1000)
