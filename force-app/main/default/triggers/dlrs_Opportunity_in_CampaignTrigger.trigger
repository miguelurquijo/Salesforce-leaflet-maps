/**
 * Auto Generated and Deployed by the Declarative Lookup Rollup Summaries Tool package (dlrs)
 **/
trigger dlrs_Opportunity_in_CampaignTrigger on Opportunity_in_Campaign__c
    (before delete, before insert, before update, after delete, after insert, after undelete, after update)
{
    dlrs.RollupService.triggerHandler(Opportunity_in_Campaign__c.SObjectType);
}