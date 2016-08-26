function ahzoho(authtoken) {
    var about = {
        Version: 1.0,
        Author: "Training",
        Created: "01/09/2015",
        Copyright: "AWPL"
    };
    if (typeof (authtoken) === "undefined") {
        this.authtoken = "1bf588e0ae6e8bdc88a26aaa54774b98";
    }
    if (authtoken) {
        // Avoid clobbering the window scope:
        // return a new ahactiviti object if we're in the wrong scope
        //check typeof window to run on server without window object.
        if (typeof (window) != "undefined" && this === window) {
            return new ahzoho(authtoken);
        }
        // We're in the correct object scope:
        // Init our element object and return the object
        this.authtoken = authtoken;
        return this;
    } else {

        this.authtoken = "1bf588e0ae6e8bdc88a26aaa54774b98";
        return new ahzoho(authtoken);
    }

}

ahzoho.prototype.getLeadById = function (id) {
    //console.log(["getLeads method invoked..  -> ", JSON.stringify(this)].join(' '));
    print(["getLeads method invoked..  -> ", JSON.stringify(this)].join(' '));
    var xmlhttp = new XMLHttpRequest();
    var url = "https://crm.zoho.com/crm/private/json/Leads/getRecordById?&authtoken=" + this.authtoken + "&scope=crmapi&id=" + id;
    print(["URL=", url].join(' '));
    var data = { };
    xmlhttp.open("GET", url, false, "a","b" );
    xmlhttp.setRequestHeader("Content-Type", "application/jsonp;charset=utf-8");
    xmlhttp.setRequestHeader('X-PING', 'ANTHILL');
    xmlhttp.send(JSON.stringify(data));
    if (xmlhttp.readyState == 4 && xmlhttp.status == 201)
    {
        var response = xmlhttp.responseText;
        print("Error: " + response);
        return response;
    }
    else
    {
        print("Success: " + xmlhttp.status + " , " + xmlhttp.responseText);
        return xmlhttp.responseText;
    }
    return "ERROR.";
};

/**
*Sample
function onBeforeSave(formData)
{
 var zoho = new ahzoho('1bf588e0ae6e8bdc88a26aaa54774b98');
 var response = zoho.getLeadById('1615325000000087015');
}

*/


ahzoho.prototype.addLead = function(customer)
{
//var xmlData = '<Leads><row no="1"><FL val="Lead Source">Web Download</FL><FL val="Company">Your Company</FL><FL val="First Name">Hannah</FL><FL val="Last Name">Smith</FL><FL val="Email">testing@testing.com</FL><FL val="Title">Manager</FL><FL val="Phone">1234567890</FL><FL val="Home Phone">0987654321</FL><FL val="Other Phone">1212211212</FL><FL val="Fax">02927272626</FL><FL val="Mobile">292827622</FL></row></Leads>';

    print(["addLead method invoked..  this -> ", JSON.stringify(this),"Customer=", JSON.stringify(customer)].join(' '));

    var transformedXML = '<Leads><row no="1"><FL val="Lead Source">AntHill</FL><FL val="Company">AWPL</FL><FL val="First Name">'+customer.customerName.firstName+'</FL><FL val="Last Name">'+customer.customerName.lastName+'</FL><FL val="Email">'+customer.email+'</FL><FL val="Salutation">'+customer.customerName.title+'</FL><FL val="Phone">'+customer.telephoneNumber+'</FL><FL val="Home Phone">'+customer.telephoneNumber+'</FL><FL val="Other Phone">'+customer.telephoneNumber+'</FL><FL val="Fax">'+customer.telephoneNumber+'</FL><FL val="Mobile">'+customer.telephoneNumber+'</FL><FL val="Street">'+customer.address.line1 + " , "+ customer.address.line2 +'</FL><FL val="City">'+customer.address.city+'</FL><FL val="State">'+customer.address.state+'</FL><FL val="Zip Code">'+customer.address.pincode+'</FL><FL val="Country">'+customer.address.country+'</FL><FL val="Description">'+JSON.stringify(customer)+'Created by Anthill.</FL></row></Leads>';

    //var transformedXML = '<Leads><row no="1">FL val="Company">AWPL</FL><FL val="First Name">'+customer.customerName.firstName+'</FL><FL val="Last Name">'+customer.customerName.lastName+'</FL><FL val="Email">'+customer.email+'</FL><FL val="Salutation">'+customer.customerName.title+'</FL><FL val="Phone">'+customer.telephoneNumber+'</FL><FL val="Home Phone">'+customer.telephoneNumber+'</FL><FL val="Other Phone">'+customer.telephoneNumber+'</FL><FL val="Fax">'+customer.telephoneNumber+'</FL><FL val="Mobile">'+customer.telephoneNumber+'</FL><FL val="Street">'+customer.address.line1 + " , "+ customer.address.line2 +'</FL><FL val="City">'+customer.address.city+'</FL><FL val="State">'+customer.address.state+'</FL><FL val="Zip Code">'+customer.address.pincode+'</FL><FL val="Country">'+customer.address.country+'</FL><FL val="Description">'+JSON.stringify(customer)+'Created by Anthill.</FL></row></Leads>';
    //var transformedXML = '<Leads><row no="1"><FL val="SMOWNERID">2000000016714</FL><FL val="Lead Owner">Scott@zohotest.com</FL><FL val="Company">Zoho</FL><FL val="First Name">Peter</FL><FL val="Last Name">John</FL><FL val="Designation">CEO</FL><FL val="Email">john@test.com</FL><FL val="Phone">04422334455</FL><FL val="Fax">98889</FL><FL val="Mobile">09999999999</FL><FL val="Website">www.sample.com</FL><FL val="Lead Source">External Referral</FL><FL val="Lead Status">Contacted</FL><FL val="Industry">Financial Services</FL><FL val="No of Employees">100</FL><FL val="Annual Revenue">100.0</FL><FL val="Email Opt Out">true</FL><FL val="Skype ID">peter</FL><FL val="Salutation">Mr.</FL><FL val="Street">Street One</FL><FL val="City">Chennai</FL><FL val="State">Tamil Nadu</FL><FL val="Zip Code">6000001</FL><FL val="Country">India</FL><FL val="Description">Sample Description.</FL></row></Leads>';

    print("xmldata -> "+ transformedXML);

    var xmlhttp = new XMLHttpRequest();
    var url = "https://crm.zoho.com/crm/private/xml/Leads/insertRecords";
    print(["POSTING URL=", url].join(' '));
    xmlhttp.open("POST", url, false, "a","b" );
    xmlhttp.setRequestHeader('X-PING', 'ANTHILL');
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var params = "&authtoken=" + this.authtoken + "&scope=crmapi&xmlData="+transformedXML;
    xmlhttp.send(params);
    if (xmlhttp.readyState == 4 && xmlhttp.status == 201)
    {
        var response = xmlhttp.responseText;
        print("Error: " + response);
        return response;
    }
    else
    {
        print("Success: " + xmlhttp.status + " , " + xmlhttp.responseText);
        return xmlhttp.responseText;
    }
};
