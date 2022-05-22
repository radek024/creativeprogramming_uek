import Breadcrumb from "../components/breadcrumb"
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBill(){

    const [bill, setBill] = useState({
        category: 'spozywcze',
        value: '',
        desc: ''
    });
    let navigate = useNavigate();

    function handleChange(event){
        const {name,value, type, checked} = event.target;
        setBill(prevBill => ({
            ...prevBill,
            [name]: type === "checkbox" ? checked : value,
            createdAt: serverTimestamp()
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
               
        addNewBill();
        setBill(prevBill => ({
            category: '',
            value: 0,
            desc: '',
            createdAt: ''
        }));
    }

    const billsCollectionRef = collection(db, 'bills');

    const addNewBill = async() => {
        const docRef = await addDoc(billsCollectionRef, bill);
        navigate('/');
    }

    return (
        <div>
            <Breadcrumb link="/" text="wróć do strony głównej" />
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
                <button className="form--submit">Wyślij</button>
            </form>
        </div>
    )
}