d3.selectAll(".photobanner img").on("click", function() {        
    let btn = d3.select(this);       
    let uri = btn.attr('data-nav');
    window.location.href = uri;
});