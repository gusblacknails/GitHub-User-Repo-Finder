describe("requestData", function() {
  
  var gitHub, request;
  var onSuccess, onFailure;
  var textReturn= JSON.parse(TestResponses.search.success.responseText);
  

   beforeEach(function() {
      jasmine.Ajax.install();
      onSuccess = jasmine.createSpy('onSuccess');
      onFailure = jasmine.createSpy('onFailure');

      gitHub = new requestData();
      console.error(gitHub)
    //   gitHub.search(textReturn.id,{
    //   onSuccess: onSuccess,
    //   onFailure: onFailure
    // });
    request = jasmine.Ajax.requests.mostRecent();
    expect(request.url).toBe('https://api.github.com/users/gusblacknails/repos');
    expect(request.method).toBe('GET');
    // expect(request.data()).toEqual({id: 24783292});
    });
   afterEach(function() {
      jasmine.Ajax.uninstall();
    });
   describe("on success", function() {
    var reposReturn= JSON.parse(RepoResponses.search.success.responseText);
    console.log(reposReturn)
    beforeEach(function() {
      request.respondWith(reposReturn);
    });

    it("calls onSuccess with an array of repos", function() {
      expect(onSuccess).toHaveBeenCalled();

      var successArgs = onSuccess.calls.mostRecent().args[0];

      expect(successArgs.length).toEqual(1);
      expect(successArgs[0]).toEqual(jasmine.any(repos));
    });
  });
   
  it("requestData has to be defined", function (){
      expect(requestData).toBeDefined();
      })
  it("user has to be defined", function (){
      expect(requestData, "user").toBeDefined();
      })
  it("user_url has to be defined", function (){
      expect(requestData, "user_url").toBeDefined();
      })
  it("repos_url has to be defined", function (){
      expect(requestData, "repos_url").toBeDefined();
      })
  it("userCall has to be defined", function (){
      expect(requestData, "userCall").toBeDefined();
      })
  it("repoCall has to be defined", function (){
      expect(requestData, "repoCall").toBeDefined();
      })

  
})

  


 