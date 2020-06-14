import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addPropertiesToFavourites } from '../../actions/search';

const Container = styled.div`
  display: flex;
  width: 180px;
  height: 250px;
  border: 3px solid ${props => props.color};
  border-radius: 15px;
  justify-content: space-around;
  font-size: 3em;
  color: ${props => props.color};
`;

const Content = styled.div`
  align-self: center;
`;

const FoundHouseCard = ({ houses, addPropertiesToFavourites }) => {

  const matchingProperties = houses && houses.map(house => (
    <tr key={house.id}>
      <td>{house.address}</td>
      <td className="hide-sm">{house.price}</td>
      <td className="hide-sm">{house.rentalAverageInArea}</td>
      <td>{house.investmentReturn}</td>
      <td>{house.houseUrl}</td>
      <td>
        <button onClick={() => addPropertiesToFavourites(house.id)} className="btn-sml btn-success">Add to favourites</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Found Properties</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Address</th>
            <th className="hide-sm">Price</th>
            <th className="hide-sm">Rental average in area</th>
            <th className="hide-sm">Investment Return</th>
            <th>Visit Link</th>
            <th />
          </tr>
        </thead>
        <tbody>{matchingProperties}</tbody>
      </table>
    </Fragment>

  )

}

FoundHouseCard.propTypes = {

}

export default FoundHouseCard
