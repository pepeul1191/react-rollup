import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../configs/constants';
import DataTable from '../components/DataTable';

const Home = () => {
  const dataTableRef = useRef(null);

  useEffect(() => {
    dataTableRef.current.fetchList();
  });

  return (
    <div>
      <h2>Home</h2>
      <h4>BASE_URL = {BASE_URL}</h4>
      <p>Bienvenido a la página de inicio.</p>
      <DataTable 
        ref={dataTableRef}
        path="/template" 
        trs={[
          {style: {}, type: 'label', key: 'id', },
          {style: {}, type: 'input[text]', key: 'name', }, 
        ]}
        ths={[
          {style: {}, caption: 'id'},
          {style: {}, caption: 'Nombre'}, 
          {style: {}, caption: 'Acciones'}, 
        ]}
        fetchURL={`${BASE_URL}body-part/list`}
      />
    </div>
  );
};

export default Home;