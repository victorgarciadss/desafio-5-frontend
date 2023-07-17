import './css/App.css'

import SearchForm from "./components/SearchForm"
import BankStatement from './components/BankStatement'
import CreateProvider from './CreateContext'

function App() {

  return (
    <>
      <div className='inputs-container'>
        <CreateProvider>
          <SearchForm />
          <BankStatement />
        </CreateProvider>

      </div>
    </>
  )
}

export default App
