core.Class("core.mvc.Event",
{
  pooling : true,
  include : [core.event.MDispatchable],
  implement : [core.event.IEvent],

  construct : function(type, model) 
  {
    this.__type = type;
    this.__model = model;
  },

  members :
  {
    getModel : function() {
      return this.__model;
    },

    // Interface implementation
    getType : function() {
      return this.__type;
    }
  }
});
