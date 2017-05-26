(function($) {
  function windowLoaded(e) {
    var form = document.forms[0];


        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.classList.add('loading')
            var name = form.elements[0].value.trim();
            var email = form.elements[1].value.trim();
            var message = form.elements[2].value ? form.elements[1].value.trim() : '';

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', '/contact', true) 
            xmlHttp.setRequestHeader('Content-type', 'application/json');

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState != 4) return;
                form.classList.remove('loading');
                if (xmlHttp.status == 200) {
                    console.log('message sent');
                    form.classList.add('success');
                }else {
                    console.log('sending failed');
                    form.classList.add('error');                    
                }
            }

            var data = JSON.stringify({name: name, email: email, message: message}); 

            xmlHttp.send(data);
        });
  }

  window.addEventListener("load", windowLoaded);
})(window.jQuery);
