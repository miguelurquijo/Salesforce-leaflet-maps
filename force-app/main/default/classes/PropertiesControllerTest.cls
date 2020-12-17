@isTest(SeeAllData=false)
public class PropertiesControllerTest {
    
    @TestSetup
    static void insertFileds() {  
        Lead P = new Lead ( 
            Title = 'Property 1',
            LastName = 'Preperty 1 LN'
        );
        insert P;

	}
    @isTest
    static void getProperties() 
    {
        
        Lead Properties = [SELECT Id, Name, Title
                          FROM Lead
                          LIMIT 1];
       
        
    System.Test.startTest();
        PropertiesController.getPropertyList(Properties.Id);
        
    System.Test.stopTest();
        
	}
}