import { useContext, useEffect, useState } from "react";
import "../css/bankStatement.css"
import { GlobalContext } from "../CreateContext";

const BankStatement = () => {

    const { data, setData } = useContext(GlobalContext);
    const itemsPerPage = 4;
    const [balance, setBalance] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/transferencias", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseAll = await response.json();
            setData(responseAll);
        }

        const fetchBalance = async () => {
            const response = await fetch("http://localhost:8080/transferencias/saldo", {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const responseBalance = await response.json();
            setBalance(responseBalance);
            console.log(responseBalance);
        }

        fetchData();
        fetchBalance();

    }, []);

    function formatDate(dateString){
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${day}/${month}/${year}`;
    }

    function changePointToComma(value){
        return String(value).replace(/\./g, ',');
    }

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
    }

    return (
        <>
            <main>
                <div className="bank-balance">
                    <div className="total-balance">
                        Saldo Total: R$ {changePointToComma(balance)}
                    </div>
                    <div>
                        Saldo no Período: R$ {changePointToComma(balance)}
                    </div>
                    
                </div>
                <table className="table">
                    <tbody>
                        <tr className="table-row">
                            <td>Dados</td>
                            <td>Valencia</td>
                            <td>Tipo</td>
                            <td>Nome do operador <br /> transacionado</td>
                        </tr>
                    
                        {data.slice(startIndex, endIndex).map((item) => (
                            <tr key={item.id}>
                                <td>{formatDate(item.dataTransferencia)}</td>
                                <td>R$ {changePointToComma(item.valor)}</td>
                                <td>{item.tipo}</td>
                                <td>{item.nomeOperadorTransacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer>
                    <button className="change-view" onClick={handlePrevPage}>&lt;&lt;</button>
                    <button className="change-view" onClick={handlePrevPage}>&lt;</button>
                    <div className="pages-numbers">
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <p key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</p>
                        ))}
                    </div>
                    
                    <button className="change-view" onClick={handleNextPage}>&gt;</button>
                    <button className="change-view" onClick={handleNextPage}>&gt;&gt;</button>
                </footer>

            </main>
        </>
    )
}

export default BankStatement;