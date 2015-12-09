/*
 * ifCanUse jQuery PlugIns Release 1
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

(function ( $ ) {
	
	function browserDetection() {
		var ua  = navigator.userAgent;
		agl = {};

		agl.MOBILE=(0<=ua.search(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry/i))
				||(0<=ua.search(/iemobile|ip(hone|od)|kindle|lge |midp|opera m(ob|in)i|palm( os)?/i))
				||(0<=ua.search(/phone|p(ixi|re)\/|pocket|psp|series(4|6)0|up\.(browser|link)/i))
				||(0<=ua.search(/wap|windows (ce|phone)|xda|xiino/i));

		agl.IsFF  = ua.indexOf('Firefox') != -1;
		if(agl.IsFF)
			agl.FFVER  = parseInt(ua.substr(ua.indexOf('Firefox')+8,2));
		agl.IsOPERA  = ua.indexOf('Opera') != -1;
		agl.IsEDGE  = ua.indexOf('Edge') != -1;
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
		window.browserDetection = agl;
		return agl;
	}
	
	function canUse(types) {
		if (types.indexOf(',')>=0) {
			for (var type in types.split(',',6) )
				if(!canUse(type))
					return false;
			return true;
		}
		
		var br = window.browserDetection || browserDetection();
		switch(types.trim()) {
			//html5 feature
		case 'inputDate':
			return (br.IsCHROME || br.IsEDGE || br.IsOPERA || (br.IsSAFARI && br.MOBILE) || br.IsEDGE);
			
		case 'inputDatetime':
		case 'inputTime': 
			return (br.IsCHROME || br.IsEDGE || br.IsOPERA || (br.IsSAFARI && br.MOBILE) || (br.IsEDGE && !br.IsEDGE12));
			
		case 'elmDatalist': 
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsIE10UP || br.IsEDGE);
			
		case 'elmPicture':  
			return (br.IsCHROME || br.IsOPERA || (br.IsFF && br.FFVER>=38 || (br.IsEDGE && !br.IsEDGE12)));
			
		case 'attrSrcset':  
			return (br.IsCHROME || br.IsOPERA || (br.IsFF && br.FFVER>=38) || br.IsSAFARI || (br.IsEDGE && !br.IsEDGE12));
			
		case 'PNGIcon':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE11UP || br.IsEDGE);
			
		case 'attrDownload':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || (br.IsEDGE && !br.IsEDGE12));
			
		
		//js features
		case 'jsFile':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE);
			
		case 'jsFileReader':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE);
			
		case 'jsBlob':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE);
			
		case 'jsIndexedDB':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE);
			
		case 'jsCryptography':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE11UP || br.IsEDGE);
			
		case 'jsNotifications':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI);
			
		case 'jsWebSocket':  
			return (br.IsCHROME || br.IsOPERA || br.IsFF || br.IsSAFARI || br.IsIE10UP || br.IsEDGE);
			
		}
		return false;
	}
	
	$.fn.ifCanUse = function(types, fn) {
		if (!types || !canUse(types))
			return $(false); //empty list

		if (fn == null)
			return this;
		else
			return this.each(fn);
	};
	
	$.fn.ifCanNotUse = function(types, fn) {
		if (!types || canUse(types))
			return $(false); //empty list

		if (fn == null)
			return this;
		else
			return this.each(fn);
	};

	$.extend({
		canUse: canUse,
		ifCanUse: function(types,selector,fn) {
			if (!selector)
				return this;
			return $(selector).ifCanUse(types,fn);
		},
		ifCanNotUse: function(types,selector,fn) {
			if (!selector)
				return this;
			return $(selector).ifCanNotUse(types,fn);
		}
	});
}( jQuery ));