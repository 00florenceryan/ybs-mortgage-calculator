
function PMT(rate_per_period, number_of_payments, present_value, future_value, type) {
  var q = Math.pow(1 + rate_per_period, number_of_payments);
  return (rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));
}

function monthlyRepayments(interestRate,mortgageTermYears,loan){

console.log(interestRate);
	console.log(mortgageTermYears);
	console.log(loan);
	return ((interestRate/100/12)/(1 - Math.pow((1 + interestRate/100/12),(-mortgageTermYears*12)) )*loan).toFixed(2);

}

function getLoan(property_value, deposit){

	return property_value - deposit;

}

jQuery(document).ready(function($) {

	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("mortgageCalc");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btn.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
}


	$("input").keyup(function(){

		var property_value = $("input[name='property_value']").val();
		var deposit = $("input[name='deposit']").val();
		var interestRate = $("input[name='interest_rate']").val();
		var mortgageTermYears = $("input[name='mortgage_term']").val();
		$("input[name='loan']").val(getLoan(property_value, deposit,loan).toFixed(2));
		var loan = $("input[name='loan']").val();

		var repayments = monthlyRepayments(interestRate,mortgageTermYears,loan);

		if(repayments > 0 && repayments!="Infinity"){

			$("input[name='repayments']").val("£"+repayments);
		}else{
			$("input[name='repayments']").val("£0.00");
		}



	});
  //not sure how your html looks but maybe here you want $("input") and not $(".input") that selects all elements with the css class input that's maybe missing in the html
  $(".input").keyup(function() {
    var annualIncomeInput = 0;
    var depositInput = 0;
    var annualIncome = 0;
    var deposit = 0;
    var mortgage = 0;
    var propertyValue = 0;
    var monthlyPayments = 0;
    annualIncomeInput = $('#annualIncome').val();
    depositInput = $('#deposit').val();
    annualIncome = parseFloat(annualIncomeInput.replace(/,/g, ''));
    deposit = parseFloat(depositInput.replace(/,/g, ''));
    if (annualIncomeInput && depositInput) {
      if ((deposit / 0.1 - deposit) >= (annualIncome * 4.5)) {
        mortgage = annualIncome * 4.5;
        propertyValue = mortgage + deposit;
      } else {
        propertyValue = deposit / 0.1;
        mortgage = propertyValue - deposit;
      }
      monthlyPayments = PMT(0.0307 / 12, 30 * 12, mortgage, 0, 0).toFixed(2);
    }

    propertyValue = parseFloat(propertyValue).toLocaleString();
    monthlyPayments = parseFloat(monthlyPayments).toLocaleString();
    $('#totalHowMuchCanIBorrow').text('£' + propertyValue);
    $('#estimatedCosts').text('£' + monthlyPayments);

  })
})
