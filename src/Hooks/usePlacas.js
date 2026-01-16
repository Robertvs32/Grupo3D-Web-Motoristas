import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

export default function usePlacas(){

    const buscaPlacas = async () => {
        const docRef = doc(db, "placas e valores", "WKoQg1pcB401ZWmAk2Pz");
        const docSnapShot = await getDoc(docRef);
        const placas = docSnapShot.data();

        return placas.placas;
    }

    return{
        buscaPlacas,
    }

}