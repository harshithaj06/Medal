import { useEffect, useState } from "react";
 
export const MedalList = (props) => {
  const [sorting, setSorting] = useState({ key: "gold", ascending: true });
  const [rowData, setRowData] = useState([]);
  const [isSort,setIsSort] = useState({ key: "code",sortIcon:true});
  
  useEffect(() => {
    const defaultSorting = props.data;
      defaultSorting?.sort((a, b) => {
        if(b.code > a.code)
        return -1;
      })
    setRowData(defaultSorting);
    }, [props.data,rowData]);

  useEffect(() => {
    const sortingData = props.data;
    const sortedMedal = sortingData?.sort((a, b) => {
      if(sorting.key === "gold" && b.gold === a.gold) {
       return b.silver - a.silver
      }else if((sorting.key === "silver" && b.silver === a.sliver) || ((sorting.key === "bronze" && b.bronze === a.bronze))|| (sorting.key === "total")){
          return b.gold - a.gold
        }
       return b[sorting.key]- a[sorting.key];
    });
    
       setRowData(sortedMedal);
    
  }, [sorting, rowData]);

  function applySorting(key, ascending) {
   
    setIsSort({key:key,sortIcon: true})
    setSorting({ key: key, ascending: ascending });
  }
  return (
    <div
      
      className="divTable"
    >
      <table className="medalTable">
        <thead>
          <tr >
          <th colspan="3">Medal Count</th>
            <th className={isSort.key === 'gold' && isSort.sortIcon ? "asc" : ""}
            
              onClick={() => applySorting("gold", !!sorting.ascending)}
            >
              <span class="gold"></span>
              
            </th>
            <th className={isSort.key === 'silver' && isSort.sortIcon  ? "asc" : ""}
             
              onClick={() => applySorting("silver", !!sorting.ascending)}
            >
             <span class="silver"/>
            </th>
            <th className={isSort.key === 'bronze' && isSort.sortIcon  ? "asc" : ""}
             
              onClick={() => applySorting("bronze", !!sorting.ascending)}
            >
              <span class="bronze"/>
            </th>
            <th className={isSort.key === 'total' && isSort.sortIcon  ? "asc" : ""}
             
             onClick={() => applySorting("total", !!sorting.ascending)}
           >
             Total
           </th>
          </tr>
        </thead>
        <tbody>
          {rowData.filter((item, i) => i < 10).map((item, index) => (
            <tr
              key={index}
             >
                 <td >{index + 1}</td>
                 <td >{item.code}</td>
                 <td><img src={require(`../../images/${item.code}.jpg`)} className="imgClassName"/></td>
                
              <td >{item.gold}</td>
              <td >{item.silver}</td>
              <td >{item.bronze}</td>
              <td >{item.gold + item.silver + item.bronze}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.errorsInfo && <div>Resources Not Found</div>}
    </div>
  );
};
export default MedalList;
