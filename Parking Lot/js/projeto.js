// Vamos adicionar ao gestor de eventos do js o clique do botão submit. O registarVeiculo vi ser a função com a programação pretendida. 
// O argumento "e" transporta as propriedades do botão

document.getElementById('formulario').addEventListener('submit',registarVeiculo);

function registarVeiculo(e){
	// criar as variáveis para receber os dados do formulário
	var marcaVeiculo=document.getElementById('marcaVeiculo').value;
	var matriculaVeiculo=document.getElementById('matriculaVeiculo').value;
	// Date() devolve a data e a hora
	var horaEntrada = new Date();
	
	// verificar se os campos estão nulos
	if(!marcaVeiculo || !matriculaVeiculo){
		alert("Preencha todos os campos!");
		return false;
	}
	
	// Criar o objecto veiculo
	var veiculo={
		marca: marcaVeiculo,
		matricula: matriculaVeiculo,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes()
	};
	
	// getItem('parque') verifica se existe o cookie com o nome parque
	if(localStorage.getItem('parque') === null){
		// criar o array veiculos
		var veiculos = [];
		// push é o método para adicionar os items O ARRAY
		veiculos.push(veiculo);
		// para escrever usamos o setItem juntamente com o JSON  e método stringify
		localStorage.setItem('parque',JSON.stringify(veiculos));
	}
	else{
		// carregar no array veiculos a informação já existente
		var veiculos=JSON.parse(localStorage.getItem('parque'));
		// carregar o novo item
		veiculos.push(veiculo);
		// vamos atualizar
		localStorage.setItem('parque',JSON.stringify(veiculos));
	}
	
	document.getElementById('formulario').reset();
	mostraParque();
	// evitar uma 2ª escrita
	e.preventDefault();
}

function mostraParque(){
	// veiculos é a variável que guarda temporariamente os dados
	var veiculos=JSON.parse(localStorage.getItem('parque'));
	// carregar parqueResultado é a variável que representa a tabela
	var parqueResultado=document.getElementById('resultados');
	
	parqueResultado.innerHTML='';
	
	// ciclo para percorrer os itms do array veiculos e adicionar à tabela resultados
    for (var i=0;i<veiculos.length;i++){
		var marca=veiculos[i].marca;
		var matricula=veiculos[i].matricula;
		var hora=veiculos[i].hora;
		var minutos=veiculos[i].minutos;

		parqueResultado.innerHTML+='<tr><td>'+marca+'</td>'+
		'<td>'+matricula+'</td>'+
		'<td>'+hora+':'+minutos+'</td><td><button onclick="saidaParque(\''+matricula+'\')" class="btn btn-danger">Remover</button></td></tr>';
       // para chegar ao valor de uma varaivel dentro de uma string usamos a seguinte sintaxe \''+variavel+'\'

	}		
	
}

function saidaParque(matricula){
	// carregar no array veiculos a informação já existente
	var veiculos=JSON.parse(localStorage.getItem('parque'));
	console.log(veiculos);

	// ciclo para percorer os items do ARRAY
	for(var i=0;i<veiculos.length;i++){
		if(veiculos[i].matricula==matricula){
			var horaAtual=new Date();  // Date devolve a data e hora atual
			// converter a hora de entrada em minutos
			var entrada=veiculos[i].hora*60+veiculos[i].minutos;
			var saida=horaAtual.getHours()*60+horaAtual.getMinutes();
			var pagar=(saida-entrada)*0.01;
			//document.getElementById('aviso').innerHTML="Valor a pagar é:"+pagar.toFixed(2);
			// para eliminar um item de um array usamos o método splice
			veiculos.splice(i,1);
			alert("Valor a pagar é:"+pagar.toFixed(2));
		}
	}
	localStorage.setItem('parque',JSON.stringify(veiculos));
	mostraParque();
}
















