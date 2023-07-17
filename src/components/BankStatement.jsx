import { useContext, useEffect, useState } from "react";
import "../css/bankStatement.css"
import { GlobalContext } from "../CreateContext";

const BankStatement = () => {

    const { data, setData } = useContext(GlobalContext);
    const itemsPerPage = 4;

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

        fetchData();

    }, []);

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
                    Saldo Total:
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
                                <td>{item.dataTransferencia}</td>
                                <td>R$ {item.valor}</td>
                                <td>{item.tipo}</td>
                                <td>{item.nomeOperadorTransacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <footer>
                    <button className="change-view" onClick={handlePrevPage}>&lt;&lt;</button>
                    <button className="change-view" onClick={handlePrevPage}>&lt;</button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <p key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</p>
                    ))}
                    <button className="change-view" onClick={handleNextPage}>&gt;</button>
                    <button className="change-view" onClick={handleNextPage}>&gt;&gt;</button>
                </footer>

            </main>
        </>
    )
}

export default BankStatement;