import "./List.css"

export function List({ question, answers }: DisplayStatisticsProps) {
    console.log(question);
    console.log(answers);
    const labels = answers.map((a) => a.variant);
    //const data = answers.map((a) => a.amountSelected);

    return (
        <table className="list">
            <thead>
            <tr>
                <th>Ответы</th>
            </tr>
            </thead>
            <tbody>
            {labels.map(label => {
                return (
                    <tr key={label}>
                        <td>{label}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}