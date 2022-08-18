function monthlyRepayments(interestRate, mortgageTermYears, loan) {

    return ((interestRate / 100 / 12) / (1 - Math.pow((1 + interestRate / 100 / 12), (-mortgageTermYears * 12))) * loan).toFixed(2);

}

function getLoan(property_value, deposit) {

    return property_value - deposit;

}

jQuery(document).ready(function($) {


    var modal = document.getElementById("myModal");

    var btn = document.getElementById("mortgageCalc");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";

    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $("input").keyup(function() {

        var property_value = $("input[name='property_value']").val();
        var deposit = $("input[name='deposit']").val();
        var interestRate = $("input[name='interest_rate']").val();
        var mortgageTermYears = $("input[name='mortgage_term']").val();
        if (mortgageTermYears > 45) {
            $("input[name='mortgage_term']").val(0);
        }
        $("input[name='loan']").val(getLoan(property_value, deposit, loan).toFixed(2));
        var loan = $("input[name='loan']").val();

        var repayments = monthlyRepayments(interestRate, mortgageTermYears, loan);

        if (repayments > 0 && repayments != "Infinity") {

            $("input[name='repayments']").val("£" + repayments);
        } else {
            $("input[name='repayments']").val("£0.00");
        }

    });

});