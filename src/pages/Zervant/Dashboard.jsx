import { useEffect ,useState} from 'react';
import Chart from 'chart.js/auto'
import MetaData from './MetaData';
import moment from 'moment'
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { categories } from './utils/constants';
import {dispatchGetAllFacture, fetchAllFacture } from '../../redux/actions/servantActions/factureAction';
import {dispatchGetAllProduct, fetchAllProduct } from '../../redux/actions/servantActions/productAction';
import {dispatchGetAllClientf, fetchAllClientf, listclientfs } from '../../redux/actions/servantActions/clientfAction';
import {dispatchGetAllFactureAdmin, fetchAllFactureAdmin } from '../../redux/actions/servantActions/factureAdminAction';
import { dispatchGetAllClientAdmin, fetchAllClientAdmin } from '../../redux/actions/servantActions/clientAdminAction';
import { dispatchGetAllProductAdmin, fetchAllProductAdmin } from '../../redux/actions/servantActions/productAdminAction';
const MainData = () => {

    const dispatch = useDispatch();

    const factures = useSelector(state=> state.factures)
    const facturesAdmin = useSelector(state=> state.facturesAdmin)
    const products = useSelector(state=> state.products)
    const productAdmin = useSelector(state=> state.productAdmin)
    const clientfs = useSelector(state=> state.clientfs)
    const clientAdmin = useSelector(state=> state.clientAdmin)
    const factureDetails = useSelector((state) => state.factureDetails)
    const { loading, error, facture } = factureDetails
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)
    const {user, isAdmin} = auth
console.log(token,"ou est token")
    useEffect(() => {
      const fetchData = async () => {
          try {
              if (user.role === 1) {
                  const [facturesAdmin, productAdmin, clientAdmin] = await Promise.all([
                      fetchAllFactureAdmin(token),
                      fetchAllProductAdmin(token),
                      fetchAllClientAdmin(token)
                  ]);
                 
                  dispatch(dispatchGetAllFactureAdmin(facturesAdmin));
                  dispatch(dispatchGetAllProductAdmin(productAdmin));
                  dispatch(dispatchGetAllClientAdmin(clientAdmin));
              } else if (user.role === 0) {
                  const [facture, product, client] = await Promise.all([
                      fetchAllFacture(token),
                      fetchAllProduct(token),
                      fetchAllClientf(token)
                  ]);
                
                  dispatch(dispatchGetAllFacture(facture));
                  dispatch(dispatchGetAllProduct(product));
                  dispatch(dispatchGetAllClientf(client));
              }
          } catch (error) {
              console.error("Une erreur s'est produite lors de la récupération des données :", error);
          }
      };
  console.log("dsvndkjhnvjkqdhjvkhdskjhvbjd",token)
      fetchData();
  }, [user.role,
     token,
      dispatchGetAllFacture,
       dispatchGetAllProduct, 
       dispatchGetAllClientf, 
       dispatchGetAllFactureAdmin,
        dispatchGetAllProductAdmin,
         dispatchGetAllClientAdmin,
         facturesAdmin,
         facture
        ]);
  
  console.log("dsvndkjhnvjkqdhjvkhdskjhvbjd",token)
    /*let totalAmount = orders?.reduce((total, order) => total + order.totalPrice, 0);*/
    const totalSum = factures.reduce((acc, cur) => acc + cur.total, 0);
///console.log(totalSum)
console.log(factures)
console.log(facturesAdmin)
console.log(productAdmin)
const totalSumAdmin = facturesAdmin.reduce((acc, cur) => acc + cur.total, 0);
console.log(totalSum)

let devise = factures.saveDevise
let deviseAdmin= facturesAdmin.SaveDevise

    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Ventes en ${date.getFullYear() - 2}`,
                borderColor: '#8A39E1',
                backgroundColor: '#8A39E1',
 data: months.map((m, i) => factures.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.total, 0)),
            },
            {
                label: `Ventes en ${date.getFullYear() - 1}`,
                borderColor: 'orange',
                backgroundColor: 'orange',
                data: months.map((m, i) => factures.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.total, 0)),
            },
            {
                label: `Ventes en ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => factures.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.total, 0)),
            },
        ],
    };
