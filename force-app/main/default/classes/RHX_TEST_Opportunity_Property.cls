@isTest(SeeAllData=true)
public class RHX_TEST_Opportunity_Property {
	static testMethod void RHX_Testmethod() {
        List<sObject> sourceList = [SELECT Id 
			FROM Opportunity_Property__c LIMIT 1];
        if(sourceList.size() == 0) {
            sourceList.add(
                    new Opportunity_Property__c()
            );
        }
    	rh2.ParentUtil.UpsertRollupTestRecords( sourceList );
    }
}