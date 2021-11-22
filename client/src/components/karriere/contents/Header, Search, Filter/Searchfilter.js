import React from 'react';

const Filter = ({ chosen, setChosen }) => {
  return (
    <div>
      <form>
        <select name="chosen" id="chosen"  value={chosen} onChange={e => setChosen(e.target.value)}>
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