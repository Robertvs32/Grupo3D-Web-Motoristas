import './relatorio.css'
import { useParams } from 'react-router'
import Checkbox from './Components/Checkbox/Checkbox'
import DataInicio from './Components/DateTime/Date/DataInicio';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale'

export default function Relatorio(){

    const { flag } = useParams();
    const flagBoolean = flag.toLowerCase() === "true";
    const [state, setState] = useState(new Date())

    return(
        <div id="relatorioContainer">

            <h1 style={{color: "white", textAlign: 'center', margin: '10px 0 15px 0'}}>Relatorio</h1>

            <Checkbox
                name="Checkbox"
            />

            <DatePicker
                // style={{width: "500px"}}
                selected={state}
                onChange={(value) => setState(value)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeIntervals={1}
            />


        </div>
    )
}