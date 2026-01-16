import './relatorio.css'
import { useParams } from 'react-router'
import Checkbox from './Components/Checkbox/Checkbox'
import { useState } from 'react';
import DateTimeIni from './Components/DateTime/DateTimeIni';
import DateTimeFim from './Components/DateTime/DateTimeFim';
import InputRelatorio from './Components/InputRelatorio/InputRelatorio';
import Obs from './Components/Obs/Obs';
import Alimentacao from './Components/Alimentacao/Alimentacao';
import Atribuicao from './Components/Select/Atribuicao/Atribuicao';
import Setor from './Components/Select/Setor/Setor';
import Placa from './Components/Select/Placa/Placa';

export default function Relatorio(){

    const { flag } = useParams();
    const flagBoolean = flag.toLowerCase() === "true";

    const [state, setState] = useState(new Date())
    const [fim, setFim] = useState(new Date().getTime() + 10000);
    const [motorista, setMotorista] = useState('');
    const [alimentacao, setAlimentacao] = useState(false);
    const [array, setArray] = useState([
        {
            id: 1,
            refeicao: "",
            valor: ""
        }
    ])


    return(
        <div id="relatorioContainer">

            <h1 style={{color: "white", textAlign: 'center', margin: '10px 0 15px 0'}}>Relatorio</h1>

            <DateTimeIni
                nome="Data e hora início"
                state={state}
                setter={setState}
                dateTimeFim={fim}
            />

            <DateTimeFim
                nome="Data e hora final"
                state={state}
                setter={setState}
                dateTimeIni={state}
            />

            <InputRelatorio
                name="Motorista"
                value={motorista}
                setter={setMotorista}
            />

            <InputRelatorio
                name="Job"
                value={motorista}
                setter={setMotorista}
            />

            <InputRelatorio
                name="Km Inicial"
                value={motorista}
                setter={setMotorista}
            />

            <InputRelatorio
                name="Km Final"
                value={motorista}
                setter={setMotorista}
            />

            <InputRelatorio
                name="Contratante"
                value={motorista}
                setter={setMotorista}
            />

            <InputRelatorio
                name="Produtor(a)"
                value={motorista}
                setter={setMotorista}
            />

            <Checkbox
                name="Inversor"
            />

            <Checkbox
                name="Viagem"
            />

            <Checkbox
                name="Parceiro"
            />

            <Checkbox
                name="Pedágio"
            />

            <Checkbox
                name="Zona azul"
            />

            <Checkbox
                name="Estacionamento"
            />

            <Checkbox
                name="Alimentação"
                state={alimentacao}
                setter={setAlimentacao}
            />

            <Atribuicao
                state={motorista}
                setter={setMotorista}
            />

            <Setor
                state={motorista}
                setter={setMotorista}
            />

            <Placa
                state={motorista}
                setter={setMotorista}
            />

            {alimentacao && (
                <Alimentacao
                    array={array}
                    setter={setArray}
                /> 
            )}

            <Obs
                value={motorista}
                setter={setMotorista}
            />

            <button>Voltar</button>
            <button>Enviar</button>

        </div>
    )
}