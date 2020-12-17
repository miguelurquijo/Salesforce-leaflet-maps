({
	doInit : function(component, event, helper) {
        let action1 = component.get("c.fetchtasks");
        var recordId = component.get("v.recordId");
        component.set("v.recordIdd", recordId);
        action1.setParams({
            "memberTaskId": component.get("v.recordId"),
        });
		var actions = [
            {label: 'Edit', name: 'edit'}
        ];
        component.set('v.taskColumns', [
            {label: 'Done', fieldName: 'status_checkbox__c', type: 'boolean', editable: true, initialWidth: 80 },
            {label: 'Task', fieldName: 'Task_name__c', type: 'text', editable: true},
            {label: 'Due Date', fieldName: 'Due_Date__c', type: 'date', editable: true},
            {label: 'Asignee User', fieldName: 'Asignee_Name__c', type: 'text', editable: false},
            {label: 'Status', fieldName: 'Task_status__c', type: 'picklist', editable: false},
            {label: 'Created By', fieldName: 'Create_by_Name__c', type: 'text', editable: false},
            {type: 'action', typeAttributes: { rowActions: actions } } 
        ]);
            
            action1.setCallback(this, function(response) {
            let state = response.getState();
            if (state == "SUCCESS") {
                let responseObj = response.getReturnValue();
            	console.log('4');
                component.set("v.taskData", responseObj.tasks);
            	component.set("v.member", responseObj.member);
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
  },
      saveEdition : function(component, event, helper) {
        var draftValues = event.getParam("draftValues");
        console.log(draftValues);
        var action = component.get("c.updateTasks");
        action.setParams({
            "tasks": draftValues
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            $A.get("e.force:refreshView").fire();
        });
        $A.enqueueAction(action);
    },
        
   openModel: function(component, event, helper) {
      // Set isModalOpen attribute to true
      component.set("v.isModalOpen", true);
   },
  
   closeModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isModalOpen", false);
   },
    
   closeEditModel: function(component, event, helper) {
      // Set isModalOpen attribute to false  
      component.set("v.isEditModalOpen", false);
   },
  
   submitDetails: function(component, event, helper) {
      // Set isModalOpen attribute to false
      //Add your code to call apex method or do some processing
      component.set("v.isModalOpen", false);
   },
       
    handleSuccess: function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
        component.set("v.isModalOpen", false);
        component.set("v.isEditModalOpen", false);
    },
    
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        switch (action.name) {
            case 'edit':
                var row = event.getParam('row');
        		var recordId = row.Id;
                component.set("v.selectedRecordId", recordId);
                component.set("v.isEditModalOpen", true);
                break;           
        }
    },

    /**
    //edit fields after saving
    handleSubmit : function(cmp, event, helper) {
        event.preventDefault();       // stop the form from submitting
        const fields = event.getParam('fields');
        fields.Task_name__c = 'prepopulated field'; // modify a field
        cmp.find('addTasksForm').submit(fields);
    },
        */ 
})