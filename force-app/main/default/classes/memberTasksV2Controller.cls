public with sharing class memberTasksV2Controller {
 
    @AuraEnabled
    public static fetchTasksResponse fetchtasks(Id memberTaskId) {
        fetchTasksResponse response=new fetchTasksResponse();
        CampaignMember campaignMember = [SELECT Id, ContactId, CampaignId FROM CampaignMember WHERE Id = :memberTaskId];
        Id contactId = campaignMember.ContactId;
        System.debug('Contact ID: ' + contactId);
        Id campaignId = campaignMember.CampaignId;
        System.debug('Campaign ID: ' + campaignId);
        List<MemberTask__c> tasks= [SELECT Id, Task_name__c, Task_status__c, Due_Date__c, Contact__r.Name, Investment_Campaign__c, Asignee_Name__c, Create_by_Name__c, status_checkbox__c
                FROM MemberTask__c
                WHERE Contact__c = :contactId 
                AND Investment_Campaign__c = :campaignId
               ORDER BY Due_Date__c];
        response.tasks=tasks;
        response.member=campaignMember;
        return response;
    }
    @AuraEnabled 
    public static void updateTasks(List<MemberTask__c> tasks) {
        update tasks;
    }
    
    public class fetchTasksResponse{
		@AuraEnabled
		public List<MemberTask__c> tasks;
		@AuraEnabled
		public CampaignMember member;		
		public fetchTasksResponse(){}
	}
}