
document.addEventListener('click', e => {
    
    if (e.target.tagName === 'IMG') {
        
        const parent = e.target.parentNode;

        
        const siblings = parent.children;

      
        let span = null;
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i].tagName === 'SPAN') {
                span = siblings[i];
                break;
            }
        }

        
        if (span) {
            const link = span.getAttribute("data-link");
            console.log(link);  
            window.open(link, "_blank");
        } else {
            console.log("Nenhum <span> encontrado.");
        }
    }
});