import ProjectsManager from '@/UI/views/Dashboard/Projects';
import ServicesManager from '@/UI/views/Dashboard/Services';
import ProductsCategoryManager from '@/UI/views/Dashboard/Products';
import ExpertiseManager from '@/UI/views/Dashboard/Expertise';
import React from 'react';

export const dynamic = 'force-dynamic';

const page = async () => {
  return (
    <>
      <ServicesManager />
      <ExpertiseManager />
      <ProjectsManager />
      <ProductsCategoryManager />
    </>
  );
};

export default page;
