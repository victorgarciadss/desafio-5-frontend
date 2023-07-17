import { useContext } from "react";
import "../css/bankStatement.css"
import { GlobalContext } from "../CreateContext";

const BankStatement = () => {

    const { data } = useContext(GlobalContext);

    return(
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
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.dataTransferencia}</td>
                                <td>{item.valor}</td>
                                <td>{item.tipo}</td>
                                <td>{item.nomeOperadorTransacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default BankStatement;