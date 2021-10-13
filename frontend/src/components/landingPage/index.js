import style from './landingPage.module.css';

const LandingPage = () => {
    return(
        <>
            <div className={style.welcome}>
                <h1 className={style.h1}>Welcome to Ulti Notes!</h1>           
            </div>
            <div>
                <hr className={style.welcomeLine} />
            </div>
            <div className={style.aboutApp}>
                <h3 className={style.appDescription}>The Mission:</h3>
                <p className={style.statement}>School and notes can be intimidating at times! The goal of Ulti Notes is to take the stress out of school so that you spend more time learning and less time stressing.</p>
            </div>
        </>
    );
}

export default LandingPage;
