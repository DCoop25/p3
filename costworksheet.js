$(document).ready(function() {
    //set form (on refresh)
    setForm(document.iform);
});

function formReset(i)
{
    document.getElementById("iform").reset();
    setForm(i);
}

//set fields
function setForm(i)
{

    //determine browser
    if(navigator.appName.indexOf("Microsoft") > -1)
        var canSee = 'block'
    else 
		var canSee = 'table-row';
	
	//show location (undergraduate) or program (graduate)
	if (i.stuType.value == "Undergraduate")
	{
		document.getElementById("iLoc").style.display = canSee;
		document.getElementById("iGrad").style.display = "none";
		i.gradProg.selectedIndex = 0;
	}
	else if (i.stuType.value == "Graduate")
	{
		document.getElementById("iGrad").style.display = canSee;
		document.getElementById("iLoc").style.display = "none";
		i.location.selectedIndex = 0;
	}
	else
	{
		document.getElementById("iLoc").style.display = "none";
		document.getElementById("iGrad").style.display = "none";
		i.location.selectedIndex = 0;
		i.gradProg.selectedIndex = 0;
	}
	
	//quick or custom estimate?
	if (i.estimate[1].checked == true)
	{
		document.getElementById("rCustom").style.display = "table";
		document.getElementById("rQHours").style.display = "none";
		
		
		//set housing/room/meal options
		if(i.location.value == "NW" || i.stuType.value == "Graduate")
		{
			document.getElementById("rHousing").style.display = canSee;
			document.getElementById("rMeal").style.display = canSee;	
		}
		else if (i.location.value == "KC")
		{
			document.getElementById("rHousing").style.display = "none";
			document.getElementById("rMeal").style.display = "none";
			i.housing.value = "0";
			i.meal.value = "0";
		}
		else
		{
			document.getElementById("rHousing").style.display = "none";
			document.getElementById("rMeal").style.display = "none";
			i.housing.value = "0";
			i.meal.value = "0";
		}
			
	}
	else
	{
		document.getElementById("rCustom").style.display = "none";
		document.getElementById("rQHours").style.display = canSee;
	}
	
	
	//set for International Students
	if(i.residence.value == "International")
	{
		document.getElementById("rOrientation").style.display = canSee;
		document.getElementById("rService").style.display = canSee;
		document.getElementById("rHealth").style.display = canSee;
	}
	else
	{
		document.getElementById("rOrientation").style.display = "none";
		document.getElementById("rService").style.display = "none";
		document.getElementById("rHealth").style.display = "none";
		i.orientation.value = "0.00";
		i.service.value = "0.00";
		i.health.value = "0.00";
	}
	
	//set room
	if(i.housing.value == "On-Campus")
		document.getElementById("rRoom").style.display = canSee;
	else
	{
		document.getElementById("rRoom").style.display = "none";
		i.room.selectedIndex = 0;
	}
	
	
	//set room/board total
	if((i.housing.value == "On-Campus") || (i.meal.value != "0" && i.meal.value != "None"))
		document.getElementById("rBoard").style.display = canSee;
	else
	{
		document.getElementById("rBoard").style.display = "none";
		i.board.value = "0.00";
	}
	
	
	//set for Northwest-Kansas City	
	/*
	if(i.location.value == "KC")
	{
		if(i.residence.value == "International")
			i.residence.value = "0";
		i.residence[3].disabled = true; 
	}
	else if(i.stuType.value == "Undergraduate" || i.stuType.value == "Graduate")
	{
		i.residence[3].disabled = false; 
	}
	else
	{
		i.residence[3].disabled = false;
	}
	*/

	//reset breakdown values if previously calculated
    if(i.adjtotal.value = "$0.00")
	{
		i.tuition.value = formatNum(0,2)
		i.board.value = formatNum(0,2)
		i.health.value = formatNum(0,2)
		i.orientation.value = formatNum(0,2)
		i.service.value = formatNum(0,2)
		i.aid.value = formatNum(0,2)
		i.total.value = formatNum(0,2)
		i.adjtotal.value =  "$" + formatNum(0,2)
	}
	
}




