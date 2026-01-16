import './dateTime.css'
import { ptBR } from 'date-fns/locale'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DateTime({nome, state, setter, dateTimeFim}){

    function changeValue(value){
        if(value > dateTimeFim){
            alert("Início não pode ser maior que o término!");
            return;
        }
        setter(value);
    }

    return(
        <div className="dateTimeContainer">
            <label className="labelDateTime">{nome}</label>

            <DatePicker
                selected={state}
                onChange={(value) => changeValue(value)}
                locale={ptBR}
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect
                timeIntervals={1}
            />
        </div>
    );
}