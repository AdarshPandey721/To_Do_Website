function validateform() {
    var fm=validate();
	if (fm==true) {
		alert("Submitted Succesfully");
	}
	else {
		alert("Please fill deatils correctly");
	}
}
function validate()

{
    var fname=document.form.firstname.value;  
    var password=document.form.password.value;  
    var secondpassword=document.form.confirmpassword.value;
    var email=document.form.email.value;

    if (fname==null || fname==""){  
    alert("Name can't be blank");  
    return false;  
    }
else if(password.length<6){  
    alert("Password must be at least 6 characters long.");  
    return false;   
}    
    if(password!=secondpassword){  
        alert("password must be same!"); 
        return false;  
        }  
    if ((email.charAt(email.length - 4) != '.') && (email.charAt(email.length - 3) != '.'))
        {
            alert(". Invalid Position")
		return false;
        }
        if (email.indexOf('@') <= 0) {
            alert(" @ Invalid Position")
            return false;
        }
    return true;
}

