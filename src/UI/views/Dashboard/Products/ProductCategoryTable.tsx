'use client';
import { Brand, ProductCategory } from '@/types/supabase';
import { fetchAll } from '@/utils/supabase/client';
import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, {
  ActionsCell,
  ActionsHeader,
  DashboardTableCta,
} from '../DashboardTable';
import Button from '@/UI/components/Button';

type ProductCategoryWithID = ProductCategory & { index: number };

const columns: TableColumn<ProductCategoryWithID>[] = [
  {
    name: 'ID',
    selector: (row) => row.index,
    grow: 0,
    sortable: true,
    width: '80px',
  },
  {
    name: 'Image',
    cell: (row) =>
      row.image ? <ProjectImg src={row.image} alt={row.name_en} /> : null,
    grow: 0,
  },
  {
    name: 'Title En',
    selector: (row) => row.name_en,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Title Ru',
    selector: (row) => row.name_ru,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Title Tm',
    selector: (row) => row.name_tm,
    sortable: true,
    grow: 0.45,
  },
  {
    name: 'Brands',
    cell: (row) => <InfoCell brands={row.brands} />,
    grow: 0.45,
  },
];

const ProductCategoryTable = () => {
  const [data, setData] = useState<ProductCategoryWithID[] | null>(null);

  useEffect(() => {
    fetchAll<ProductCategory>('product_categories').then((data) => {
      const dataWithIndex = data.map((item, index) => ({
        ...item,
        index: index + 1,
      }));

      console.log('ProductCategory : \n', data);
      setData(dataWithIndex as ProductCategoryWithID[]);
    });
  }, []);
  const onEdit = (data: ProductCategory) => console.log('edit data : ', data);

  if (!data) return 'No data';
  return (
    <DashboardTable title="Products Group">
      <div className={'tableWrapper'}>
        <DataTable
          columns={[
            ...columns,
            {
              name: <ActionsHeader>Tools</ActionsHeader>,
              grow: 0.45,
              cell: (row) => (
                <ActionsCell>
                  <Button
                    text="Edit"
                    size="sm"
                    icon="arrowCorner"
                    style="outlined"
                    onClick={() => onEdit(row as ProductCategory)}
                  />
                </ActionsCell>
              ),
            },
          ]}
          data={data}
        />
        <DashboardTableCta>
          <Button size="sm" icon="mapPinIcon" text="Add New" />
        </DashboardTableCta>
      </div>
    </DashboardTable>
  );
};
type InfoCellProps = {
  brands: Brand[];
};
const InfoCell = ({ brands }: InfoCellProps) => {
  return (
    <div className="tableBadge__wrapper">
      {brands.map((brand, index) => (
        <a href={brand?.link} key={index} className="tableBadge">
          {brand?.name}
        </a>
      ))}
    </div>
  );
};
type ProjectImgProps = {
  src: string;
  alt: string;
};

const ProjectImg = ({ src, alt }: ProjectImgProps) => {
  const url = src.startsWith('http') ? src : `/images/website/products/${src}`;

  return <img src={url} alt={alt} width={80} height={80} />;
};

export default ProductCategoryTable;
