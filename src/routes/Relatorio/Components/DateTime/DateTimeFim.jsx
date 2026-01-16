import './dateTime.css'
import { ptBR } from 'date-fns/locale'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimeFim({nome, state, setter, dateTimeIni}){

    function changeValue(value){
        if(value < dateTimeIni){
            alert("Término não pode ser menor que o início!");
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