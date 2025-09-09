'use client';
import { Brand, ProductCategory } from '@/types/supabase';
import React, { useRef, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import DashboardTable, {
  ActionsCell,
  ActionsHeader,
  DashboardTableCta,
} from '../DashboardTable';
import Button from '@/UI/components/Button';
import { ModalRef } from '@/UI/components/Modal/Modal';
import ProductsCategoryEditModal from './ProductsCategoryEditModal';
import { Json } from '@/utils/supabase/database.types';

type ProductCategoryWithID = ProductCategory & { index: number };
type Props = {
  data: ProductCategoryWithID[] | null;
};

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
    cell: (row) => <InfoCell json={row.brands} />,
    grow: 0.45,
  },
];

const ProductCategoryTable = ({ data }: Props) => {
  const editModalRef = useRef<ModalRef>(null);
  const [editModalData, setEditModalData] = useState<ProductCategory | null>(
    null
  );

  const onEdit = (data: ProductCategory) => {
    setEditModalData(data);
    if (editModalRef.current) editModalRef.current.show();
  };
  const onAdd = () => console.log('on addgf');
  // const editModalClose = () => {};

  return (
    <>
      <DashboardTable title="Products Group">
        <div className={'tableWrapper'}>
          {data && (
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
                        icon="editSVG"
                        style="secondary"
                        onClick={() => onEdit(row)}
                      />
                    </ActionsCell>
                  ),
                },
              ]}
              data={data}
            />
          )}
          {!data && 'No Data'}
          <DashboardTableCta>
            <Button
              size="sm"
              icon="plusSVG"
              text="Add New"
              onClick={() => onAdd()}
            />
          </DashboardTableCta>
        </div>
      </DashboardTable>
      {data && (
        <ProductsCategoryEditModal
          ref={editModalRef}
          data={editModalData ?? null}
        />
      )}
    </>
  );
};
type InfoCellProps = {
  brands?: Brand[];
  json?: Json | Brand[];
};
const InfoCell = ({ brands, json }: InfoCellProps) => {
  const data: Brand[] | null = React.useMemo(() => {
    if (brands) return brands;
    else if (!json) return null;
    else if (json && typeof json === 'object') return json as Brand[];

    try {
      const parsedData = JSON.parse(json as string);
      if (parsedData) return parsedData;
    } catch (error) {
      console.log('ProductsCategoryTable : can not parse JSON:  \n ', json);
      if (error instanceof Error) console.log(error?.message);
    }
    return null;
  }, [brands, json]);
  return (
    <div className="tableBadge__wrapper">
      {data &&
        data.map((brand, index) => (
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
