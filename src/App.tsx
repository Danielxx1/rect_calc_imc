import { useState } from 'react';
import  Styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem/GridItem'

import { levels, calculateImc, Level } from './components/helpers/imc'

const App = () => {
  const [heightField, setheightField] = useState<number>(0);
  const [WeightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
 
  const handleCalculateButton = () => {
    if(heightField && WeightField){
      setToShow(calculateImc(heightField, WeightField));
    } else {
        alert("Digite todos os Campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setWeightField(0);
    setheightField(0);
  }

  return (
    <div className={Styles.main}>
      <header>
        <div className={Styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={Styles.container}>
        <div className={Styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para indice de massa corpórea ,parâmetro adotado pela Organizaçao Mundial de Saúde para caucular o peso ideal de cada pessoa.</p>

          <input 
            type="number" 
            placeholder='Digite a sua altura. Ex 1.5 (em metros)'
            value={heightField > 0 ? heightField : ''} 
            onChange={e => setheightField(parseFloat(e.target.value))}         
            disabled= {toShow ? true : false}
          /> 
          <input 
            type="number" 
            placeholder='Digite o seu peso. Ex 75.3 (em Kg)'
            value={WeightField > 0 ? WeightField : ''} 
            onChange={e => setWeightField(parseFloat(e.target.value))}         
            disabled= {toShow ? true : false}
          />  

          <button onClick={handleCalculateButton} disabled= {toShow ? true : false} >Calcular</button>     
        </div>
        <div className={Styles.rightSide}>
          {!toShow &&
            <div className={Styles.grid}>
              {levels.map((item, key) =>(
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={Styles.rightBig}>
              <div className={Styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;