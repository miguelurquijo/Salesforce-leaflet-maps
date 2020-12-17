({
	doInit : function(component, event, helper) {
        
        //Closing Commissions
        let action1 = component.get("c.fetchCommisions");
        action1.setParams({
            "commissionType": "Closing",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.closingColumns', [
            {label: 'Role Type', fieldName: 'Role_Type__c', type: 'text'},
            {label: 'Potential', fieldName: 'Calculated_Total__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Potential per Bed Space', fieldName: 'Value_per_Bed_Space__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due', fieldName: 'Commission_Due_2__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due per Bed Space', fieldName: 'Bed_Space_Value_Due__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Status', fieldName: 'Status__c', type: 'picklist', type:"picklist", editable: true},
            {label: 'Comments', fieldName: 'Comments__c', type: 'text', editable: true}
        ]);
        
        action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.closingData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(action1);
        
        let total1 = component.get("c.fetchTotals");
        total1.setParams({
            "commissionType": "Closing",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.totalClosingColumns', [
            {label: 'Total Potential', fieldName: 'TotalCalculated', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Potential per Bed Space', fieldName: 'TotalValuePerBedSpace', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due', fieldName: 'TotalCommissionDue2', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due per Bed Space', fieldName: 'TotalBedSpaceValueDue', type: 'currency', typeAttributes: {currencyCode: 'USD'}}
        ]);
        
        total1.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.totalClosingData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(total1);
        
        //Opening Commissions
        let action2 = component.get("c.fetchCommisions");
        action2.setParams({
            "commissionType": "Opening",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.openingColumns', [
            {label: 'Role Type', fieldName: 'Role_Type__c', type: 'text'},
            {label: 'Potential', fieldName: 'Calculated_Total__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Potential per Bed Space', fieldName: 'Value_per_Bed_Space__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due', fieldName: 'Commission_Due_2__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due per Bed Space', fieldName: 'Bed_Space_Value_Due__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Status', fieldName: 'Status__c', type: 'picklist', editable: true},
            {label: 'Comments', fieldName: 'Comments__c', type: 'text', editable: true}
        ]);
        
        action2.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.openingData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(action2);
        
        let total2 = component.get("c.fetchTotals");
        total2.setParams({
            "commissionType": "Opening",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.totalOpeningColumns', [
            {label: 'Total Potential', fieldName: 'TotalCalculated', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Potential per Bed Space', fieldName: 'TotalValuePerBedSpace', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due', fieldName: 'TotalCommissionDue2', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due per Bed Space', fieldName: 'TotalBedSpaceValueDue', type: 'currency', typeAttributes: {currencyCode: 'USD'}}
        ]);
        
        total2.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.totalOpeningData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(total2);
        
        //Performance Commissions
        let action3 = component.get("c.fetchCommisions");
        action3.setParams({
            "commissionType": "Performance",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.performanceColumns', [
            {label: 'Role Type', fieldName: 'Role_Type__c', type: 'text'},
            {label: 'Potential', fieldName: 'Calculated_Total__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Potential per Bed Space', fieldName: 'Value_per_Bed_Space__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due', fieldName: 'Commission_Due_2__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Due per Bed Space', fieldName: 'Bed_Space_Value_Due__c', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Status', fieldName: 'Status__c', type: 'picklist', editable: true},
            {label: 'Comments', fieldName: 'Comments__c', type: 'text', editable: true}
        ]);
        
        action3.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.performanceData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(action3);
        
        let total3 = component.get("c.fetchTotals");
        total3.setParams({
            "commissionType": "Performance",
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.totalPerformanceColumns', [
            {label: 'Total Potential', fieldName: 'TotalCalculated', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Potential per Bed Space', fieldName: 'TotalValuePerBedSpace', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due', fieldName: 'TotalCommissionDue2', type: 'currency', typeAttributes: {currencyCode: 'USD'}},
            {label: 'Total Due per Bed Space', fieldName: 'TotalBedSpaceValueDue', type: 'currency', typeAttributes: {currencyCode: 'USD'}}
        ]);
        
        total3.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.totalPerformanceData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
        $A.enqueueAction(total3);
        //Summary Commissions
        let action4 = component.get("c.fetchCommisionsSummary");
        action4.setParams({
            "commissionRequestId": component.get("v.recordId")
        });
        
        component.set('v.SummaryColumns', [
            {label: 'Role Type', fieldName: 'Role_Type__c', type: 'Picklist'},
    		{label: 'Total Due per Bed Space', fieldName: 'TotalBS', type: 'currency', typeAttributes: { currencyCode: 'USD'}},
    		{label: 'Total Due', fieldName: 'TotalDue', type: 'currency', typeAttributes: { currencyCode: 'USD'}}
        ]);
		
        action4.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
                component.set("v.SummaryData", responseObj);
            } else if (state == "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                }
            } else {
                console.log("Unknown error");
            }
        });
         $A.enqueueAction(action4);
	},
    saveEdition : function(component, event, helper) {
        var draftValues = event.getParam("draftValues");
        console.log(draftValues);
        var action = component.get("c.updateCommission");
        action.setParams({
            "commission": draftValues
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get("e.force:refreshView").fire();
        });
        $A.enqueueAction(action);
    }
})