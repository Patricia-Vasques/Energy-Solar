import './Dashboard.css'


const Dashboard = () => {
    const { unidades,unidadesAtivas,unidadeInativa } = dadosUnidades();
    const {mediaConsumo}=dadosLacamentos();
    return (
        <div className={styles.cardsUnidadades}>
            <CardUnidades titulo={"Total unidades"} valor={unidades.length}/>
            <CardUnidades titulo={"Unidades Ativas"} valor={unidadeInativa.length}/>
            <CardUnidades titulo={"Unidades Inativas"} valor={unidadesAtivas.length}/>
            <CardUnidades titulo={"Média de energia"} valor={mediaConsumo}/>
        </div>
    )
}
export default Dashboard