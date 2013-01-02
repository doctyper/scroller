/*
==================================================================================================
  Core - JavaScript Foundation
  Copyright 2010-2012 Zynga Inc.
==================================================================================================
*/

(function() 
{
	var hexTable = "0123456789abcdef".split("");

	/**
	 * Adds useful non-standard extensions to the `String.prototype` like {#hyphenate}, {#startsWith} and {#contains}.
	 */
	core.Main.addMembers("String",
	{
		/**
		 * {String} Encodes the string as Base64.
		 *
		 * #require(ext.Base64)
		 */
		encodeBase64 : function() {
			return btoa(this);
		},
		

		/**
		 * {String} Decodes the string from Base64.
		 * 
		 * #require(ext.Base64)
		 */
		decodeBase64 : function() {
			return atob(this);
		},
		
		
		/**
		 * {String} Converts the string into a hex string
		 */
		toHex : function() 
		{
			var output = "";
			var code;

			for (var i = 0, l = this.length; i < l; i++)
			{
				code = this.charCodeAt(i);
				output += hexTable[(code >>> 4) & 0x0F] + hexTable[code & 0x0F];
			}

			return output;
		},

		
		/**
		 * {String} Encodes the string as UTF-8.
		 *
		 * Via: http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
		 */
		encodeUtf8 : function() {
			return unescape(encodeURIComponent(this));
		},
		
		
		/**
		 * {String} Decodes the string from UTF-8.
		 *
		 * Via: http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html
		 */
		decodeUtf8 : function() {
			return decodeURIComponent(escape(this));
		},


		/**
		 * Whether the string contains the given @substring {String}.
		 */
		contains : function(substring) {
			return this.indexOf(substring) != -1;
		},


		/**
		 * {Boolean} Returns true if the string has a length of 0 or contains only whitespace.
		 */
		isBlank : function() {
			return this.trim().length == 0;
		},


		/**
		 * {String} Reverses the string
		 */
		reverse : function() {
			return this.split("").reverse().join("");
		},


		/**
		 * {String} Removes double spaces and line breaks.
		 */
		compact : function() {
			return this.replace(/[\r\n]/g, " ").trim().replace(/([\s　])+/g, '$1');
		},


		/**
		 * {String} Returns a hyphenated copy of the original string e.g.
		 *
		 * - camelCase => camel-case
		 * - HelloWorld => -hello-world
		 */
		hyphenate : function() 
		{
			// Via: http://es5.github.com/#x15.5.4.11
			return this.replace(/[A-Z]/g,'-$&').toLowerCase();
		},


		/**
		 * {String} Camelizes this string.
		 */
		camelize : function ()
		{
			return this.replace(/\-+(\S)?/g, function(match, chr) {
				return chr ? chr.toUpperCase() : '';
			});
		},


		/**
		 * {String} Returns a new string which is a @nr {Integer} repeated copy of the original one.
		 */
		repeat : function(nr)
		{
			// Optimized by: http://jsperf.com/repeat-vs-repeat/3
			if (nr < 1) {
				return '';
			}
			
			var pattern = this;
			var result = "";
			while (nr > 0) 
			{
				if (nr & 1) {
					result += pattern;
				}
				
				nr >>= 1;
				pattern += pattern;
			}

			return result;
		},


		/**
		 * {Boolean} Returns `true` if this string starts with the given substring @begin {String}
		 */
		startsWith : function(begin) {
			return begin == this.slice(0, begin.length);
		},


		/**
		 * {Boolean} Returns `true` if this string ends with the given substring @end {String}
		 */
		endsWith : function(end) {
			return end == this.slice(-end.length);
		}
	});
	
})();

