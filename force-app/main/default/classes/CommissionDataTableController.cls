public with sharing class CommissionDataTableController {
    
    //Return Commission Request related to Commission Type and Commission Request
    @AuraEnabled
    public static List<Opportunity_Commissions__c> fetchCommisions(String commissionType, Id commissionRequestId) {
        return [SELECT Id, Role_Type__c, Calculated_Total__c, Value_per_Bed_Space__c, Commission_Due_2__c, Bed_Space_Value_Due__c, Status__c, Comments__c 
                FROM Opportunity_Commissions__c 
                WHERE Commission_Type__c = :commissionType
                AND Commission_request__c = :commissionRequestId ORDER BY Role_Type__c];
    }
    
    @AuraEnabled
    public static List<AggregateResult> fetchTotals(String commissionType, Id commissionRequestId) {
        return [SELECT SUM(Calculated_Total__c) TotalCalculated, SUM(Value_per_Bed_Space__c) TotalValuePerBedSpace, SUM(Commission_Due_2__c) TotalCommissionDue2, SUM(Bed_Space_Value_Due__c) TotalBedSpaceValueDue 
                FROM Opportunity_Commissions__c 
                WHERE Commission_Type__c = :commissionType 
                AND Commission_request__c = :commissionRequestId];
    }
    
    @AuraEnabled
    public static void updateCommission(List<Opportunity_Commissions__c> commission) {
        update commission;
    }
    
     @AuraEnabled
    public static List<AggregateResult> fetchCommisionsSummary(Id commissionRequestId) {
        return [SELECT Role_Type__c, SUM(Bed_Space_Value_Due__c) TotalBS, SUM(Commission_Due_2__c) TotalDue
                FROM Opportunity_Commissions__c 
                WHERE Commission_request__c = :commissionRequestId GROUP BY Role_Type__c];
    }
}