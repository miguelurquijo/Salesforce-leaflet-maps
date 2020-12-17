/********************
Created BY : SK 
Last Modified : 11/16/2020 
***********/
@isTest(SeeAllData=false)
private class memberTasksV2ControllerTest {
   
    @TestSetup
    static void insertFileds() {  
        Account a = new Account( Name = 'TestAccount');
        insert a;
        
        Contact c = new Contact(
            AccountId = a.Id,
            FirstName = 'test',
            LastName = 'test',
            email = 'test@test.com'
        );
        insert c;   
        system.debug(' ***** c ' + c);
        
        Campaign testInvestmentCampaign = new Campaign(
            Name = 'Investment Campaign Test 1',
            Status = '5. Dilligence & Drafting'
        );
        insert testInvestmentCampaign;
        system.debug(' ***** testInvestmentCampaign ' + testInvestmentCampaign);
        
        
        CampaignMember memberTest = new CampaignMember(
            ContactId = c.Id,
            CampaignId = testInvestmentCampaign.Id
        );
        insert memberTest;     
        system.debug(' ***** memberTest  ****** ' + memberTest );
        
        
        MemberTask__c taskTest = new MemberTask__c(
            Task_name__c = 'Task 1',
            Task_status__c = 'Pending',
            Due_Date__c = System.today().addDays(30),
            Assignee__c = 'test@fake.com',
            Investment_Campaign__c = testInvestmentCampaign.Id,
            Contact__c = c.Id
        );
        insert taskTest;
        
        system.debug(' **** taskTest * ' + taskTest );
    }
    
    
    @isTest
    static void getTasks() {
    
        Campaign investmentCampaign = [SELECT Id, Name, Status FROM Campaign limit 1];
        
        
        MemberTask__c tasks = [SELECT Id, Task_name__c, Task_status__c, Due_Date__c, Contact__r.Name, Investment_Campaign__c, Assignee__c
                FROM MemberTask__c WHERE Investment_Campaign__c = :investmentCampaign.Id
                ORDER BY Due_Date__c Limit 1];
       list <MemberTask__c> tasksUp = new list <MemberTask__c>();
       tasksUp.add(tasks);
       
       CampaignMember memberObj = [Select Id, ContactId from CampaignMember limit 1 ];         
        
        Test.startTest();
             // list<MemberTask__c> tasksList = memberTasksV2Controller.fetchtasks(tasks.Id);
             
            memberTasksV2Controller.fetchtasks(memberObj.Id);
            memberTasksV2Controller.updateTasks(tasksUp);
        Test.stopTest();
       // System.assertNotEquals(1, tasks.size());

    }
}