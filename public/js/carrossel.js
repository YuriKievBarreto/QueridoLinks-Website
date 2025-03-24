const imgs = document.querySelectorAll('.carrossel')
const radios = document.querySelectorAll('.navegacao>input')

let count = 0
radios[0].checked = true
let intervalo = 4000

intervala(intervalo)

function intervala(intervalo){

    const intervaloCarrossel = setInterval( () =>{
        mudaImg()
        radios.forEach((value, index) =>{
            if(index === count){
                radios[index].checked = true
            }else{
                radios[index].checked = false
            }
        
        
        })
    
        if(count !==0){
            intervalo = 7000
            clearInterval(intervaloCarrossel)
            intervala(intervalo)
        }
    }, intervalo)
}
 

function mudaImg(){
    
    if(count === 2){
        count = 0
        for(let img of imgs){
            img.style.marginLeft = `-${0}%`
            
        }
        return
    }
    count++
    imgs[count].style.marginLeft = `-${100}%`

    
    
    
    
}

