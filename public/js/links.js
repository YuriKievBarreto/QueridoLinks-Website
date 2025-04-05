
document.addEventListener('click', e => {
    
    if (e.target.tagName === 'IMG') {
        
        const pai = e.target.parentNode;

        
        const irmaos = pai.children;

      
        let span = null;
        for (let i = 0; i < irmaos.length; i++) {
            if (irmaos[i].tagName === 'SPAN') {
                span = irmaos[i];
                break;
            }
        }

        
        if (span) {
            const link = span.getAttribute("data-link");
            console.log(link);  
            window.open(link, "_blank");
        } 
    }
});