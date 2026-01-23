import '../select.css';
import { useEffect, useState } from 'react';
import usePlacas from '../../../../../Hooks/usePlacas';

export default function Placa({state, setter, setDadosPlaca}){

    const { buscaPlacas } = usePlacas();
    const [infosVeiculos, setInfosVeiculos] = useState([]);

    function alteraPlaca(event){
        const id = event.target.value;
        setter(id);
        console.log(id);
    } 

    useEffect(() => {
        const busca = async () => {
            let arrayPlacas = await buscaPlacas();
            setInfosVeiculos(arrayPlacas);
        }

        busca();
    }, []);

    useEffect(() => {
        if(state != ''){
            const objPlaca = infosVeiculos.find(item => 
                Number(state) == item.id
            );
            const objPlacaFormatado = {
                veiculo: objPlaca.carro,
                placa: objPlaca.placa
            }
            console.log(objPlacaFormatado)
            setDadosPlaca(objPlacaFormatado);
        }
        
    }, [state]);

    return(
        <div className="containerSelectRelatorio">
            <label className="labelSelectRelatorio">Placa</label>
            <select
                className="selectRelatorio"
                onChange={event => alteraPlaca(event)}
                value={state == '' ? state : Number(state)}
            >
                <option value='' disabled>Selecionar veículo</option>
                {infosVeiculos.map((opcao => (
                    <option value={opcao.id}>{`${opcao.carro} - ${opcao.placa}`}</option>
                )))}
            </select>
        </div>
    );
}