function submitIt(i)
{
	setForm(i);
	
	if(i.estimate[0].checked == false && i.estimate[1].checked == false)
	{	
		alert("Select an estimate type." );
		i.estimate[0].focus();
		return false;
	}
	else if(i.stuType.value == "0")
	{
		alert("Select your student type." );
		i.stuType.focus();
		return false;
	}
	else if(i.stuType.value == "Undergraduate" && i.location.value == "0")
	{
		alert("Select your Northwest location." );
		i.location.focus();
		return false;
	}
	else if(i.stuType.value == "Graduate" && i.gradProg.value == "0")
	{
		alert("Select your graduate program." );
		i.gradProg.focus();
		return false;
	}
	else if (i.residence.value == "0")
	{
		alert("Select your residency." );
		i.residence.focus();
		return false;
	}
	/*
	else if (i.estimate[1].checked == true && i.location.value == "NW" && i.room.value == "0")
	{
		alert("Select your preferred room and board." );
		i.room.focus();
		return false;
	}
	*/
	else if (i.estimate[1].checked == true && (i.location.value == "NW" || i.stuType.value == "Graduate") && i.housing.value == "0")
	{
		alert("Select your preferred housing." );
		i.housing.focus();
		return false;
	}
	else if (i.estimate[1].checked == true && (i.location.value == "NW" || i.stuType.value == "Graduate") && i.housing.value == "On-Campus" && i.room.value == "0")
	{
		alert("Select your preferred room type." );
		i.room.focus();
		return false;
	}
	else if (i.estimate[1].checked == true && (i.location.value == "NW" || i.stuType.value == "Graduate") && i.meal.value == "0")
	{
		alert("Select your preferred meal plan." );
		i.meal.focus();
		return false;
	}
	
	else if (i.estimate[1].checked == true && (i.credits.value == "" || parseInt(i.credits.value) == 0 || !IsNumeric(i.credits.value)))
	{
		alert("Enter the number of credit hours per semester." );
		i.credits.focus();
		return false;
	}
	else if ((i.finaid.value != "" || parseInt(i.finaid.value) != 0) && !IsNumeric(i.finaid.value))
	{
		alert("Enter a numeric value for financial aid received." );
		i.finaid.focus();
		return false;
	}
	else if ((i.grants.value != "" || parseInt(i.grants.value) != 0) && !IsNumeric(i.grants.value))
	{
		alert("Enter a numeric value for grants received." );
		i.grants.focus();
		return false;
	}
	else if ((i.scholarships.value != "" || parseInt(i.scholarships.value) != 0) && !IsNumeric(i.scholarships.value))
	{
		alert("Enter a numeric value for scholarships received." );
		i.scholarships.focus();
		return false;
	}
	else if ((i.loans.value != "" || parseInt(i.loans.value) != 0) && !IsNumeric(i.loans.value))
	{
		alert("Enter a numeric value for student loans received." );
		i.loans.focus();
		return false;
	}
	else if ((i.parentplus.value != "" || parseInt(i.parentplus.value) != 0) && !IsNumeric(i.parentplus.value))
	{
		alert("Enter a numeric value for ParentPLUS received." );
		i.parentplus.focus();
		return false;
	}
		
	calc(i);
}

