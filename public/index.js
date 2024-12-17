let InputNome = document.getElementById("inputnome");
let InputData = document.getElementById("inputdata");
let ButtonSave = document.getElementById("save");
let BirthdayList = document.getElementById("birthday-list");
let Form = document.getElementById("form");
let EditBtn = document.getElementById("Edit");
let EditCenter = document.getElementById("Editcenter");

// conectar usando prisma
async function DataBirthday() {
  try {
    const url = "http://localhost:7777/api/clients";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error for requisicion");
    }

    const Birthday = await response.json();
    console.log(Birthday);

    BirthdayList.innerHTML = ""; // Limpa a lista para evitar duplicação

    Birthday.forEach((Birthday) => {
      const List = document.createElement("div");
      const Name = document.createElement("div");
      const Data = document.createElement("div");
      const MenuEdit = document.createElement("div");
      const ButtonsDelete = document.createElement("div");
      const ButtonsEditar = document.createElement("div");

      List.className =
        "grid grid-cols-2 gap-4 p-2 items-center bg-white rounded-md shadow-md";
      Name.className = "text-gray-800 text-center";
      Data.className = "text-gray-800 text-center";

      // Preenchendo o conteúdo
      Name.innerHTML = `<span id="table-nome">${Birthday.nome}</span>`;
      Data.innerHTML = `<span id="table-data">${Birthday.data}</span>`;
      ButtonsDelete.innerHTML = `<div class="justify-center">
                            <form action="/deletar" method="post" class="flex justify-center items-center">
                                <input type="hidden" name="id" value="${Birthday.id}">
                                <button data-id="${Birthday.id}"
                                    class="bg-red-500 text-white py-2 px-4 rounded-md">Deletar</button>
                            </form>
                        </div>
                        `;
      ButtonsEditar.innerHTML = `<div class="justify-center">
                            <div class="flex justify-center items-center">
                                <button data-id="${Birthday.id}" id="Edit-${Birthday.id}" class="bg-yellow-500 text-white py-2 px-4 rounded-md">Editar</button>
                            </div>
                        </div>
                        `;

      MenuEdit.innerHTML = `<!-- Modal de Edição -->
        <div data-id="${Birthday.id}" class="Editcenter fixed inset-0 bg-black/50 hidden z-50 justify-center items-center">
            <div class="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 class="text-center text-xl font-bold text-gray-800 mb-4">Modo Edição</h2>
              <form action="/editar" method="post">
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <label for="inputnome" class="text-sm font-medium text-gray-700">Nome</label>
                        <input type="hidden" name="id" value="${Birthday.id}">
                        <input type="text" name="nome" id="inputnome" value="${Birthday.nome}"
                            class="h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="flex flex-col">
                        <label for="inputdata" class="text-sm font-medium text-gray-700">Data de nascimento</label>
                        <input type="text" name="data" id="inputdata" value="${Birthday.data}"
                            class="h-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>
              
                
                <div class="flex items-center justify-between mt-6">
                        <button id="close-modal-btn" class="bg-gray-500 text-white py-1 px-4 rounded-md">Fechar</button>
                        <button id="checkout-btn"  class="bg-green-500 text-white px-4 py-1 rounded-md">Finalizar
                            edição</button>
                    </div>
                </form>
            </div>
        </div>`;

      // Adicionando os elementos
      List.appendChild(Name);
      List.appendChild(Data);
      List.appendChild(ButtonsDelete);
      List.appendChild(ButtonsEditar);
      List.appendChild(MenuEdit);
      BirthdayList.appendChild(List);

      // Evento de Editar
      const editButton = List.querySelector(`#Edit-${Birthday.id}`);

      // abre modal
      const modal = List.querySelector(`.Editcenter`);
      editButton.addEventListener("click", function () {
        modal.style.display = "flex"; // Mostra o modal
      });

      // Evento de Fechar
      const closeButton = modal.querySelector("#close-modal-btn");
      closeButton.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "none"; // Fecha o modal
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          modal.style.display = "none";
        }
      });

    });
  } catch (error) {
    console.error("Error fetching Birthday", error);
  }
}

DataBirthday();
