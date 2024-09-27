
const meuform = document.querySelector('.meuForm');



meuform.addEventListener('submit', async function(event) {
    event.preventDefault()
    
    const nome = document.querySelector('.nome').value;
    const data = document.querySelector('.data').value;
    const mensagem = document.querySelector('.mensagem').value;

    const dados = {
        nome: nome,
        data:data,
        mensagem:mensagem
    }
    try{
        const response = await fetch('http://localhost:3000/mensagem',{
            method:'post',
            headers:{
                "Content-type":'application/json'
            },
            body : JSON.stringify(dados)
        })

        const result = await response.json()
        console.log(result)
    }catch{
        console.error('Erro no envio do formulário')
    }
    
})