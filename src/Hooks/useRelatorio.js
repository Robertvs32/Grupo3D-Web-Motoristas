import { doc, getDoc, addDoc, collection, query, getDocs, setDoc, where } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";
import { useState } from "react";

export default function useRelatorio(){

    const [produtoraEmpresa, setProdutoraEmpresa] = useState('');
    const [job, setJob] = useState('');
    const [contratante, setContratante] = useState('');
    const [dateTimeIni, setDateTimeIni] = useState(new Date);
    const [dateTimeFim, setDateTimeFim] = useState(new Date);
    const [atribuicao, setAtribuicao] = useState('');
    const [motorista, setMotorista] = useState('');
    const [obs, setObs] = useState('');
    const [estacionamento, setEstacionamento] = useState('');
    const [valorEstacionamento, setValorEstacionamento] = useState('');
    const [idVeiculo, setIdVeiculo] = useState('');
    const [kmIni, setKmIni] = useState('');
    const [kmFim, setKmFim] = useState('');
    const [zonaAzul, setZonaAzul] = useState('');
    const [qtdZonaAzul, setQtdZonaAzul] = useState('');
    const [valorZonaAzul, setValorZonaAzul] = useState('');
    const [inversor, setInversor] = useState('');
    const [pedagio, setPedagio] = useState('');
    const [parceiro, setParceiro] = useState('');
    const [valorPedagioParceiro, setValorPedagioParceiro] = useState('');
    const [setor, setSetor] = useState('');
    const [outrosAtribuicao, setOutrosAtribuicao] = useState('');
    const [outrosSetor, setOutrosSetor] = useState('');
    const [alimentacao, setAlimentacao] = useState('');
    const [arrayAlimentacao, setArrayAlimentacao] = useState([
        { id: 1, refeicao: '', valor: '' }
    ]);
    const [foraPerimetro, setForaPerimetro] = useState('');
    const [viagem, setViagem] = useState('');
    const [dadosPlaca, setDadosPlaca] = useState('');

    const relatorioGetters = {
        motorista,
        dateTimeIni,
        dateTimeFim,
        obs,
        estacionamento,
        valorEstacionamento,
        job,
        produtoraEmpresa,
        contratante,
        kmIni,
        kmFim,
        zonaAzul,
        qtdZonaAzul,
        valorZonaAzul,
        inversor,
        pedagio,
        parceiro,
        valorPedagioParceiro,
        idVeiculo,
        atribuicao,
        setor,
        outrosAtribuicao,
        outrosSetor,
        alimentacao,
        arrayAlimentacao,
        foraPerimetro,
        viagem,
    }

    const relatorioSetters = {
        setMotorista,
        setDateTimeIni,
        setDateTimeFim,
        setObs,
        setEstacionamento,
        setValorEstacionamento,
        setJob,
        setProdutoraEmpresa,
        setContratante,
        setKmIni,
        setKmFim,
        setZonaAzul,
        setQtdZonaAzul,
        setValorZonaAzul,
        setInversor,
        setPedagio,
        setParceiro,
        setValorPedagioParceiro,
        setIdVeiculo,
        setAtribuicao,
        setSetor,   
        setOutrosAtribuicao,
        setOutrosSetor,
        setAlimentacao,
        setArrayAlimentacao,
        setForaPerimetro,
        setViagem,
        setDadosPlaca
    }

    const salvarUltimoRelatorio = async (uid) => {
        try{
            const docRef = doc(db, "relatorios salvos", uid)
            await setDoc(docRef, relatorioGetters);
            return {message: "Ok"}
        }catch(error){
            throw error;
        }
    }

    const buscaAtribuicoes = async () => {
        const docRef = doc(db, "atribuicoes", "IgxVe1QYFBXPgbZxxh89");
        const docSnapShot = await getDoc(docRef);
        const atribuicoes = docSnapShot.data();

        return atribuicoes.atribuicoes;
    }

    const buscaRelatorioSalvo = async (uid) => {
        const docRef = doc(db, "relatorios salvos", uid);
        const docSnapshot = await getDoc(docRef);
        const data = docSnapshot.data();
        return data;
    }

    const buscaSetor = async () => {
        const docRef = doc(db, "setor", "setor");
        const docSnapShot = await getDoc(docRef);
        const setor = docSnapShot.data();

        return setor.setores;
    }

    const buscaNomePorEmail = async (email) => {
        const colecao = collection(db, "users");
        const q = query(colecao, where("email", "==", email))
        const querySnapshot = await getDocs(q);
        const nome = querySnapshot.docs[0].data().user;

        return nome;
    }

    const verificaCampos = () => {
        const campos = [
            {valor: produtoraEmpresa, nome: "Produtora Empresa"},
            {valor: job, nome: "Job"},
            {valor: contratante, nome: "Contratante"},
            {valor: atribuicao, nome: "Atribuicao"},
            {valor: motorista, nome: "Motorista"},
            {valor: estacionamento, nome: "Estacionamento"},
            {valor: kmIni, nome: "Km Inicial"},
            {valor: kmFim, nome: "Km final"},
            {valor: zonaAzul, nome: "Zona azul"},
            {valor: inversor, nome: "Inversor"},
            {valor: pedagio, nome: "Pedagio"},
            {valor: parceiro, nome: "parceiro"},
            {valor: setor, nome: "Setor"},
            {valor: alimentacao, nome: "Alimentacao"}
        ];

        const valoresInvalidos = [
            '',
            'Selecionar veículo',
            'Selecionar setor',
            'Selecionar atribuição',
        ]

        const erros = [];

        campos.forEach(item => {
            const valorLimpo = String(item.valor ?? '').trim();
            if(valoresInvalidos.includes(valorLimpo)){
                erros.push(item.nome);
            }
        })

        if(erros.length == 1){
            throw new Error(`Preencha o campo: ${erros[0]}`);
        }
        if(erros.length != 0){
            throw new Error(`Preencha os campos: ${erros.join(', ')}`);
        }
    }

    const enviarFormulario = async () => {
        try{
            verificaCampos();
            const colecao = collection(db, "relatorios");
            const docRef = await addDoc(colecao, valores);
            alert(`Enviado com sucesso! ${docRef.id}`);
        }catch(error){
            alert(error.message)
        }
    }

    const dateIni = new Date(dateTimeIni);
    dateIni.setHours(0, 0, 0, 0);

    const dateFim = new Date(dateTimeFim);
    dateFim.setHours(0, 0, 0, 0);

    const horasTotais = (dateTimeFim - dateTimeIni) / 3600000;
    const horasTotaisMotorista = horasTotais > 10 ? horasTotais : 10;
    const horasTotaisCliente = horasTotais > 8 ? horasTotais : 8;

    const valores = {
        dadosPlaca,
        produtoraEmpresa,
        job,
        contratante,
        dateIni,
        dateFim,
        atribuicao,
        setor,
        motorista,
        dateTimeIni,
        dateTimeFim,
        horasTotaisMotorista,
        horasTotaisCliente,
        kmRodado: kmFim - kmIni,
        obs,
        estacionamento,
        valorEstacionamento,
        kmIni: Number(kmIni),
        kmFim: Number(kmFim),
        zonaAzul,
        qtdZonaAzul,
        valorZonaAzul,
        inversor,
        pedagio,
        parceiro,
        atribuicao,
        outrosAtribuicao,
        setor,
        outrosSetor,
        foraPerimetro,
        viagem,
        alimentacao,
        ...(alimentacao === true && {arrayAlimentacao: arrayAlimentacao}),
        verificado: false
    }

    const recuperaValues = (object) => {
        setMotorista(object.motorista);
        setObs(object.obs);
        setEstacionamento(object.estacionamento);
        setValorEstacionamento(object.valorEstacionamento);
        setJob(object.job);
        setProdutoraEmpresa(object.produtoraEmpresa);
        setContratante(object.contratante);
        setAlimentacao(object.alimentacao);
        setArrayAlimentacao(object.arrayAlimentacao ?? [{id: 1, refeicao: '', valor: ''}]);
        setKmIni(object.kmIni);
        setKmFim(object.kmFim);
        setOutrosAtribuicao(object.outrosAtribuicao);
        setOutrosSetor(object.outrosSetor);
        setParceiro(object.parceiro);
        setPedagio(object.pedagio);
        setValorPedagioParceiro(object.valorPedagioParceiro);
        setIdVeiculo(object.idVeiculo);
        setSetor(object.setor);
        setQtdZonaAzul(object.qtdZonaAzul);
        setValorZonaAzul(object.valorZonaAzul);
        setZonaAzul(object.zonaAzul);
        setInversor(object.inversor);
        setDateTimeIni(object.dateTimeIni.toDate());
        setDateTimeFim(object.dateTimeFim.toDate());
        setAtribuicao(object.atribuicao);
        setForaPerimetro(object.foraPerimetro)
    }

    return{
        buscaAtribuicoes,
        buscaSetor,
        relatorioGetters,
        relatorioSetters,
        buscaNomePorEmail,
        salvarUltimoRelatorio,
        buscaRelatorioSalvo,
        recuperaValues,
        enviarFormulario
    }

}