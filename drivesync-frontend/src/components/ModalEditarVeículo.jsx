import { useState } from "react";
import ReactModal from "react-modal";

import axios from "axios";

export function ModalEditarVeiculo() {

    const baseUrl = "https://localhost:7298/api/veiculos";
    const [modalEditar, setModalEditar] = useState (false);

    const [veiculoSelecionado, setVeiculoSelecionado] = useState({
        id: '',
        marca: '',
        modelo: '',
        ano: '',
        placa: '',
        quilometragem: '',
        tp_combustivel: '',
        dt_aquisicao: '',
        status: ''
    })

    const abrirFecharModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setVeiculoSelecionado({
            ...veiculoSelecionado, [name]: value
        });
        console.log(veiculoSelecionado);
    }

    const selecionarVeiculo=(veiculo, opcao)=>{
        setVeiculoSelecionado(veiculo);
            (opcao==="Editar") &&
                abrirFecharModalEditar();
    }

    const pedidoPut=async() =>{
        await axios.put(baseUrl+"/"+veiculoSelecionado.id, veiculoSelecionado)
        .then(response =>{
            var resposta=response.data;
            var dadosAuxiliar = data;
            dadosAuxiliar.map(veiculo=>{
                if(veiculo.id===veiculoSelecionado.id){
                    veiculo.modelo=resposta.modelo;
                    veiculo.ano=resposta.ano;
                    veiculo.marca=resposta.marca;
                    veiculo.dt_aquisicao=resposta.dt_aquisicao;
                    veiculo.quilometragem=resposta.quilometragem;
                    veiculo.placa=resposta.placa;
                    veiculo.tp_combustivel=resposta.tp_combustivel;
                    veiculo.status=resposta.status;
                }
            });
            abrirFecharModalEditar();
        }).catch(error=>{
            console.log(error);
        })
    }

    return (
        <ReactModal
            isOpen={modalEditar}
            contentLabel="Example Modal"
            className="modal fixed inset-0 flex items-center justify-center overflow-auto"
            overlayClassName="modal-overlay fixed inset-0 z-40 bg-black bg-opacity-40"
            shouldCloseOnOverlayClick
        >
            <div className="modal-content bg-white shadow-lg rounded-lg w-full max-w-md ">

                <div className="modal-header flex justify-between items-center px-6 py-4 bg-gray-50 rounded-t-lg">
                    <h3 className="modal-title text-lg font-semibold text-gray-900">Adicionar novo veículo</h3>
                    <button className="modal-close text-gray-500 hover:text-gray-700" onClick={() => abrirFecharModalEditar()}>
                        <span className="sr-only">Fechar</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <hr></hr>

                <div className="modal-body px-5 py-0 ">
                    <form class="p-4 md:p-5 ">
                        <div class="grid mb-1 w-full">

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="text" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite o modelo"
                                    value={veiculoSelecionado && veiculoSelecionado.modelo}/>
                                </div>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Placa</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="text" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite a placa"
                                    value={veiculoSelecionado && veiculoSelecionado.placa}/>
                                </div>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Tipo do Combustível</label>
                                <select id="category" name="tp_combustivel" onChange={handleChange} class="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={veiculoSelecionado && veiculoSelecionado.tp_combustivel}>
                                    <option selected="">Selecione um tipo</option>
                                    <option value="Gasolina Comum">Gasolina Comum</option>
                                    <option value="Etanol">Etanol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Flex">Flex</option>
                                </select>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Marca</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="text" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite a marca"
                                    value={veiculoSelecionado && veiculoSelecionado.marca}/>
                                </div>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Ano</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="number" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite o ano"
                                    value={veiculoSelecionado && veiculoSelecionado.ano}/>
                                </div>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Quilometragem</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="number" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite a quilometragem"
                                    value={veiculoSelecionado && veiculoSelecionado.quilometragem}/>
                                </div>
                            </div>

                            <div class="col-span-2 mb-2">
                                <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Data de Aquisição</label>
                                <div class="relative mt-1 rounded-md shadow-sm">
                                    <input type="date" name="price" id="name" onChange={handleChange} class="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Digite a data"
                                    value={veiculoSelecionado && veiculoSelecionado.dt_aquisicao}/>
                                </div>
                            </div>

                        </div>

                        <div className="flex justify-between gap-2 mt-8">
                            <button onClick={() => abrirFecharModalEditar()} type="button" className="w-1/2 flex justify-center items-center text-gray-900 border bg-white hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                Cancelar
                            </button>

                            <button type="submit" onClick={()=>pedidoPut()} className="w-1/2 flex justify-center items-center text-white border bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                                </svg>
                                Salvar
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        </ReactModal>
    );
}
