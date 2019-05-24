function getData(url, cbk) {
  $.ajax({
      url: url ,
      method: 'GET'
    })
    .done(function(info) {
      cbk(info);
    })
    .fail(function(err) {
      cbk(err);
    })
}

export default getData
