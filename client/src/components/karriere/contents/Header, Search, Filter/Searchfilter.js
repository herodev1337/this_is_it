import React from 'react';

import styles from "styles/scss/karriere.module.scss"

const Filter = ({ chosen, setChosen }) => {
  return (
    <div>
      <form>
        <select name="chosen" id={styles.chosen}  value={chosen} onChange={e => setChosen(e.target.value)}>
          <option value="">Kein Filter</option>
          <option value="Kreativität"> Kreativität</option>
          <option value="Technik">Technik</option>
          <option value="Soziales">Soziales</option>
          <option value="Forschung">Forschung</option>
          <option value="Wirtschaft">Wirtschaft</option>
        </select>
      </form>
    </div>
  );
};

export default Filter;