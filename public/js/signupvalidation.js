    function validateName(x, y) {
        var re = /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/;
        var n = document.getElementById(x);
        var er = document.getElementById(y);

        if (re.test(n.value)) {
            er.style.display = "none";
            n.style.background = '#ffffff';
            n.style.color = '#555';
            return true;
        } else {
            er.style.display = "block";
            n.style.background = '#e35152';
            n.style.color = '#ffffff';
            if (n.value == ''){
                er.innerHTML="This field cannot be left blank.";
            }else{
                er.innerHTML="Username must start with a letter. It may contain the symbols (.-_). Minimum of 3 Characters, Maximum of 20.";
            }
            return false;
        }
    }
    function validateEmail(email, error) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var em = document.getElementById(email);
        var er = document.getElementById(error);

        if (re.test(em.value)) {
            er.style.display = "none";
            em.style.background = '#ffffff';
            em.style.color = '#555';
            return true;
        } else {
            er.style.display = "block";
            em.style.background = '#e35152';
            em.style.color = '#ffffff';
            if (em.value == ''){
                er.innerHTML="This field cannot be left blank.";
            }else{
                er.innerHTML="You must enter a valid email address.";
            }
            return false;
        }
    }

    function validatePass(p1, p2, error, error2){
        var er = document.getElementById(error);
        var er2 = document.getElementById(error2);
        var pass1 = document.getElementById(p1);
        var pass2 = document.getElementById(p2);
        var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (re.test(pass1.value)){
            er.style.display = "none";
            er2.style.display = "none";
            pass1.style.background = '#ffffff';
            pass1.style.color = '#555';
            pass2.style.background = '#ffffff';
            pass2.style.color = '#555';
            if (pass2.value == '' || pass2.value != pass1.value){
                er2.style.display = "block";
                pass2.style.background = '#e35152';
                pass2.style.color = '#ffffff';
                er2.innerHTML="Passwords do not match";
                return false;
            }
            return true;

        }
        else{
            er.style.display = "block";
            pass1.style.background = '#e35152';
            pass1.style.color = '#ffffff';
            er2.style.display = "none";
            pass2.style.background = '#ffffff';
            pass2.style.color = '#555';
            if (pass1.value == ''){
                er.innerHTML="This field cannot be left blank.";
            }
            else{
                er.innerHTML="Your password must be at least 8 characters long and contain a letter and number.";
            }
            return false;
        }
    }

    function validateForm(){
        var error = 0;
        if(!validateName('name', 'nameError')){
            error++;
        }
        if(!validatePass('password','confirm', 'passError', 'confError')){
            error++;
        }
        if (!validateEmail('email','emailError')){
            error++
        }
        if(error > 0){
            document.getElementById('subError').innerHTML="Please fix the errors in the above fields";
            return false;
        }
    }