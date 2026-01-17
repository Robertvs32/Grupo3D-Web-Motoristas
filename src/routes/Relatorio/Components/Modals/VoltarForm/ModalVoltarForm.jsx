import './modalVoltarForm.css'
import { Link } from 'react-router';

export default function ModalVoltarForm({setter, funcaoSalvarVoltar}){

    return(
        <div id="containerModalEnviarForm">

            <div id="containerModalIntern">

            <p style={{color: "black", fontWeight: "bold"}}>Deseja voltar?</p>

            <div id="containerBtnsModalEnviar">

                <button
                    id="buttonModalCancelar"
                    onClick={() => setter(ant => !ant)}
                >
                    Cancelar
                </button>

                <Link
                    id="buttonModalVoltar"
                    to={'./home'}
                >
                    Voltar sem salvar
                </Link>

                <button
                    id="buttonModalSalvar"
                    onClick={() => funcaoSalvarVoltar()}
                >
                    Salvar e sair
                </button>
            </div>
                
            </div>
            
        </div>
    );
}