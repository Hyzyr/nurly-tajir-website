import ProductCategoryTable from '@/UI/views/Dashboard/Products/ProductCategoryTable';
import ProjectsTable from '@/UI/views/Dashboard/Projects/ProjectsTable';
import ServicesTable from '@/UI/views/Dashboard/Services/ServicesTable';
import React from 'react';

const page = async () => {
  return (
    <>
      <ServicesTable />
      <ProjectsTable />
      <ProductCategoryTable />
    </>
  );
};

export default page;
