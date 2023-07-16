import "../css/SearchForm.css"

const SearchForm = () => {

    return(
        <form className='form-container' action="">
          <div className="labels">
            <label htmlFor="">
              Data de Início <br />
              <input type="date" className='input' id="" />
            </label>
            <label htmlFor="">
              Data de Fim <br />
              <input type="date" className='input' id="" />
            </label>
            <label htmlFor="">
              Nome do operador transacionado <br />
              <input type="text" className='input' />
            </label>
          </div>

          <button type="submit">Pesquisar</button>
        </form>
    )
}

export default SearchForm;