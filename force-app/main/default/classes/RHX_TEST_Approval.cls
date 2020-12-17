@isTest(SeeAllData=true)
public class RHX_TEST_Approval {
	static testMethod void RHX_Testmethod() {
        List<sObject> sourceList = [SELECT Id 
			FROM Approval__c LIMIT 1];
        if(sourceList.size() == 0) {
            sourceList.add(
                    new Approval__c()
            );
        }
    	rh2.ParentUtil.UpsertRollupTestRecords( sourceList );
    }
}