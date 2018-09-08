import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';

export default props => <img src={makeBlockie(props.address || "0xCF085317456133E93D72aB5Fc56025d8d3802C38")} alt={props.address || "0xCF085317456133E93D72aB5Fc56025d8d3802C38"}/>;
