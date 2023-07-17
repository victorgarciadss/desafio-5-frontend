import { useContext, useState } from "react"
import "../css/SearchForm.css"
import { GlobalContext } from "../CreateContext";

const SearchForm = () => {

  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperadorTransacao, setNomeOperadorTransacao] = useState('');

  const { data, setData } = useContext(GlobalContext);

  async function submitDataWithAllFilters(e) {
    e.preventDefault();

    if(dataInicio == "" && dataFim == "" && nomeOperadorTransacao == ""){
      alert("Insira dados se quiser um filtro!");
      return;
    }
    else if(dataInicio == "" && dataFim == ""){
      try {
        const response = await fetch("http://localhost:8080/transferencias/nome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ dataInicio, dataFim, nomeOperadorTransacao })
        });
  
        const responseData = await response.json();
        console.log(responseData)
        setData(responseData);
  
      } catch (err) {
        console.log(err);
      }
    }
    else{
      try {
        const response = await fetch("http://localhost:8080/transferencias/periodo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ dataInicio, dataFim, nomeOperadorTransacao })
        });
  
        const responseData = await response.json();
        setData(responseData);
  
      } catch (err) {
        console.log(err);
      }
    }
    

    

  }

  return (
    <form 
      className='form-container'
      onSubmit={submitDataWithAllFilters}
      action="">
      <div className="labels">
        <label htmlFor="">
          Data de Início <br />
          <input type="date" onChange={(e) => setDataInicio(e.target.value)} className='input' id="" />
        </label>
        <label htmlFor="">
          Data de Fim <br />
          <input type="date" onChange={(e) => setDataFim(e.target.value)} className='input' id="" />
        </label>
        <label htmlFor="">
          Nome do operador transacionado <br />
          <input type="text" onChange={(e) => setNomeOperadorTransacao(e.target.value)} className='input' />
        </label>
      </div>

      <button type="submit">Pesquisar</button>
    </form>
  )
}

export default SearchForm;