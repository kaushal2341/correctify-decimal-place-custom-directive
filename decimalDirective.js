/**
Author: Kaushal Regmi
Email: kaushalregmi321@gmail.com
Angular Js Directive For input types 
This Directive Helps to get input number for require decimal places.
The data values specifies the no of decimal places to be valid.
The user can't type more than given decimal places.
By Default if data is not provided or if data is 0 then it will validate for 2 decimal places.
It will also not allow any input other than number and point.
It will be applied on ngModel and restricted for attribute only.
**/

angular.module('myApp').directive('decimalPlaces', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
		 scope: {
            data: '='
        },
        link: function (scope, element, attr, _ctrl) {
            function correctifyDecimalPlaces(input) {
			
			    let noOfDecimal=scope.data;
				if(!noOfDecimal){
					noOfDecimal=2;
				}
                const regexForDecimalPlaces=new RegExp("^\\d*(?:\\.\\d{1,"+noOfDecimal+"})?$");
				let updatedInput = input, tempInput,isNotNumber=false;
				function replaceInputOtherThanNumber(){
					if(input){
					   updatedInput = input.replace(/[^0-9.]/,'');
					   isNotNumber=updatedInput.length===input.length?isNotNumber:true;
				    }
				}
				replaceInputOtherThanNumber();
			   if (input) {
				   if(!isNotNumber){
                    if (!input.match(regexForDecimalPlaces)) {
                        let indexOfFirstDecimal = input.indexOf('\.');
                        let substringInput = input.substring(indexOfFirstDecimal + 1,
                            input.length);
                        tempInput = substringInput.replace('\.', '');
                        if (tempInput !== null) {
                            if (tempInput.length > noOfDecimal) {
                                tempInput = substringInput.substring(0,
                                    substringInput.length - 1)
                            }
                            updatedInput = input.substring(0, indexOfFirstDecimal + 1) + tempInput;
                        }
                    }
                    let updatedInputDecimalIndex = updatedInput.indexOf('\.');
                    if (updatedInputDecimalIndex === 0) {
                        if (updatedInput.substring(0, updatedInputDecimalIndex).length < 1)
                            updatedInput = '0' + updatedInput;
                        updatedInputDecimalIndex = updatedInput.indexOf('\.')
                        if (updatedInput.substring(updatedInputDecimalIndex + 1, updatedInput.length).length < 1) {
                            updatedInput += '0';
                        }
                    }
				 }
                    if (updatedInput !== input) {
                        _ctrl.$setViewValue(updatedInput);
                        _ctrl.$render();
                    }
                    return updatedInput;
                }
                return;
            }

            _ctrl.$parsers.push(correctifyDecimalPlaces);
        }
    };
});
