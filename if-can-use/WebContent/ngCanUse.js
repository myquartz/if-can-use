/*
 * ifCanUse Angular JS Module Release 2
 * Changes: 
 *	- Edge supported
 *
 * Copyright 2015 Tran Thach Anh <thachanh@esi.vn>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

angular.module('ifCanUse', [])
.factory('browserDetection',[function() {
	var ua  = navigator.userAgent;
	agl = {};

	agl.MOBILE=(0<=ua.search(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry/i))
			||(0<=ua.search(/iemobile|ip(hone|od)|kindle|lge |midp|opera m(ob|in)i|palm( os)?/i))
			||(0<=ua.search(/phone|p(ixi|re)\/|pocket|psp|series(4|6)0|up\.(browser|link)/i))
			||(0<=ua.search(/wap|windows (ce|phone)|xda|xiino/i));

    agl.IsFF  = ua.indexOf('Firefox') != -1;
    if(agl.IsFF)
    	agl.FFVER  = ua.substring(ua.indexOf('Firefox')+1,2);
    agl.IsOPERA  = ua.indexOf('Opera') != -1;
	agl.IsEDGE  = ua.indexOf('Edge') != -1;
	agl.IsEDGE12  = ua.indexOf('Edge/12') != -1;
    agl.IsCHROME = ua.indexOf('Chrome') != -1 && !agl.IsEDGE;
    agl.IsSAFARI = ua.indexOf('Safari') != -1 && !agl.IsCHROME;
    agl.IsWEBKIT = ua.indexOf('WebKit') != -1;

    agl.IsIE   = ua.indexOf('Trident') > 0 || navigator.userAgent.indexOf('MSIE') > 0;
    agl.IsIE6  = ua.indexOf('MSIE 6') > 0;
    agl.IsIE7  = ua.indexOf('MSIE 7') > 0;
    agl.IsIE8  = ua.indexOf('MSIE 8') > 0;
    agl.IsIE9  = ua.indexOf('MSIE 9') > 0;
    agl.IsIE10 = ua.indexOf('MSIE 10') > 0;
    agl.IsOLD  = agl.IsIE6 || agl.IsIE7 || agl.IsIE8; // MUST be here

    agl.IsIE11UP = ua.indexOf('MSIE') == -1 && ua.indexOf('Trident') > 0;
    agl.IsIE10UP = agl.IsIE10 || agl.IsIE11UP;
    agl.IsIE9UP  = agl.IsIE9 || agl.IsIE10UP;
    return agl;
}])
.factory('ifCanUse',['browserDetection',function(br) {
	var useDate = (br.IsCHROME || br.IsOPERA || (br.IsSAFARI && br.MOBILE));
	return {
		//html5 feature
		inputDate: useDate || br.IsEDGE,
		inputDatetime: useDate || (br.IsEDGE && !br.IsEDGE12),
		inputTime: useDate || (br.IsEDGE && !br.IsEDGE12),
		elmDatalist: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsIE10UP || br.IsEDGE),
		elmPicture: (br.IsCHROME || br.IsOPERA || (br.IsFF && br.FFVER>=38) || (br.IsEDGE && !br.IsEDGE12)),
		attrSrcset: (br.IsCHROME || br.IsOPERA || (br.IsFF && br.FFVER>=38) || br.IsSAFARI || (br.IsEDGE && !br.IsEDGE12)),
		PNGIcon: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE11UP || br.IsEDGE),
		attrDownload: (br.IsCHROME || br.IsOPERA || br.IsFF || (br.IsEDGE && !br.IsEDGE12)),
		//js features
		jsFile: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE),
		jsFileReader: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE),
		jsBlob: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE),
		jsIndexedDB: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE),
		jsCryptography: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE11UP || br.IsEDGE),
		jsNotifications: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI),
		jsWebSocket: (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE),
	}
}])
.directive('hideIfCanUse', ['ifCanUse',function(br) {

  return {
	restrict: 'A',
	transclude: false,
	bindToController: false,
	scope: false,
	compile: function(element, attrs) {
        // do one-time configuration of element.

        var linkFunction = function($scope, element, atttributes) {
            // bind element to data in $scope
        }
        var f = attrs.hideIfCanUse;
        if((f=='date' && br.inputDate)
        	|| (f=='datetime' && br.inputDatetime)
        	|| (f=='time' && br.inputTime)
        	|| (f=='datalist' && br.elmDatalist)
        	|| (f=='picture' && br.elmPicture)
        	|| (f=='srcset' && br.attrSrcset)
        	|| (f=='pngicon' && br.PNGIcon)
        	|| (f=='download' && br.attrDownload)
        	|| (f=='file' && br.jsFile)
        	|| (f=='filereader' && br.jsFileReader)
        	|| (f=='blog' && br.jsBlob)
        	|| (f=='indexeddb' && br.jsIndexedDB)
        	|| (f=='cryptography' && br.jsCryptography)
        	|| (f=='notifications' && br.jsNotifications)
        	|| (f=='websocket' && br.jsWebSocket))
        	for(var i=0;i<element.length;i++) {
        		console.log('hideIfCanUse element '+element[i]);
        		angular.element(element[i]).remove();
        	}

        return linkFunction;
    },
  };
}])
.directive('showIfCanUse', ['ifCanUse',function(br) {

  return {
	restrict: 'A',
	transclude: false,
	bindToController: false,
	scope: false,
	compile: function(element, attrs) {
        // do one-time configuration of element.

        var linkFunction = function($scope, element, atttributes) {
            // bind element to data in $scope
        }
        var f = attrs.																																								showIfCanUse;
        if(!((f=='date' && br.inputDate)
        	|| (f=='datetime' && br.inputDatetime)
        	|| (f=='time' && br.inputTime)
        	|| (f=='datalist' && br.elmDatalist)
        	|| (f=='picture' && br.elmPicture)
        	|| (f=='srcset' && br.attrSrcset)
        	|| (f=='pngicon' && br.PNGIcon)
        	|| (f=='download' && br.attrDownload)
        	|| (f=='file' && br.jsFile)
        	|| (f=='filereader' && br.jsFileReader)
        	|| (f=='blog' && br.jsBlob)
        	|| (f=='indexeddb' && br.jsIndexedDB)
        	|| (f=='cryptography' && br.jsCryptography)
        	|| (f=='notifications' && br.jsNotifications)
        	|| (f=='websocket' && br.jsWebSocket)))
        	for(var i=0;i<element.length;i++) {
        		console.log('showIfCanUse element '+element[i]);
        		angular.element(element[i]).remove();
        	}

        return linkFunction;
    },
  };
}]);