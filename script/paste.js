jQuery(function($) {
   /* ESC removes the error overlay */
   $(document).keyup(function(e) {
      if (e.keyCode == 27){
         $('.error').remove();
      }
   });

   /* tab key handling - gemo style */
   $('#code').keydown(function(e) {
      if (e.keyCode == 9 && !e.ctrlKey && !e.altKey) {
         if (this.setSelectionRange) {
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var top = this.scrollTop;
            var selected = this.value.slice(start, end);
            if (e.shiftKey) {
               // deindent
               var replacement = selected.replace(/^(\t|\s{4})/gm, '');
            } else {
               // indent
               var replacement = selected.replace(/^/gm, '\t');
            }
            this.value = this.value.slice(0, start) + replacement + this.value.slice(end);
            this.setSelectionRange(start, end + replacement.length - selected.length );
            this.scrollTop = top;
            e.preventDefault();
         }
         else if (document.selection.createRange) {
            this.selection = document.selection.createRange();
            this.selection.text = '\t';
            e.returnValue = false;
         }
      }
   })

   /* handle paste creation */
   $('#paste').click(function(e) {
      $('#top>.container').prepend('<div class="loader"></div>');
      var tags = $('#tags').val().split(',').map(function(t) {return t.trim()});
      var doc = {};
      doc.title = $('#title').val().trim();
      doc.content = $('#code').val().trim();
      doc.tags = tags;
      var jhxr = $Couch.create(doc, './ddoc/_update/create')
      jhxr.done(function (data) {
         var data_url = window.location.pathname + data._id;
         $.pjax({
               url: data_url,
               container: '#content',
               fragment: 'div'
         }).done(function () {
            $('#top>.container>.loader').remove();
            prettyPrint();
         });
      });
      jhxr.fail(function () {
            $('#top>.container>.loader').remove();
            $('#top>.container').prepend('<div class="error"></div>');
      });
      return false;
   })

   /* load archive */
   $Couch.view('timestamp', {limit:8, descending:true}).done(
      function(data) {
         var el = $("#archive ul");
         var titleTmpl = el.attr('title') || "";
         for (var i=0; i<data.rows.length; i++) {
            var date = new Date(data.rows[i].key).toLocaleDateString();
            var title = data.rows[i].value;
            var id = data.rows[i].id;
            var a = $('<a>').text(title);
            a.attr({href:id, title: titleTmpl});
            var b = $('<b>').text(date);
            $('<li>').append(b, a).appendTo(el);
         }
      });

   /* load tagcloud */
   $Couch.view('tags', {reduce:true, group:true}).done(
      function(data) {
         var el =  $('#tag-cloud ul');
         var titleTmpl = el.attr('title') || "";
         for (var i=0; i<data.rows.length; i++) {
            var tag = data.rows[i].key;
            var freq = data.rows[i].value;
            var a = $("<a>").text(tag);
            a.attr({title: titleTmpl + " " + tag,
                  href:"tags/" + tag});
            a.css("fontSize", (freq / 10 < 1) ? freq / 10 + 1 + "em":
                  (freq / 10 > 2) ? "2em" : freq / 10 + "em");
            $('<li>').append(a).appendTo(el);
         }
      });

})
