import {
    collection,
    query,
    orderBy,
    onSnapshot
} from 'firebase/firestore';
import {
    useState,
    useEffect
} from "react";
import Breadcrumb from "../components/breadcrumb"
import {
    db
} from "../firebase-config";
import dateFormat from '../inc/img/dateFormat';

export default function Stats() {
    const [billList, setBillList] = useState([]);
    const [stats, setStats] = useState({
        sum: 0.0,
        count: 0
    });

    const [catStats, setCatStats] = useState([]);
    const [dailyStats, setDailyStats] = useState([]);

    function createCatStats(){
        const bills = billList;
        const catStats = [];

        const catNames = [...new Set(bills.map(el => el.category))];
        catNames.forEach(cat => {
            let catSum = 0.0;
            bills.forEach(el => el.category === cat? catSum+=parseFloat(el.value) : "");
            catStats.push({
                name: cat,
                sum: catSum
            })
        });
        setCatStats(catStats);
        setStats({
            count: 4,
            sum: 12.50
        })
        
    }
    
    function createDailyStats(){
        const stats = billList;
        const statDates = [...new Set(stats.map(el => dateFormat('d-m-Y',el.createdAt)))];

        const dailyStats = [];


        statDates.forEach(day=>{
            let daySum = 0.0;
            let dayCount = 0;
            let categories = []
            stats.forEach(stat=>{
                if(dateFormat('d-m-Y',stat.createdAt)===day){
                    daySum += parseFloat(stat.value);
                    dayCount++;
                    if(!categories.includes(stat.category)) categories.push({name: stat.category, catSum:stat.value})
                    else categories.forEach(cat => cat.name === stat.category? cat.value+=stat.value : "");
                    
                }
            });
            dailyStats.push({
                date: day,
                sum: daySum.toFixed(2),
                count: dayCount,
                category: categories
            })
        });

        setDailyStats(dailyStats);
        console.log(dailyStats)
    }


    useEffect(()=>{
        createCatStats();
        createDailyStats();
    }, [billList]);

    useEffect(() => {
        const getBills = async () => {
            const billsCollectionRef = collection(db, 'bills');

            const q = query(billsCollectionRef, orderBy("createdAt", "desc"));

            onSnapshot(q, (snapshot) => {
                setBillList(snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id

                })), );
            })
        }
        getBills();
    }, []);

    return (
        <div>
            <Breadcrumb link="/" text="wróć do strony głównej" />
            <p>Wydałeś {stats.sum}, ile razy: {stats.count}</p>
            <p>
                W danych kategoriach:
            </p>
                <ul>
                {catStats.map(el=>{
                    return (
                        <li key={el.name}>{el.name}: {el.sum}</li>
                    )
                })}
                </ul>
                <ul>
                {dailyStats.map(el=>{
                    return (
                        <li key={el.date}>{el.date}: {el.sum}, rekordów: {el.count}</li>
                    )
                })}
                </ul>
            </div>
    )
}