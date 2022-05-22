import Breadcrumb from "../components/breadcrumb"
import { doc, getDoc, setDoc  } from 'firebase/firestore';
import { db,} from '../firebase-config';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBill(){
    const params = useParams();
    let navigate = useNavigate();

    const [bill, setBill] = useState({
        category: 'spozywcze',
        value: '',
        desc: '',
        createdAt: '2022-05-11'
    });

    useEffect(()=>{
        const getBill = async() => {
            const billDocRef = doc(db, 'bills', `${params.billId}`);
            const billSnap = await getDoc(billDocRef);
            setBill(billSnap.data())
        }
        getBill();
        
    },[params])

    function handleChange(event){
        console.log(bill.createdAt);
        const {name,value, type, checked} = event.target;
        setBill(prevBill => ({
            ...prevBill,
            [name]: type === "checkbox" ? checked : value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
               
        updateBill();
        navigate('/list');
    }

    const updateBill = async() => {
        await setDoc(doc(db,'bills',`${params.billId}`), bill);
    }

    return (
        <div>
            <Breadcrumb link="/list" text="wróć do listy" />
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
                <div className="form--part form--value">
                    <label htmlFor="value">
                        Podaj wydaną kwotę:
                    </label>
                    <input type="number" name="value" id="value" onChange={handleChange} value={bill.value} step="0.01" min="0" required/>
                </div>
                <div className="form--part form--category">
                    <label htmlFor="category">
                        Wybierz kategorię:
                    </label>
                    <select id="category" name="category" onChange={handleChange} value={bill.category}>
                        <option value="spozywcze">Zakupy spożywcze</option>
                        <option value="gastronomia">Gastronomia</option>
                        <option value="moda">Moda</option>
                        <option value="komunikacja">Komunikacja</option>
                        <option value="przemyslowe">Art. przemyslowe</option>
                        <option value="sztuka">Sztuka</option>
                        <option value="wyplata">Wypłata gotówki</option>
                        <option value="inne">Inne</option>
                    </select>
                </div>
                <div className="form--part form--note">
                    <label htmlFor="desc">
                        Krótka notatka:
                    </label>
                    <input type="text" name="desc" id="desc" onChange={handleChange} value={bill.desc} required/>
                </div>
                <button className="form--submit">Zmień</button>
            </form>
        </div>
    )
}