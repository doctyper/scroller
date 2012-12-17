var suite = new core.test.Suite("Jasy/Asset");

suite.test("Adding Source Data", function() 
{
  this.raises(function() 
  {
    jasy.Asset.resetData();
    jasy.Asset.toUri("my.png")
  });

  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"u":"asset/my.png","p":0}
    }, 
    "profiles" : [{name:"source"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "asset/my.png");

  
  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"u":"asset/my.png","p":0}
    }, 
    "profiles" : [{name:"source", "root":"xxx/yyy/"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "xxx/yyy/asset/my.png");


  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"u":"asset/my.png","p":0}
    }, 
    "profiles" : [{name:"source", "root":"http://mycdn.com/xxx/yyy/"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "http://mycdn.com/xxx/yyy/asset/my.png");
  
  
  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "lib2" : {
        "my.png" : {"u":"../../lib2/asset/my.png","p":0}
      }
    }, 
    "profiles" : [{name:"source", "root":"http://mycdn.com/app/source/"}]
  });
  this.equal(jasy.Asset.toUri("lib2/my.png"), "http://mycdn.com/app/source/../../lib2/asset/my.png");

});


suite.test("Adding Build Data", function() 
{
  this.raises(function() {
    jasy.Asset.resetData();
    jasy.Asset.toUri("my.png")
  });

  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"p":0}
    }, 
    "profiles" : [{name:"build", "root":"asset/"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "asset/my.png");

  
  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"p":0}
    }, 
    "profiles" : [{name:"build", "root":"xxx/yyy/asset/"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "xxx/yyy/asset/my.png");


  jasy.Asset.resetData();
  jasy.Asset.addData(
  {
    "assets" : {
      "my.png" : {"p":0}
    }, 
    "profiles" : [{name:"build", "root":"http://mycdn.com/xxx/yyy/asset/"}]
  });
  this.equal(jasy.Asset.toUri("my.png"), "http://mycdn.com/xxx/yyy/asset/my.png");
  
});
  
