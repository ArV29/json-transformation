###Steps to run
 - Run backend.py
 - Using POSTMAN or other similar services
 - for transformation code generation send post request to "url"/generateMapping along with a name and mapping csv file
 - to transform source objects into target objects send post request to "url"/getTarget along with a name and source.json file
 - "url" is shown when the backend.py is run

###Format for CSV Mapping File

 - for simple 1:1 mapping => `no., targetField, sourceField, -`
- for adding multiple source values in a single target field =>` no, targetField, sourceField1+sourceField2...., -`
- for using ENUMS => `no, targetField, ENUM(sourceField), enumeration`
- using conditionalStatements =>` no, targetFiled, IF(Condition) THEN sourceFieldA ELSE sourceFieldB`
- use push while adding values to arrays


   
##Sample:

####source.json
```{
    "id": "122-34-6543",
    "region": "NA",
    "firstName": "Leanne",
    "lastName": "Graham",
    "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874"
    },
    "occupation": "self-employed",
    "age": 29,
    "loanHistory": [
        {
            "princicpal": 40000,
            "periodInYears": "3",
            "rateOfInterest": 10,
            "collateral": [
                {
                    "assetName": "property",
                    "estimatedValues": 70000
                }
            ]
        },
        {
            "princicpal": 140000,
            "periodInYears": "4",
            "rateOfInterest": 12,
            "isCommercial": true,
            "collateral": [
                {
                    "assetName": "condo",
                    "estimatedValues": 30000
                },
                {
                    "assetName": "vehicle",
                    "estimatedValues": 3000
                }
            ]
        },
        {
            "princicpal": 60000,
            "periodInYears": "4",
            "rateOfInterest": 12,
            "collateral": [
                {
                    "assetName": "jewellery",
                    "estimatedValues": 30000
                }
            ]
        }
    ]
}
```

####Mapping.csv
```
No.,Target, Source, Enumeration
1, SSN, ENUM(.region) + "-" + .id, {"NA": "1"",""EU" : 2"," "AS": 3"," "AF": 4}
2, CustomerFullName, .firstName + .lastName, -
3, CustomerAddress, .address.street + .address.suite, -
4, CustomerCity, .address.city, -
5, CustomerZipCode, .address.zipcode, -
6, CustomerProfession, ENUM(.occupation), {"self-employed": "SELF""," "salaried": "FIXED INCOME""," "other": "MISC"}
7, CustomerAge, .age, -
8, CommercialLoans, IF(.loanHistory.item.isCommercial == true) THEN push(item) ELSE push(), -

```



####target.json
```
{
    "SSN": "1-122-34-6543",
    "CustomerFullName": "Leanne Graham",
    "CustomerAddress": "Kulas Light Apt. 556",
    "CustomerCity": "Gwenborough",
    "CustomerZipCode": "92998-3874",
    "CustomerProfession": "SELF",
    "CustomerAge": 29,
    "CommercialLoans": [
        {
            "princicpal": 140000,
            "periodInYears": "4",
            "rateOfInterest": 12,
            "isCommercial": true,
            "collateral": [
                {
                    "assetName": "condo",
                    "estimatedValues": 30000
                },
                {
                    "assetName": "vehicle",
                    "estimatedValues": 3000
                }
            ]
        }
    ]
}
```