/******** */

const lineStateAdmin = {
    labels: months,
    datasets: [
        {
            label: `Ventes en ${date.getFullYear() - 2}`,
            borderColor: '#8A39E1',
            backgroundColor: '#8A39E1',
data: months.map((m, i) => facturesAdmin.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear() - 2).reduce((total, od) => total + od.total, 0)),
        },
        {
            label: `Ventes en ${date.getFullYear() - 1}`,
            borderColor: 'orange',
            backgroundColor: 'orange',
            data: months.map((m, i) => facturesAdmin.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear() - 1).reduce((total, od) => total + od.total, 0)),
        },
        {
            label: `Ventes en ${date.getFullYear()}`,
            borderColor: '#4ade80',
            backgroundColor: '#4ade80',
            data: months.map((m, i) => facturesAdmin.filter((od) => new Date(od.date1).getMonth() === i && new Date(od.date1).getFullYear() === date.getFullYear()).reduce((total, od) => total + od.total, 0)),
        },
    ],
};
    const statuses = ['Client professionnel', 'Client particulier'];

    const pieState = {
        labels: statuses,
        datasets: [
            {

                backgroundColor: ['#ef4444', '#22c55e',],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
              
               data: statuses.map((status) => clientfs.filter((item) => item.Typeclient === status).length),
            },
        ],
    };


    const pieStateAdmin = {
        labels: statuses,
        datasets: [
            {

                backgroundColor: ['#ef4444', '#22c55e',],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
              
               data: statuses.map((status) => clientAdmin.filter((item) => item.Typeclient === status).length),
            },
        ],
    };




    const barState = {
       labels: categories,
        datasets: [
            {
                label: "Produits",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: categories.map((cat) => products.filter((item) => item.category === cat).length),
            },
        ],
    };


    const barStateAdmin = {
        labels: categories,
         datasets: [
             {
                 label: "Produits",
                 borderColor: '#9333ea',
                 backgroundColor: '#9333ea',
                 hoverBackgroundColor: '#6b21a8',
                 data: categories.map((cat) => productAdmin.filter((item) => item.category === cat).length),
             },
         ],
     };


    const today = moment();
const condition = [
  'Non échues' , 'En retard (- de 30 jours)' ,'En retard (+ de 30 jours)' ,
];



const nonEchues = factures.filter((facture) => {
    const echaDate = moment(facture.echa, 'DD/MM/YYYY');
    console.log(echaDate)
    return echaDate > today;
   });
const enRetardMoins30Jours = factures.filter((facture) => {
    const echaDate = moment(facture.echa, 'DD/MM/YYYY');
    const daysDiff = moment().diff(echaDate, 'days');
    console.log(daysDiff);
    return daysDiff > 0 && daysDiff <= 30;
  });
const enRetardPlus30Jours = factures.filter((facture) => {
    const echaDate = moment(facture.echa, 'DD/MM/YYYY');
    const daysDiff = moment().diff(echaDate, 'days');
    console.log(daysDiff)
    return daysDiff > 30;
  });
const enRetardPlus30JoursAdmin = facturesAdmin.filter((factureAdmin) => {
    const echaDate = moment(factureAdmin.echa, 'DD/MM/YYYY');
    const daysDiff = moment().diff(echaDate, 'days');
    console.log(daysDiff)
    return daysDiff > 30;
  });
  const nonEchuesAdmin = facturesAdmin.filter((factureAdmin) => {
    const echaDate = moment(factureAdmin.echa, 'DD/MM/YYYY');
    console.log(echaDate)
    return echaDate > today;
  });
const enRetardMoins30JoursAdmin = facturesAdmin.filter((factureAdmin) => {
    const echaDate = moment(factureAdmin.echa, 'DD/MM/YYYY');
    const daysDiff = moment().diff(echaDate, 'days');
    console.log(daysDiff);
    return daysDiff > 0 && daysDiff <= 30;
  });
  const [data, setData] = useState([]);
  
  


    
