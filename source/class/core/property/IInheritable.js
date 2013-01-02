/*
==================================================================================================
  Core - JavaScript Foundation
  Copyright 2010-2012 Zynga Inc.
==================================================================================================
*/

/**
 * For classes which use inheritable properties.
 */
core.Interface("core.property.IInheritable",
{
	members : 
	{
		/**
		 * {var} Returns the inherited value of the given @property {String}.
		 */
		getInheritedValue : function(property) {}
	}
});
