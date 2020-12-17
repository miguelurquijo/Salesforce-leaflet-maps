/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
@IsTest
private class dlrs_Opportunity_in_CampaignTest
{
    @IsTest
    private static void testTrigger()
    {
        // Force the dlrs_Opportunity_in_CampaignTrigger to be invoked, fails the test if org config or other Apex code prevents this.
        dlrs.RollupService.testHandler(new Opportunity_in_Campaign__c());
    }
}