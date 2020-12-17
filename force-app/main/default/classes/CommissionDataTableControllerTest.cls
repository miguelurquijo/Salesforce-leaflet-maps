@isTest
private class CommissionDataTableControllerTest {
    
    @TestSetup
    static void makeData() {
        Opportunity testOppty = new Opportunity(
            Name = 'Test Opportunity',
            StageName = 'Early Stage',
            Probability = 30,
            CurrencyIsoCode = 'USD',
            CloseDate = System.today().addDays(30)
        );
        insert testOppty;
        
        Commission__c testCommission = new Commission__c(
            Related_Opportunity__c = testOppty.Id,
            CurrencyIsoCode = 'USD',
            Status__c = 'New',
            GTS__c = 100000,
            BSLA__c = 100,
            ODLA__c = System.today().addDays(30),
            Y1BLA__c = 100,
            BSA__c = 90,
            ODA__c = System.today().addDays(120),
            DBA__c = 1000,
            Y1BA__c = 100,
            DL__c = 20,
            DM__c = 40,
            DT__c = 60,
            DASL__c = 8,
            DASM__c = 16,
            DAST__c = 24,
            LTSL__c = 4,
            LTSM__c = 8,
            LTST__c = 12,
            RGSL__c = 2,
            RGSM__c = 4,
            RGST__c = 6,
            VPL__c = 6,
            VPRM__c = 12,
            VPRT__c = 18,
            TPM__c = 1000,
            MM__c = 999,
            MIW__c = 500,
            LMA__c = 499,
            LOM__c = 0,
            CB__c = 40,
            HB__c = 20,
            PB__c = 40
        );
        insert testCommission;
        
        List<Opportunity_Commissions__c> testOpptyComms = new List<Opportunity_Commissions__c>();
        
        Opportunity_Commissions__c testOpptyComm1 = new Opportunity_Commissions__c(
            Opportunity__c = testOppty.Id,
            Commission_request__c = testCommission.Id,
            CurrencyIsoCode = 'USD',
            Role_Type__c = 'Director',
            Commission_Type__c = 'Performance',
            Value_per_Bed_Space__c = 24,
            Commission_Due_2__c = 1600,
            Status__c = 'Requested'
        );
        testOpptyComms.add(testOpptyComm1);
        
        Opportunity_Commissions__c testOpptyComm2 = new Opportunity_Commissions__c(
            Opportunity__c = testOppty.Id,
            Commission_request__c = testCommission.Id,
            CurrencyIsoCode = 'USD',
            Role_Type__c = 'Director',
            Commission_Type__c = 'Closing',
            Value_per_Bed_Space__c = 24,
            Commission_Due_2__c = 1200,
            Status__c = 'Requested'
        );
        testOpptyComms.add(testOpptyComm2);
        
        insert testOpptyComms;
    }
    
    @isTest
    static void getCommissionsTest() {
        Opportunity oppty = [SELECT Id, Name FROM Opportunity WHERE Name LIKE 'Test Opportunity' LIMIT 1];
        Commission__c commission = [SELECT Id FROM Commission__c WHERE Related_Opportunity__c = :oppty.Id LIMIT 1];
        Test.startTest();
        List<Opportunity_Commissions__c> opptyComms = CommissionDataTableController.fetchCommisions('Closing', commission.Id);
        Test.stopTest();
        System.assertNotEquals(0, opptyComms.size());
    }
    
    @isTest
    static void getTotalsTest() {
        Opportunity oppty = [SELECT Id, Name FROM Opportunity WHERE Name LIKE 'Test Opportunity' LIMIT 1];
        Commission__c commission = [SELECT Id FROM Commission__c WHERE Related_Opportunity__c = :oppty.Id LIMIT 1];
        Test.startTest();
        List<AggregateResult> totals = CommissionDataTableController.fetchTotals('Performance', commission.Id);
        Test.stopTest();
        System.assertNotEquals(0, totals.size());
    }
    
    @isTest
    static void updateCommissionsTest() {
        Opportunity oppty = [SELECT Id, Name FROM Opportunity WHERE Name LIKE 'Test Opportunity' LIMIT 1];
        Commission__c commission = [SELECT Id FROM Commission__c WHERE Related_Opportunity__c = :oppty.Id LIMIT 1];
        Opportunity_Commissions__c opptyComm = [SELECT Id, Commission_request__c FROM Opportunity_Commissions__c WHERE Commission_request__c = :commission.Id LIMIT 1];
        
        List<Opportunity_Commissions__c> opptyComms = new List<Opportunity_Commissions__c>();
        opptyComm.Comments__c = 'Just adding a comment';
        opptyComms.add(opptyComm);
        
        Test.startTest();
        CommissionDataTableController.updateCommission(opptyComms);
        Test.stopTest();
    }
}