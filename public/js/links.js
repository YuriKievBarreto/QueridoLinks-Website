
document.addEventListener('click', e => {
    // Verifica se o clique foi em uma imagem
    if (e.target.tagName === 'IMG') {
        // Acessa o elemento pai do <img>
        const parent = e.target.parentNode;

        // Acessa todos os filhos do elemento pai
        const siblings = parent.children;

        // Itera sobre todos os irmãos e encontra o <span>
        let span = null;
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i].tagName === 'SPAN') {
                span = siblings[i];
                break;
            }
        }

        // Se um <span> for encontrado, você pode fazer algo com ele
        if (span) {
            const link = span.getAttribute("data-link");
            console.log(link);  // ou abrir o link com window.open
            window.open(link, "_blank");
        } else {
            console.log("Nenhum <span> encontrado.");
        }
    }
});