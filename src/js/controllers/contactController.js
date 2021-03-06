function contactController() {

}


$('.container').on('input', '#email', function(){
  if (emailIsValid($(this).val())) {
    $(this).addClass('is-valid');
    $(this).removeClass('is-invalid');
  } else {
    $(this).addClass('is-invalid');
    $(this).removeClass('is-valid');
  }
});

$('.container').on('input','#name', function(){
  if ($(this).val().length > 3) {
    $(this).addClass('is-valid');
    $(this).removeClass('is-invalid');
  } else {
    $(this).addClass('is-invalid');
    $(this).removeClass('is-valid');
  }
});

$('.container').on('input','#comments', function(){
  if ($(this).val().length > 10) {
    $(this).addClass('is-valid');
    $(this).removeClass('is-invalid');
  } else {
    $(this).addClass('is-invalid');
    $(this).removeClass('is-valid');
  }
});

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default contactController
