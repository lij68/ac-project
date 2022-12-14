// import React, {useState, useEffect} from 'react';
// import {Bar, Doughnut, Line} from 'react-chartjs-2';
// import Axios from 'axios';
//
// function Contents() {
//     const [confirmedData, setconfirmedData] = useState({});
//     const [qurantinedData, setqurantinedData] = useState({});
//     const [comparedData, setcomparedData] = useState({});
//
//     useEffect(() => {
//         const fetchEvents = async () => {
//             const res = await Axios.get('https://api.covid19api.com/total/dayone/country/kr');
//             makeData(res.data);
//         };
//         const makeData = items => {
//             const arr = items.reduce((acc, cur) => {
//                 const currentDate = new Date(cur.Date);
//                 const year = currentDate.getFullYear();
//                 const month = currentDate.getMonth();
//                 const date = currentDate.getDate();
//                 const confirmed = cur.Confirmed;
//                 const active = cur.Active;
//                 const death = cur.Deaths;
//                 const recovered = cur.Recovered;
//
//                 const findItem = acc.find(a => a.year === year && a.month === month);
//                 if (!findItem) {
//                     acc.push({
//                         year,
//                         month,
//                         date,
//                         confirmed,
//                         active,
//                         death,
//                         recovered
//                     });
//                 }
//                 if (findItem && findItem.date < date) {
//                     findItem.active = active;
//                     findItem.death = death;
//                     findItem.date = date;
//                     findItem.year = year;
//                     findItem.month = month;
//                     findItem.recovered = recovered;
//                     findItem.confirmed = confirmed;
//                 }
//                 return acc;
//             }, []);
//
//             const labels = arr.map(a => `${a.month + 1}???`);
//             setconfirmedData({
//                 labels,
//                 datasets: [
//                     {
//                         label: '?????? ?????? ?????????',
//                         backgroundColor: 'salmon',
//                         fill: true,
//                         data: arr.map(a => a.active)
//                     }
//                 ]
//             });
//             setqurantinedData({
//                 labels,
//                 datasets: [
//                     {
//                         label: '?????? ????????? ??????',
//                         borderColor: 'salmon',
//                         fill: false,
//                         data: arr.map(a => a.death)
//                     }
//                 ]
//             });
//             const last = arr[arr.length - 1];
//             setcomparedData({
//                 labels: ['?????????', '????????????', '??????'],
//                 datasets: [
//                     {
//                         label: '?????? ??????, ??????, ?????? ??????',
//                         backgroundColor: ['#ff3d67', '#059bff', '#ffc233'],
//                         borderColor: ['#ff3d67', '#059bff', '#ffc233'],
//                         fill: false,
//                         data: [last.confirmed, last.recovered, last.death]
//                     }
//                 ]
//             });
//         };
//         fetchEvents();
//     }, []);
//
//     return (
//         <div>
//             <section>
//                 <h2>?????? ????????? ??????</h2>
//                 <div className="contents">
//                     <div>
//                         <Bar
//                             data={confirmedData}
//                             options={
//                                 ({
//                                     titile: {
//                                         display: true,
//                                         text: '?????? ????????? ??????',
//                                         fontsize: 16
//                                     }
//                                 },
//                                     {legend: {display: true, position: 'bottom'}})
//                             }
//                         />
//                     </div>
//                     <div>
//                         <Line
//                             data={qurantinedData}
//                             options={
//                                 ({
//                                     titile: {
//                                         display: true,
//                                         text: '?????? ????????? ??????',
//                                         fontsize: 16
//                                     }
//                                 },
//                                     {legend: {display: true, position: 'bottom'}})
//                             }
//                         />
//                     </div>
//                     <div>
//                         <Doughnut
//                             data={comparedData}
//                             options={
//                                 ({
//                                     titile: {
//                                         display: true,
//                                         text: `?????? ??????, ??????, ?????? (${new Date().getMonth +
//                                         1}???)`,
//                                         fontsize: 16
//                                     }
//                                 },
//                                     {legend: {display: true, position: 'bottom'}})
//                             }
//                         />
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// }
//
// export default Contents;
