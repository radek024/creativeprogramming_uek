import Breadcrumb from "../components/breadcrumb";
import {
    useEffect,
    useState
} from "react";
import {
    db
} from "../firebase-config";
import {
    collection,
    doc,
    deleteDoc,
    query,
    orderBy,
    onSnapshot
} from 'firebase/firestore';
import { Link } from "react-router-dom";

export default function BillList() {
    const [billList, setBillList] = useState([]);



    const deleteBill = async (id) => {
        const postDoc = doc(db, "bills", id);
        const isDecided = window.confirm("Na pewno?");
        if (isDecided) await deleteDoc(postDoc);
    };

    useEffect(() => {
        const getBills = async () => {
            const billsCollectionRef = collection(db, 'bills');

            const q = query(billsCollectionRef, orderBy("createdAt", "desc"));

            onSnapshot(q, (snapshot) => {
                setBillList(snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id

                })));
            })
        }
        getBills();
    }, []);

    return (
        <div className="bill--list">
        <Breadcrumb link="/" text="wróć do strony głównej" />
        {console.log(typeof(billList))}
        {   
            billList.map(bill => {
                const datestring = ("0" + bill.createdAt.toDate().getDate()).slice(-2) + "-" + ("0"+(bill.createdAt.toDate().getMonth()+1)).slice(-2) + "-" +
                bill.createdAt.toDate().getFullYear() + " " + ("0" + bill.createdAt.toDate().getHours()).slice(-2) + ":" + ("0" + bill.createdAt.toDate().getMinutes()).slice(-2); 
                return (
                    <div className="bill--item" key={bill.id}>
                        <div className="bill--meta">
                            <strong>{bill.desc}</strong>
                            <small>{datestring}{" · "+bill.category}</small> 
                        </div>
                        <div className="bill-value">
                            {parseFloat(bill.value).toFixed(2)}
                        </div>
                        <div className="actions">
                            <button onClick={()=>{deleteBill(bill.id)}}>Usuń</button>
                            <Link to={"/edit-bill/"+bill.id}>
                                <button>Edytuj</button>
                            </Link>
                        </div>
                    </div>
                )
            })
        }
        </div>
    )
}