import './modalEnviarForm.css'

export default function ModalEnviarForm({setter, funcaoEnviar}){
    return(
        <div id="containerModalEnviarForm">

            <div id="containerModalIntern">

            <p style={{color: "black", fontWeight: "bold"}}>Deseja enviar?</p>

            <div id="containerBtnsModalEnviar">
                <button
                    className="buttonModalFechar"
                    onClick={() => setter(ant => !ant)}
                >
                    Fechar
                </button>
                <button
                    className="buttonModalEnviar"
                    onClick={funcaoEnviar}
                >
                    Enviar
                </button>
            </div>
                
            </div>
            
        </div>
    );
}