var suite = new core.test.Suite("Events", null, function() {
  core.Main.clearNamespace("events.Simple1");
  core.Main.clearNamespace("events.Simple2");
  core.Main.clearNamespace("events.Simple3");
  core.Main.clearNamespace("events.Simple4");
  core.Main.clearNamespace("events.Simple5");
  core.Main.clearNamespace("events.Simple6");
  core.Main.clearNamespace("events.Simple7");
  core.Main.clearNamespace("events.Simple8");
  core.Main.clearNamespace("events.Simple9");
});

suite.test("Basic", function() 
{
  var test = this;

  core.Class("events.Simple1", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testBasic : function() 
      {
        var eventExecuted = 0;
        this.addListener("simple1", function() {
          eventExecuted++;
        });

        this.fireEvent("simple1");
        test.equal(eventExecuted, 1);

        this.fireEvent("simple1");
        this.fireEvent("simple1");
        test.equal(eventExecuted, 3);
      }
    }
  });

  new events.Simple1().testBasic();
});

suite.test("Context", function() 
{
  var test = this;
  
  core.Class("events.Simple2", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testContext : function() 
      {
        var contextObject = {valid : 1};

        this.addListener("simple2", function() {
          test.equal(this.valid, 1);
        }, contextObject);

        this.fireEvent("simple2");
      }
    }
  });

  new events.Simple2().testContext();
});

suite.test("Deconnect", function() 
{
  var test = this;

  core.Class("events.Simple4", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testDeconnect : function() {

        var eventExecuted = 0;
        var myListener = function() {
          eventExecuted++;
        };

        this.addListener("simple4", myListener);

        this.fireEvent("simple4");
        test.equal(eventExecuted, 1);

        this.removeListener("simple4", myListener);

        test.equal(eventExecuted, 1);
        this.fireEvent("simple4");
        test.equal(eventExecuted, 1);

        test.equal(this.addListener("simple4", myListener), true);
        test.equal(this.addListener("simple4", myListener), false);
        test.equal(this.addListener("simple4", myListener), false);

        this.fireEvent("simple4");
        test.equal(eventExecuted, 2);

        test.equal(this.removeListener("simple4", myListener), true);
        test.equal(this.removeListener("simple4", myListener), false);
      }
    }
  });

  new events.Simple4().testDeconnect();
});

suite.test("Has", function() 
{
  var test = this;

  core.Class("events.Simple5", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testHasListener : function() {

        var myListener = function() {};
        var myHelperObject = {};

        test.equal(this.hasListener("simple5"), false);
        this.addListener("simple5", myListener);
        test.equal(this.hasListener("simple5"), true);
        test.equal(this.hasListener("simple5", myListener), true);
        test.equal(this.hasListener("simple5", myListener, myHelperObject), false);
        this.removeListener("simple5", myListener);

        test.equal(this.hasListener("simple5"), false);
        this.addListener("simple5", myListener, myHelperObject);
        test.equal(this.hasListener("simple5"), true);
        test.equal(this.hasListener("simple5", myListener), false);
        test.equal(this.hasListener("simple5", myListener, myHelperObject), true);
        this.removeListener("simple5", myListener, myHelperObject);

      }
    }
  });

  new events.Simple5().testHasListener();
});

suite.test("Connect While Fire", function() 
{
  var test = this;

  core.Class("events.Simple6", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testConnectWhileFire : function() {

        var count1 = 0;
        var count2 = 0;

        var myListener1 = function() {
          count1++;
        };

        var myListener2 = function() {
          count2++;
          this.addListener("simple6", myListener1);
        };

        this.addListener("simple6", myListener2);
        test.equal(count1, 0);
        test.equal(count2, 0);

        this.fireEvent("simple6");

        test.equal(count1, 0);
        test.equal(count2, 1);

        this.fireEvent("simple6");

        test.equal(count1, 1);
        test.equal(count2, 2);

      }
    }
  });

  new events.Simple6().testConnectWhileFire();
});

suite.test("Deconnect While Fire", function() 
{
  var test = this;

  core.Class("events.Simple7", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testDeconnectWhileFire : function() {

        var count1 = 0;
        var count2 = 0;

        var myListener1 = function() {
          count1++;
        };

        var myListener2 = function() {
          count2++;
          this.removeListener("simple7", myListener1);
        };

        this.addListener("simple7", myListener1);
        this.addListener("simple7", myListener2);

        test.equal(count1, 0);
        test.equal(count2, 0);

        this.fireEvent("simple7");

        test.equal(count1, 1);
        test.equal(count2, 1);

        this.fireEvent("simple7");

        test.equal(count1, 1);
        test.equal(count2, 2);

      }
    }
  });

  new events.Simple7().testDeconnectWhileFire();
});

suite.test("Deconnect Self", function() 
{
  var test = this;

  core.Class("events.Simple8", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testDeconnectSelf : function() {

        var count = 0;
        var myListener = function() {
          count++;
          this.removeListener("simple8", myListener);
        }

        this.addListener("simple8", myListener);
        test.equal(count, 0);

        this.fireEvent("simple8");
        test.equal(count, 1);

        this.fireEvent("simple8");
        test.equal(count, 1);

      }
    }
  });

  new events.Simple8().testDeconnectSelf();
});

suite.test("Listen Once", function() 
{
  var test = this;

  core.Class("events.Simple9", 
  {
    include : [core.event.MEvent],
    members : 
    {
      testListenOnce : function() {

        var count = 0;
        var myListener = function() {
          count++;
        }

        this.addListenerOnce("simple9", myListener);
        test.equal(count, 0);

        this.fireEvent("simple9");
        test.equal(count, 1);

        this.fireEvent("simple9");
        test.equal(count, 1);

      }
    }
  });

  new events.Simple9().testListenOnce();
});