 
 describe("LibraryBookApp", function() {
  it("book", function(){
  	var c = new LibraryBookApp();
 
  		for(var i=0; i<10;i++)
  		{ 
  			console.log(Object.keys(localStorage).length);
		  	if(Object.keys(localStorage).length>=10)
  			{
  				break;
  			}
  			c.mockData({name: faker.lorem.words(), author: faker.name.firstName()+' '+faker.name.lastName(), category: ""+(Math.floor(Math.random() * 3) + 1)+""  , codebook: faker.random.number(), disponibility:  ""+Math.floor(Math.random() * 2) +"" }); 
		}

 
  });
});