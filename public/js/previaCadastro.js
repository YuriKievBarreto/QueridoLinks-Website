const btnPrevia = document.getElementById('previa')

btnPrevia.addEventListener('click', e =>{
    //inputs
    const inpNome = document.getElementById('inpNome')
    const inpValor = document.getElementById('inpValor')
    const inpImg = document.getElementById('inpImg')
    

    //previas
    const previaNome = document.getElementById('pNome')
    const previaValor = document.getElementById('pValor')
    const previaImg = document.getElementById('pImg')
    console.log('apertei')

    previaImg.src = inpImg.value
    previaNome.innerHTML = inpNome.value
    previaValor.innerHTML = `R$:${inpValor.value}`
})