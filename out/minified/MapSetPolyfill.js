!function(){"use strict";function t(t,r){function i(t){return this&&this.constructor===i?(this._keys=[],this._values=[],this.objectOnly=r,void(t&&e.call(this,t))):new i(t)}return r||g(t,"size",{get:d}),t.constructor=i,i.prototype=t,i}function e(t){this.add?t.forEach(this.add,this):t.forEach(function(t){this.set(t[0],t[1])},this)}function r(t){return this.has(t)&&(this._keys.splice(m,1),this._values.splice(m,1)),m>-1}function i(t){return this.has(t)?this._values[m]:void 0}function o(t,e){if(this.objectOnly&&e!==Object(e))throw new TypeError("Invalid value used as weak collection key");if(e!=e||0===e)for(m=t.length;m--&&!y(t[m],e););else m=t.indexOf(e);return m>-1}function n(t){return o.call(this,this._values,t)}function a(t){return o.call(this,this._keys,t)}function s(t,e){return this.has(t)?this._values[m]=e:this._values[this._keys.push(t)-1]=e,this}function h(t){return this.has(t)||this._values.push(t),this}function u(){this._values.length=0}function c(){return this._values.slice()}function l(){return this._keys.slice()}function d(){return this._values.length}function p(t,e){var r=this,i=r._values.slice();r._keys.slice().forEach(function(o,n){t.call(e,i[n],o,r)})}function f(t,e){var r=this;r._values.slice().forEach(function(i){t.call(e,i,i,r)})}Object.is||(Object.is=function(t,e){return 0===t&&0===e?1/t===1/e:t!==t?e!==e:t===e});var m,g=Object.defineProperty,y=Object.is;window.Set||(window.Map=t({"delete":r,has:a,get:i,set:s,keys:l,values:c,forEach:p,clear:u}),window.Set=t({has:n,add:h,"delete":r,clear:u,values:c,forEach:f}))}();