import ProjectsManager from '@/UI/views/Dashboard/Projects';
import ServicesManager from '@/UI/views/Dashboard/Services';
import ProductsCategoryManager from '@/UI/views/Dashboard/Products';
import React from 'react';

const page = async () => {
  return (
    <>
      <ServicesManager />
      <ProjectsManager /> 
      <ProductsCategoryManager />
    </>
  );
};

export default page;