const doughnutState = {
  labels: condition,
  datasets: [
    {
      backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
      hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
      data,
    },
  ],
    options: {
    legend: {
      display: true,
      labels: {
        generateLabels: function(chart) {
          const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
          labels.forEach((label, index) => {
            label.text += ' (' +data[index] + ')';
          });
          return labels;
        }
      }
    }
  }
};


const doughnutStateAdmin = {
    labels: condition,
    datasets: [
      {
        backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
        hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
        data,
      },
    ],

     options: {
      legend: {
        display: true,
        labels: {
          generateLabels: function(chart) {
            const labels = Chart.defaults.global.legend.labels.generateLabels(chart);
            labels.forEach((label, index) => {
              label.text += ' (' +data[index] + ')';
            });
            return labels;
          }
        }
      }
    }
  };
/*  useEffect(() => {
    if (user.role === 0) {
      setData([
        nonEchues.length,
        enRetardMoins30Jours.length,
        enRetardPlus30Jours.length,
      ]);
    } else
   if (user.role === 1) {
    {
      setData([
        nonEchuesAdmin.length,
        enRetardMoins30JoursAdmin.length,
        enRetardPlus30JoursAdmin.length,
      ]);
    }}
  }, [user.role, token, setData, data]);*/

  useEffect(() => {
    setData([
        nonEchues.length,
        enRetardMoins30Jours.length,
        enRetardPlus30Jours.length,
        nonEchuesAdmin.length,
        enRetardMoins30JoursAdmin.length,
        enRetardPlus30JoursAdmin.length,
      ]);
  }, [user.role, 
    setData, 
    token,
    dispatchGetAllFactureAdmin,
    dispatchGetAllFacture,
    facturesAdmin,
         facture
  ]);
  return (
        <>
            <MetaData title="Facture Dashboard | Flipkart" />
           <div style={{marginLeft:"140px" , width:"100%"}}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6" style={{marginTop:"60px"}}>
           <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
              <h4 className="text-gray-100 font-medium">Montant total des ventes</h4>
               {user.role==1 && <h2 className="text-2xl font-bold">{totalSumAdmin.toFixed(2)}  € {deviseAdmin}</h2>}
                {user.role==0 &&<h2 className="text-2xl font-bold">{totalSum.toFixed(2)}  € {devise}</h2>}

                </div>
                <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Factures</h4>
                   {user.role==1 && <h2 className="text-2xl font-bold">{facturesAdmin.length}</h2>}
                   {user.role==0 && <h2 className="text-2xl font-bold">{factures.length}</h2>}

                </div>
                <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Produits</h4>
                    {user.role ==1 &&<h2 className="text-2xl font-bold">{productAdmin.length}</h2>}
                    {user.role ==0 &&<h2 className="text-2xl font-bold">{products.length}</h2>}

                </div>
                <div className="flex flex-col bg-green-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Clients</h4>
           {user.role ==1 &&<h2 className="text-2xl font-bold">{clientAdmin.length}</h2>}
           {user.role ==0 &&<h2 className="text-2xl font-bold">{clientfs.length}</h2>}  
  
            </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                  {user.role==0 &&<Line data={lineState} />}
                  {user.role==1 &&<Line data={lineStateAdmin} />}

                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Factures Status</span>
                 {user.role==0 && <Doughnut data={doughnutState}/>}
                 {user.role==1 && <Doughnut data={doughnutStateAdmin}/>}    
    
            </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    {user.role ==0 &&<Bar data={barState} />}
                    {user.role ==1 &&<Bar data={barStateAdmin} />}

                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Client Status</span>
                    {user.role ==0 &&<Pie data={pieState} />}
                    {user.role ==1&&<Pie data={pieStateAdmin} />}

                </div>
             

            </div>
            </div>
        </>
    );
};

export default MainData;
