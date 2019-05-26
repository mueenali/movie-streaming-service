
$(document).ready(()=> {
    $('#pass').keyup(()=> {
        $('#result').html(checkStrength($('#pass').val()))
    });
    let checkStrength=(password)=> {
        let strength = 0;
        if (password.length < 6) {
            $('#result').removeClass().addClass('short');
            return 'Too short'
        }
        if (password.length > 6) strength += 1;
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
        if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
        if (strength < 2) {
            $('#result').removeClass().addClass('weak');
            return 'Weak'
        } else if (strength === 2) {
            $('#result').removeClass().addClass('good');
            return 'Good'
        } else {
            $('#result').removeClass().addClass('strong');
            return 'Strong'
        }
    }
});