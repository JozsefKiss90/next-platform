export default function login_validate(values){
    const errors = {};

    if (!values.email) {
        errors.email = 'Szükséges mező!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Érvényltelen email cím!';
    }

    // validation for password
    if(!values.password){
        errors.password = "Szükséges mező!";
    } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "8-nál nagyobbnak és 20 karakternél rövidebbnek kell lennie!";
    } else if(values.password.includes(" ")){
        errors.password = "Érvényltelen jelszó!";
    }

    return errors;
 
}

export function registerValidate(values){
    const errors = {};

    if(!values.username){
        errors.username = "Szükséges mező!";
    }else if(values.username.includes(" ")){
        errors.username = "Érvényltelen felhasználónév!"
    }

    if (!values.email) {
        errors.email = 'Szükséges mező!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Érvényltelen email cím';
    }

       // validation for password
       if(!values.password){
        errors.password = "Szükséges mező!";
    } else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "8-nál nagyobbnak és 20 karakternél rövidebbnek kell lennie!";
    } else if(values.password.includes(" ")){
        errors.password = "Érvényltelen jelszó";
    }

    // validate confirm password
    if(!values.cpassword){
        errors.cpassword = "Szükséges mező";
    } else if(values.password !== values.cpassword){
        errors.cpassword = "A jelszó nem egyezik...!"
    } else if(values.cpassword.includes(" ")){
        errors.cpassword = "Érvénytelen jelszó megerősítése!"
    }

    return errors;
}