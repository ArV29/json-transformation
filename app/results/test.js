source=require("../uploads/source.json");
data={"source": source};
res={}
SSN = {"NA": "1","EU" : 2,"AS": 3," AF": 4};
CustomerProfession = {"self-employed": "SELF","salaried": "FIXED INCOME"," other": "MISC"};
res.SSN = SSN[source.region]+"-"+source.id;
res.CustomerFullName = source.firstName+' '+source.lastName;
res.CustomerAddress = source.address.street+' '+source.address.suite;
res.Customer_City = source.address.city;
res.CustomerZipCode = source.address.zipcode;
res.CustomerProfession = CustomerProfession[source.occupation];
res.CustomerAge = source.age;
res.CommercialLoans= [];
source.loanHistory.forEach(item => {(item.isCommercial == false)?res.CommercialLoans.push(item):res.CommercialLoans.push()});
console.log(res);
var fs = require('fs');
jsonData = JSON.stringify(res);
fs.writeFile("./results/test.json", jsonData, function (err) {
	if(err){
		console.log(err);
	}
});