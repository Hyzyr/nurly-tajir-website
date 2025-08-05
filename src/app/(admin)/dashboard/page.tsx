import ProductCategoryTable from '@/UI/views/Dashboard/Products/ProductCategoryTable';
import ProjectsTable from '@/UI/views/Dashboard/Projects/ProjectsTable';
import { ServicesManager } from '@/UI/views/Dashboard/Services';
import React from 'react';

const page = async () => {
  return (
    <>
      <ServicesManager />
      <ProjectsTable />
      <ProductCategoryTable />
    </>
  );
};

export default page;
