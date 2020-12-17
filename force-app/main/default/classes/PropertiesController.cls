public with sharing class PropertiesController {
    @AuraEnabled(cacheable=true)
    public static List<Lead> getPropertyList(Id MarkerId) {
        return [
            SELECT Id, Name, Latitude, Longitude, GeocodeAccuracy, Address, Status
            FROM Lead
            WHERE Market__c = :MarkerId
            
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Market__c> getMarketList(Id MarkerId) {
        return [
            SELECT Latitude__c, Average_Longitude__c
            FROM Market__c
            WHERE Id = :MarkerId
            
        ];
    }
}