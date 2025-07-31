import classes from './Error.module.css';

export default function Error() {
    return (
        <div className={classes.error}>
            <p>Usuário não encontrado</p>
        </div>
    );
}