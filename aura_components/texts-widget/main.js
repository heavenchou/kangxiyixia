define(['underscore','text!./texts.tmpl'], function(_,template) {
  return {
    type: 'Backbone',
    events: {
    },
    resize:function() {
      var that=this;
      //this.$el.css("height", (window.innerHeight - this.$el.offset().top -18) +"px");

    },    
    showdef:function(wh,tofind) {
      var exists=$('div[data-wh="'+wh+'"]');
      if (exists.length) {
        this.$el.animate({scrollTop: exists.offset().top })
      } else {
        if (!wh) return;
        var textdom=$('<div><div data-aura-widget="text-widget" data-wh="'+wh+'" data-tofind="'+tofind+'"></div></div>');
        
        //var dom=this.$el.find(".texts").prepend(textdom);
        var dom=this.$el.find(".texts").html(textdom);	// 不要用插入的, 直接取代
        
        this.sandbox.start(textdom);
        //this.sandbox.widgets.start('text-widget',textdom);
        this.$el.animate({scrollTop: 0 })
        $("#page9_explain").scrollTop(0);
      }
    },
    render:function() {
      this.html(_.template(template,{}));
    },

    initialize: function() {
      $(window).resize( _.bind(this.resize,this) );
      this.resize();
      this.render();
      this.sandbox.on('wh.change',this.showdef,this);
      this.sandbox.on('tofind.change',this.showdef,this);
    }
  };
});
