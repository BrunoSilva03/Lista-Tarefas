var tarefa = [{
    nome: '',

    data: '',

    horario: '',
}];


function carregarTasks() {
    let tasks_container = document.querySelector("#tasksContainer");

    tasks_container.innerHTML = "";

  tarefa.forEach((el) => {
    let nome = el.nome;

    let data = el.data;

    let horario = el.horario;

    let tarefa_container = `
    <div class="tarefa">
    
    <input class="nome" placeholder="Tarefa" type="text" value="${nome}"/>
    
    <input class="data" placeholder="Data" type="date" value="${data}"/>
    
    <input class="horario" placeholder="Horário" type="datetime" value="${horario}"/>
    
        <div class="action">
            <a href="#" class="salvar">salvar💾</a>
            
            <a href="#" class="remover">❌</a>
            
        </div>
    
    </div>`;

    tasks_container.innerHTML += tarefa_container;
  });

  salvarTarefa();

  removerTarefa();

  travarOutros();
    
}

function removerTarefa() {
    document.querySelectorAll("#tasksContainer .remover").forEach((el, i) => {
        el.addEventListener("click", () => {
            tarefa.splice(i, 1);

            carregarTasks();
        })
    })
}

function adicionarTarefa() {
    tarefa.push({nome: "", data: "", horario: ""});
    carregarTasks();

    travarOutros(document.querySelector("#tasksContainer > div:last-child"))
}


function salvarTarefa() {
    document.querySelectorAll("#tasksContainer .salvar").forEach((el, i) => {
        el.addEventListener("click", () => {

            let nome = el.parentElement.parentElement.querySelector(".nome").value;

            let data = el.parentElement.parentElement.querySelector(".data").value;

            let horario = el.parentElement.parentElement.querySelector(".horario").value;

            if(!nome.length || !data.length || !horario.length) {
                alert("Todos os campos precisam ser preenchidos para continuar.");

                return false;
            }

            tarefa.splice(i, 1, {
                nome: nome,

                data: data,

                horario: horario,
            });

            carregarTasks();

            travarOutros(false);
        })
    })
}

function travarOutros(element) {
    if(element == false) {
        document.querySelectorAll(".tasks button, .tasks .container > div").forEach((el) => {
            el.classList.remove("disabled");
        });

        document.querySelector("containerDados").innerHTML = "";

        return false;
    }
}


//init
document.querySelector("#btnAdicionar").addEventListener("click", adicionarTarefa);
carregarTasks();


//capturarDados
document.querySelector("#btnCapturar").addEventListener("click", () => {
    document.querySelector("#containerDados").innerHTML = JSON.stringify(tarefa, undefined, 4);
});