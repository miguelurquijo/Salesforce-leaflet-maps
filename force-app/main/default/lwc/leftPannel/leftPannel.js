import { LightningElement, api, track } from "lwc";
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { getRecordNotifyChange } from 'lightning/uiRecordApi';

export default class LeftPannel extends LightningElement {

    @track isModalOpen = false;
openModal() {
    this.isModalOpen = true;
}

closeModal() {
    this.isModalOpen = false;
}

submitDetails() {
    this.isModalOpen = false;

}

  @api value;
  @api isArray;
  selectedValues = [];
  selectedValue;
  showAllData = true;
  @api
  handle(data) {
    this.value = data;
    this.selectedValue = data[0].Status;
  }

  get options() {
    return [
        { label: 'New', value: 'New' },
        { label: 'Qualified, Not Contacted', value: 'Qualified, Not Contacted' },
        { label: 'Qualified, Not Willing To Trade', value: 'Qualified, Not Willing To Trade' },
        { label: 'Qualified, Willing To Trade', value: 'Qualified, Willing To Trade' },
        { label: 'Unqualified', value: 'Unqualified' },
        { label: 'Property Comps', value: 'Property Comps' },
    ];
}

  renderedCallback() {
    const info = this.template.querySelector(".info");
    Object.assign(info.style, {
      position: "relative",
      height: "600px"
    });
  }
  

  handleSelect(event) {
 
  }

  handleClick(e) {
    this.value = {pin: undefined, mapData: undefined, data: this.value.data};
}

onClickLink(e) {
    e.preventDefault();
    const linkData =  e.target.href.split('/')
    linkData[5] = 'Lead';
    linkData[6] = linkData[7];
    linkData[7] = 'view'
    const url = linkData.join('/');
    window.open(url, '_blank');
}


//changes when checkbox is selected
handleChangeSelectAllData(event1) {
  this.selectedValue = event1.detail.value;
    const inputs = this.template.querySelectorAll('.first-class');

    inputs.forEach(element => {
        if (element.checked) {
            const fields = {};
            fields['Id'] = element.value;
            fields['Status'] = event1.detail.value;
            const recordInput = { fields };
            
        
            updateRecord(recordInput)
                        .then(() => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Success',
                                    message: 'Updated',
                                    variant: 'success'
                                })
                            );
                            // Display fresh data in the form
                            // return refreshApex(this.contact);
                        })
                        .catch(error => {
                            this.dispatchEvent(
                                new ShowToastEvent({
                                    title: 'Error updating record',
                                    message: error.body.message,
                                    variant: 'error'
                                })
                            );
                        });
        }
        

    });       
}

//Changes when pin is selected
handleChangeSelect(event) {
    this.selectedValue = event.detail.value;
    console.log(this.selectedValue)

    const fields = {};
    fields['Id'] = this.value.pin.Id;
    fields['Status'] = event.detail.value;
    const recordInput = { fields };

    console.log(recordInput)

    updateRecord(recordInput)
                .then(() => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Updated',
                            variant: 'success'
                        })
                    );
                    this.value.pin.Status = event.detail.value;
                    // Display fresh data in the form
                    // return refreshApex(this.contact);
                    
                    
                })
                .catch(error => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error creating record',
                            message: error.body.message,
                            variant: 'error'
                        })
                    );
                });
             
}   
}