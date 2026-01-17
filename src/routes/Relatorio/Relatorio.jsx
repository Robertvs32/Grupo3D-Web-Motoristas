import './relatorio.css'
import { useParams, useNavigate  } from 'react-router'
import Checkbox from './Components/Checkbox/Checkbox'
import { useEffect, useState, useContext } from 'react';
import DateTimeIni from './Components/DateTime/DateTimeIni';
import DateTimeFim from './Components/DateTime/DateTimeFim';
import InputRelatorio from './Components/InputRelatorio/InputRelatorio';
import Obs from './Components/Obs/Obs';
import Alimentacao from './Components/Alimentacao/Alimentacao';
import Atribuicao from './Components/Select/Atribuicao/Atribuicao';
import Setor from './Components/Select/Setor/Setor';
import Placa from './Components/Select/Placa/Placa';
import useRelatorio from '../../Hooks/useRelatorio';
import ModalEnviarForm from './Components/Modals/EnviarForm/ModalEnviarForm';
import ModalVoltarForm from './Components/Modals/VoltarForm/ModalVoltarForm';
import { AuthContext } from '../../Context/authContext';


export default function Relatorio(){

    const navigate = useNavigate();

    const { flag } = useParams();
    const flagBoolean = flag.toLowerCase() === "true";
    const [showModalEnviar, setShowModalEnviar] = useState(false);
    const [showModalVoltar, setShowModalVoltar] = useState(false);
    const { buscaNomePorEmail, relatorioGetters, relatorioSetters, salvarUltimoRelatorio, buscaRelatorioSalvo, recuperaValues } = useRelatorio();
    const { user } = useContext(AuthContext);

    const salvarVoltar = async () => {
        try{
            const response = await salvarUltimoRelatorio(user.uid);
            navigate('./home');
            setTimeout(() => {
                alert(response.message);
            }, 300)
        }catch(error){
            alert(error);
        }
    }

    useEffect(() => {
        const busca = async () => {
            if(user){
                const nome = await buscaNomePorEmail(user.email);
                relatorioSetters.setMotorista(nome);
            }
            if(flagBoolean && user){
                const objectDados = await buscaRelatorioSalvo(user.uid);
                if(objectDados){
                    recuperaValues(objectDados);
                }else{
                    alert("Nao ha relatorios a serem carregados!");
                }
            }
        }
        busca();
    }, [user, flagBoolean])

    return(
        <div id="relatorioContainer">

            <h1 style={{color: "white", textAlign: 'center', margin: '10px 0 15px 0'}}>Relatorio</h1>

            <DateTimeIni
                nome="Data e hora início"
                state={relatorioGetters.dateTimeIni}
                setter={relatorioSetters.setDateTimeIni}
                dateTimeFim={relatorioGetters.dateTimeFim}
            />

            <DateTimeFim
                nome="Data e hora final"
                state={relatorioGetters.dateTimeFim}
                setter={relatorioSetters.setDateTimeFim}
                dateTimeIni={relatorioGetters.dateTimeIni}
            />

            <InputRelatorio
                name="Job"
                value={relatorioGetters.job}
                setter={relatorioSetters.setJob}
            />

            <InputRelatorio
                name="Km Inicial"
                value={relatorioGetters.kmIni}
                setter={relatorioSetters.setKmIni}
            />

            <InputRelatorio
                name="Km Final"
                value={relatorioGetters.kmFim}
                setter={relatorioSetters.setKmFim}
            />

            <InputRelatorio
                name="Contratante"
                value={relatorioGetters.produtorEmpresa}
                setter={relatorioSetters.setProdutorEmpresa}
            />

            <InputRelatorio
                name="Produtor(a)"
                value={relatorioGetters.produtorPessoa}
                setter={relatorioSetters.setProdutorPessoa}
            />

            <Checkbox
                name="Inversor"
                state={relatorioGetters.inversor}
                setter={relatorioSetters.setInversor}
            />

            <Checkbox
                name="Viagem"
                state={relatorioGetters.foraPerimetro}
                setter={relatorioSetters.setForaPerimetro}
            />

            <Checkbox
                name="Parceiro"
                state={relatorioGetters.parceiro}
                setter={relatorioSetters.setParceiro}
            />

            {relatorioGetters.parceiro && relatorioGetters.pedagio && (
                <InputRelatorio
                    name="Valor pedagio parceiro"
                    value={relatorioGetters.valorPedagioParceiro}
                    setter={relatorioSetters.setValorPedagioParceiro}
                />
            )}
            

            <Checkbox
                name="Pedágio"
                state={relatorioGetters.pedagio}
                setter={relatorioSetters.setPedagio}
            />

            <Checkbox
                name="Zona azul"
                state={relatorioGetters.zonaAzul}
                setter={relatorioSetters.setZonaAzul}
            />

            {relatorioGetters.zonaAzul && (
                <>
                    <InputRelatorio
                        name="Quantidade zona azul"
                        value={relatorioGetters.qtdZonaAzul}
                        setter={relatorioSetters.setQtdZonaAzul}
                    />

                    <InputRelatorio
                        name="Valor zona azul"
                        value={relatorioGetters.valorZonaAzul}
                        setter={relatorioSetters.setValorZonaAzul}
                    />
                </>
            )}
            
            <Checkbox
                name="Estacionamento"
                state={relatorioGetters.estacionamento}
                setter={relatorioSetters.setEstacionamento}
            />

            <Checkbox
                name="Alimentação"
                state={relatorioGetters.alimentacao}
                setter={relatorioSetters.setAlimentacao}
            />

            <Atribuicao
                state={relatorioGetters.atribuicao}
                setter={relatorioSetters.setAtribuicao}
            />

            <Setor
                state={relatorioGetters.setor}
                setter={relatorioSetters.setSetor}
            />

            <Placa
                state={relatorioGetters.placa}
                setter={relatorioSetters.setPlaca}
            />

            {relatorioGetters.alimentacao && (
                <Alimentacao
                    array={relatorioGetters.arrayAlimentacao}
                    setter={relatorioSetters.setArrayAlimentacao}
                /> 
            )}

            <Obs
                value={relatorioGetters.obs}
                setter={relatorioSetters.setObs}
            />

            <div id="containerBtns">
                <button 
                    className="btnRelatorio"
                    onClick={() => setShowModalVoltar(true)}
                >
                    Voltar
                </button>
                <button 
                    className="btnRelatorio"
                    onClick={() => setShowModalEnviar(true)}
                >
                    Enviar
                    </button>
            </div>

            {showModalEnviar && (
                <ModalEnviarForm
                    setter={setShowModalEnviar}
                />
            )}

            {showModalVoltar && (
                <ModalVoltarForm
                    setter={setShowModalVoltar}
                    funcaoSalvarVoltar={salvarVoltar}
                />
            )}
            

        </div>
    )
}