function calc(i) 
{
	var hoursUG = 14
    var hoursG = 9
	var inUG = 343.25                   //in-state undergrad
    var outUG = 584.16                  //out-state undergrad
    var intlUG = 584.16                 //international undergrad
    var inKCUG = 373.25                 //in-state undergrad (KC)
    var outKCUG = 614.16                //out-state undergrad (KC)
    var intlKCUG = 614.16               //international undergrad (KC)
    var busG = 483.20                   //graduate (business)
    var csisG = 478.20                  //graduate (csis)
    var otherG = 433.20                 //graduate (other)
    var healthFee = 480.56              //intl - health fee
    var intlOrientUG = 240.00           //intl - orientation fee
    var intlOrientG = 75.00             //intl - orientation fee
    var intlServUG = 30.00              //intl - service fee
    var intlServG = 75.00               //intl - service fee
    var miscNew = 165.00                //misc - new student fee
    var miscYearbook = 37.47            //misc - yearbook
    var miscParking = 90.00             //misc - parking
    var roomHallDouble = 2636.00        //room - D/M double
    var roomHallPrivate = 3461.00       //room - D/M private
    var roomTowerDouble = 3102.00       //room - Tower Suite double
    var roomTowerPrivate = 3927.00      //room - Tower Suite private
    var roomHPDouble = 3178.00          //room - H/P double
    var roomHPPrivate = 4003.00         //room - H/P private
    var roomRSCDouble = 2920.00         //room - F/R/SC double
    var roomRSCPrivate = 3745.00        //room - F/R/SC private
    var roomRSSingle = 0.00             //room - F/R/SC single
    var roomRSCDeluxe = 3270.00         //room - F/R/SC deluxe single
    var roomRSCLoft = 3054.00           //room - F/R/SC loft
    var roomRSCPrivateLoft = 3879.00    //room - F/R/SC private loft
    var roomNorth = 2000.00             //room - NC double
    var roomApartment = 3150.00         //room - FVA
    var meal5Day = 1730.00              //meal - 5 days
    var mealSilver = 1875.00            //meal - silver
    var mealGold = 2025.00              //meal - gold
    var mealPlatinum = 2175.00          //meal - platinum
    var mealBlock25 = 165.00            //meal - 25 block
    var mealBlock50 = 295.00            //meal - 50 block
    var mealBlock75 = 395.00            //meal - 75 block
	var tuition, room, meal, health, intlOrient, intlServ, aidTotal, total
	tuition = room = meal = health = intlOrient = intlServ = aidTotal = total = 0


	//determine browser
	if(navigator.appName.indexOf("Microsoft") > -1)
		var canSee = 'block'
	else 
		var canSee = 'table-row';

	//calculate cost based on your preferences
	if(i.estimate[1].checked == true)
	{

	
		// calculate Northwest Undergraduates
		if(i.location.value == "NW" && i.stuType.value == "Undergraduate")
		{	

			if(i.residence.value == "In-state")
				tuition = inUG * parseInt(i.credits.value)
			else if(i.residence.value == "Out-of-state")
				tuition = outUG * parseInt(i.credits.value)
			else if(i.residence.value == "International")
			{
				tuition = intlUG * parseInt(i.credits.value)
				health = healthFee
				intlOrient = intlOrientUG
                intlServ = intlServUG
			}
		}
		
		// calculate Northwest Graduates
		else if(i.stuType.value == "Graduate")
		{

			if(i.gradProg.value == "Business")
				tuition = busG * parseInt(i.credits.value)
			else if(i.gradProg.value == "CSIS")
				tuition = csisG * parseInt(i.credits.value)
			else
				tuition = otherG * parseInt(i.credits.value)
				
			if(i.residence.value == "International")
			{
				health = healthFee
				intlOrient = intlOrientG
                intlServ = intlServG
			}
		}
		
		// calculate KC Undergraduates
		else if(i.location.value == "KC" && i.stuType.value == "Undergraduate")
		{	

			if(i.residence.value == "In-state")
				tuition = inKCUG * parseInt(i.credits.value)
			else if(i.residence.value == "Out-of-state")
				tuition = outKCUG * parseInt(i.credits.value)
			else if(i.residence.value == "International")
			{
				tuition = intlKCUG * parseInt(i.credits.value)
				health = healthFee
				intlOrient = intlOrientUG
                intlServ = intlServUG
			}
		}
		
		
		if(i.room.value == "Dieterich/Millikan - Double")
			room = roomHallDouble
		else if(i.room.value == "Dieterich/Millikan - Private")
			room = roomHallPrivate
		else if(i.room.value == "Tower Suite - Double")
			room = roomTowerDouble
		else if(i.room.value == "Tower Suite - Private")
			room = roomTowerPrivate
		else if(i.room.value == "Hudson/Perrin - Double")
			room = roomHPDouble
		else if(i.room.value == "Hudson/Perrin - Private")
			room = roomHPPrivate
		else if(i.room.value == "Franken/Roberta/South Complex - Double")
			room = roomRSCDouble
		else if(i.room.value == "Franken/Roberta/South Complex - Private")
			room = roomRSCPrivate
		else if(i.room.value == "Franken/Roberta/South Complex - Single")
			room = roomRSCSingle
		else if(i.room.value == "Franken/Roberta/South Complex - Deluxe")
			room = roomRSCDeluxe
		else if(i.room.value == "Franken/Roberta/South Complex - Loft")
			room = roomRSCLoft
		else if(i.room.value == "Franken/Roberta/South Complex - Private Loft")
			room = roomRSCPrivateLoft
		else if(i.room.value == "North Complex - Double")
			room = roomNorth
		else if(i.room.value == "Forest Village - Apartments")
			room = roomApartment
		
		else 
			room = 0;
			
		if(i.meal.value == "5 Day")
			meal = meal5Day
		else if(i.meal.value == "Silver")
			meal = mealSilver
		else if(i.meal.value == "Gold")
			meal = mealGold
		else if(i.meal.value == "Platinum")
			meal = mealPlatinum
		else if(i.meal.value == "25 Block")
			meal = mealBlock25
		else if(i.meal.value == "25 Block")
			meal = mealBlock25
		else if(i.meal.value == "50 Block")
			meal = mealBlock50
		else if(i.meal.value == "75 Block")
			meal = mealBlock75
		else
			meal = 0;
		
		aidTotal = parseFloat(i.finaid.value) + parseFloat(i.grants.value) + parseFloat(i.scholarships.value) + parseFloat(i.loans.value) + parseFloat(i.parentplus.value);
		
		i.tuition.value = formatNum(tuition,2)
		i.board.value = formatNum(room + meal,2)
		i.health.value = formatNum(health,2)
		i.orientation.value = formatNum(intlOrient,2)
        i.service.value = formatNum(intlServ,2)
		i.aid.value = formatNum(aidTotal,2)
		
		total = tuition + room + meal + health + intlOrient + intlServ
		i.total.value = formatNum(total,2)
		i.adjtotal.value =  "$" + formatNum(total - aidTotal,2)
	}
	//calculate cost based on AVERAGE student
	else if(i.estimate[0].checked == true)
	{

		// quick calculate Northwest undergraduate
		if(i.location.value == "NW" && i.stuType.value == "Undergraduate")
		{

			if(i.residence.value == "In-state")
				i.tuition.value = formatNum(inUG * hoursUG,2)
			else if(i.residence.value == "Out-of-state")
				i.tuition.value = formatNum(outUG * hoursUG,2)
			else if(i.residence.value == "International")
				i.tuition.value = formatNum(intlUG * hoursUG,2)
			
			if(i.location.value == "NW")
			{
				document.getElementById("rBoard").style.display = canSee;
				i.board.value = formatNum(roomHallDouble + mealSilver,2)
			}
		}
		
		//quick calculate Northwest graduate
		else if(i.stuType.value == "Graduate")
		{

			if(i.gradProg.value == "Business")
				i.tuition.value = formatNum(busG * hoursG,2)
			else if(i.gradProg.value == "CSIS")
				i.tuition.value = formatNum(csisG * hoursG,2)
			else
				i.tuition.value = formatNum(otherG * hoursG,2)
			
			document.getElementById("rBoard").style.display = "none";
			i.board.value = formatNum(0,2)
		}
		
		// quick calculate KC undergraduate
		else if(i.location.value == "KC" && i.stuType.value == "Undergraduate")
		{
			
			if(i.residence.value == "In-state")
				i.tuition.value = formatNum(inKCUG * hoursUG,2)
			else if(i.residence.value == "Out-of-state")
				i.tuition.value = formatNum(outKCUG * hoursUG,2)
			else if(i.residence.value == "International")
				i.tuition.value = formatNum(intlKCUG * hoursUG,2)
				
			i.health.value = formatNum(0,2)
			i.orientation.value = formatNum(0,2)
            i.service.value = formatNum(0,2)
			
			document.getElementById("rBoard").style.display = "none";
			i.board.value = formatNum(0,2)
		}
		
		
		if(i.residence.value == "International")
		{
			i.health.value = formatNum(healthFee,2)
			i.orientation.value = formatNum(intlOrientUG,2)
			i.service.value = formatNum(intlServUG,2)
		}
		else
		{
			i.health.value = formatNum(0,2)
			i.orientation.value = formatNum(0,2)
            i.service.value = formatNum(0,2)
		}
		
		
		aidTotal = parseFloat(i.finaid.value) + parseFloat(i.grants.value) + parseFloat(i.scholarships.value) + parseFloat(i.loans.value) + parseFloat(i.parentplus.value);
		i.aid.value = formatNum(aidTotal,2)
		
		i.total.value = formatNum((parseFloat(i.tuition.value) + parseFloat(i.board.value) + 
						parseFloat(i.health.value) + parseFloat(i.orientation.value) + parseFloat(i.service.value)),2);
		i.adjtotal.value = "$" + formatNum(((parseFloat(i.total.value) - parseFloat(i.aid.value))),2);
	}
}


// format/validation functions
function formatNum(myNum, numOfDec)
   {
      var decimal = 1
      for(i=1; i<=numOfDec;i++)
         decimal = decimal *10

      var myFormattedNum = (Math.round(myNum * decimal)/decimal).toFixed(numOfDec)
      return myFormattedNum
   } 

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;
 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;   
}