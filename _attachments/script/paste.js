jQuery(function($) {

   /* tab handling - gemo style */
   $('#code').keydown(function(e) {
      if (e.keyCode == 9 && !e.ctrlKey && !e.altKey) {
         if (this.setSelectionRange) {
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var top = this.scrollTop;
            var selected = this.value.slice(start, end);
            if (e.shiftKey) {
               // deindent
               var replacement = selected.replace(/^\t/gm, '');
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

   $('#paste').click(function(e) {
      var doc = {};
      doc.title = $('#title').val().trim();
      doc.content = $('#code').val().trim();
      var tags = $('#tags').val().split(',');
      doc.tags = tags.map(function(t) {return t.trim()});
      $Couch.create(doc, './ddoc/_update/create').done(function (data) {
            window.location.pathname += data._id;
      })
      return false;
      //e.preventDefault();
   })

})
