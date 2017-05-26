(function($) {
  function windowLoaded(e) {
    var form = document.forms[0];


        form.addEventListener('submit', function (e) {
            e.preventDefault();
            form.classList.add('loading')
            var name = form.elements.name.value.trim();
            // var email = form.elements[1].value.trim();
            var message = form.elements.message.value ? form.elements.message.value.trim() : 'self - No message';

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open('POST', '/contact', true) 
            xmlHttp.setRequestHeader('Content-type', 'application/json');

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState != 4) return;
                form.classList.remove('loading');
                if (xmlHttp.status == 200) {
                    form.classList.add('success');
                }else {
                    form.classList.add('error');                    
                }
            }

            var data = JSON.stringify({name: name, message: message}); 

            xmlHttp.send(data);
        });
  }

  window.addEventListener("load", windowLoaded);
})(window.jQuery);
