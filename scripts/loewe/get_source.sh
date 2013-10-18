#!/bin/bash

#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/trunk codebase2011_trunk 
#svn co https://develop.loewe.de/svn/tvsoft/external/com/stm CODEBASE_STM
#svn co https://develop.loewe.de/svn/tvsoft/external/oss CODEBASE_OSS
#svn co https://develop.loewe.de/svn/tvsoft/external/com/stm/stbsp-sl2-m25 CODEBASE_BSP
#svn co https://develop.loewe.de/svn/tvsoft/external/oss/gpl/linux-sh4-2.6.32.46_stm24_0209 CODEBASE_KERNEL
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/application_cw44 codebase2011_application_cw44
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V1.9.X_CW47/ codebase2011_1_9
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/application_domain_cw49/ codebase2011_application_domain_cw49
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/tags/SL2xx/V1.8.0.0 codebase2011_V1.8.0.0
#svn co -r265245 https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V1.10.X_CW02 codebase2011_V1.10.X_CW02_265245
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V1.11.X_CW07 codebase2011_V1.11.X_CW07
#svn co -r 279312 https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/application_domain_cw03/ codebase2011_application_domain_cw03_r279312 
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.0.X_CW13 codebase2011_V2.0.X_CW13
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/application_domain_cw03_vkuchuk_CRID codebase2011_CRID
#svn co -r305869  https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_CW16 codebase2011_305869
#svn co -r328213 https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_CW16 codebase2011_after_crid
#svn co -r328211 https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_CW16 codebase2011_before_crid
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/easyexp
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_stab_CW26
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/domain/nordig.V2.1.X_CW16.323697.20130520.1 nordig_2_1_x
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_CW16 codebase2011_V2.1.X_CW16_VANILLA
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.1.X_CW16 codebase2011_double_rec_V2.1.X_CW16
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.1.X_stab_CW28 codebase2011_V2.1.X_stab_CW28
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.2.X_CW40 codebase2011_V2.2.X_CW40
#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/develop/feature/double_rec_V2.3.X_CW40 codebase2011_double_rec_V2.3.X_CW40

#svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL1/develop/stabilization1 SL1_develop_stabilization1

svn co https://develop.loewe.de/svn/tvsoft/codebase2011/branches/SL2xx/release/V2.3.X_CW40 codebase2011_V2.3.X_CW40_VANILLA

notify-send "Checkout finished!"
